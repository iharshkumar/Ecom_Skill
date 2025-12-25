import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-page" style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Your Cart</h1>
                <p>Your cart is currently empty.</p>
                <Link to="/" style={{ color: '#2874f0', textDecoration: 'none' }}>
                    <button className="checkout-btn" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#2874f0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Start Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Shopping Cart</h1>
            <div className="cart-container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item._id} className="cart-item" style={{ display: 'flex', border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '4px' }}>
                            <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'contain', marginRight: '20px' }} />
                            <div className="item-details" style={{ flex: 1 }}>
                                <h3>{item.title}</h3>
                                <p style={{ color: '#888', margin: '5px 0' }}>Price: ${item.price}</p>
                                <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}
                                    >
                                        -
                                    </button>
                                    <span style={{ margin: '0 15px', fontWeight: 'bold' }}>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="item-total" style={{ fontWeight: 'bold' }}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px', height: 'fit-content' }}>
                    <h2>Order Summary</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                        <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', color: 'green' }}>
                        <span>Discount</span>
                        <span>-$0.00</span>
                    </div>
                    <hr style={{ margin: '15px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2em', fontWeight: 'bold' }}>
                        <span>Total</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <button style={{ width: '100%', padding: '15px', backgroundColor: '#fb641b', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.1em', marginTop: '20px', cursor: 'pointer' }}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
