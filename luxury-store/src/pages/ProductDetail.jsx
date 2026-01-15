import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inCart = isInCart(product?.id);
  const inWishlist = isInWishlist(product?.id);

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/shop/all" className="back-btn">Back to Shop</Link>
        </div>
      </div>
    );
  }

  // Mock additional images
  const productImages = [product.image, product.image, product.image];

  // Related products (same category or brand)
  const relatedProducts = products
    .filter(p => 
      p.id !== product.id && 
      (p.category === product.category || p.brand === product.brand)
    )
    .slice(0, 4);

  return (
    <div className="product-detail-page">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <Link to={`/shop/${product.category}`}>{product.category}</Link>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </div>
      </div>

      {/* Product detail section */}
      <div className="product-detail-content">
        <div className="container">
          <div className="product-detail-grid">
            {/* Image gallery */}
            <div className="product-gallery">
              <div className="gallery-main">
                <img src={product.image} alt={product.name} />
              </div>
            </div>

            {/* Product info */}
            <div className="product-detail-info">
              <div className="product-brand-name">{product.brand}</div>
              <h1 className="product-detail-title">{product.name}</h1>
              
              <div className="product-rating-section">
                <div className="stars">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="rating-value">{product.rating}</span>
                <span className="reviews-link">({product.reviews} reviews)</span>
              </div>

              <div className="product-price-section">
                <span className="product-detail-price">${product.price.toFixed(2)}</span>
              </div>

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              <div className="product-details-list">
                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{product.category}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Gender:</span>
                  <span className="detail-value">{product.gender}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Shape:</span>
                  <span className="detail-value">{product.shape}</span>
                </div>
              </div>

              <div className="product-actions">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="qty-btn"
                    >
                      −
                    </button>
                    <input 
                      type="number" 
                      id="quantity"
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="qty-input"
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button 
                  className="add-to-cart-btn-large"
                  onClick={() => inCart ? removeFromCart(product.id) : addToCart(product, quantity)}
                >
                  {inCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
                <button 
                  className="wishlist-btn"
                  onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              <div className="product-features">
                <div className="feature-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Free Shipping on All Orders</span>
                </div>
                <div className="feature-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                  <span>7-Day Return Guarantee</span>
                </div>
                <div className="feature-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="reviews-section">
        <div className="container">
          <h2 className="section-title">Customer Reviews</h2>
          <div className="reviews-summary">
            <div className="summary-rating">
              <div className="big-rating">{product.rating}</div>
              <div className="stars-large">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <div className="total-reviews">Based on {product.reviews} reviews</div>
            </div>
          </div>

          <div className="review-list">
            {/* Mock reviews */}
            {[1, 2, 3].map(i => (
              <div key={i} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-name">Customer {i}</div>
                    <div className="review-stars">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <div className="review-date">2 weeks ago</div>
                </div>
                <div className="review-text">
                  Absolutely love these! Perfect fit, great quality, and the style is exactly what I was looking for. 
                  Highly recommend for anyone seeking premium eyewear.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <div className="container">
            <h2 className="section-title">You May Also Like</h2>
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/product/${relatedProduct.id}`}
                  className="related-product-card"
                >
                  <div className="related-product-image">
                    <img src={relatedProduct.image} alt={relatedProduct.name} />
                  </div>
                  <div className="related-product-info">
                    <div className="product-brand">{relatedProduct.brand}</div>
                    <div className="product-name">{relatedProduct.name}</div>
                    <div className="product-price">${relatedProduct.price.toFixed(2)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
