import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { showSuccess } = useToast();
    const navigate = useNavigate();

    const handleRemoveFromWishlist = (productId) => {
        removeFromWishlist(productId);
        showSuccess('Removed from wishlist');
    };

    const handleMoveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product._id);
        showSuccess('Moved to cart!');
    };

    if (wishlist.length === 0) {
        return (
            <div className="wishlist-empty">
                <div className="empty-state">
                    <div className="empty-icon">❤️</div>
                    <h2>Your Wishlist is Empty</h2>
                    <p>Add items you love to your wishlist. Review them anytime and easily move them to cart.</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/')}
                    >
                        Add To Wishlist
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-container">
            <div className="wishlist-header">
                <h1>My Wishlist</h1>
                <p>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
            </div>

            <div className="wishlist-grid">
                {wishlist.map(product => (
                    <div key={product._id} className="wishlist-card">
                        <button
                            className="remove-wishlist-btn"
                            onClick={() => handleRemoveFromWishlist(product._id)}
                            aria-label="Remove from wishlist"
                        >
                            ×
                        </button>

                        <img
                            src={product.image}
                            alt={product.title}
                            className="wishlist-image"
                        />

                        <div className="wishlist-info">
                            <h3>{product.title}</h3>

                            <div className="wishlist-rating">
                                <span>{product.rating?.rate} ★</span>
                                <span className="rating-count">({product.rating?.count})</span>
                            </div>

                            <div className="wishlist-price-row">
                                <span className="wishlist-price">₹{product.price}</span>
                                <span className="wishlist-price-old">₹{(product.price * 1.2).toFixed(2)}</span>
                                <span className="wishlist-discount">20% off</span>
                            </div>

                            <div className="wishlist-actions">
                                <button
                                    className="btn-move-to-cart"
                                    onClick={() => handleMoveToCart(product)}
                                >
                                    🛒 Move to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
