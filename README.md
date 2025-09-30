# 🎮 Mini Game Store with Redux + JSON Server + Ant Design

A single-page mini game store application built with React, Redux Toolkit, JSON Server, and Ant Design with custom theming.

## ✨ Features

- **Game Management**: View, add, and remove games from the store
- **Shopping Cart**: Add games to cart, adjust quantities, and remove items
- **Real-time Updates**: All changes are synchronized with JSON Server
- **Custom Theme**: Dark glass-morphism design with custom color palette
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. **Start JSON Server** (in one terminal):
   ```bash
   npm run server
   ```
   This will start the mock API server on `http://localhost:5000`

2. **Start React Development Server** (in another terminal):
   ```bash
   npm run dev
   ```
   This will start the React app on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173`

## 🎨 Design Features

- **Glass-morphism UI**: Translucent cards with backdrop blur effects
- **Custom Color Palette**:
  - Primary Green: `#3c8618` (Add buttons)
  - Error Red: `#a61d24` (Remove buttons)
  - Badge Orange: `#aa3e19` (Cart count)
  - Dark Background: `#131629`

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **State Management**: Redux Toolkit
- **UI Library**: Ant Design
- **HTTP Client**: Axios
- **Mock API**: JSON Server
- **Styling**: CSS + Ant Design Theme

## 📁 Project Structure

```
src/
├── components/
│   ├── AppHeader.jsx      # Header with cart badge
│   ├── ProductList.jsx    # Game cards display
│   ├── Basket.jsx         # Shopping cart
│   └── AddProductForm.jsx # Add new game form
├── store/
│   ├── store.js           # Redux store configuration
│   └── gamesSlice.js      # Games state management
├── App.jsx                # Main app component
├── App.css                # Custom styles
└── main.jsx               # App entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start React development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON Server

## 🎯 Usage

1. **View Games**: Browse available games in the main area
2. **Add to Cart**: Click "Add to Cart" button on any game
3. **Manage Cart**: Adjust quantities or remove items in the cart section
4. **Add New Games**: Use the form to add new games to the store
5. **Remove Games**: Click "Remove" button to delete games from the store

## 🌟 Features in Detail

### Redux State Management
- `fetchGames`: Async thunk to load games from JSON Server
- `addGameToServer`: Add new games to the server
- `removeGameFromServer`: Remove games from the server
- `addToCart`: Add games to shopping cart
- `removeFromCart`: Remove games from cart
- `updateCartQuantity`: Update item quantities

### Responsive Design
- Mobile-first approach
- Grid layout that adapts to screen size
- Touch-friendly buttons and interactions

### Error Handling
- Loading states for async operations
- Error messages for failed operations
- Form validation with user feedback

Enjoy your mini game store! 🎮✨
