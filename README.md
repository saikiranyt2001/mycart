# MyCart - B2B Wholesale E-Commerce Platform

A modern, scalable e-commerce platform similar to MyCart, designed for B2B wholesale transactions.

## 📋 Project Structure

```
mycart/
├── backend/              # Node.js/Express API server
│   ├── models/          # Mongoose database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── controllers/     # Business logic
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Environment variables template
├── frontend/            # HTML/CSS/JavaScript frontend
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   ├── index.html      # Home page
│   ├── login.html      # Login page
│   ├── register.html   # Registration page
│   └── cart.html       # Shopping cart page
└── database/           # Database schemas and configs
    └── schema.sql      # Database schema
```

## 🚀 Features

### For Buyers
- **Browse Products**: Explore wide range of wholesale products
- **Smart Search & Filter**: Filter by category, price range, seller
- **Shopping Cart**: Add/remove items, manage quantities
- **User Account**: Register and manage profile
- **Order Tracking**: Track order status and delivery
- **Reviews & Ratings**: Leave feedback on products

### For Sellers
- **Product Management**: List and manage inventory
- **Sales Analytics**: Track sales and performance
- **Order Management**: Manage customer orders
- **Seller Profile**: Build trust with verified profile

### Platform Features
- **Verified Sellers**: All sellers are verified for authenticity
- **Secure Payments**: Multiple payment methods
- **B2B Pricing**: Wholesale pricing with MOQ support
- **Fast Delivery**: Efficient logistics and tracking
- **24/7 Support**: Dedicated customer support

## 📦 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with responsive design
- **Vanilla JavaScript** - Interactivity
- **LocalStorage** - Client-side data persistence

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mycart-ecommerce
JWT_SECRET=your_secure_secret_key_here
NODE_ENV=development
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

3. Access the application at `http://localhost:8000`

## 🗄️ Database Setup

1. Create MongoDB database:
```bash
mongosh
use mycart-ecommerce
```

2. Or import SQL schema (if using MySQL):
```bash
mysql -u root -p < database/schema.sql
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get product details
- `GET /api/products/categories/all` - Get all categories

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId/add` - Add item to cart
- `PUT /api/cart/:userId/update/:productId` - Update cart item
- `DELETE /api/cart/:userId/remove/:productId` - Remove item from cart

### Orders
- `GET /api/orders/:userId` - Get user's orders
- `POST /api/orders/:userId/create` - Create new order
- `GET /api/orders/:userId/:orderId` - Get order details

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId/update` - Update user profile

## 💳 Payment Methods Supported
- Credit Card
- Debit Card
- UPI
- Bank Transfer
- Digital Wallet

## 📱 Responsive Design
- Mobile-first approach
- Tablets (768px)
- Desktops (1024px and above)

## 🎨 Design Features
- Modern UI with gradient backgrounds
- Smooth animations and transitions
- Intuitive navigation
- Clean and professional layout
- Color scheme: Primary (#FF6B35), Secondary (#004E89)

## 🧪 Sample Data

The application comes with sample products for testing. View them on the home page with features like:
- Product images (emoji icons)
- Price in Indian Rupees (₹)
- Seller information
- Ratings
- Minimum order quantity
- Add to cart functionality

## 🔄 Demo Flow

1. **Visit Home Page** - See featured products and categories
2. **Search Products** - Use search bar or filters
3. **Add to Cart** - Click "Add to Cart" on any product
4. **View Cart** - Click cart icon to see items
5. **Register/Login** - Create account or login
6. **Checkout** - Proceed to checkout
7. **Payment** - Select payment method
8. **Order Confirmation** - Receive order confirmation

## 📈 Future Enhancements
- [ ] Payment gateway integration (Stripe, Razorpay)
- [ ] Real-time notifications
- [ ] Seller dashboard
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] Video product demos
- [ ] Live chat support
- [ ] Bulk ordering features
- [ ] Supply chain tracking
- [ ] Automated invoicing

## 🐛 Known Issues
- Currently using sample data for products
- Cart data stored in localStorage (client-side only)
- No actual payment processing yet

## 📞 Support
For support, email support@mycart.com or contact our 24/7 support team.

## 📄 License
This project is licensed under the MIT License.

## 👥 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for B2B E-Commerce**
