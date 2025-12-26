# 🛒 Modern E-Commerce Platform

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB featuring a modern UI, user authentication, shopping cart, wishlist, order management, and order tracking.

![E-Commerce Platform](https://img.shields.io/badge/React-18.x-blue) ![Node.js](https://img.shields.io/badge/Node.js-18.x-green) ![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen)

## ✨ Features

### 🎨 Modern UI/UX
- **Premium Design**: Gradient backgrounds, glassmorphism effects, and smooth animations
- **Responsive Layout**: Mobile-first design that works seamlessly on all devices
- **Dark Mode Ready**: Modern color scheme with CSS variables
- **Micro-interactions**: Hover effects, transitions, and animated elements

### 👤 User Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- User-specific data storage

### 🛍️ Shopping Experience
- **Product Catalog**: Browse products with images, prices, and ratings
- **Search & Filter**: Find products easily
- **Product Details**: Detailed product information
- **Hero Section**: Banner slider with featured categories

### 🛒 Shopping Cart
- Add/remove items
- Update quantities
- Real-time total calculation
- User-specific cart (persists per user)
- Cart badge showing item count

### ❤️ Wishlist
- Save favorite products
- Move items to cart
- User-specific wishlist
- Wishlist badge showing item count

### 📦 Order Management
- **Place Orders**: Seamless checkout process
- **Order History**: View all past orders
- **Order Details**: Complete order information with items and totals
- **Order Status**: Track order progress (Processing, Shipped, Delivered)
- **User-specific Orders**: Each user has their own order history

### 🚚 Order Tracking
- **Visual Delivery Map**: Animated route from warehouse to delivery location
- **Moving Truck Animation**: Real-time delivery visualization
- **5-Stage Timeline**: 
  - Order Placed
  - Order Confirmed
  - Shipped
  - Out for Delivery
  - Delivered
- **Status Indicators**: Color-coded progress with animations
- **Delivery ETA**: Expected delivery date display
- **Responsive Layout**: Desktop (3-column) and mobile (stacked) views

### 🎯 Additional Features
- Toast notifications for user feedback
- Empty states with call-to-action buttons
- Loading states
- Error handling
- LocalStorage persistence per user

## 🚀 Tech Stack

### Frontend
- **React** 18.x - UI library
- **React Router** - Client-side routing
- **Context API** - State management
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with variables and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
collegebackend/
├── backend/
│   ├── app.js                 # Express server setup
│   ├── models/
│   │   ├── productmodel.js    # Product schema
│   │   └── usermodel.js       # User schema
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation bar
│   │   │   ├── Hero.jsx       # Hero section with slider
│   │   │   ├── Products.jsx   # Product card component
│   │   │   ├── Footer.jsx     # Footer component
│   │   │   └── Toast.jsx      # Toast notifications
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Home page
│   │   │   ├── Cart.jsx       # Shopping cart
│   │   │   ├── Wishlist.jsx   # Wishlist page
│   │   │   ├── Orders.jsx     # Order history
│   │   │   ├── OrderSuccess.jsx # Order confirmation
│   │   │   ├── OrderTracking.jsx # Order tracking
│   │   │   ├── Profile.jsx    # User profile
│   │   │   ├── Login.jsx      # Login page
│   │   │   └── Register.jsx   # Registration page
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Authentication state
│   │   │   ├── CartContext.jsx      # Cart state (user-specific)
│   │   │   ├── WishlistContext.jsx  # Wishlist state (user-specific)
│   │   │   ├── OrderContext.jsx     # Orders state (user-specific)
│   │   │   └── ToastContext.jsx     # Toast notifications
│   │   │
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # Global styles
│   │   └── main.jsx           # Entry point
│   │
│   └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn


1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```env
VITE_API_URL=http://localhost:3000
```

For production (Render):
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

4. **Start development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`


## 🌐 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set build command: `npm install`
5. Set start command: `node app.js`
6. Add environment variables
7. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Set framework preset: Vite
4. Set root directory: `frontend`
5. Add environment variable: `VITE_API_URL`
6. Deploy

## 📝 API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - Login user

### Products
- `GET /products` - Get all products
- `POST /products` - Add new product (admin)

## 🔐 User-Specific Data

Each user has isolated data stored in localStorage:
- **Cart**: `cart_{username}`
- **Wishlist**: `wishlist_{username}`
- **Orders**: `orders_{username}`

Data automatically loads on login and clears on logout.

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Key Features Implementation

### Order Tracking
- Visual map with warehouse and delivery location
- Animated truck moving along route
- 5-stage progress timeline with status indicators
- Responsive layout (row on desktop, column on mobile)
- Real-time status updates with color coding

### User Authentication
- JWT tokens stored in localStorage
- Protected routes requiring authentication
- Automatic token validation on mount
- Logout clears all user data

### State Management
- Context API for global state
- Separate contexts for different features
- User-specific data isolation
- Automatic persistence to localStorage

## 🐛 Troubleshooting

### CORS Issues
Ensure backend has CORS enabled:
```javascript
app.use(cors());
```

### API Connection
Check `VITE_API_URL` in frontend `.env` file matches backend URL

### MongoDB Connection
Verify MongoDB is running and connection string is correct

### Build Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, email srivastavaharsh1108@gmail.com or create an issue in the repository.

---

**Happy Shopping! 🛍️**
