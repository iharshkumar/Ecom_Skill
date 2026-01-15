import React, { useEffect, useState } from 'react';
import { Star, Trash2, Edit, Filter, Download, MoreHorizontal } from 'lucide-react';

import DeleteModal from './DeleteModal';

const ProductList = ({ setActiveTab, setEditingProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const fetchProducts = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL || 'https://ecom-skill-1.onrender.com'}/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const initiateDelete = (product) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
    };

    const confirmDelete = (id) => {
        fetch(`${import.meta.env.VITE_API_URL || 'https://ecom-skill-1.onrender.com'}/products/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    setProducts(products.filter(product => product._id !== id));
                    setDeleteModalOpen(false);
                    setProductToDelete(null);
                } else {
                    alert('Failed to delete product');
                }
            })
            .catch(err => console.error(err));
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading products database...</div>;

    return (
        <div className="space-y-6">
            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                product={productToDelete}
            />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Products Inventory</h1>
                    <p className="text-slate-500 mt-1">Manage your store catalog and stock.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchProducts} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        <Filter size={18} /> <span className="hidden sm:inline">Filters</span>
                    </button>
                    <button onClick={() => setActiveTab('add-product')} className="px-4 py-2 bg-black text-white font-medium rounded-lg hover:!bg-red-500 transition-colors shadow-sm">
                        + Add Product
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Product Name</th>
                                <th className="px-6 py-4 font-semibold">SKU</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Rating</th>
                                <th className="px-6 py-4 font-semibold">Stock Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={product.image} className="w-12 h-12 rounded-lg object-cover border border-slate-200" alt="" />
                                            <div>
                                                <div className="font-semibold text-slate-900 line-clamp-1 max-w-[200px]">{product.title}</div>
                                                <div className="text-xs text-slate-500 capitalize">{product.category || 'General'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                                        SKU-{product._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">₹{product.price}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="fill-amber-400 text-amber-400" />
                                            <span className="font-medium text-slate-700">{product.rating?.rate}</span>
                                            <span className="text-xs text-slate-400">({product.rating?.count})</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${product.rating?.count > 0
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${product.rating?.count > 0 ? 'bg-green-600' : 'bg-red-600'
                                                }`}></span>
                                            {product.rating?.count > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                    setActiveTab('edit-product');
                                                }}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-primary-light rounded-lg transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => initiateDelete(product)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400">No products found. Start adding some!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
