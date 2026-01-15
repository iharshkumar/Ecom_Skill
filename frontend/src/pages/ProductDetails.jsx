import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, ArrowLeftRight, ArrowLeft } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { showSuccess } = useToast();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Backend API URL
        fetch(`${import.meta.env.VITE_API_URL || 'https://ecom-skill-2.onrender.com'}/products`)
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p._id === id);
                if (found) {
                    setProduct(found);
                    setActiveImage(found.image);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-white text-lg">
            Product not found.
        </div>
    );

    const handleAddToCart = () => {
        if (!selectedSize && product.sizes?.length > 0) {
            alert('Please select a size');
            return;
        }
        addToCart({ ...product, selectedSize }, quantity);
        showSuccess('Added to cart!');
    };

    return (
        <div className="bg-white min-h-screen font-sans text-[#212121]">
            <div className="!px-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Breadcrumb / Back */}
                <button
                    onClick={() => navigate('/')}
                    className="!p-4 !mb-6 !mt-4 
             !flex !items-center !text-sm 
             !text-gray-600 hover:!text-black
             !bg-gray-100 hover:!bg-gray-200
             !rounded-full !transition-all"
                >
                    <ArrowLeft size={18} className="!mr-2" />
                    Back to products
                </button>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Gallery */}
                    <div className="w-full lg:w-3/5 flex gap-4">
                        {/* Vertical Thumbnails */}
                        <div className="hidden md:flex flex-col gap-4 w-24 flex-shrink-0">
                            {product.images && product.images.length > 0 ? (
                                <>
                                    <div
                                        onClick={() => setActiveImage(product.image)}
                                        className={`w-full aspect-[3/4] cursor-pointer border rounded-sm overflow-hidden transition-all ${activeImage === product.image ? 'border-black ring-1 ring-black' : 'border-gray-200 hover:border-gray-400'}`}
                                    >
                                        <img src={product.image} className="w-full h-full object-cover" alt="thumb-main" />
                                    </div>
                                    {product.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={`w-full aspect-[3/4] cursor-pointer border rounded-sm overflow-hidden transition-all ${activeImage === img ? 'border-black ring-1 ring-black' : 'border-gray-200 hover:border-gray-400'}`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" alt={`thumb-${idx}`} />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="w-full aspect-[3/4] border border-gray-200 rounded-sm bg-gray-50" />
                            )}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 relative bg-gray-50 rounded-sm overflow-hidden aspect-[3/4] lg:aspect-auto lg:h-[800px]">
                            <img
                                src={activeImage}
                                alt={product.title}
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Mobile Thumbnails Overlay (optional, or just hide vertical on mobile and show horizontal below) */}
                        </div>
                    </div>

                    {/* Right Column: Info */}
                    <div className="w-full lg:w-2/5 flex flex-col !pt-2">
                        {/* Bestseller Tag */}
                        <div className="mb-4">
                            <span className="text-blue-600 font-bold text-xs tracking-wider uppercase bg-blue-50 px-2 py-1 rounded-sm">
                                Bestseller
                            </span>
                        </div>

                        {/* Brand & Title */}
                        <div className="!mb-2">
                            <h2 className="text-2xl font-bold tracking-tight !text-red-500 mb-1 uppercase">
                                {product.brand || 'BRAND NAME'}
                            </h2>
                            <h1 className="text-lg !text-black font-normal">
                                {product.title}
                            </h1>
                        </div>

                        {/* Price */}
                        <div className="!mt-3 !mb-3 !border-b !border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-bold text-gray-900">₹{Number(product.price).toLocaleString()}</span>
                                {product.originalPrice > product.price && (
                                    <>
                                        <span className="text-green-600 font-bold text-lg">
                                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                {product.originalPrice > product.price && (
                                    <span className="line-through">MRP ₹{Number(product.originalPrice).toLocaleString()}</span>
                                )}
                                <span>Inclusive of all taxes</span>
                            </div>
                        </div>

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="!mt-3 !mb-5 !whitespace-nowrap">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-sm font-bold text-gray-900">Select Size</h3>
                                    <button className="text-pink-600 text-sm font-semibold hover:text-pink-700">
                                        Size Guide
                                    </button>
                                </div>
                                <div className=" !mt-2 flex flex-wrap gap-3  !whitespace-nowrap">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all border ${selectedSize === size
                                                ? 'border-black bg-white ring-1 ring-black text-black'
                                                : 'border-gray-200 text-gray-600 hover:border-gray-400'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4 !mt-4 !mb-8">
                            <button className="!px-2 !py-2 flex-1 h-12 flex items-center justify-center gap-2 !border !border-black !rounded-sm font-bold text-black hover:bg-gray-50 transition-colors uppercase tracking-wide text-sm">
                                <Heart size={20} />
                                Add to Wishlist
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="!px-2 !py-2 flex-1 h-12 flex items-center justify-center gap-2 !bg-black !text-white !rounded-sm font-bold hover:!bg-red-500 !transition-colors uppercase tracking-wide text-sm"
                            >
                                <ShoppingCart size={20} />
                                Add to Bag
                            </button>
                        </div>

                        {/* Delivery / Info (Minimal) */}
                        <div className="!pr-0 !py-3 !border-t !border-gray-100">
                            <div className="flex gap-3">
                                <Plus size={20} className="text-gray-400" />
                                <div className="flex flex-col gap-2 !pr-0 !pl-0 !pt-0 !pb-0 !mt-0 !mb-0 ">
                                    <h4 className="font-bold text-sm">Product Description</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {product.description || "No description available for this product."}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
