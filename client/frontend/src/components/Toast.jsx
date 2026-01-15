import React, { useEffect } from 'react';
import { useToast } from '../context/ToastContext';

const Toast = ({ toast }) => {
    const { removeToast } = useToast();

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            case 'info':
            default:
                return 'ℹ';
        }
    };

    return (
        <div className={`toast toast-${toast.type}`}>
            <div className="toast-icon">{getIcon()}</div>
            <div className="toast-message">{toast.message}</div>
            <button
                className="toast-close"
                onClick={() => removeToast(toast.id)}
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    );
};

const ToastContainer = () => {
    const { toasts } = useToast();

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} />
            ))}
        </div>
    );
};

export default ToastContainer;
