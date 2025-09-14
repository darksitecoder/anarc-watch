import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

// Combined Hero Section Component
const ResponsiveHero = ({ setPage }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobileView ? (
    <MobileHero setPage={setPage} />
  ) : (
    <DesktopHero setPage={setPage} />
  );
};

// --- Hero Section from HomePage2.jsx (for Mobile) ---
const MobileHero = ({ setPage }) => {
  const heroRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), {
    stiffness: 400,
    damping: 40,
  });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), {
    stiffness: 400,
    damping: 40,
  });
  const glareX = useTransform(x, [-300, 300], ["100%", "0%"]);
  const glareY = useTransform(y, [-300, 300], ["100%", "0%"]);
  const glareOpacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/anarc-watch-black.png"
          alt=""
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black to-black"></div>
      </div>

      <div className="relative z-20 flex flex-col justify-center items-center h-full w-full">
        <div className="flex-grow flex flex-col justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6"
          >
            Define Your Time.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-xl mx-auto text-lg md:text-xl text-gray-300 mb-8"
          >
            The Anarc Zenith. A fusion of cutting-edge technology and
            limitless personalization. Engineered for the creator in you.
          </motion.p>
          <motion.div
            style={{ perspective: "1200px", rotateX, rotateY }}
            className="relative"
          >
            <img
              src="/anarc-watch-black1.png"
              alt="Anarc Watch"
              className="w-64 sm:w-80 h-auto mx-auto drop-shadow-2xl"
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: useTransform(
                  [glareX, glareY],
                  ([latestX, latestY]) =>
                    `radial-gradient(circle at ${latestX} ${latestY}, rgba(255,255,255,0.5), transparent 50%)`
                ),
                opacity: glareOpacity,
                mixBlendMode: "soft-light",
              }}
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="absolute bottom-0 left-8"
        >
          <img
            src="/layers-logo.png"
            alt="Layers Logo"
            className="w-20 h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

// --- Hero Section from HomePage.jsx (for Desktop) ---
const DesktopHero = ({ setPage }) => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    // Animate the watch over a very long scroll duration for a slower effect
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 2.5]);
    const rotate = useTransform(scrollYProgress, [0, 0.3], [0, -15]);
    const y = useTransform(scrollYProgress, [0, 0.3], ["0%", "-20%"]);
    // Push the watch back when text appears
    const z = useTransform(scrollYProgress, [0.35, 0.45], [0, -200]);

    // Animate the background
    const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0.1, 0.4]);
    const bgScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.5]);

    // Animate the main text to fade in later and hold for a long time
    const textOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.4, 0.5], ["30px", "0px"]);

    // Animate feature text snippets, spaced out across the slow scroll
    const feature1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0, 1, 0]);
    const feature1X = useTransform(scrollYProgress, [0.05, 0.15], [-50, 0]);
    
    const feature2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const feature2X = useTransform(scrollYProgress, [0.25, 0.35], [50, 0]);

    // Fade out the entire hero at the very end after a long hold
    const heroContainerOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

    return (
        <div ref={heroRef} className="relative h-[800vh] bg-black">
            <motion.div 
                className="sticky top-7 h-screen overflow-hidden"
                style={{ opacity: heroContainerOpacity, perspective: "1000px" }}
            >
                {/* Animated Background */}
                <motion.div 
                    className="absolute inset-0 z-0"
                    style={{ scale: bgScale, opacity: bgOpacity }}
                >
                    <img
                        src="/anarc-watch-black.png"
                        alt="background"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black to-black z-10"></div>

                {/* Main Animated Content */}
                <div className="relative z-20 h-full flex flex-col items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
                    
                    {/* The Watch - Central Animated Element */}
                    <motion.div style={{ scale, rotate, y, z }} className="absolute">
                        <img
                            src="/anarc-watch-black1.png"
                            alt="Anarc Watch"
                            className="w-64 md:w-80 h-auto drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Animated Feature Snippets for Desktop */}
                    <div className="hidden md:block">
                        <motion.div 
                            className="absolute text-lg text-gray-300 bg-black/30 backdrop-blur-sm p-3 rounded-lg"
                            style={{ 
                                opacity: feature1Opacity, 
                                x: feature1X,
                                top: '30%',
                                left: '15%'
                            }}
                        >
                            AMOLED Display
                        </motion.div>
                         <motion.div 
                            className="absolute text-lg text-gray-300 bg-black/30 backdrop-blur-sm p-3 rounded-lg"
                            style={{ 
                                opacity: feature2Opacity, 
                                x: feature2X,
                                top: '60%',
                                right: '15%'
                            }}
                        >
                            Titanium Build
                        </motion.div>
                    </div>

                    {/* Final Text Content - Revealed at the end */}
                    <motion.div 
                        className="text-center px-4"
                        style={{ opacity: textOpacity, y: textY }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6">
                            Define Your <span className="text-blue-500">Time.</span>
                        </h1>
                        <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
                            The Anarc Zenith. A fusion of cutting-edge technology and
                            limitless personalization. Engineered for the creator in you.
                        </p>
                        <motion.button 
                            onClick={() => setPage("Products")}
                            className="bg-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg "
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Zenith
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
export default ResponsiveHero;