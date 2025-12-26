// API Configuration (configurable via localStorage)
// Set `localStorage.apiBaseUrl` to override, e.g. your Render URL.
// Fallbacks: localhost (dev)
const DEFAULT_API_BASE_URL = 'http://localhost:5000/api';
const STORED_API_BASE_URL = (typeof window !== 'undefined') ? window.localStorage.getItem('apiBaseUrl') : null;
const API_BASE_URL = (STORED_API_BASE_URL && STORED_API_BASE_URL.trim()) ? STORED_API_BASE_URL.trim() : DEFAULT_API_BASE_URL;

// Sample Products Data (for demo)
const sampleProducts = [
    {
        id: 1,
        name: 'LED Display 55"',
        price: 28999,
        seller: 'Tech Solutions',
        rating: 4.5,
        image: '📺',
        minOrder: 1,
        category: 'electronics'
    },
    {
        id: 2,
        name: 'Wireless Headphones',
        price: 2999,
        seller: 'Audio Depot',
        rating: 4.8,
        image: '🎧',
        minOrder: 2,
        category: 'electronics'
    },
    {
        id: 3,
        name: 'Cotton T-Shirt',
        price: 399,
        seller: 'Fashion Hub',
        rating: 4.3,
        image: '👕',
        minOrder: 10,
        category: 'fashion'
    },
    {
        id: 4,
        name: 'Stainless Steel Pan Set',
        price: 1999,
        seller: 'Kitchen Pro',
        rating: 4.6,
        image: '🍳',
        minOrder: 1,
        category: 'kitchen'
    },
    {
        id: 5,
        name: 'Yoga Mat',
        price: 899,
        seller: 'Sports World',
        rating: 4.4,
        image: '🧘',
        minOrder: 2,
        category: 'sports'
    },
    {
        id: 6,
        name: 'Desk Lamp',
        price: 1299,
        seller: 'Home Designs',
        rating: 4.5,
        image: '💡',
        minOrder: 1,
        category: 'home'
    },
    {
        id: 7,
        name: 'Gaming Mouse',
        price: 1599,
        seller: 'Tech Gadgets',
        rating: 4.7,
        image: '🖱️',
        minOrder: 3,
        category: 'electronics'
    },
    {
        id: 8,
        name: 'Winter Jacket',
        price: 3499,
        seller: 'Fashion Hub',
        rating: 4.4,
        image: '🧥',
        minOrder: 5,
        category: 'fashion'
    }
];

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(sampleProducts);
});

// Load and display products
function loadProducts(products) {
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) return;
    
    productGrid.innerHTML = '';

    if (products.length === 0) {
        productGrid.innerHTML = '<div class="loading">No products found</div>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                <div class="product-seller">by ${product.seller}</div>
                <div class="product-rating">★ ${product.rating}</div>
                <div class="product-min-order">Min Order: ${product.minOrder}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                    Add to Cart
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Filter products
function filterProducts() {
    const priceFilter = document.getElementById('priceFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    
    const maxPrice = priceFilter ? parseInt(priceFilter.value) : 10000;
    const selectedCategory = categoryFilter ? categoryFilter.value : '';

    let filtered = sampleProducts.filter(product => {
        const priceMatch = product.price <= maxPrice;
        const categoryMatch = !selectedCategory || product.category === selectedCategory;
        return priceMatch && categoryMatch;
    });

    loadProducts(filtered);
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();
    
    let results = sampleProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.seller.toLowerCase().includes(query)
    );

    loadProducts(results);
}

// Toggle search bar
function toggleSearch() {
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.style.display = searchBar.style.display === 'none' ? 'flex' : 'none';
    }
}

// Add to cart
function addToCart(productId, productName, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Added to Cart';
    btn.style.backgroundColor = '#1BBC9B';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
    }, 2000);
}

// Get cart items
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Update cart total
function updateCartTotal() {
    const cart = getCartItems();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}
