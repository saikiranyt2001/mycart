# MyCart - Setup and Installation Guide

## Quick Start Guide

### Step 1: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your MongoDB connection string and JWT secret.

Start backend:
```bash
npm start
```

The backend will run on http://localhost:5000

### Step 2: Frontend Setup

The frontend is ready to use. Open a terminal in the `frontend` directory:

```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js
npx http-server
```

Open http://localhost:8000 in your browser.

## Features Overview

### 1. Home Page
- Hero section with search functionality
- Popular categories
- Featured products with filters
- Why choose MyCart section
- Newsletter subscription

### 2. Product Browsing
- View all products
- Filter by category
- Filter by price range
- Search by product name or seller
- Product details with ratings and reviews
- Minimum order quantity information

### 3. Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Real-time cart summary
- Calculate subtotal, tax, and shipping
- Proceed to checkout

### 4. User Authentication
- User registration with business type selection
- Secure login
- JWT token-based authentication
- User profile management

### 5. Product Management
- 8+ sample products across different categories
- Electronics, Fashion, Home & Garden, Kitchen, Sports
- Seller information and ratings
- Stock availability

## API Structure

### Models
- **User**: Stores user account information
- **Product**: Stores product details and inventory
- **Cart**: Shopping cart management
- **Order**: Order information and history
- **Review**: Product reviews and ratings

### Routes
- `/api/auth` - Authentication endpoints
- `/api/products` - Product listing and details
- `/api/cart` - Shopping cart operations
- `/api/orders` - Order management
- `/api/users` - User profile management

## Database Schema

The application uses MongoDB with Mongoose ODM. Key collections:
- users
- products
- carts
- orders
- reviews

MongoDB Atlas can be used for cloud database hosting.

## Customization

### Change Brand Colors
Edit in `frontend/css/styles.css`:
```css
:root {
    --primary-color: #FF6B35;      /* Orange */
    --secondary-color: #004E89;    /* Blue */
    --success-color: #1BBC9B;      /* Teal */
}
```

### Add More Products
Update `sampleProducts` array in `frontend/js/main.js`

### Change Company Name
Update "MyCart" throughout:
- `frontend/index.html`
- `frontend/css/styles.css`
- `backend/package.json`

## Environment Variables

Create `.env` in backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mycart-ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

## Deployment

### Frontend
- Deploy to Vercel, Netlify, or GitHub Pages
- Build commands not required (static files)

### Backend
- Deploy to Heroku, Railway, or any Node.js hosting
- Ensure MongoDB connection is configured
- Set environment variables in hosting platform

## Testing

### Manual Testing
1. Register a new user account
2. Browse products and apply filters
3. Add products to cart
4. Update cart quantities
5. Calculate order totals

### API Testing
Use Postman or cURL to test endpoints:

```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","phone":"1234567890"}'

# Get products
curl http://localhost:5000/api/products
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or connection string is correct
- Check .env file has correct MONGODB_URI

### Port Already in Use
- Change PORT in .env or kill the process using port 5000
- For frontend, change port in http-server command

### CORS Errors
- Backend allows CORS by default for localhost
- Update CORS configuration in server.js if needed

### Products Not Loading
- Check browser console for errors
- Ensure backend is running
- Verify API_BASE_URL in frontend/js/main.js

## File Structure Explained

```
frontend/
├── index.html          # Home page with products
├── login.html          # User login
├── register.html       # User registration
├── cart.html           # Shopping cart page
├── css/
│   ├── styles.css      # Main stylesheet
│   └── auth.css        # Authentication styles
└── js/
    ├── main.js         # Home page logic
    ├── auth.js         # Auth logic
    └── cart.js         # Cart logic

backend/
├── models/
│   ├── User.js         # User schema
│   ├── Product.js      # Product schema
│   ├── Cart.js         # Cart schema
│   ├── Order.js        # Order schema
├── routes/
│   ├── auth.js         # Auth routes
│   ├── products.js     # Product routes
│   ├── cart.js         # Cart routes
│   ├── orders.js       # Order routes
│   └── users.js        # User routes
├── server.js           # Express app setup
└── package.json        # Dependencies
```

## Next Steps

1. Install dependencies: `npm install`
2. Configure MongoDB connection
3. Run backend: `npm start`
4. Run frontend server
5. Visit http://localhost:8000
6. Start exploring the platform!

---

For more information, refer to the main README.md file.
