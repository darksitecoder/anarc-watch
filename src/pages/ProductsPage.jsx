import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import Footer from '../components/Footer';
import { MOCK_PRODUCTS } from '../data/mockData';
import { ArrowRight, Search } from 'lucide-react';

// This is the new, redesigned Products Page.

const ProductsPage = ({ setPage, setSelectedProduct }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Watches', 'Skins', 'Accessories'];
    const filteredProducts = activeFilter === 'All' ? MOCK_PRODUCTS : MOCK_PRODUCTS.filter(p => p.category === activeFilter);
    const featuredProduct = MOCK_PRODUCTS.find(p => p.category === 'Watches');

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <AnimatedPage>
            <div className="bg-black text-white min-h-screen">
                {/* Section 1: New Hero Section */}
                <div className="relative h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-gray-900/50">
                        <img src="/product-hero-bg.png" alt="background" className="w-full h-full object-cover opacity-20"/>
                    </div>
                    <div className="relative z-10">
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-extrabold tracking-tighter">The Entire Collection</motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">Discover precision-crafted skins and accessories designed to elevate your tech.</motion.p>
                    </div>
                </div>

                {/* Section 2: Featured Product */}
                {featuredProduct && (
                    <div className="py-24 container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">The Star of the Show.</h2>
                                <p className="text-lg text-gray-400 mb-6">The Anarc Zenith isn't just a product; it's our flagship. A testament to our commitment to blending cutting-edge technology with unparalleled style.</p>
                                <button onClick={() => { setSelectedProduct(featuredProduct); setPage('ProductDetail'); }} className="bg-[#6b7a1f] text-white font-bold px-6 py-3 rounded-lg text-base hover:bg-[#6b7a1f] transition-colors flex items-center">
                                    Explore Anarc <ArrowRight className="ml-2" size={20} />
                                </button>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }} className="bg-black p-8 rounded-2xl">
                                <img src={featuredProduct.image} alt={featuredProduct.name} className="rounded-xl w-full h-auto drop-shadow-2xl" />
                            </motion.div>
                        </div>
                    </div>
                )}
                
                {/* Section 3: Main Product Grid */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div className="flex justify-center md:justify-start space-x-2 md:space-x-4 mb-8 md:mb-0">
                            {filters.map(filter => (
                                <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 text-sm md:text-base rounded-full transition-colors duration-300 ${activeFilter === filter ? 'bg-[#6b7a1f] text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>{filter}</button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-auto">
                            <input type="text" placeholder="Search products..." className="w-full md:w-64 bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6b7a1f]" />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18}/>
                        </div>
                    </div>
                    <motion.div 
                        layout 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        <AnimatePresence>
                            {filteredProducts.map(product => (
                                <ProductCard 
                                    key={product.id}
                                    product={product}
                                    setPage={setPage}
                                    setSelectedProduct={setSelectedProduct}
                                    variants={itemVariants}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

               {/* Section 4: New Final CTA with Background */}
                <div className="py-24 relative overflow-hidden">
                    {/* This is the new background image section */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/anarc-watch-black.png" // You can change this image path
                            alt="" 
                            className="w-full h-full object-cover opacity-50 object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50"></div>
                    </div>
                    
                    {/* Your content is now inside a relative container */}
                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Born from Chaos.</h2>
                        <p className="mt-4 max-w-xl mx-auto text-lg text-gray-400">Every product we create is an extension of our story. Discover the passion and innovation behind Layers.</p>
                        <button onClick={() => setPage('About')} className="mt-8 bg-white text-black font-bold px-8 py-3 rounded-lg text-lg hover:bg-gray-200 transition-colors">Read Our Story</button>
                    </div>
                </div>

            </div>
            <Footer />
        </AnimatedPage>
    );
};

const ProductCard = ({ product, setPage, setSelectedProduct, variants }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-150, 150], [10, -10]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-150, 150], [-10, 10]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div 
            layout 
            variants={variants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }} 
            className="bg-gray-900/50 rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => { setSelectedProduct(product); setPage('ProductDetail'); }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
        >
            <motion.div 
                layoutId={`product-image-${product.id}`} 
                className="h-64 bg-black flex items-center justify-center p-4 relative"
                style={{ rotateX, rotateY, scale: 1.05 }}
            >
                <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-semibold border-2 border-white px-4 py-2 rounded-full text-sm">View</span>
                </div>
            </motion.div>
            <div className="p-4">
                <motion.h3 layoutId={`product-name-${product.id}`} className="text-lg font-semibold text-white">{product.name}</motion.h3>
                <motion.p layoutId={`product-price-${product.id}`} className="text-gray-400 mt-1">₹{product.price.toLocaleString()}</motion.p>
            </div>
        </motion.div>
    );
};

export default ProductsPage;
