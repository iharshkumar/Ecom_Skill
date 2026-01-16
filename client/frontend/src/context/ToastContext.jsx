import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        const newToast = { id, message, type };

        setToasts(prev => [...prev, newToast]);

        // Auto-dismiss after 4 seconds (allows for 3s display + animation)
        setTimeout(() => {
            removeToast(id);
        }, 4000);

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showSuccess = useCallback((message) => {
        return addToast(message, 'success');
    }, [addToast]);

    const showError = useCallback((message) => {
        return addToast(message, 'error');
    }, [addToast]);

    const showWarning = useCallback((message) => {
        return addToast(message, 'warning');
    }, [addToast]);

    const showInfo = useCallback((message) => {
        return addToast(message, 'info');
    }, [addToast]);

    return (
        <ToastContext.Provider value={{
            toasts,
            addToast,
            removeToast,
            showSuccess,
            showError,
            showWarning,
            showInfo
        }}>
            {children}
        </ToastContext.Provider>
    );
};
