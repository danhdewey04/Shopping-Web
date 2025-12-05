📦 E-commerce Management Website

A full-stack E-commerce Management System with role-based access control for Admin – Seller – Buyer. The backend is built with Node.js/Express following RESTful API standards and MVC architecture. The frontend is developed using React.js with support for Google/Facebook OAuth login, while Redis is integrated for caching, session management, and performance optimization.

🚀 1. Features
🔐 Authentication & Authorization
- Email/password login & registration
- Google OAuth and Facebook OAuth
- JWT + Refresh Token authentication
- Role-Based Access Control (RBAC)
 + Admin: Full system management
 + Seller: Manage personal store and products
 + Buyer: Browse products and place orders

🛒 E-commerce Functionalities
- Product, category, and inventory management
- Shopping cart, order creation, and order tracking
- Seller dashboard for product & order management
- Admin dashboard for reports, analytics, and user management

🛠 2. Technologies Used

Backend
- Node.js, Express.js
- RESTful API
- MVC Architecture
- JWT Authentication
- OAuth2 (Google & Facebook)
- Redis (cache, session, rate limiting)
- MongoDB + Mongoose

Frontend
- React.js
- React Router
- React Hooks 
- Axios
- CSS / Bootstrap 

🧱 3. System Architecture
- Frontend (React)
    ↓ API Requests (Axios)
- Backend (Node.js + Express)
    → Routes
    → Controllers
    → Services
    → Models
- Database Layer
    → MongoDB
- Redis Layer
    → Session storage
    → Product caching
    → Token blacklist

🔧 4. Backend Highlights

-RESTful APIs for:
 + Users
 + Shops & Sellers
 + Products
 + Categories
 + Carts
 + Orders
 + Notifications
- RBAC middleware for Admin/Seller/Buyer 
- Redis used for:
 + Product caching
 + Login session storage
 + Token blacklist
 + API rate limiting

🎨 5. Frontend Highlights

Independent UI for each user role:
 + Admin Dashboard: analytics, user/seller management
 + Seller Dashboard: product CRUD, order management
 + Buyer Interface: browsing, product detail, cart, checkout, order tracking
 + Integrated Google/Facebook OAuth (token provided by backend)
 + Smooth navigation with React Router
 + State management using Hooks and Context/Redux
 + Responsive, mobile-friendly design

🗄 6. Database

- MongoDB Collections
 + users
 + shops
 + products
 + categories
 + orders
 + carts
 + reviews
 + roles

- Redis Usage
 + Product caching
 + Session & refresh token storage
 + Token blacklist after logout
 + Rate limiting to protect API

▶️ 7. How to Run
npm install
npm start
