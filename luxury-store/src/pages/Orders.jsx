import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import './Orders.css';

function Orders() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="container">
          <h1>My Orders</h1>
          <div className="empty-orders">
            <h2>No orders yet</h2>
            <p>Start shopping to create your first order</p>
            <Link to="/shop/all" className="shop-btn">Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return '#f39c12';
      case 'shipped':
        return '#3498db';
      case 'delivered':
        return '#27ae60';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#7fa959';
    }
  };

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order {order.orderNumber}</h3>
                  <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.status}
                </div>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="item-brand">{item.brand}</p>
                    </div>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Total:</span>
                  <span className="total-amount">${order.total.toFixed(2)}</span>
                </div>
                <Link to={`/order-confirmation/${order.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
