import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData'; // Using an existing image

// --- Interactive 3D-like Visual Component ---
const InteractiveVisual = () => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12.5deg", "-12.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12.5deg", "12.5deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
        x.set((mouseX / width) - 0.5);
        y.set((mouseY / height) - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
            className="relative w-full h-full rounded-2xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center"
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="absolute inset-0 flex items-center justify-center">
                {/* Product Image */}
                <motion.img
                    src={MOCK_PRODUCTS[0].image}
                    alt="Anarc Watch"
                    className="w-3/4 h-3/4 object-contain drop-shadow-2xl"
                    style={{ transform: "translateZ(100px)" }}
                />
                {/* Background Shapes */}
                <motion.div
                    style={{ transform: "translateZ(40px)" }}
                    className="absolute w-48 h-48 bg-[#6b7a1f]/20 rounded-full blur-2xl"
                />
                <motion.div
                    style={{ transform: "translateZ(20px) translateX(-100px) translateY(50px)" }}
                    className="absolute w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"
                />
                 <motion.div
                    style={{ transform: "translateZ(20px) translateX(100px) translateY(-50px)" }}
                    className="absolute w-24 h-24 bg-purple-500/20 rounded-full blur-lg"
                />
            </div>
        </motion.div>
    );
};


// --- Main Login Page Component ---
const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const formContainerVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const formItemVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    };
    
    return (
        <AnimatedPage>
            <div className="bg-black text-white min-h-screen flex items-center justify-center p-4 lg:p-8 overflow-hidden">
                {/* Animated Gradient Background */}
                <motion.div 
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900"
                    style={{ backgroundSize: "200% 200%" }}
                />
                
                <motion.div 
                    layout 
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="relative grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl h-[80vh] min-h-[700px] gap-8 z-10"
                >
                    
                    {/* Left Panel: Interactive Visual */}
                    <motion.div layout className={`hidden lg:flex items-center justify-center ${!isLogin ? 'lg:order-last' : ''}`} style={{ perspective: "1000px" }}>
                        <InteractiveVisual />
                    </motion.div>

                    {/* Right Panel: Form */}
                    <motion.div 
                        layout
                        initial={{ opacity: 0, y: 50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full bg-gray-900/30 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-gray-800 flex flex-col justify-center"
                    >
                        <motion.div 
                            key={isLogin ? 'login' : 'signup'}
                            variants={formContainerVariants}
                            initial="initial"
                            animate="animate"
                            className="w-full"
                        >
                            <motion.h2 variants={formItemVariants} className="text-4xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</motion.h2>
                            <motion.p variants={formItemVariants} className="text-gray-400 mb-10">{isLogin ? 'Login to continue your journey.' : 'Join the Layers community.'}</motion.p>
                            
                            <form className="space-y-6">
                                <AnimatePresence>
                                    {!isLogin && (
                                        <motion.div 
                                            variants={formItemVariants}
                                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                            animate={{ opacity: 1, height: 'auto', marginBottom: '1.5rem' }}
                                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                                            className="relative flex items-center"
                                        >
                                            <User className="absolute left-4 text-gray-500" size={20}/>
                                            <input type="text" placeholder="Full Name" className="w-full bg-gray-800/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7a1f] border border-transparent focus:border-[#6b7a1f]" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                
                                <motion.div variants={formItemVariants} className="relative flex items-center">
                                    <Mail className="absolute left-4 text-gray-500" size={20}/>
                                    <input type="email" placeholder="Email Address" className="w-full bg-gray-800/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7a1f] border border-transparent focus:border-[#6b7a1f]" />
                                </motion.div>
                                
                                <motion.div variants={formItemVariants} className="relative flex items-center">
                                    <Lock className="absolute left-4 text-gray-500" size={20}/>
                                    <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full bg-gray-800/50 text-white pl-12 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7a1f] border border-transparent focus:border-[#6b7a1f]" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-gray-400 hover:text-white transition-colors">
                                        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                    </button>
                                </motion.div>

                                <motion.button 
                                    variants={formItemVariants}
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-green-600 to-[#6b7a1f] text-white font-bold py-3 rounded-lg transition-all duration-200 ease-linear shadow-lg shadow-transparent hover:shadow-[#6b7a1f]/40"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isLogin ? 'Login' : 'Sign Up'}
                                </motion.button>
                            </form>
                            
                            <motion.p variants={formItemVariants} className="text-center text-sm text-gray-400 mt-8">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-[#6b7a1f] hover:text-[#6b7a1f] ml-1 transition-colors">
                                    {isLogin ? 'Sign Up' : 'Login'}
                                </button>
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default LoginPage;
