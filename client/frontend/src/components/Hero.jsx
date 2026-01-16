import React, { useState, useEffect } from 'react';


const Hero = ({ setActiveCategory }) => {
    const banners = [
        "https://i.pinimg.com/736x/cb/35/d8/cb35d84391109bdd2a010f06c237627c.jpg",
        "https://i.pinimg.com/1200x/97/53/f3/9753f3546c9981b7f540df80ae5c7567.jpg",
        "https://i.pinimg.com/1200x/f7/32/29/f73229e6a2c47afc83c374afda9edbd5.jpg"
    ];

    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const categories = [
        { name: 'Fashion', icon: <img src="/brand.png" alt="Fashion" className="w-10 h-10 object-contain" /> },
        { name: 'Electronics', icon: <img src="/electronics.png" alt="Electronics" className="w-10 h-10 object-contain" /> },
        { name: 'Bags', icon: <img src="/school-bag.png" alt="Bags" className="w-10 h-10 object-contain" /> },
        { name: 'Footwear', icon: <img src="/footwear.png" alt="Footwear" className="w-10 h-10 object-contain" /> },
        { name: 'Groceries', icon: <img src="/basket.png" alt="Groceries" className="w-10 h-10 object-contain" /> },
        { name: 'Beauty', icon: <img src="/beauty-product.png" alt="Beauty" className="w-10 h-10 object-contain" /> },
        { name: 'Medicine', icon: <img src="/medicine.png" alt="Medicine" className="w-10 h-10 object-contain" /> },
        { name: 'Jewellery', icon: <img src="/jewelry.png" alt="Jewellery" className="w-10 h-10 object-contain" /> }
    ];

    return (
        <>
            <div className="hero-container">
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

                <div className="featured-categories">
                    <div className="section-title !text-[30px] !mb-2 !font-bold !text-black">Featured Categories</div>
                    <div className="categories-grid">
                        {categories.map((cat, index) => (
                            <div
                                key={index}
                                className="category-item"
                                onClick={() => {
                                    setActiveCategory(cat.name);
                                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="category-icon">{cat.icon}</div>
                                <span>{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </>
    );
};

export default Hero;
