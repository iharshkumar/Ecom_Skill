import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { getCartCount } = useCart();
    const { user, logout } = useAuth();
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span className="brand-logo">Desi</span>Cart
                </div>

                <div className="navbar-search">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for products, brands and more"
                    />
                    <button className="search-btn">
                        Search
                    </button>
                </div>

                <ul className="navbar-links">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <span className="nav-icon">🏠</span>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/orders" className="nav-link">
                            <span className="nav-icon">📦</span>
                            <span>Orders</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">
                            <span className="nav-icon">🛒</span>
                            <span>Cart</span>
                            {getCartCount() > 0 && (
                                <span className="cart-badge" style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '2px 6px',
                                    fontSize: '0.8em',
                                    marginLeft: '5px',
                                    verticalAlign: 'top'
                                }}>
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                    </li>
                    <li className="nav-item">
                        {user ? (
                            <div className="nav-link" onClick={logout} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span className="nav-icon">👤</span>
                                <span>Logout ({user.username})</span>
                            </div>
                        ) : (
                            <Link to="/login" className="nav-link">
                                <span className="nav-icon">👤</span>
                                <span>Login</span>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
