import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { getOrderById } = useOrders();

    const orderId = location.state?.orderId;
    const order = orderId ? getOrderById(orderId) : null;

    useEffect(() => {
        if (!orderId || !order) {
            navigate('/orders');
        }
    }, [orderId, order, navigate]);

    if (!order) {
        return null;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="order-success-page">
            <div className="success-container">
                <div className="success-icon">
                    <div className="checkmark-circle">
                        <div className="checkmark">✓</div>
                    </div>
                </div>

                <h1>Order Placed Successfully! 🎉</h1>
                <p className="success-message">
                    Thank you for your order. We've received your order and will process it shortly.
                </p>

                <div className="order-details-card">
                    <div className="order-detail-header">
                        <h2>Order Details</h2>
                        <span className="order-id">Order ID: #{order.id}</span>
                    </div>

                    <div className="order-summary-section">
                        <div className="summary-row">
                            <span className="summary-label">Order Date:</span>
                            <span className="summary-value">{formatDate(order.date)}</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">Expected Delivery:</span>
                            <span className="summary-value">{formatDate(order.deliveryDate)}</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">Total Items:</span>
                            <span className="summary-value">{order.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                        </div>
                        <div className="summary-row total-row">
                            <span className="summary-label">Total Amount:</span>
                            <span className="summary-value">₹{order.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="ordered-items">
                        <h3>Items Ordered</h3>
                        <div className="items-list">
                            {order.items.map((item, index) => (
                                <div key={index} className="success-item">
                                    <img src={item.image} alt={item.title} />
                                    <div className="success-item-info">
                                        <h4>{item.title}</h4>
                                        <p>Qty: {item.quantity} × ₹{item.price}</p>
                                    </div>
                                    <div className="success-item-total">
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="success-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/orders')}
                    >
                        View All Orders
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
