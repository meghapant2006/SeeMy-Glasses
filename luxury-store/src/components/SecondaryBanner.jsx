import { Link } from 'react-router-dom';
import './SecondaryBanner.css';

function SecondaryBanner() {
  return (
    <section className="secondary-banner">
      <div className="banner-content-wrapper">
        <div className="banner-image-section">
          <img 
            src="/Four_fashion.png" 
            alt="Luxury lifestyle" 
          />
        </div>
        <div className="banner-text-section">
          <h2 className="banner-heading">Elevate Your Look</h2>
          <p className="banner-description">
            Experience the perfect blend of style and sophistication with our 
            handpicked collection of designer eyewear. Each piece is crafted 
            with precision and attention to detail, ensuring you make a lasting impression.
          </p>
          <Link to="/about" className="banner-cta">Learn More</Link>
        </div>
      </div>
    </section>
  );
}

export default SecondaryBanner;
