import React, { useState, useEffect } from 'react';

const Hero = () => {
    const banners = [
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ];

    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const categories = [
        { name: 'Fashion', icon: '👗' },
        { name: 'Electronics', icon: '📱' },
        { name: 'Bags', icon: '👜' },
        { name: 'Footwear', icon: '👟' },
        { name: 'Groceries', icon: '🥦' },
        { name: 'Beauty', icon: '💄' },
        { name: 'Wellness', icon: '🧘' },
        { name: 'Jewellery', icon: '💎' }
    ];

    return (
        <div className="hero-container">
            {/* Banner Slider */}
            <div className="hero-slider">
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentBanner ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${banner})` }}
                    >
                        <div className="slide-content">
                            <h1>Desi Days Are Back!</h1>
                            <p>Get up to 80% off on top brands.</p>
                            <button className="cta-button">Shop Now</button>
                        </div>
                    </div>
                ))}
                <button className="prev-slide" onClick={() => setCurrentBanner((curr) => (curr - 1 + banners.length) % banners.length)}>&#10094;</button>
                <button className="next-slide" onClick={() => setCurrentBanner((curr) => (curr + 1) % banners.length)}>&#10095;</button>
            </div>

            {/* Featured Categories */}
            <div className="featured-categories">
                <h2>Featured Categories</h2>
                <div className="categories-grid">
                    {categories.map((cat, index) => (
                        <div key={index} className="category-item">
                            <div className="category-icon">{cat.icon}</div>
                            <span>{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
