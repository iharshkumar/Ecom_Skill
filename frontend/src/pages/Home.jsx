import React, { useState } from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import AdsBannerSlider from '../components/AdsBannerSlider';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState("General");

    return (
        <>
            <Hero setActiveCategory={setActiveCategory} />
            <main className="w-full max-w-[1300px] mx-auto px-4">
                <Products activeCategory={activeCategory} />
            </main>
            <main className="w-full max-w-[1300px] mx-auto px-4">
                <AdsBannerSlider items={4} />
            </main>


        </>
    );
};

export default Home;
