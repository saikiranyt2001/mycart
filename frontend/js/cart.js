// Cart Management (uses apiConfig/apiFetch if available)
document.addEventListener('DOMContentLoaded', async () => {
    if (window.apiConfig) {
        await window.apiConfig.ready;
    }
    displayCart();
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
