import React from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';

const DeleteModal = ({ product, isOpen, onClose, onConfirm }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <AlertTriangle className="text-red-500" size={20} />
                        Delete Product
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <p className="text-slate-600 mb-6">
                        Are you sure you want to delete this product? This action cannot be undone.
                    </p>

                    {/* Product Details Card */}
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-16 h-16 rounded-lg object-cover border border-slate-200 bg-white"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 truncate" title={product.title}>
                                {product.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                                    {product.category || 'General'}
                                </span>
                                <span className="text-sm font-bold text-slate-700">
                                    ₹{product.price}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all focus:ring-2 focus:ring-slate-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onConfirm(product._id)}
                            className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 focus:ring-2 focus:ring-red-200"
                        >
                            <Trash2 size={18} />
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
