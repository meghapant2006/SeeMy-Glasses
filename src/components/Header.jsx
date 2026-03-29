import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems, cartCount, getCartTotal, removeFromCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <header className="header">
      {/* Top utility bar */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-left">
            <span className="header-contact">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +1 (555) 123-4567
            </span>
            <span className="header-contact">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              info@luxuryeyewear.com
            </span>
          </div>

          <div className="header-top-right">
            {isAuthenticated ? (
              <div className="user-menu">
                <button className="header-link user-btn" onClick={() => setProfileOpen(!profileOpen)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  {user?.name || 'Account'}
                </button>
                {profileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-info">
                      <p className="profile-name">{user?.name}</p>
                      <p className="profile-email">{user?.email}</p>
                    </div>
                    <Link to="/account" className="profile-link" onClick={() => setProfileOpen(false)}>My Profile</Link>
                    <Link to="/wishlist" className="profile-link" onClick={() => setProfileOpen(false)}>My Wishlist</Link>
                    <Link to="/orders" className="profile-link" onClick={() => setProfileOpen(false)}>My Orders</Link>
                    <button className="logout-btn" onClick={() => { logout(); setProfileOpen(false); }}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/account" className="header-link">My Account</Link>
            )}
            <Link to="/wishlist" className="header-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              Wishlist
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            {/* Mobile menu button */}
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            {/* Navigation */}
            <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/shop/sunglasses" className="nav-link">Sunglasses</Link>
              <Link to="/shop/eyeglasses" className="nav-link">Eyeglasses</Link>
              <Link to="/shop/blue-light" className="nav-link">Blue Light Glasses</Link>
              <Link to="/shop/men" className="nav-link">Men</Link>
              <Link to="/shop/women" className="nav-link">Women</Link>
              <Link to="/brands" className="nav-link">Brands</Link>
              <Link to="/sale" className="nav-link sale">Sale</Link>
            </nav>

            {/* Logo */}
            <div className="header-logo-section">
              <div className="container">
                <Link to="/" className="logo">
                  <img src="/logo.png" alt="Seemy Glasses Logo" className="logo-image" />
                </Link>
              </div>
            </div>

            {/* Right section with search and cart */}
            <div className="header-actions">
              <button className="icon-btn" onClick={toggleSearch}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
              <Link to="/orders" className="icon-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </Link>
              <button className="icon-btn cart-btn" onClick={toggleCart}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span className="cart-count">{cartCount}</span>
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for brands, styles, or products..."
                className="search-input"
              />
              <button className="search-btn">Search</button>
            </div>
          )}
        </div>
      </div>

      {/* Cart dropdown */}
      {cartOpen && (
        <>
          <div className="cart-overlay" onClick={toggleCart}></div>
          <div className="cart-dropdown">
            <div className="cart-header">
              <h3>Shopping Cart ({cartCount})</h3>
              <button className="close-btn" onClick={toggleCart}>&times;</button>
            </div>
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6b6b6b' }}>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <div className="cart-item-brand">{item.brand}</div>
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">${item.price.toFixed(2)} × {item.quantity}</div>
                    </div>
                    <button 
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove from cart"
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Subtotal:</span>
                <span className="total-amount">${getCartTotal().toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="checkout-btn" onClick={toggleCart}>
                Proceed to Checkout
              </Link>
              <Link to="/cart" className="view-cart-btn" onClick={toggleCart}>
                View Cart
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
