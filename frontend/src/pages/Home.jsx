import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';

const Home = () => {
    return (
        <>
            <Hero />
            <main>
                <Products />
            </main>
        </>
    );
};

export default Home;
