import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="wishlist-empty">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <h2>Your Wishlist is Empty</h2>
            <p>Save your favorite items to your wishlist and keep track of products you love.</p>
            <Link to="/shop/all" className="shop-btn">Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              <button 
                className="remove-btn"
                onClick={() => removeFromWishlist(item.id)}
                title="Remove from wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <Link to={`/product/${item.id}`} className="wishlist-item-link">
                <div className="wishlist-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="wishlist-item-info">
                  <p className="wishlist-item-brand">{item.brand}</p>
                  <h3 className="wishlist-item-name">{item.name}</h3>
                  <p className="wishlist-item-price">${item.price}</p>
                </div>
              </Link>
              
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(item, 1)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
