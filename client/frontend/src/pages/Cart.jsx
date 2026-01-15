import React from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const { createOrder } = useOrders();
    const { showSuccess } = useToast();
    const navigate = useNavigate();

    const handleCheckout = () => {
        const total = getCartTotal();
        const order = createOrder(cartItems, total);
        clearCart();
        showSuccess('Order placed successfully! 🎉');
        navigate('/order-success', { state: { orderId: order.id } });
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="empty-state">
                    <div className="empty-icon">🛒</div>
                    <div className="text-[30px] font-bold">Your Cart is Empty</div>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/">
                        <button className="btn btn-primary checkout-btn">
                            Start Shopping
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            <div className="cart-container">
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img src={item.image} alt={item.title} />
                            <div className="item-details">
                                <h3>{item.title}</h3>
                                <p>Price: ₹{item.price}</p>
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    style={{ color: 'red' }}
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="item-total">
                                ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div>
                        <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                        <span>₹{getCartTotal().toFixed(2)}</span>
                    </div>
                    <div style={{ color: 'var(--success)' }}>
                        <span>Discount</span>
                        <span>-₹0.00</span>
                    </div>
                    <hr />
                    <div style={{ fontSize: 'var(--text-xl)', fontWeight: '700' }}>
                        <span>Total</span>
                        <span>₹{getCartTotal().toFixed(2)}</span>
                    </div>
                    <button onClick={handleCheckout} className='btn btn-primary hover:!bg-red-500'>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
