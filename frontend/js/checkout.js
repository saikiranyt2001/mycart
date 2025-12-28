// Checkout page logic: load saved address and cart, show summary
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const address = loadSavedAddress();
        const cart = loadCart();

        if (!address) {
            renderMissingState('No saved address found. Please add your shipping details.', true);
            return;
        }

        if (!cart.length) {
            renderMissingState('Your cart is empty. Add items before checkout.', false);
            return;
        }

        renderAddress(address);
        renderItems(cart);
        renderSummary(cart);
        wirePlaceOrder(cart, address);
    });

    function loadSavedAddress() {
        try {
            const saved = localStorage.getItem('checkoutAddress');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.warn('Failed to load address', e);
            return null;
        }
    }

    function loadCart() {
        try {
            return JSON.parse(localStorage.getItem('cart')) || [];
        } catch (e) {
            console.warn('Failed to load cart', e);
            return [];
        }
    }

    function renderAddress(address) {
        const block = document.getElementById('addressBlock');
        if (!block) return;
        const lines = [
            `${address.fullName}${address.phone ? ' · ' + address.phone : ''}`,
            address.email,
            address.address1,
            address.address2,
            `${address.city}, ${address.state} ${address.postalCode}`.trim(),
            address.country
        ].filter(Boolean);
        block.innerHTML = `<strong>Shipping to</strong><div>${lines.join('<br>')}</div>`;
    }

    function renderItems(cart) {
        const list = document.getElementById('itemsList');
        if (!list) return;
        list.innerHTML = '';
        cart.forEach((item) => {
            const row = document.createElement('div');
            row.className = 'checkout-item-row';
            row.innerHTML = `
                <div>
                    <div class="product-name">${item.name}</div>
                    <div class="muted">Qty: ${item.quantity}</div>
                </div>
                <div class="product-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
            `;
            list.appendChild(row);
        });
    }

    function renderSummary(cart) {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 5000 ? 0 : 200;
        const tax = Math.round(subtotal * 0.05);
        const total = subtotal + shipping + tax;

        setText('summarySubtotal', formatCurrency(subtotal));
        setText('summaryShipping', shipping === 0 ? 'FREE' : formatCurrency(shipping));
        setText('summaryTax', formatCurrency(tax));
        setText('summaryTotal', formatCurrency(total));
    }

    function wirePlaceOrder(cart, address) {
        const btn = document.getElementById('placeOrderBtn');
        const status = document.getElementById('checkoutStatus');
        if (!btn) return;

        btn.addEventListener('click', async () => {
            btn.disabled = true;
            if (status) {
                status.textContent = 'Placing order...';
            }

            try {
                const auth = getAuth();
                const orderPayload = buildOrderPayload(cart, address);

                if (auth.token && auth.userId) {
                    const res = await window.apiFetch(`/orders/${auth.userId}/create`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${auth.token}`
                        },
                        body: JSON.stringify(orderPayload)
                    });

                    if (res.ok) {
                        if (status) status.textContent = 'Order placed successfully!';
                        localStorage.removeItem('cart');
                        return;
                    }
                }

                // Fallback: store locally when not logged in or backend fails
                saveLocalOrder(orderPayload, status);
            } catch (e) {
                saveLocalOrder(null, status);
            } finally {
                btn.disabled = false;
            }
        });
    }

    function buildOrderPayload(cart, address) {
        const totals = computeTotals(cart);
        return {
            paymentMethod: 'UPI',
            items: cart,
            totals,
            shippingAddress: {
                street: [address.address1, address.address2].filter(Boolean).join(', '),
                city: address.city,
                state: address.state,
                zipCode: address.postalCode,
                country: address.country,
                phone: address.phone
            }
        };
    }

    function saveLocalOrder(orderPayload, statusEl) {
        const localOrders = JSON.parse(localStorage.getItem('localOrders') || '[]');
        const orderNumber = `ORD-LCL-${Date.now()}`;
        const payload = orderPayload && typeof orderPayload === 'object' ? orderPayload : {};
        localOrders.push({ orderNumber, placedAt: new Date().toISOString(), ...payload });
        localStorage.setItem('localOrders', JSON.stringify(localOrders));
        localStorage.removeItem('cart');
        if (statusEl) statusEl.textContent = 'Order saved locally. Sign in to sync orders.';
    }

    function getAuth() {
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            const userId = user?._id || user?.id || null;
            return { token, userId };
        } catch (e) {
            return { token: null, userId: null };
        }
    }

    function renderMissingState(message, focusAddress) {
        const items = document.getElementById('itemsList');
        const address = document.getElementById('addressBlock');
        const summary = document.querySelector('.summary-total');
        if (address) address.innerHTML = `<p class="muted">${message}</p>`;
        if (items) items.innerHTML = '';
        if (summary) summary.textContent = '';
        const status = document.getElementById('checkoutStatus');
        if (status) status.textContent = message;
        setTimeout(() => {
            window.location.href = focusAddress ? 'cart.html' : 'index.html';
        }, 1200);
    }

    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function formatCurrency(value) {
        return `₹${value.toLocaleString('en-IN')}`;
    }

    function computeTotals(cart) {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 5000 ? 0 : 200;
        const tax = Math.round(subtotal * 0.05);
        return {
            subtotal,
            shipping,
            tax,
            total: subtotal + shipping + tax
        };
    }
})();
