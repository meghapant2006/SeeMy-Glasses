import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './NewArrivals.css';

function NewArrivals() {
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const newProducts = products.filter(p => p.isNew);
  const itemsPerView = 4;

  const nextSlide = () => {
    if (currentIndex < newProducts.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="new-arrivals-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">Discover the latest in luxury eyewear</p>
        </div>

        <div className="carousel-wrapper">
          <button 
            className="carousel-btn prev" 
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {newProducts.map(product => (
                <div key={product.id} className="product-card">
                  <Link to={`/product/${product.id}`} className="product-link">
                    <div className="product-image-wrapper">
                      <img src={product.image} alt={product.name} className="product-image" />
                      <div className="product-overlay">
                        <span className="quick-view">Quick View</span>
                      </div>
                      {product.isNew && <span className="badge-new">NEW</span>}
                    </div>
                    <div className="product-info">
                      <div className="product-brand">{product.brand}</div>
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-rating">
                        <div className="stars">
                          {'★'.repeat(Math.floor(product.rating))}
                          {'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="reviews-count">({product.reviews})</span>
                      </div>
                      <div className="product-price">${product.price.toFixed(2)}</div>
                    </div>
                  </Link>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product, 1)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-btn next" 
            onClick={nextSlide}
            disabled={currentIndex >= newProducts.length - itemsPerView}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: Math.ceil(newProducts.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              className={`dot ${Math.floor(currentIndex / itemsPerView) === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index * itemsPerView)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
