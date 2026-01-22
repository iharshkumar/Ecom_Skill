import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const { getWishlistCount } = useWishlist();
    const { user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (mobileMenuOpen && !e.target.closest('.navbar-links') && !e.target.closest('.mobile-menu-toggle')) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [mobileMenuOpen]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="brand-content">
                        <div className="brand-name">DesiCart</div>
                        <div className="brand-tagline">Explore <span className="tagline-plus">Desi</span> ✨</div>
                    </div>
                </Link>

                <div className="navbar-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const query = e.target.search.value.trim();
                        if (query) {
                            navigate(`/?search=${encodeURIComponent(query)}`);
                        }
                    }} className="search-form" style={{ display: 'flex', width: '100%' }}>
                        <input
                            type="text"
                            name="search"
                            className="search-input"
                            placeholder="Search for products, brands and more"
                        />
                        <button type="submit" className="search-btn !p-[10px] !rounded-md">
                            Search
                        </button>
                    </form>
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                            <span className="nav-icon">🏠</span>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/orders" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                            <span className="nav-icon">📦</span>
                            <span>Orders</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/wishlist" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                            <span className="nav-icon">❤️</span>
                            <span>Wishlist</span>
                            {getWishlistCount() > 0 && (
                                <span className="cart-badge" style={{
                                    backgroundColor: '#ff4081'
                                }}>
                                    {getWishlistCount()}
                                </span>
                            )}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                            <span className="nav-icon">🛒</span>
                            <span>Cart</span>
                            {getCartCount() > 0 && (
                                <span className="cart-badge">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                    </li>
                    <li className="nav-item">
                        {user ? (
                            <Link to="/profile" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                                <span className="nav-icon">👤</span>
                                <span>{user.username}</span>
                            </Link>
                        ) : (
                            <Link to="/login" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
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
