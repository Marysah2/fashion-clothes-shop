# Fashion & Clothes Shop Frontend

A modern React-based e-commerce frontend for a fashion and clothing store, built with Redux Toolkit for state management.

## Features

### MVP Features
- **User Authentication**: Login and registration system
- **Product Catalog**: Browse fashion items by categories (Men, Women, Kids, Accessories)
- **Shopping Cart**: Add, remove, and manage items in cart
- **Checkout Process**: Complete order with shipping and payment information
- **Payment Simulation**: Internal payment processing with invoice generation

### Technical Stack
- **Frontend**: React 19 + Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS3 with responsive design

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   └── ProductCard.jsx # Product display card
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # User login
│   ├── Register.jsx    # User registration
│   ├── Products.jsx    # Product catalog
│   ├── Cart.jsx        # Shopping cart
│   └── Checkout.jsx    # Order checkout
├── slices/             # Redux slices
│   ├── authSlice.js    # Authentication state
│   ├── productsSlice.js # Products state
│   └── cartSlice.js    # Cart state
├── store/              # Redux store configuration
├── utils/              # Utility functions
└── App.jsx             # Main application component
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Authentication
- User registration with form validation
- Login with email and password
- JWT token storage in localStorage
- Protected routes for authenticated users

### Product Management
- Category-based product filtering
- Responsive product grid layout
- Product details display
- Add to cart functionality

### Shopping Cart
- Add/remove items
- Quantity management
- Real-time total calculation
- Persistent cart state

### Checkout Process
- Shipping address form
- Payment information collection
- Order summary display
- Invoice generation and storage

## Backend Integration

The frontend is designed to work with a Flask backend API. Update the `API_BASE_URL` in `src/utils/api.js` to match your backend server.

Expected API endpoints:
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/products` - Get all products
- `GET /api/products?category=<category>` - Get products by category
- `POST /api/orders` - Create new order
- `GET /api/orders/my` - Get user's orders

## Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
