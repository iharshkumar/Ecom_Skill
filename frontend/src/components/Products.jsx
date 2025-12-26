import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { showSuccess } = useToast();

    useEffect(() => {
        const apiUrl = `${import.meta.env.VITE_API_URL || 'https://ecom-skill-2.onrender.com'}/products`;
        console.log("Fetching from:", apiUrl);
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Failed to load products');
                setLoading(false);
            });
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        // Optional: Show a toast or notification
        // Redirect to cart page
        navigate('/cart');
    };

    const handleToggleWishlist = (product, e) => {
        e.stopPropagation(); // Prevent card click

        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
            showSuccess('Removed from wishlist');
        } else {
            addToWishlist(product);
            showSuccess('Added to wishlist! ❤️');
        }
    };

    if (loading) return <div className="loading">Loading products...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="products-container">
            <h2>Our Products</h2>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <button
                            className={`wishlist-heart-btn ${isInWishlist(product._id) ? 'active' : ''}`}
                            onClick={(e) => handleToggleWishlist(product, e)}
                            aria-label={isInWishlist(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            {isInWishlist(product._id) ? '❤️' : '🤍'}
                        </button>

                        <img src={product.image} alt={product.title} className="product-image" />
                        <div className="product-info">
                            <h3>{product.title}</h3>

                            <div className="rating">
                                <span>{product.rating?.rate} ★</span>
                            </div>
                            <span className="rating-count">({product.rating?.count})</span>

                            <div className="price-row">
                                <span className="price">₹{product.price}</span>

                                {/* Simulating a discount for visual appeal */}

                                <span className="price-old">₹{(product.price * 1.2).toFixed(2)}</span>
                                <span className="discount">20% off</span>
                            </div>

                            <button
                                className="add-to-cart"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
