import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import Footer from '../components/Footer';
import { ShoppingCart, Star, CheckCircle, Box, Cpu, Film, ArrowLeft, Truck, ShieldCheck, Repeat2, Heart, Zap, Maximize, BatteryCharging, Droplets, Layers, Wind, Trash2, Lock, Ruler } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

// This is the fully enhanced, dynamic, and responsive Product Detail Page.
// It includes new sections, a cleaner UI, and more sophisticated animations.

const ProductDetailPage = ({ product, setPage, setSelectedProduct }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colorOptions ? product.colorOptions[0] : null);
  const [cartAdded, setCartAdded] = useState(false);

  // Effect to reset the state when the product prop changes
  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedColor(product.colorOptions ? product.colorOptions[0] : null);
    setCartAdded(false); // Reset cart button state
    window.scrollTo(0, 0);
  }, [product]);

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const handleAddToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // --- DYNAMIC CONTENT FOR FEATURE SECTIONS ---
  const featureContent = {
    Watches: {
        section1: {
            title: "Precision Milled Body",
            description: "Every curve and edge is crafted from a single block of aerospace-grade material for ultimate durability and a seamless, premium finish that feels as good as it looks."
        },
        section2: {
            title: "Brilliance on Display",
            description: "Our custom display technology provides unparalleled brightness and color accuracy. See every detail with perfect clarity, even in direct sunlight."
        }
    },
    Skins: {
        section1: {
            title: "Unmatched Precision",
            description: "Every skin is laser-cut to perfection, ensuring a flawless fit around every port, button, and curve of your device. Application is simple and bubble-free."
        },
        section2: {
            title: "Authentic 3M Materials",
            description: "We use only the highest-grade 3M vinyl, offering superior texture, durability, and a clean, residue-free removal when you're ready for a new look."
        }
    },
    Accessories: {
        section1: {
            title: "Built to Last",
            description: "Our accessories are designed with durability in mind, using high-quality materials like liquid silicone and reinforced connectors to withstand daily wear and tear."
        },
        section2: {
            title: "Seamless Integration",
            description: "Each accessory is crafted to perfectly complement your device, ensuring a secure fit and maintaining the original aesthetic and functionality you love."
        }
    }
  };

  const defaultContent = {
      section1: { title: "Premium Quality", description: "Crafted with the finest materials available." },
      section2: { title: "Designed for You", description: "Meticulously designed to integrate perfectly with your lifestyle." }
  };

  const currentFeatureContent = featureContent[product.category] || defaultContent;


  const renderCategorySpecificDetails = () => {
    switch (product.category) {
      case 'Watches':
        return (
          <>
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Color: <span className="font-normal text-gray-400">{selectedColor?.name}</span>
              </h3>
              <div className="flex space-x-4">
                {product.colorOptions.map((option) => (
                  <motion.button
                    key={option.name}
                    onClick={() => {
                      setSelectedColor(option);
                      setSelectedImage(option.image);
                    }}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      selectedColor?.name === option.name ? 'border-blue-500 scale-110 ring-4 ring-blue-500/30' : 'border-gray-700 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: option.color }}
                    aria-label={option.name}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </motion.div>
            {product.highlights && (
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3 text-gray-300">
                  {product.highlights.map((feature, i) => (
                    <motion.li key={i} className="flex items-center space-x-3" variants={itemVariants}>
                      <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </>
        );
      case 'Skins':
        return (
            <motion.div variants={itemVariants} className="mb-8 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-2 flex items-center"><Film className="mr-2 text-[#6b7a1f]"/>Material</h3>
                <p className="text-gray-400">Premium 3M Vinyl with Air-Release Technology for a bubble-free application.</p>
            </motion.div>
        );
      case 'Accessories':
         return (
            <motion.div variants={itemVariants} className="mb-8 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-2 flex items-center"><Cpu className="mr-2 text-[#6b7a1f]"/>Compatibility</h3>
                <p className="text-gray-400">Compatible with Anarc Zenith and other 22mm lug width smartwatches.</p>
            </motion.div>
        );
      default:
        return null;
    }
  };
  
  // --- DYNAMIC TECHNICAL SPECIFICATIONS ---
  const allTechSpecs = {
    Watches: [
      { name: 'Display', value: '1.9" AMOLED Always-On', icon: <Maximize size={24} className="text-[#6b7a1f]"/> },
      { name: 'Materials', value: 'Titanium Case, Sapphire Glass', icon: <ShieldCheck size={24} className="text-[#6b7a1f]"/> },
      { name: 'Connectivity', value: 'Bluetooth 5.2, Dual-Band GPS', icon: <Zap size={24} className="text-[#6b7a1f]"/> },
      { name: 'Battery Life', value: 'Up to 14 Days', icon: <BatteryCharging size={24} className="text-[#6b7a1f]"/> },
      { name: 'Water Resistance', value: '5 ATM', icon: <Droplets size={24} className="text-[#6b7a1f]"/> },
      { name: 'Processor', value: 'Anarc Fusion Chip', icon: <Cpu size={24} className="text-[#6b7a1f]"/> },
    ],
    Skins: [
      { name: 'Material', value: 'Premium 3M Vinyl', icon: <Film size={24} className="text-[#6b7a1f]"/> },
      { name: 'Finish', value: 'Matte with True Texture', icon: <Layers size={24} className="text-[#6b7a1f]"/> },
      { name: 'Feature', value: 'Air-Release Adhesive', icon: <Wind size={24} className="text-[#6b7a1f]"/> },
      { name: 'Durability', value: 'Scratch & Fade Resistant', icon: <ShieldCheck size={24} className="text-[#6b7a1f]"/> },
      { name: 'Removal', value: 'Residue-Free', icon: <Trash2 size={24} className="text-[#6b7a1f]"/> },
      { name: 'Precision', value: 'Laser Cut Accuracy', icon: <Ruler size={24} className="text-[#6b7a1f]"/> },
    ],
    Accessories: [
      { name: 'Material', value: 'Liquid Silicone Rubber', icon: <Droplets size={24} className="text-[#6b7a1f]"/> },
      { name: 'Clasp', value: 'Stainless Steel Pin-and-Tuck', icon: <Lock size={24} className="text-[#6b7a1f]"/> },
      { name: 'Compatibility', value: '22mm Lug Width', icon: <Cpu size={24} className="text-[#6b7a1f]"/> },
      { name: 'Feature', value: 'Sweat & Water Resistant', icon: <ShieldCheck size={24} className="text-[#6b7a1f]"/> },
      { name: 'Design', value: 'Quick-Release Pins', icon: <Zap size={24} className="text-[#6b7a1f]"/> },
      { name: 'Sizing', value: 'Fits 140-220mm wrists', icon: <Ruler size={24} className="text-[#6b7a1f]"/> },
    ]
  };

  const currentTechSpecs = allTechSpecs[product.category] || [];

  return (
    <AnimatedPage>
      <div className="bg-black text-white min-h-screen pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image Gallery */}
            <motion.div 
              className="lg:sticky top-24 space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="bg-black rounded-2xl overflow-hidden flex items-center justify-center p-4 aspect-square backdrop-blur-sm border border-gray-800">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-contain max-h-[65vh]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.images.map((img, i) => (
                  <motion.div
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`rounded-xl cursor-pointer aspect-square bg-gray-800/80 p-1 border-2 transition-all duration-300 ${
                      selectedImage === img ? 'border-blue-500 scale-105' : 'border-transparent hover:border-gray-500'
                    }`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover rounded-lg" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.button onClick={() => setPage('Products')} className="flex items-center space-x-2 text-gray-400 mb-6 hover:text-[#6b7a1f] transition-colors" variants={itemVariants}>
                <ArrowLeft size={16}/>
                <span>Back to All Products</span>
              </motion.button>
              
              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{product.name}</motion.h1>
              <motion.div variants={itemVariants} className="flex items-center space-x-2 mb-5">
                  {[...Array(4)].map((_, i) => <Star key={i} className="text-yellow-400 fill-current" size={20} />)}
                  <Star className="text-yellow-400/50 fill-current" size={20} />
                  <span className="text-gray-400 text-sm pt-1 hover:underline cursor-pointer">(121 reviews)</span>
              </motion.div>
              <motion.p variants={itemVariants} className="text-4xl font-bold text-blue-500 mb-6">₹{product.price.toLocaleString()}</motion.p>
              <motion.p variants={itemVariants} className="text-base text-gray-300 mb-8 leading-relaxed">{product.description}</motion.p>

              {renderCategorySpecificDetails()}

              <motion.div variants={itemVariants} className="space-y-4">
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full ${cartAdded ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold px-8 py-4 rounded-xl text-lg flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg shadow-[#6b7a1f]/20`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {cartAdded ? (
                       <motion.span key="added" initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="flex items-center"><CheckCircle/> <span className="ml-2">Added to Cart!</span></motion.span>
                    ) : (
                       <motion.span key="add" initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="flex items-center"><ShoppingCart /><span>Add to Cart</span></motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Trust Points Section */}
          <motion.div 
            className="mt-24 mb-16 bg-gray-900/50 border border-gray-800 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-gray-300 backdrop-blur-sm"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 }}
          >
            <motion.div className="flex flex-col items-center" variants={itemVariants}>
              <Truck className="text-[#6b7a1f] mb-3" size={32} />
              <h4 className="font-semibold text-white">Free Express Delivery</h4>
              <p className="text-sm text-gray-400">Delivered in 1–3 business days</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={itemVariants}>
              <ShieldCheck className="text-[#6b7a1f] mb-3" size={32} />
              <h4 className="font-semibold text-white">1-Year Warranty</h4>
              <p className="text-sm text-gray-400">Peace of mind guaranteed</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={itemVariants}>
              <Repeat2 className="text-[#6b7a1f] mb-3" size={32} />
              <h4 className="font-semibold text-white">Easy 7-Day Returns</h4>
              <p className="text-sm text-gray-400">No questions asked</p>
            </motion.div>
          </motion.div>

          {/* ALTERNATING FEATURE SECTION 1: Image Left, Text Right */}
          <motion.div 
            className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.img 
                src={product.images[1] || product.images[0]} 
                alt={`${product.name} detail 1`} 
                className="rounded-2xl object-cover w-full h-auto shadow-lg border border-gray-800"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.div variants={containerVariants}>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
                {currentFeatureContent.section1.title}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-300 mb-4 leading-relaxed">
                {currentFeatureContent.section1.description}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* ALTERNATING FEATURE SECTION 2: Text Left, Image Right */}
          <motion.div 
            className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div className="lg:order-last" variants={itemVariants}>
              <motion.img 
                src={product.images[2] || product.images[0]} 
                alt={`${product.name} detail 2`} 
                className="rounded-2xl object-cover w-full h-auto shadow-lg"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.div variants={containerVariants}>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
                {currentFeatureContent.section2.title}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-300 mb-4 leading-relaxed">
                {currentFeatureContent.section2.description}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* DYNAMIC Technical Specifications Section */}
          {currentTechSpecs.length > 0 && (
            <div className="py-16">
              <motion.h2 
                className="text-4xl font-bold tracking-tighter mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Under the Hood
              </motion.h2>
              <motion.div 
                className="max-w-4xl mx-auto bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentTechSpecs.map((spec, i) => (
                    <motion.div key={i} className="flex items-center space-x-4" variants={itemVariants}>
                      <div className="flex-shrink-0 bg-gray-800 p-3 rounded-lg">
                        {spec.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{spec.name}</h4>
                        <p className="text-gray-400 text-sm">{spec.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Related Products Section */}
          <div className="py-16">
            <motion.h2 
              className="text-4xl font-bold tracking-tighter mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              You Might Also Like
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {relatedProducts.map((related) => (
                <motion.div
                  key={related.id}
                  className="bg-gray-900/50 rounded-2xl p-4 cursor-pointer group border border-gray-800 hover:border-blue-600/50 transition-all duration-300 relative overflow-hidden"
                  onClick={() => setSelectedProduct(related)}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2, ease: 'easeOut' } }}
                >
                  <div className="bg-gray-800 rounded-lg mb-4 aspect-square flex items-center justify-center p-4 overflow-hidden">
                    <img src={related.image} alt={related.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-400 ease-in-out" />
                  </div>
                  <h3 className="font-semibold text-white truncate">{related.name}</h3>
                  <p className="text-[#6b7a1f]">₹{related.price.toLocaleString()}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* FINAL STORY CTA SECTION - ENHANCED */}
          <motion.div
            className="relative text-center my-24 py-20 px-8 rounded-2xl border border-gray-800 overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url('/product-hero-bg.png')` }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,128,255,0.1)]"></div>
            <div className="relative z-10">
              <motion.div 
                className="flex justify-center items-center mb-4 text-red-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart size={32} fill="currentColor" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                Built with Love & Chaos
              </h2>
              <p className="max-w-2xl mx-auto text-gray-300 mb-8">
                This is more than just a product. It's a piece of our story, crafted with passion by creators for creators.
              </p>
              <motion.button
                onClick={() => setPage('About')}
                className="bg-white/10 border border-white/20 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                Discover Our Story
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default ProductDetailPage;
