import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist for current user
    useEffect(() => {
        if (user) {
            const userWishlistKey = `wishlist_${user.username}`;
            const savedWishlist = localStorage.getItem(userWishlistKey);
            if (savedWishlist) {
                try {
                    setWishlist(JSON.parse(savedWishlist));
                } catch (error) {
                    console.error('Error loading wishlist:', error);
                    setWishlist([]);
                }
            } else {
                setWishlist([]);
            }
        } else {
            // Clear wishlist when no user is logged in
            setWishlist([]);
        }
    }, [user]);

    // Save wishlist whenever it changes
    useEffect(() => {
        if (user) {
            const userWishlistKey = `wishlist_${user.username}`;
            localStorage.setItem(userWishlistKey, JSON.stringify(wishlist));
        }
    }, [wishlist, user]);

    const addToWishlist = (product) => {
        if (!user) {
            alert('Please login to add items to wishlist');
            return;
        }

        setWishlist(prev => {
            // Check if product already exists
            const exists = prev.find(item => item._id === product._id);
            if (exists) {
                return prev; // Don't add duplicates
            }
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist(prev => prev.filter(item => item._id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId);
    };

    const getWishlistCount = () => {
        return wishlist.length;
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            getWishlistCount,
            clearWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};
