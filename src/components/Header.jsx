import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, Layers } from 'lucide-react';

// --- Custom Hooks ---

// Detects scroll direction (up/down)
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection]);

  return scrollDirection;
};

// --- Main Header Component ---

const Header = ({ page, setPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollDirection = useScrollDirection();
    const navLinks = ['Home', 'Products', 'About'];

    // Effect to handle background transparency on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // --- Animation Variants ---

    const headerVariants = {
        top: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
    };

    const mobileMenuContainerVariants = {
        open: {
            transition: { staggerChildren: 0.08, delayChildren: 0.2 }
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };

    const mobileMenuItemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 300, damping: 24 }
        },
        closed: { y: 20, opacity: 0 }
    };

    // --- Sub-components ---

    const NavLink = ({ name, isMobile = false }) => (
        <motion.button
            variants={isMobile ? mobileMenuItemVariants : undefined}
            onClick={() => { setPage(name); setIsMenuOpen(false); }}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isMobile ? 'w-full text-left text-lg' : ''
            } ${page === name ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
            <span className="relative z-10">{name}</span>
            {page === name && (
                <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-blue-600"
                    style={{ borderRadius: 8 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
            )}
        </motion.button>
    );

    return (
        <>
            <motion.header
                initial="hidden"
                animate={scrollDirection === "down" && isScrolled ? "hidden" : "top"}
                variants={headerVariants}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
                    isScrolled ? 'bg-black/50 backdrop-blur-lg border-b border-white/10' : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
                            onClick={() => setPage('Home')}
                        >
                            <Layers className="text-blue-500" />
                            <span className="text-2xl font-bold text-white tracking-widest">ANARC</span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1 bg-black/20 p-1 rounded-lg">
                            {navLinks.map(link => <NavLink key={link} name={link} />)}
                        </nav>

                        {/* Desktop Action Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-gray-300 hover:text-white transition-colors">
                                <ShoppingCart size={20} />
                            </motion.button>
                            <motion.button
                                onClick={() => setPage('Login')}
                                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-[#6b7a1f]/30"
                                whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px -10px rgba(107, 122, 31, 0.5)' }}
                                whileTap={{ scale: 0.95, y: 0 }}
                            >
                                <User size={16} />
                                <span>Login</span>
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(true)} className="text-gray-300 hover:text-white">
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                            className="fixed top-0 right-0 h-auto w-72 bg-black rounded-l-xl backdrop-blur-xl p-6 z-50 md:hidden flex flex-col"
                        >
                            <button onClick={() => setIsMenuOpen(false)} className="self-end text-gray-400 hover:text-white mb-8">
                                <X size={24} />
                            </button>
                            <motion.nav
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={mobileMenuContainerVariants}
                                className="flex flex-col space-y-4"
                            >
                                {navLinks.map(link => <NavLink key={link} name={link} isMobile={true} />)}
                            </motion.nav>
                            <hr className="border-white/10 my-6" />
                             <motion.button
                                variants={mobileMenuItemVariants}
                                onClick={() => { setPage('Login'); setIsMenuOpen(false); }}
                                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-[#6b7a1f]/30"
                             >
                                <User size={16} />
                                <span>Login / Signup</span>
                            </motion.button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
