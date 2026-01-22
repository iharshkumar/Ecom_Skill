import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import Products from '../components/Products';
import AdsBannerSlider from '../components/AdsBannerSlider';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState("General");
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    useEffect(() => {
        if (searchQuery) {
            setActiveCategory("All");
        }
    }, [searchQuery]);

    return (
        <>
            <Hero setActiveCategory={setActiveCategory} />
            <main className="w-full max-w-[1300px] mx-auto px-4">
                <Products activeCategory={activeCategory} searchQuery={searchQuery} />
            </main>
            <main className="w-full max-w-[1300px] mx-auto px-4">
                <AdsBannerSlider items={4} />
            </main>


        </>
    );
};

export default Home;
