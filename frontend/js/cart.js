// Cart Management (uses apiConfig/apiFetch if available)
document.addEventListener('DOMContentLoaded', async () => {
    if (window.apiConfig) {
        await window.apiConfig.ready;
    }
    displayCart();
    setupCheckoutForm();
});

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (!cartItemsDiv) return;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="index.html" class="btn-primary">Continue Shopping</a>
            </div>
        `;
        updateCartSummary([]);
        return;
    }

    let html = '<div style="background: white; border-radius: 10px; overflow: hidden;">';
    
    cart.forEach((item, index) => {
        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid #e0e0e0;">
                <div style="flex: 1;">
                    <h3 style="margin-bottom: 0.5rem; color: #004E89;">${item.name}</h3>
                    <p style="color: #FF6B35; font-weight: bold;">₹${item.price.toLocaleString('en-IN')}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <button onclick="updateQuantity(${index}, ${item.quantity - 1})" style="padding: 0.5rem 0.7rem; background: #f0f0f0; border: none; border-radius: 3px; cursor: pointer;">-</button>
                    <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, ${item.quantity + 1})" style="padding: 0.5rem 0.7rem; background: #f0f0f0; border: none; border-radius: 3px; cursor: pointer;">+</button>
                    <button onclick="removeFromCart(${index})" style="padding: 0.5rem 1rem; background: #FF6B35; color: white; border: none; border-radius: 3px; cursor: pointer;">Remove</button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    cartItemsDiv.innerHTML = html;
    updateCartSummary(cart);
}

function updateQuantity(index, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (newQuantity <= 0) {
        removeFromCart(index);
        return;
    }
    
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function updateCartSummary(cart) {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 200;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`;
    if (taxEl) taxEl.textContent = `₹${tax.toLocaleString('en-IN')}`;
    if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
}

function setupCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;

    hydrateAddressForm(form);
    renderAddressPreview(loadSavedAddress());

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Your cart is empty. Add items before checkout.');
            return;
        }

        const formData = new FormData(form);
        const address = {
            fullName: formData.get('fullName')?.trim() || '',
            email: formData.get('email')?.trim() || '',
            phone: formData.get('phone')?.trim() || '',
            address1: formData.get('address1')?.trim() || '',
            address2: formData.get('address2')?.trim() || '',
            city: formData.get('city')?.trim() || '',
            state: formData.get('state')?.trim() || '',
            postalCode: formData.get('postalCode')?.trim() || '',
            country: formData.get('country')?.trim() || '',
        };

        const validationError = validateAddress(address);
        if (validationError) {
            alert(validationError);
            return;
        }

        localStorage.setItem('checkoutAddress', JSON.stringify(address));
        renderAddressPreview(address);
        window.location.href = 'checkout.html';
    });
}

function hydrateAddressForm(form) {
    try {
        const saved = localStorage.getItem('checkoutAddress');
        if (!saved) return;
        const address = JSON.parse(saved);
        ['fullName', 'email', 'phone', 'address1', 'address2', 'city', 'state', 'postalCode', 'country'].forEach((key) => {
            if (address[key] && form.elements.namedItem(key)) {
                form.elements.namedItem(key).value = address[key];
            }
        });
    } catch (e) {
        console.warn('Could not load saved address', e);
    }
}

function loadSavedAddress() {
    try {
        const saved = localStorage.getItem('checkoutAddress');
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        console.warn('Failed to parse saved address', e);
        return null;
    }
}

function renderAddressPreview(address) {
    const preview = document.getElementById('addressPreview');
    if (!preview) return;

    if (!address) {
        preview.innerHTML = '<p class="muted">No address saved yet.</p>';
        return;
    }

    const lines = [
        `${address.fullName}${address.phone ? ' · ' + address.phone : ''}`,
        address.email,
        address.address1,
        address.address2,
        `${address.city}, ${address.state} ${address.postalCode}`.trim(),
        address.country
    ].filter(Boolean);

    preview.innerHTML = `
        <strong>Shipping to</strong>
        <div>${lines.join('<br>')}</div>
    `;
}

function validateAddress(address) {
    if (!address.fullName) return 'Full name is required';
    if (!address.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) return 'Enter a valid email';

    const digits = address.phone.replace(/\D/g, '');
    if (digits.length !== 10) return 'Enter a 10-digit phone number';

    if (!address.address1) return 'Address line 1 is required';
    if (!address.city) return 'City is required';
    if (!address.state) return 'State is required';

    const pin = address.postalCode.replace(/\D/g, '');
    if (pin.length !== 6) return 'Enter a 6-digit postal code';

    if (!address.country) return 'Country is required';

    return '';
}

// Optional: sync cart to backend if endpoint exists
async function syncCartToBackend() {
    if (!window.apiFetch) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const token = localStorage.getItem('token');
    try {
        await window.apiFetch('/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify({ items: cart })
        });
    } catch (e) {
        console.warn('Cart sync failed:', e.message);
    }
}
