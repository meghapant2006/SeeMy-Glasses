import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import './Categories.css';

function Categories() {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Shop By Category</h2>
          <p className="section-subtitle">Explore our curated collection of premium eyewear</p>
        </div>
        <div className="categories-grid">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/shop/${category.id}`} 
              className="category-card"
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay"></div>
              </div>
              <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <span className="category-btn">Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
