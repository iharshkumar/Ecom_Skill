import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { ArrowRight, Heart, Star, ShoppingCart } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Products = ({ activeCategory, searchQuery }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { showSuccess } = useToast();

    useEffect(() => {
        let apiUrl = `${import.meta.env.VITE_API_URL || ''}/products`;
        if (searchQuery) {
            apiUrl += `?search=${encodeURIComponent(searchQuery)}`;
        }

        console.log("Fetching from:", apiUrl);
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Failed to load products');
                setLoading(false);
            });
    }, [searchQuery, activeCategory]); // Re-fetch when search or category changes (though category logic is client-side for now, re-fetching ensures clean state)

    const handleAddToCart = (product) => {
        addToCart(product);
        showSuccess(
            <div className="flex items-start gap-4 text-left">
                <div className="w-16 h-16 flex-shrink-0 bg-white !py-4 !px-4 !rounded-md border border-gray-100 !p-1">
                    <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                    <p className="!px-10 text-xs font-medium text-green-600 !mb-6">Successfully added to cart!</p>
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1 !mb-1">{product.title}</h4>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                    </div>
                </div>
            </div>
        );
        // navigate('/cart'); // Keep user on page to continue shopping
    };

    const handleToggleWishlist = (product, e) => {
        e.stopPropagation(); // Prevent card click

        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
            showSuccess('Removed from wishlist');
        } else {
            addToWishlist(product);
            showSuccess('Added to wishlist! ❤️');
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading products...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    const filteredProducts = searchQuery
        ? products
        : (activeCategory === "All"
            ? products
            : products.filter(p => (p.category || 'General').toLowerCase() === activeCategory.toLowerCase()));

    return (
        <>
            <div id="products-section" className="!w-[100%] !mb-4">
                <div className="!flex !justify-between !items-end !px-4">
                    <div>
                        <h2 className="!text-3xl !font-bold !text-gray-900 !tracking-tight">
                            {searchQuery ? `Search Results for "${searchQuery}"` : (activeCategory === "All" || activeCategory === "General" ? "Featured Products" : `${activeCategory}`)}
                        </h2>
                        <p className="!text-gray-500 !mt-2 !text-sm">Explore our latest collection</p>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center !py-12 text-gray-500 bg-gray-50 !rounded-lg !mx-4">
                        <p className="text-lg">No products found {searchQuery ? `for "${searchQuery}"` : `in ${activeCategory}`}.</p>
                        <button onClick={() => window.location.reload()} className="!mt-4 text-blue-600 hover:underline">
                            Refresh Page
                        </button>
                    </div>
                ) : (
                    <div className="!w-[100%] !px-4">
                        {Array.from({ length: Math.ceil(filteredProducts.length / 7) }).map((_, chunkIndex) => {
                            const chunkStart = chunkIndex * 7;
                            const chunkEnd = chunkStart + 7;
                            const productChunk = filteredProducts.slice(chunkStart, chunkEnd);

                            return (
                                <div key={`swiper-chunk-${chunkIndex}`} className="!mb-8">
                                    <Swiper
                                        key={`${activeCategory}-chunk-${chunkIndex}`}
                                        modules={[Navigation, Pagination, A11y]}
                                        spaceBetween={17}
                                        slidesPerView={1}
                                        navigation
                                        pagination={{ clickable: true }}
                                        breakpoints={{
                                            640: { slidesPerView: 2, spaceBetween: 17 },
                                            778: { slidesPerView: 3, spaceBetween: 17 },
                                            1024: { slidesPerView: 4, spaceBetween: 17 },
                                            1280: { slidesPerView: 5, spaceBetween: 17 },
                                        }}
                                        className="!mb-2"
                                    >
                                        {productChunk.map(product => (
                                            <SwiperSlide key={product._id} className="!h-auto !flex !justify-center">
                                                <div
                                                    onClick={() => navigate(`/product/${product._id}`)}
                                                    className="!bg-white border !border-gray-100 !rounded-xl overflow-hidden hover:!shadow-lg transition-all duration-300 group cursor-pointer !h-full !flex !flex-col !max-w-[240px] !w-full !mx-auto"
                                                >
                                                    <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                                                        <img
                                                            src={product.image}
                                                            alt={product.title}
                                                            className="!w-full !h-full !object-cover transition-transform duration-700 group-hover:scale-105"
                                                        />
                                                        {product.originalPrice > product.price && (
                                                            <span className="absolute top-2 left-2 bg-red-500 text-white !text-[10px] !font-bold !px-2 !py-1 !rounded-sm uppercase">
                                                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                                            </span>
                                                        )}
                                                        <button
                                                            onClick={(e) => handleToggleWishlist(product, e)}
                                                            className={`absolute top-2 right-2 !p-2 !rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all ${isInWishlist(product._id) ? 'text-red-500' : 'text-gray-600'}`}
                                                        >
                                                            <Heart size={18} className={isInWishlist(product._id) ? "fill-current" : ""} />
                                                        </button>
                                                    </div>

                                                    <div className="!p-4 !flex-1 !flex !flex-col">
                                                        <div className="!text-xs text-red-400 uppercase !font-semibold !mb-1">
                                                            {product.brand || product.category || 'Generic'}
                                                        </div>
                                                        <h3 className="!font-bold text-gray-900 !mb-1 line-clamp-1 group-hover:text-blue-600">
                                                            {product.title}
                                                        </h3>
                                                        <div className="!flex !items-center !gap-1.5 !mb-3">
                                                            <Star size={12} className="text-yellow-400 fill-current" />
                                                            <span className="!text-xs !font-medium text-gray-600">{product.rating?.rate || 4.5}</span>
                                                            <span className="!text-xs text-gray-300">|</span>
                                                            <span className="!text-xs text-gray-400">({product.rating?.count || 10})</span>
                                                        </div>

                                                        <div className="!mt-auto !pt-2">
                                                            <div className="!flex !items-center !gap-2 !mb-3">
                                                                <span className="!text-lg !font-bold text-green-600">₹{product.price}</span>
                                                                {product.originalPrice > product.price && (
                                                                    <span className="!text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                                                                )}
                                                            </div>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleAddToCart(product);
                                                                }}
                                                                className="!w-full whitespace-nowrap !bg-black !text-white !py-2.5 !rounded-lg !text-sm !font-bold !flex !items-center !justify-center !gap-2 hover:!bg-red-500 transition-colors"
                                                            >
                                                                <ShoppingCart size={16} />
                                                                Add to Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Products;
