import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    // Load orders for current user
    useEffect(() => {
        if (user) {
            const userOrdersKey = `orders_${user.username}`;
            const savedOrders = localStorage.getItem(userOrdersKey);
            setOrders(savedOrders ? JSON.parse(savedOrders) : []);
        } else {
            // Clear orders when no user is logged in
            setOrders([]);
        }
    }, [user]);

    // Save orders whenever they change
    useEffect(() => {
        if (user) {
            const userOrdersKey = `orders_${user.username}`;
            localStorage.setItem(userOrdersKey, JSON.stringify(orders));
        }
    }, [orders, user]);

    const createOrder = (cartItems, total) => {
        if (!user) {
            alert('Please login to place an order');
            return null;
        }

        const newOrder = {
            id: Date.now().toString(),
            items: cartItems,
            total: total,
            date: new Date().toISOString(),
            status: 'Processing',
            deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            username: user.username, // Associate order with user
        };

        setOrders(prevOrders => [newOrder, ...prevOrders]);
        return newOrder;
    };

    const getOrderById = (orderId) => {
        return orders.find(order => order.id === orderId);
    };

    const getAllOrders = () => {
        return orders;
    };

    const value = {
        orders,
        createOrder,
        getOrderById,
        getAllOrders,
    };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
