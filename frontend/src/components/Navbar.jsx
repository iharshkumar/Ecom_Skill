import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar bg-gray-800 text-white p-4 rounded-md">
            <div className="navbar-brand ">Ecommerce Website</div>
            <ul className="navbar-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
