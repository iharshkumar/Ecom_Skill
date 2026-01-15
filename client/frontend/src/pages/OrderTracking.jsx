import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const OrderTracking = () => {
    const { orderId } = useParams();
    const { getOrderById } = useOrders();
    const navigate = useNavigate();
    const order = getOrderById(orderId);

    if (!order) {
        return (
            <div className="tracking-page">
                <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h1>Order Not Found</h1>
                    <p>We couldn't find the order you're looking for.</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/orders')}
                    >
                        View All Orders
                    </button>
                </div>
            </div>
        );
    }

    const trackingSteps = [
        {
            id: 1,
            title: 'Order Placed',
            description: 'Your order has been received',
            icon: '📝',
            status: 'completed',
            date: new Date(order.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        },
        {
            id: 2,
            title: 'Order Confirmed',
            description: 'Seller has confirmed your order',
            icon: '✅',
            status: order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'completed' : 'pending',
            date: order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? new Date(new Date(order.date).getTime() + 2 * 60 * 60 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null
        },
        {
            id: 3,
            title: 'Shipped',
            description: 'Your package is on the way',
            icon: '🚚',
            status: order.status === 'Shipped' || order.status === 'Delivered' ? 'completed' : order.status === 'Processing' ? 'active' : 'pending',
            date: order.status === 'Shipped' || order.status === 'Delivered' ? new Date(new Date(order.date).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null
        },
        {
            id: 4,
            title: 'Out for Delivery',
            description: 'Package is out for delivery',
            icon: '🏃',
            status: order.status === 'Delivered' ? 'completed' : order.status === 'Shipped' ? 'active' : 'pending',
            date: order.status === 'Delivered' ? new Date(order.deliveryDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null
        },
        {
            id: 5,
            title: 'Delivered',
            description: 'Package has been delivered',
            icon: '🎉',
            status: order.status === 'Delivered' ? 'completed' : 'pending',
            date: order.status === 'Delivered' ? new Date(order.deliveryDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null
        }
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="tracking-page">
            <div className="tracking-container">
                <div className="tracking-header">
                    <button className="back-btn" onClick={() => navigate('/orders')}>
                        ← Back to Orders
                    </button>
                    <h1>Track Your Order</h1>
                    <p className="order-id-display">Order ID: #{order.id}</p>
                </div>

                <div className="tracking-cards-row">
                    {/* Delivery Map Visualization */}
                    <div className="delivery-map-card">
                        <div className="map-header">
                            <h2>📍 Delivery Route</h2>
                            <span className="eta-badge">ETA: {formatDate(order.deliveryDate)}</span>
                        </div>

                        <div className="map-container">
                            <div className="map-route">
                                <div className="route-point start-point">
                                    <div className="point-marker">🏪</div>
                                    <span className="point-label">Warehouse</span>
                                </div>

                                <div className="route-line">
                                    <div className={`delivery-truck ${order.status === 'Shipped' || order.status === 'Delivered' ? 'moving' : ''}`}>
                                        🚚
                                    </div>
                                </div>

                                <div className="route-point end-point">
                                    <div className="point-marker">🏠</div>
                                    <span className="point-label">Your Location</span>
                                </div>
                            </div>

                            <div className="map-info">
                                <div className="info-item">
                                    <span className="info-icon">📦</span>
                                    <div>
                                        <p className="info-label">Package Status</p>
                                        <p className="info-value">{order.status}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <span className="info-icon">⏱️</span>
                                    <div>
                                        <p className="info-label">Estimated Delivery</p>
                                        <p className="info-value">{formatDate(order.deliveryDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tracking Timeline */}
                    <div className="tracking-timeline-card">
                        <h2>Order Journey</h2>
                        <div className="timeline">
                            {trackingSteps.map((step, index) => (
                                <div key={step.id} className={`timeline-step ${step.status}`}>
                                    <div className="step-indicator">
                                        <div className="step-icon">{step.icon}</div>
                                        {index < trackingSteps.length - 1 && (
                                            <div className={`step-line ${step.status === 'completed' ? 'completed' : ''}`}></div>
                                        )}
                                    </div>
                                    <div className="step-content">
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                        {step.date && <span className="step-date">{step.date}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="tracking-items-card">
                        <h2>Items in this Order</h2>
                        <div className="tracking-items-list">
                            {order.items.map((item, index) => (
                                <div key={index} className="tracking-item">
                                    <img src={item.image} alt={item.title} />
                                    <div className="tracking-item-info">
                                        <h4>{item.title}</h4>
                                        <p>Quantity: {item.quantity}</p>
                                        <p className="item-price">₹{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="tracking-total">
                            <span>Total Amount:</span>
                            <span className="total-amount">₹{order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
