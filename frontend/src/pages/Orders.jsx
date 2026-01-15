import React from 'react';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const { orders } = useOrders();
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing':
                return '#f59e0b';
            case 'Shipped':
                return '#3b82f6';
            case 'Delivered':
                return '#10b981';
            case 'Cancelled':
                return '#ef4444';
            default:
                return '#64748b';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (orders.length === 0) {
        return (
            <div className="orders-page">
                <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h1>No Orders Yet</h1>
                    <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
                    <button
                        className="!btn checkout-btn"
                        onClick={() => navigate('/')}
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="orders-header">
                <h1>My Orders</h1>
                <p>{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
            </div>

            <div className="orders-list">
                {orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-header-section">
                            <div className="order-info-group">
                                <div className="order-info-item">
                                    <span className="order-label">Order ID</span>
                                    <span className="order-value">#{order.id}</span>
                                </div>
                                <div className="order-info-item">
                                    <span className="order-label">Order Date</span>
                                    <span className="order-value">{formatDate(order.date)}</span>
                                </div>
                                <div className="order-info-item">
                                    <span className="order-label">Total Amount</span>
                                    <span className="order-value order-total">₹{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                                {order.status}
                            </div>
                        </div>

                        <div className="order-items">
                            {order.items.map((item, index) => (
                                <div key={index} className="order-item">
                                    <img src={item.image} alt={item.title} />
                                    <div className="order-item-details">
                                        <h4>{item.title}</h4>
                                        <p>Quantity: {item.quantity}</p>
                                        <p className="order-item-price">₹{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-footer">
                            <div className="delivery-info">
                                <span className="delivery-icon">🚚</span>
                                <span>Expected Delivery: {formatDate(order.deliveryDate)}</span>
                            </div>
                            <button
                                className="btn btn-primary hover:!bg-red-500 !rounded-full"
                                onClick={() => navigate(`/track-order/${order.id}`)}
                            >
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;

