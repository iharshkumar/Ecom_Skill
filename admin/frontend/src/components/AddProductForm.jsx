import React, { useState } from 'react';
import { Upload, Save, X, DollarSign, Layers, Tag, FileText, Image as ImageIcon } from 'lucide-react';
import { IndianRupee } from "lucide-react";

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        originalPrice: '',
        image: '',
        rate: 4.5,
        count: 10,
        description: '',
        category: 'General',
        brand: '',
        galleryImages: '',
        sizes: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleSize = (size) => {
        setFormData(prev => {
            const currentSizes = prev.sizes || []; // Handle undefined
            const sizes = currentSizes.includes(size)
                ? currentSizes.filter(s => s !== size)
                : [...currentSizes, size];
            return { ...prev, sizes };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    price: Number(formData.price),
                    originalPrice: formData.originalPrice ? Number(formData.originalPrice) : 0,
                    category: formData.category,
                    brand: formData.brand,
                    image: formData.image,
                    images: formData.galleryImages.split('\n').filter(url => url.trim() !== ''),
                    sizes: formData.sizes,
                    description: formData.description,
                    rating: {
                        rate: Number(formData.rate),
                        count: Number(formData.count)
                    }
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Product published successfully!');
                setFormData({
                    title: '',
                    price: '',
                    image: '',
                    rate: 4.5,
                    count: 10,
                    description: '',
                    category: 'General',
                    brand: '',
                    galleryImages: '',
                    sizes: []
                });
            } else {
                console.error('Error adding product:', data);
                alert(data.message || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Product</h1>
                    <p className="text-slate-500 mt-1">Create a new product card for your store.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        <X size={18} /> Cancel
                    </button>
                    <button onClick={handleSubmit} className="flex items-center gap-2 px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-red-500 transition-colors shadow-sm">
                        <Save size={18} /> Publish Product
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
                {/* Left Column */}
                <div className="col-span-12 lg:col-span-8 space-y-6">

                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="!text-red-500" size={20} />
                            Basic Information
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-1.5">Product Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="e.g. Nike Air Max 270"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-1.5">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Describe your product..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-1.5">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                >
                                    <option>General</option>
                                    <option>Fashion</option>
                                    <option>Electronics</option>
                                    <option>Bags</option>
                                    <option>Footwear</option>
                                    <option>Groceries</option>
                                    <option>Beauty</option>
                                    <option>Wellness</option>
                                    <option>Jewellery</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-1.5">Brand</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="e.g. Nike, Apple, Zara"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ImageIcon className="!text-red-500" size={20} />
                            Product Images
                        </h3>

                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50 hover:bg-indigo-50 hover:border-primary transition-all cursor-pointer group">
                            <div className="mb-4 text-slate-400 group-hover:text-primary transition-colors inline-block">
                                <Upload size={40} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-base font-semibold text-slate-700 mb-1">Click to upload or drag and drop</h4>
                            <p className="text-sm text-slate-500 mb-4">SVG, PNG, JPG or GIF (max. 800x400px)</p>

                            <div className="relative max-w-sm mx-auto">
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="Or paste Image URL here..."
                                    required
                                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                                <div className="absolute left-3 top-2.5 text-slate-400">
                                    <Layers size={16} />
                                </div>
                            </div>
                        </div>

                        {formData.image && (
                            <div className="mt-4 p-3 border border-slate-200 rounded-lg flex items-center gap-4 bg-slate-50">
                                <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <div className="font-medium text-sm text-slate-700">Image Preview</div>
                                    <div className="text-xs text-slate-500 truncate max-w-xs">{formData.image.slice(0, 50)}...</div>
                                </div>
                            </div>
                        )}

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-slate-900 mb-2">Gallery Images (One URL per line)</label>
                            <textarea
                                name="galleryImages"
                                rows="3"
                                value={formData.galleryImages}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Pricing */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <IndianRupee className="!text-red-500" size={20} />
                            Pricing
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-1.5">Base Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-slate-400">₹</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="0.00"
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-1.5">Original Price (MRP)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-slate-400">₹</span>
                                    <input
                                        type="number"
                                        name="originalPrice"
                                        value={formData.originalPrice || ''}
                                        onChange={handleChange}
                                        className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Discount Preview */}
                            {formData.price && formData.originalPrice && Number(formData.originalPrice) > Number(formData.price) && (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-green-800">Discount Applied:</span>
                                        <span className="text-sm font-bold text-green-700">
                                            {Math.round(((Number(formData.originalPrice) - Number(formData.price)) / Number(formData.originalPrice)) * 100)}% OFF
                                        </span>
                                    </div>
                                    <div className="mt-1 text-xs text-green-600">
                                        Customer saves ₹{(Number(formData.originalPrice) - Number(formData.price)).toFixed(2)}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Tag className="!text-red-500" size={20} />
                            Inventory
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-1.5">Stock Count</label>
                                <input
                                    type="number"
                                    name="count"
                                    value={formData.count}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-2">Available Sizes</label>
                                <div className="flex flex-wrap gap-2">
                                    {['S', 'M', 'L', 'XL', 'XXL', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'].map(size => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => toggleSize(size)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${(formData.sizes || []).includes(size)
                                                ? 'bg-black text-white border-primary'
                                                : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-1.5">Rating (0-5)</label>
                                <input
                                    type="number"
                                    name="rate"
                                    value={formData.rate}
                                    onChange={handleChange}
                                    step="0.1"
                                    max="5"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
