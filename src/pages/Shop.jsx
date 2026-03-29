import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, brands } from '../data/products';
import { useCart } from '../context/CartContext';
import './Shop.css';

function Shop() {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    brands: [],
    gender: [],
    shape: [],
    priceRange: [0, 1000]
  });
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    let filtered = [...products];

    // Filter by category from URL
    if (category && category !== 'all') {
      if (category === 'men' || category === 'women') {
        filtered = filtered.filter(p => p.gender === category || p.gender === 'unisex');
      } else if (category === 'blue-light') {
        filtered = filtered.filter(p => p.category === 'blue-light');
      } else {
        filtered = filtered.filter(p => p.category === category);
      }
    }

    // Apply brand filters
    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand));
    }

    // Apply gender filters
    if (filters.gender.length > 0) {
      filtered = filtered.filter(p => 
        filters.gender.includes(p.gender) || p.gender === 'unisex'
      );
    }

    // Apply shape filters
    if (filters.shape.length > 0) {
      filtered = filtered.filter(p => filters.shape.includes(p.shape));
    }

    // Apply price range filter
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [category, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (filterType === 'priceRange') {
        newFilters.priceRange = value;
      } else {
        const index = newFilters[filterType].indexOf(value);
        if (index > -1) {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      gender: [],
      shape: [],
      priceRange: [0, 1000]
    });
  };

  const getCategoryTitle = () => {
    if (!category || category === 'all') return 'All Products';
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <h1 className="shop-title">{getCategoryTitle()}</h1>
        </div>
      </div>

      <div className="shop-content">
        <div className="container">
          <div className="shop-layout">
            {/* Sidebar filters */}
            <aside className="shop-sidebar">
              <div className="filter-header">
                <h2 className="filter-title">Filters</h2>
                <button className="clear-filters" onClick={clearFilters}>Clear All</button>
              </div>

              {/* Brand filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Brand</h3>
                <div className="filter-options">
                  {brands.map(brand => (
                    <label key={brand} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleFilterChange('brands', brand)}
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Gender</h3>
                <div className="filter-options">
                  {['men', 'women', 'unisex'].map(gender => (
                    <label key={gender} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.gender.includes(gender)}
                        onChange={() => handleFilterChange('gender', gender)}
                      />
                      <span>{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shape filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Shape</h3>
                <div className="filter-options">
                  {['aviator', 'wayfarer', 'cat-eye', 'round', 'rectangular', 'square', 'oversized', 'butterfly', 'sport'].map(shape => (
                    <label key={shape} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.shape.includes(shape)}
                        onChange={() => handleFilterChange('shape', shape)}
                      />
                      <span>{shape.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Price Range</h3>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    className="price-slider"
                  />
                  <div className="price-labels">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products grid */}
            <div className="shop-main">
              <div className="shop-controls">
                <div className="sort-control">
                  <label htmlFor="sort">Sort by:</label>
                  <select 
                    id="sort" 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name: A-Z</option>
                  </select>
                </div>
              </div>

              <div className="products-grid">
                {filteredProducts.map(product => (
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

              {filteredProducts.length === 0 && (
                <div className="no-results">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters to see more products.</p>
                  <button onClick={clearFilters} className="reset-btn">Reset Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
