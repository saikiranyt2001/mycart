// Category image defaults (realistic photos)
const categoryImages = {
    electronics: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    fashion: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    kitchen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    home: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
    sports: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80',
    books: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80'
};

// Sample Products Data (for demo)
const sampleProducts = [
    // Electronics (10)
    { id: 1,  name: 'LED Display 55"',       price: 28999, seller: 'Tech Solutions',   rating: 4.5, image: '📺', minOrder: 1,  category: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80' },
    { id: 2,  name: 'Wireless Headphones',    price: 2999,  seller: 'Audio Depot',      rating: 4.8, image: '🎧', minOrder: 2,  category: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
    { id: 3,  name: 'Gaming Mouse',           price: 1599,  seller: 'Tech Gadgets',     rating: 4.7, image: '🖱️', minOrder: 3,  category: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1587202372775-a5fc28e87338?auto=format&fit=crop&w=800&q=80' },
    { id: 4,  name: '4K Action Camera',       price: 11999, seller: 'Trail Tech',       rating: 4.4, image: '📷', minOrder: 1,  category: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1508896080822-0559bc5f16c9?auto=format&fit=crop&w=800&q=80' },
    { id: 5,  name: 'Smartwatch Pro',         price: 9999,  seller: 'Tech Solutions',   rating: 4.6, image: '⌚',  minOrder: 1,  category: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80' },
    { id: 6,  name: 'Bluetooth Speaker',      price: 3499,  seller: 'Audio Depot',      rating: 4.5, image: '🔊', minOrder: 2,  category: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
    { id: 7,  name: 'Laptop Backpack',        price: 1999,  seller: 'Urban Gear',       rating: 4.3, image: '🎒', minOrder: 2,  category: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
    { id: 8,  name: 'USB-C Hub',              price: 1299,  seller: 'Tech Gadgets',     rating: 4.2, image: '🔌', minOrder: 5,  category: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80' },
    { id: 9,  name: 'Noise Cancelling Earbuds', price: 7999, seller: 'Audio Depot',     rating: 4.6, image: '🎶', minOrder: 1,  category: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80' },
    { id: 10, name: 'Portable SSD 1TB',       price: 5999,  seller: 'Trail Tech',       rating: 4.7, image: '💾', minOrder: 1,  category: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },

    // Fashion (10)
    { id: 11, name: 'Cotton T-Shirt',         price: 399,   seller: 'Fashion Hub',      rating: 4.3, image: '👕', minOrder: 10, category: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80' },
    { id: 12, name: 'Winter Jacket',          price: 3499,  seller: 'Fashion Hub',      rating: 4.4, image: '🧥', minOrder: 5,  category: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80' },
    { id: 13, name: 'Running Shoes',          price: 2999,  seller: 'Stride Co',        rating: 4.5, image: '👟', minOrder: 2,  category: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1528701800489-20be9c1df35e?auto=format&fit=crop&w=800&q=80' },
    { id: 14, name: 'Denim Jeans',            price: 1999,  seller: 'Denim Works',      rating: 4.2, image: '👖', minOrder: 3,  category: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1542293787938-4d273c5c05f0?auto=format&fit=crop&w=800&q=80' },
    { id: 15, name: 'Formal Shirt',           price: 1299,  seller: 'Classic Wear',     rating: 4.1, image: '👔', minOrder: 5,  category: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1525171254930-643fc658b64d?auto=format&fit=crop&w=800&q=80' },
    { id: 16, name: 'Hoodie',                 price: 1799,  seller: 'Cozy Threads',     rating: 4.4, image: '🧥', minOrder: 2,  category: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80' },
    { id: 17, name: 'Socks Pack (5)',         price: 499,   seller: 'Stride Co',        rating: 4.0, image: '🧦', minOrder: 10, category: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80' },
    { id: 18, name: 'Baseball Cap',           price: 399,   seller: 'Urban Gear',       rating: 4.1, image: '🧢', minOrder: 5,  category: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80' },
    { id: 19, name: 'Sport Shorts',           price: 899,   seller: 'Stride Co',        rating: 4.2, image: '🩳', minOrder: 4,  category: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80' },
    { id: 20, name: 'Rain Jacket',            price: 2599,  seller: 'Outdoorsy',        rating: 4.3, image: '🌧️', minOrder: 1,  category: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80' },

    // Kitchen (10)
    { id: 21, name: 'Stainless Steel Pan Set', price: 1999, seller: 'Kitchen Pro',      rating: 4.6, image: '🍳', minOrder: 1,  category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80' },
    { id: 22, name: 'Chef Knife Set',          price: 2499, seller: 'Kitchen Pro',      rating: 4.6, image: '🔪', minOrder: 1,  category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80' },
    { id: 23, name: 'Cutting Board',           price: 799,  seller: 'Home Essentials',  rating: 4.2, image: '🪵', minOrder: 2,  category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1484684096794-03e03b5e713e?auto=format&fit=crop&w=800&q=80' },
    { id: 24, name: 'Air Fryer',               price: 7499, seller: 'Kitchen Pro',      rating: 4.5, image: '🍟', minOrder: 1,  category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1585238341976-854e2f98f0f8?auto=format&fit=crop&w=800&q=80' },
    { id: 25, name: 'Electric Kettle',         price: 1899, seller: 'Appliance Co',     rating: 4.4, image: '☕',  minOrder: 1,  category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=800&q=80' },
    { id: 26, name: 'Pressure Cooker',         price: 2999, seller: 'Home Essentials',  rating: 4.3, image: '🍲', minOrder: 1,  category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80' },
    { id: 27, name: 'Coffee Grinder',          price: 2199, seller: 'Brew House',       rating: 4.4, image: '🫘', minOrder: 1,  category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' },
    { id: 28, name: 'Mixing Bowl Set',         price: 1299, seller: 'Kitchen Pro',      rating: 4.2, image: '🥣', minOrder: 2,  category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=800&q=80' },
    { id: 29, name: 'Silicone Spatula Set',    price: 599,  seller: 'Home Essentials',  rating: 4.1, image: '🥄', minOrder: 5,  category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
    { id: 30, name: 'High-Speed Blender',      price: 4599, seller: 'Appliance Co',     rating: 4.5, image: '🥤', minOrder: 1,  category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1481984891887-2ec065c1dda0?auto=format&fit=crop&w=800&q=80' },

    // Home (10)
    { id: 31, name: 'Desk Lamp',               price: 1299, seller: 'Home Designs',     rating: 4.5, image: '💡', minOrder: 1,  category: 'home', imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80' },
    { id: 32, name: 'Linen Curtain Set',       price: 1799, seller: 'Home Designs',     rating: 4.2, image: '🪟', minOrder: 1,  category: 'home', imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80' },
    { id: 33, name: 'Memory Foam Pillow',      price: 2499, seller: 'Cozy Home',        rating: 4.6, image: '🛏️', minOrder: 2,  category: 'home', imageUrl: 'https://images.unsplash.com/photo-1582719478189-5301c4e4c1fb?auto=format&fit=crop&w=800&q=80' },
    { id: 34, name: 'Floor Rug',               price: 3499, seller: 'Home Designs',     rating: 4.3, image: '🧶', minOrder: 1,  category: 'home', imageUrl: 'https://images.unsplash.com/photo-1448582649076-3981753123b5?auto=format&fit=crop&w=800&q=80' },
    { id: 35, name: 'Wall Clock',              price: 999,  seller: 'Home Essentials',  rating: 4.1, image: '⏰', minOrder: 2,  category: 'home', imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80' },
    { id: 36, name: 'LED String Lights',       price: 899,  seller: 'Cozy Home',        rating: 4.4, image: '✨', minOrder: 5,  category: 'home', imageUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80' },
    { id: 37, name: 'Storage Bins (3)',        price: 1199, seller: 'Home Essentials',  rating: 4.2, image: '🧺', minOrder: 2,  category: 'home', imageUrl: 'https://images.unsplash.com/photo-1545023812-3fb183c58004?auto=format&fit=crop&w=800&q=80' },
    { id: 38, name: 'Laundry Basket',          price: 899,  seller: 'Cozy Home',        rating: 4.0, image: '🧺', minOrder: 2,  category: 'home', imageUrl: 'https://images.unsplash.com/photo-1582719478215-2f6cb3d5baf4?auto=format&fit=crop&w=800&q=80' },
    { id: 39, name: 'Table Vase',              price: 699,  seller: 'Decor Hub',        rating: 4.1, image: '🏺', minOrder: 3,  category: 'home', imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80' },
    { id: 40, name: 'Bath Towel Set',          price: 1499, seller: 'Home Essentials',  rating: 4.3, image: '🛁', minOrder: 2,  category: 'home', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80' },

    // Sports (10)
    { id: 41, name: 'Yoga Mat',                price: 899,  seller: 'Sports World',     rating: 4.4, image: '🧘', minOrder: 2,  category: 'sports', imageUrl: 'https://images.unsplash.com/photo-1554344058-8d1d1bc1c575?auto=format&fit=crop&w=800&q=80' },
    { id: 42, name: 'Resistance Bands Pack',   price: 1299, seller: 'Sports World',     rating: 4.5, image: '🏋️', minOrder: 1,  category: 'sports', imageUrl: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80' },
    { id: 43, name: 'Dumbbell Pair (5kg)',     price: 3499, seller: 'Fit Gear',         rating: 4.4, image: '🏋️', minOrder: 1,  category: 'sports', imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80' },
    { id: 44, name: 'Jump Rope',               price: 499,  seller: 'Fit Gear',         rating: 4.0, image: '🤾', minOrder: 5,  category: 'sports', imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80' },
    { id: 45, name: 'Foam Roller',             price: 1199, seller: 'Fit Gear',         rating: 4.3, image: '🌀', minOrder: 2,  category: 'sports', imageUrl: 'https://images.unsplash.com/photo-1599058917765-503d69c1620d?auto=format&fit=crop&w=800&q=80' },
    { id: 46, name: 'Cycling Gloves',          price: 799,  seller: 'Trail Tech',       rating: 4.2, image: '🧤', minOrder: 2,  category: 'sports', imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80' },
    { id: 47, name: 'Football',                price: 1099, seller: 'Play Field',       rating: 4.4, image: '🏈', minOrder: 3,  category: 'sports', imageUrl: 'https://images.unsplash.com/photo-1505672678657-cc7037095e2c?auto=format&fit=crop&w=800&q=80' },
    { id: 48, name: 'Basketball',              price: 1399, seller: 'Play Field',       rating: 4.3, image: '🏀', minOrder: 2,  category: 'sports', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80' },
    { id: 49, name: 'Swim Goggles',            price: 799,  seller: 'Aqua Sport',       rating: 4.1, image: '🤿', minOrder: 2,  category: 'sports', imageUrl: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=800&q=80' },
    { id: 50, name: 'Hiking Backpack',         price: 2999, seller: 'Outdoorsy',        rating: 4.5, image: '🥾', minOrder: 1,  category: 'sports', imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },

    // Books & Media (10)
    { id: 51, name: 'Business Strategy 101',   price: 599,  seller: 'BookMart',         rating: 4.3, image: '📘', minOrder: 5,  category: 'books', imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80' },
    { id: 52, name: 'Marketing Playbook',      price: 699,  seller: 'BookMart',         rating: 4.4, image: '📙', minOrder: 5,  category: 'books', imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80' },
    { id: 53, name: 'Data Science Primer',     price: 1299, seller: 'EduPress',         rating: 4.5, image: '📗', minOrder: 3,  category: 'books', imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80' },
    { id: 54, name: 'Project Mgmt Guide',      price: 899,  seller: 'EduPress',         rating: 4.2, image: '📕', minOrder: 4,  category: 'books', imageUrl: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=800&q=80' },
    { id: 55, name: 'AI for Everyone',         price: 999,  seller: 'Tech Reads',       rating: 4.6, image: '🤖', minOrder: 2,  category: 'books', imageUrl: 'https://images.unsplash.com/photo-1509551388410-9c61ac2a0f80?auto=format&fit=crop&w=800&q=80' },
    { id: 56, name: 'Startup Handbook',        price: 799,  seller: 'BookMart',         rating: 4.3, image: '📒', minOrder: 5,  category: 'books', imageUrl: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=800&q=80' },
    { id: 57, name: 'Financial Modeling',      price: 1499, seller: 'EduPress',         rating: 4.4, image: '💹', minOrder: 2,  category: 'books', imageUrl: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=800&q=80' },
    { id: 58, name: 'UX Design Basics',        price: 899,  seller: 'Tech Reads',       rating: 4.2, image: '🎨', minOrder: 3,  category: 'books', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' },
    { id: 59, name: 'Leadership Essentials',   price: 1099, seller: 'BookMart',         rating: 4.3, image: '🧭', minOrder: 3,  category: 'books', imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80' },
    { id: 60, name: 'Mindfulness Audio Pack',  price: 699,  seller: 'Calm Media',       rating: 4.1, image: '🎧', minOrder: 5,  category: 'books', imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80' }
];

// Expose for other pages (e.g., product details)
window.sampleProducts = sampleProducts;

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(sampleProducts);
    wireCategoryCards();
    setupNavSearchDismiss();
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
        const imgSrc = product.imageUrl || categoryImages[product.category] || '';
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const detailsHref = `product-details.html?id=${product.id}`;
        productCard.innerHTML = `
            <a class="product-detail-link" href="${detailsHref}" aria-label="View details for ${product.name}">
                <div class="product-image">${imgSrc ? `<img src="${imgSrc}" alt="${product.name}" loading="lazy" style="width:100%;height:160px;object-fit:cover;border-radius:6px;">` : product.image}</div>
            </a>
            <div class="product-info">
                <div class="product-name"><a class="product-title-link" href="${detailsHref}">${product.name}</a></div>
                <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                <div class="product-seller">by ${product.seller}</div>
                <div class="product-rating">★ ${product.rating}</div>
                <div class="product-min-order">Min Order: ${product.minOrder}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price}, ${product.minOrder})">
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
    
    const maxPrice = priceFilter ? parseInt(priceFilter.value) : 50000;
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
    const navInput = document.getElementById('navSearchInput');
    const heroInput = document.getElementById('searchInput');
    const query = (navInput?.value || heroInput?.value || '').toLowerCase();
    if (navInput) navInput.value = query ? query : navInput.value; // keep nav value in sync
    
    let results = sampleProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.seller.toLowerCase().includes(query)
    );

    loadProducts(results);

    const box = document.getElementById('navSearchBox');
    if (box) box.classList.remove('active');
}

// Toggle search bar
function toggleSearch() {
    const box = document.getElementById('navSearchBox');
    const input = document.getElementById('navSearchInput');
    if (!box) return;
    box.classList.toggle('active');
    if (box.classList.contains('active') && input) {
        setTimeout(() => input.focus(), 50);
    }
}

// Add to cart
// Adds items in batches of the product's minimum order quantity
function addToCart(productId, productName, price, minOrder = 1) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += minOrder;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: minOrder
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    playAddToCartSound();
    
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

// Very short tap for add-to-cart
function playAddToCartSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = 600;
        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
    } catch (e) {
        // ignore audio errors
    }
}

// Link category cards to filters
function wireCategoryCards() {
    const categoryCards = document.querySelectorAll('[data-category]');
    const categoryFilter = document.getElementById('categoryFilter');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category') || '';
            if (categoryFilter) {
                categoryFilter.value = category;
            }
            filterProducts();
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Close nav search when clicking outside
function setupNavSearchDismiss() {
    document.addEventListener('click', (e) => {
        const box = document.getElementById('navSearchBox');
        if (!box) return;
        const isToggle = e.target.closest('.search-btn');
        const insideBox = e.target.closest('#navSearchBox');
        if (!insideBox && !isToggle) {
            box.classList.remove('active');
        }
    });
}
