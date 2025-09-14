import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Twitter, Instagram, Linkedin, Layers, Heart, Code } from 'lucide-react';

const Footer = () => {

    const footerLinkVariants = {
        initial: { y: 0 },
        hover: { y: -2, color: '#ffffff' }
    };

    const socialIconVariants = {
        initial: { scale: 1, rotate: 0 },
        hover: { scale: 1.2, rotate: 10, color: '#849926' } // blue-500
    };

    return (
        <footer className="bg-black text-gray-400 font-['Inter',_sans-serif] relative overflow-hidden">
            {/* Background decorative element */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] [background-size:2rem_2rem] opacity-50"></div>
            
            <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* Column 1: Brand */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Layers className="text-olive" size={28}/>
                            <h3 className="text-2xl font-black text-white tracking-widest uppercase">ANARC</h3>
                        </div>
                        <p className="text-sm max-w-xs">
                            Premium skins and cases designed for the creator in you. Unleash your creativity.
                        </p>
                    </div>

                    {/* Column 2: Links */}
                    <div>
                        <h4 className="font-bold text-white mb-4 tracking-wider">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            <li><motion.a href="#" variants={footerLinkVariants} initial="initial" whileHover="hover" className="transition-colors">Mobile Skins</motion.a></li>
                            <li><motion.a href="#" variants={footerLinkVariants} initial="initial" whileHover="hover" className="transition-colors">Laptop Skins</motion.a></li>
                            <li><motion.a href="#" variants={footerLinkVariants} initial="initial" whileHover="hover" className="transition-colors">Anarc Watch</motion.a></li>
                            <li><motion.a href="#" variants={footerLinkVariants} initial="initial" whileHover="hover" className="transition-colors">Accessories</motion.a></li>
                        </ul>
                    </div>

                    {/* Column 3: Links */}
                    <div>
                        <h4 className="font-bold text-white mb-4 tracking-wider">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><motion.a href="#" variants={footerLinkVariants} initial="initial" whileHover="hover" className="transition-colors">About Us</motion.a></li>
                            <li><motion.a href="#" variants={footerLinkVariants} initial="initial" whileHover="hover" className="transition-colors">Contact</motion.a></li>
                            <li><motion.a href="#" variants={footerLinkVariants} initial="initial" whileHover="hover" className="transition-colors">Careers</motion.a></li>
                            <li><motion.a href="#" variants={footerLinkVariants} initial="initial" whileHover="hover" className="transition-colors">Blog</motion.a></li>
                        </ul>
                    </div>
                    
                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="font-bold text-white mb-4 tracking-wider">Join the List</h4>
                        <p className="text-sm mb-4">Get exclusive deals and product news.</p>
                        <form className="flex group">
                            <input 
                                type="email" 
                                placeholder="your.email@example.com" 
                                className="bg-gray-900/50 text-white px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-olive w-full text-sm border border-gray-700 group-hover:border-[#6b7a1f] transition-all duration-300" 
                            />
                            <motion.button 
                                className="bg-olive text-white p-3 rounded-r-md flex items-center justify-center"
                                whileHover={{ scale: 1.1, x: 5 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            >
                                <ArrowRight size={20} />
                            </motion.button>
                        </form>
                    </div>
                </div>

               
            </div>
        </footer>
    );
}

export default Footer;