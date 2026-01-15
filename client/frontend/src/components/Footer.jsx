import React from 'react';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <ul>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press Releases</a></li>
                        <li><a href="#">Amazon Science</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Connect with Us</h3>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Make Money with Us</h3>
                    <ul>
                        <li><a href="#">Sell on Amazon</a></li>
                        <li><a href="#">Protect Your Brand</a></li>
                        <li><a href="#">Amazon Global Selling</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Let Us Help You</h3>
                    <ul>
                        <li><a href="#">Your Account</a></li>
                        <li><a href="#">Returns Centre</a></li>
                        <li><a href="#">100% Purchase Protection</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Ecommerce Website. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
