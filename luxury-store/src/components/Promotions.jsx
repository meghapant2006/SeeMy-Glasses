import { promotions } from '../data/products';
import './Promotions.css';

function Promotions() {
  return (
    <section className="promotions-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Special Offers</h2>
          <p className="section-subtitle">Limited time savings on luxury eyewear</p>
        </div>
        <div className="promotions-grid">
          {promotions.map(promo => (
            <div 
              key={promo.id} 
              className="promo-card"
              style={{ background: promo.bgColor }}
            >
              <h3 className="promo-title">{promo.title}</h3>
              <p className="promo-description">{promo.description}</p>
              <button className="promo-btn">Shop Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Promotions;
