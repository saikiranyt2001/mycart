// Seller portal: login/register then add product via /products
(async () => {
    await (window.apiConfig ? window.apiConfig.ready : Promise.resolve());

    const state = {
        token: localStorage.getItem('token') || null,
        user: parseUser(localStorage.getItem('user'))
    };

    const loginForm = document.getElementById('sellerLoginForm');
    const registerForm = document.getElementById('sellerRegisterForm');
    const productForm = document.getElementById('productForm');
    const productCard = document.getElementById('productCard');
    const statusEl = document.getElementById('sellerStatus');
    const productStatusEl = document.getElementById('productStatus');
    const logoutBtn = document.getElementById('sellerLogout');
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    const addProductHeader = document.querySelector('.add-product-header');
    const userBadge = document.getElementById('sellerUserBadge');

    updateNavLoginButton(state.user);

    updateUI();

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearStatus();
            const email = loginForm.email.value.trim();
            const password = loginForm.password.value.trim();
            if (!email || !password) {
                setStatus('Enter email and password.', true);
                return;
            }
            await handleAuth('/auth/login', { email, password });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearStatus();
            const payload = {
                name: registerForm.name.value.trim(),
                email: registerForm.email.value.trim(),
                password: registerForm.password.value.trim(),
                phone: registerForm.phone.value.trim(),
                companyName: registerForm.companyName.value.trim(),
                businessType: registerForm.businessType.value
            };
            if (!payload.name || !payload.email || !payload.password || !payload.phone) {
                setStatus('Please fill all required fields.', true);
                return;
            }
            await handleAuth('/auth/register', payload);
        });
    }

    if (productForm) {
        productForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!state.token) {
                setProductStatus('Login first to add a product.', true);
                return;
            }
            const payload = buildProductPayload(productForm);
            if (!payload) {
                setProductStatus('Please fill product name, description, category, price, and stock.', true);
                return;
            }
            try {
                setProductStatus('Publishing...', false);
                const res = await window.apiFetch('/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.token}`
                    },
                    body: JSON.stringify(payload)
                });

                const data = await res.json();
                if (res.ok) {
                    productForm.reset();
                    productForm.minOrderQuantity.value = '1';
                    setProductStatus('Product published successfully.', false);
                } else {
                    setProductStatus(data.message || 'Could not publish product.', true);
                }
            } catch (err) {
                console.error('Product publish failed', err);
                setProductStatus('Network or server error while publishing.', true);
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.token = null;
            state.user = null;
            updateUI();
            setStatus('Logged out.', false);
        });
    }

    async function handleAuth(path, payload) {
        try {
            setStatus('Working...', false);
            const res = await window.apiFetch(path, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok && data.token && data.user) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                state.token = data.token;
                state.user = data.user;
                updateUI();
                setStatus('Authenticated successfully.', false);
                scrollToProductCard();
            } else {
                setStatus(data.message || 'Authentication failed.', true);
            }
        } catch (err) {
            console.error('Auth error', err);
            setStatus('Network or server error.', true);
        }
    }

    function buildProductPayload(form) {
        const name = form.name.value.trim();
        const description = form.description.value.trim();
        const category = form.category.value.trim();
        const subCategory = form.subCategory.value.trim();
        const price = Number(form.price.value);
        const stock = Number(form.stock.value);
        const minOrderQuantity = form.minOrderQuantity.value ? Number(form.minOrderQuantity.value) : 1;
        const imageUrl = form.imageUrl.value.trim();

        if (!name || !description || !category || !Number.isFinite(price) || !Number.isFinite(stock)) {
            return null;
        }

        return {
            name,
            description,
            category,
            subCategory: subCategory || undefined,
            price,
            stock,
            minOrderQuantity: Number.isFinite(minOrderQuantity) && minOrderQuantity > 0 ? minOrderQuantity : 1,
            images: imageUrl ? [imageUrl] : []
        };
    }

    function updateUI() {
        const loggedIn = Boolean(state.token);
        if (productCard) {
            productCard.style.display = loggedIn ? 'block' : 'none';
        }
        if (loginBox && registerBox) {
            loginBox.style.display = loggedIn ? 'none' : 'block';
            registerBox.style.display = loggedIn ? 'none' : 'block';
        }
        if (addProductHeader) {
            addProductHeader.style.display = loggedIn ? 'none' : 'block';
        }
        if (statusEl) {
            statusEl.textContent = loggedIn && state.user ? `Logged in as ${state.user.name || 'seller'}` : 'Not logged in';
        }
        if (userBadge) {
            userBadge.textContent = loggedIn && state.user ? `Logged in as ${state.user.name || state.user.email || 'seller'}` : '';
        }
        updateNavLoginButton(state.user);
    }

    function updateNavLoginButton(user) {
        const loginBtn = document.querySelector('.login-btn');
        if (!loginBtn) return;
        const loggedIn = Boolean(state.token && user);
        if (loggedIn) {
            const label = user.name || user.email || 'Account';
            loginBtn.textContent = label;
            loginBtn.setAttribute('href', 'seller.html');
            loginBtn.title = `Logged in as ${label}`;
        } else {
            loginBtn.textContent = 'Login';
            loginBtn.setAttribute('href', 'login.html');
            loginBtn.removeAttribute('title');
        }
    }

    function setStatus(text, isError) {
        if (statusEl) {
            statusEl.textContent = text;
            statusEl.style.color = isError ? '#c00' : '#004E89';
        }
    }

    function clearStatus() {
        if (statusEl) statusEl.textContent = '';
    }

    function setProductStatus(text, isError) {
        if (productStatusEl) {
            productStatusEl.textContent = text;
            productStatusEl.style.color = isError ? '#c00' : '#004E89';
        }
    }

    function scrollToProductCard() {
        if (productCard) {
            productCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function parseUser(value) {
        try {
            return value ? JSON.parse(value) : null;
        } catch (_e) {
            return null;
        }
    }
})();
