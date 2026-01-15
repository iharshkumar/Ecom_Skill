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
├── admin/                 # Admin Panel
│   ├── frontend/          # Admin Dashboard UI
│   └── backend/           # Admin API & Logic
│
├── client/                # Customer Application
│   ├── frontend/          # Main Shopping Site UI
│   └── backend/           # Customer API & Logic
│
└── README.md              # Project Documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Setup Client (User App)

**Frontend:**
```bash
cd client/frontend
npm install
npm run dev
```
*Creates `.env`: `VITE_API_URL=http://localhost:3000`*

**Backend:**
```bash
cd client/backend
npm install
node app.js
```
*Creates `.env` with `MONGODB_URL` etc.*

### 2. Setup Admin Panel

**Frontend:**
```bash
cd admin/frontend
npm install
npm run dev
```
*Creates `.env`: `VITE_API_URL=http://localhost:5000` (or Admin Backend Port)*

**Backend:**
```bash
cd admin/backend
npm install
node index.js
```

## 🌐 Live Demo

- **Live Store:** [https://desiecommerce.vercel.app/](https://desiecommerce.vercel.app/)

---

## 📝 API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - Login user

### Products
- `GET /products` - Get all products
- `POST /products` - Add new product (admin)
- `PUT /products/:id` - Edit product (admin)
- `DELETE /products/:id` - Delete product (admin)

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

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## � Meet the Team

- **Harsh Kumar**
- **Priyanshu Mishra**
- **Prajjwal Kumar Singh**
- **Pratham Sharma**

## �📞 Support

For support, email srivastavaharsh1108@gmail.com or create an issue in the repository.

---

**Happy Shopping! 🛍️**
