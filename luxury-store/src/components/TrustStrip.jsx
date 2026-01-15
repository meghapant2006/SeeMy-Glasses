import './TrustStrip.css';

function TrustStrip() {
  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
          <line x1="1" y1="1" x2="1" y2="1"></line>
          <path d="M23 3v6h-6"></path>
        </svg>
      ),
      title: 'Free Shipping',
      description: 'On All Orders'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      title: 'Over 350 Designer Styles',
      description: 'Premium Collection'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      ),
      title: 'Secure Online Checkout',
      description: '100% Protected'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      ),
      title: '30 Day Easy Return',
      description: 'Guarantee'
    }
  ];

  return (
    <section className="trust-strip">
      <div className="container">
        <div className="trust-grid">
          {features.map((feature, index) => (
            <div key={index} className="trust-item">
              <div className="trust-icon">{feature.icon}</div>
              <div className="trust-text">
                <h3 className="trust-title">{feature.title}</h3>
                <p className="trust-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustStrip;
