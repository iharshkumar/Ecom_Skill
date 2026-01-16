import React, { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ toast }) => {
    const { removeToast } = useToast();
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);

    const duration = 3000; // Match with context timeout if possible, or independent

    useEffect(() => {
        const startTime = Date.now();
        const endTime = startTime + duration;

        const timer = setInterval(() => {
            const now = Date.now();
            const remaining = Math.max(0, endTime - now);
            const percentage = (remaining / duration) * 100;
            setProgress(percentage);

            if (remaining <= 0) {
                clearInterval(timer);
                handleClose();
            }
        }, 10);

        return () => clearInterval(timer);
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            removeToast(toast.id);
        }, 300); // Wait for exit animation
    };

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle className="w-50 h-50 text-green-500" />;
            case 'error':
                return <XCircle className="w-50 h-50 text-red-500" />;
            case 'warning':
                return <AlertTriangle className="w-50 h-50 text-yellow-500" />;
            case 'info':
            default:
                return <Info className="w-50 h-50 text-blue-500" />;
        }
    };

    const getTitle = () => {
        switch (toast.type) {
            case 'success': return 'Success!';
            case 'error': return 'Error';
            case 'warning': return 'Warning';
            case 'info': return 'Info';
            default: return 'Notification';
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center pointer-events-none z-[100] transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

            {/* Popup Card */}
            <div className={`
                relative 
                !pointer-events-auto
                !bg-white/95 !backdrop-blur-xl 
                !border-2 !border-white/50
                !shadow-[0_8px_32px_rgba(0,0,0,0.50)]
                !rounded-xl
                !p-8 
                max-w-md w-full 
                !mx-4
                transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
                ${isExiting ? 'scale-90 opacity-0 !translate-y-4' : 'scale-100 opacity-100 !translate-y-0'}
            `}>
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 !p-2 !rounded-full !hover:bg-gray-100 !text-gray-400 !hover:text-gray-600 !transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="!mb-4 !p-3 !bg-gray-50 !rounded-full !shadow-inner">
                        {getIcon()}
                    </div>

                    <h3 className="!text-2xl !font-bold !text-gray-900 !mb-2">
                        {getTitle()}
                    </h3>

                    {/* Content Area */}
                    <div className="!text-gray-600 !mb-6 !w-full">
                        {typeof toast.message === 'string' ? (
                            <p>{toast.message}</p>
                        ) : (
                            toast.message
                        )}
                    </div>

                    {/* Action / Progress */}
                    <div className="!w-full !h-1 !bg-gray-100 !rounded-full !overflow-hidden">
                        <div
                            className={`!h-full !transition-all !duration-100 ease-linear ${toast.type === 'error' ? 'bg-red-500' :
                                toast.type === 'warning' ? 'bg-yellow-500' :
                                    toast.type === 'info' ? 'bg-blue-500' :
                                        'bg-green-500'
                                }`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToastContainer = () => {
    const { toasts } = useToast();

    // Only show the latest toast to avoid stacking popups
    const latestToast = toasts[toasts.length - 1];

    if (!latestToast) return null;

    return (
        <Toast key={latestToast.id} toast={latestToast} />
    );
};

export default ToastContainer;
