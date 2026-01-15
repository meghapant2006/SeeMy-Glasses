import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const { orderId } = useParams();
  const { getOrder } = useOrders();
  const order = getOrder(orderId);

  if (!order) {
    return (
      <div className="order-confirmation-page">
        <div className="container">
          <h2>Order not found</h2>
          <Link to="/" className="home-btn">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p className="confirmation-message">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          <div className="order-info">
            <div className="info-row">
              <span className="label">Order Number:</span>
              <span className="value">{order.orderNumber}</span>
            </div>
            <div className="info-row">
              <span className="label">Date:</span>
              <span className="value">{new Date(order.date).toLocaleDateString()}</span>
            </div>
            <div className="info-row">
              <span className="label">Total:</span>
              <span className="value total-amount">${order.total.toFixed(2)}</span>
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span className="value status">{order.status}</span>
            </div>
          </div>

          <div className="order-items">
            <h3>Order Items</h3>
            {order.items.map(item => (
              <div key={item.id} className="confirmation-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="shipping-info">
            <h3>Shipping Address</h3>
            <p>{order.shipping.fullName}</p>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
            <p>{order.shipping.phone}</p>
          </div>

          <div className="action-buttons">
            <Link to="/orders" className="view-orders-btn">View All Orders</Link>
            <Link to="/shop/all" className="continue-shopping-btn">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
