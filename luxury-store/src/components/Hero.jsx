import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">TIMELESS ELEGANCE</h1>
          <p className="hero-subtitle">Luxury Designer Sunglasses & Eyewear</p>
          <Link to="/shop/all" className="hero-btn">SHOP NOW</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
