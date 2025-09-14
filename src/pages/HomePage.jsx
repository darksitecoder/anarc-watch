import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import Footer from "../components/Footer";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  HeartPulse,
  MapPin,
  BatteryFull,
  Gem,
  Layers as LayersIcon,
} from "lucide-react";

// --- Hero Section for Mobile (MODIFIED) ---
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
        {/* <img
          src="/anarc-watch-black.png"
          alt=""
          className="w-full h-full object-cover opacity-100"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black to-black"></div>
      </div>

      <div className="relative z-20 flex flex-col justify-center items-center h-full w-full">
        <div className="flex-grow flex flex-col justify-center items-center">
          <motion.div
            style={{ perspective: "1200px", rotateX, rotateY }}
            className="relative mb-8"
          >
            <img
              src="/anarc-watch-black1.png"
              alt="Anarc Watch"
              className="w-74 sm:w-85 h-auto mx-auto drop-shadow-2xl"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6"
          >
            Define Your <span className="text-blue-500">Time.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <motion.button 
                onClick={() => setPage("Products")}
                className="bg-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Explore Zenith
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="absolute bottom-8 left-8"
        >
          {/* <img
            src="/layers-logo.png"
            alt="Layers Logo"
            className="w-20 h-auto"
          /> */}
        </motion.div>
      </div>
    </div>
  );
};

// --- Hero Section for Desktop (Unchanged) ---
const DesktopHero = ({ setPage }) => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 2.5]);
    const rotate = useTransform(scrollYProgress, [0, 0.3], [0, -15]);
    const y = useTransform(scrollYProgress, [0, 0.3], ["0%", "-20%"]);
    const z = useTransform(scrollYProgress, [0.35, 0.45], [0, -200]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0.1, 0.4]);
    const bgScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.5]);
    const textOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.4, 0.5], ["30px", "0px"]);
    const feature1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0, 1, 0]);
    const feature1X = useTransform(scrollYProgress, [0.05, 0.15], [-50, 0]);
    const feature2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const feature2X = useTransform(scrollYProgress, [0.25, 0.35], [50, 0]);
    const heroContainerOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

    return (
        <div ref={heroRef} className="relative h-[500vh] bg-black">
            <motion.div 
                className="sticky top-7 h-screen overflow-hidden"
                style={{ opacity: heroContainerOpacity, perspective: "1000px" }}
            >
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
                <div className="relative z-20 h-full flex flex-col items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
                    <motion.div style={{ scale, rotate, y, z }} className="absolute">
                        <img
                            src="/anarc-watch-black1.png"
                            alt="Anarc Watch"
                            className="w-64 md:w-80 h-auto drop-shadow-2xl"
                        />
                    </motion.div>
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
                            className="bg-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
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

// --- Responsive Hero Wrapper (Unchanged) ---
const ResponsiveHero = ({ setPage }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  return isMobileView ? <MobileHero setPage={setPage} /> : <DesktopHero setPage={setPage} />;
};

// --- Main HomePage Component (Unchanged) ---
const HomePage = ({ setPage }) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const imageIndex = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0, 1, 2, 2]
  );
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const unsubscribe = imageIndex.on("change", (latest) => {
      setCurrentImage(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [imageIndex]);

  const scrollImages = [
    "/anarc-watch-health1.png",
    "/anarc-watch-gps1.png",
    "/anarc-watch-battery.png",
  ];

  const carouselImages = [
    "/founder-carousel-1.png",
    "/founder-carousel-2.png",
    "/founder-carousel-3.png",
    "/founder-carousel-4.png",
    "/founder-carousel-5.png",
    "/founder-carousel-6.png",
    "/founder-carousel-7.png"
  ];

  return (
    <AnimatedPage>
      <div className="bg-black text-white">
        
        <ResponsiveHero setPage={setPage} />

        {/* --- All other sections remain the same --- */}
        
        <div className="h-screen py-20 flex items-center justify-center">
          <motion.div
            className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <img
              loading="lazy"
              src="/anarc-watch-lifestyle.png"
              alt="Anarc Watch Lifestyle"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={() => setPage("Products")}
                className="bg-white/20 backdrop-blur-md text-white font-bold px-6 py-3 rounded-lg"
              >
                See it in Action
              </button>
            </div>
          </motion.div>
        </div>

        <div ref={scrollRef} className="relative h-[300vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
              <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-16 items-center">          
                <div className="w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={scrollImages[currentImage]}
                    alt="Anarc Watch Feature"
                    className="w-full max-w-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </AnimatePresence>
              </div>
              <div className="relative h-full">
                <FeatureCard
                  scrollYProgress={scrollYProgress}
                  range={[0, 0.33]}
                  icon={<HeartPulse />}
                  title="Advanced Health Suite"
                  description="Track everything from heart rate and SpO2 to sleep patterns and stress levels with clinical-grade accuracy."
                />
                <FeatureCard
                  scrollYProgress={scrollYProgress}
                  range={[0.33, 0.66]}
                  icon={<MapPin />}
                  title="Dual-Band GPS"
                  description="Navigate your world with unparalleled precision. Perfect for city streets and mountain trails."
                />
                <FeatureCard
                  scrollYProgress={scrollYProgress}
                  range={[0.66, 1.0]}
                  icon={<BatteryFull />}
                  title="14-Day Battery Life"
                  description="Spend more time living and less time charging with our hyper-efficient battery technology."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-24 container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 text-center">
            A Closer Look.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GalleryCard
              image="/anarc-watch-close-up-3.png"
              title="Digital Crown"
            />
            <GalleryCard
              image="/anarc-watch-close-up-1.png"
              title="Titanium Casing"
            />
            <GalleryCard
              image="/anarc-watch-close-up-4.png"
              title="Liquid Silicone strap"
            />
          </div>
          <div className="text-center mt-12">
            <button 
                onClick={() => setPage("Products")}
                className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg text-base hover:bg-blue-700 transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>

        <div className="py-24 container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 text-center">
          Inside Anarc
          </h2>
          <ExplodedView />
          <div className="text-center mt-12">
            <button 
                onClick={() => setPage("Products")}
                className="border border-gray-700 text-white font-bold px-8 py-3 rounded-lg text-base hover:bg-[#6b7a1f] transition-colors"
            >
              Learn about the Tech
            </button>
          </div>
        </div>

        <div className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="w-full aspect-video rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <video
                src="/anarc-watch-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        <div className="py-24 container mx-auto px-4">
          <BentoGrid setPage={setPage} />
        </div>

        <div className="py-24 container mx-auto px-4">
          <FoundersSection />
        </div>

        <div className="py-24 container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 text-center">
            From the Community.
          </h2>
          <ScrollingGallery images={carouselImages} />
        </div>

        <div className="py-24 bg-black">
          <FinalCTA setPage={setPage} />
        </div>

        <Footer />
      </div>
    </AnimatedPage>
  );
};

// --- Helper Components (Unchanged) ---

const FeatureCard = ({ scrollYProgress, range, icon, title, description }) => {
  const opacity = useTransform(
    scrollYProgress,
    [range[0], range[0] + 0.1, range[1] - 0.1, range[1]],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [range[0], range[0] + 0.1], [30, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-blue-600/20 p-3 rounded-full">{icon}</div>
        <h3 className="text-3xl font-bold">{title}</h3>
      </div>
      <p className="text-lg text-gray-400">{description}</p>
    </motion.div>
  );
};

const GalleryCard = ({ image, title }) => (
  <motion.div
    className="relative rounded-2xl overflow-hidden h-96 group"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <img
      loading="lazy"
      src={image}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <h3 className="absolute bottom-6 left-6 text-2xl font-bold">{title}</h3>
  </motion.div>
);

const ExplodedView = () => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const hotspots = [
    {
      id: 1,
      title: "Sapphire Glass",
      description: "Virtually scratch-proof and crystal clear.",
      position: { top: "20%", left: "15%" },
      cardPosition: "left",
    },
    {
      id: 2,
      title: "Titanium Case",
      description: "Lightweight yet incredibly strong for durability.",
      position: { top: "80%", left: "25%" },
      cardPosition: "left",
    },
    {
      id: 3,
      title: "Digital Crown",
      description: "Tactile control for seamless navigation.",
      position: { top: "30%", left: "80%" },
      cardPosition: "right",
    },
  ];
  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-square">
      <motion.img
        loading="lazy"
        src="/anarc-watch-exploded.png"
        alt="Exploded View"
        className="w-full h-full object-contain"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      {hotspots.map((spot) => (
        <div key={spot.id} className="absolute" style={spot.position}>
          <motion.button
            onHoverStart={() => setActiveHotspot(spot.id)}
            onHoverEnd={() => setActiveHotspot(null)}
            className="w-8 h-8 rounded-full bg-blue-700"
            whileHover={{ scale: 1.5 }}
          >
            <motion.div
              className="w-full h-full rounded-full bg-blue-500"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
          <AnimatePresence>
            {activeHotspot === spot.id && (
              <div
                className={`absolute ${
                  spot.cardPosition === "left"
                    ? "right-full mr-4"
                    : "left-full ml-4"
                } bottom-1/2 translate-y-1/2 w-64`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-gray-900 p-4 rounded-lg shadow-2xl"
                >
                  <h4 className="font-bold text-white">{spot.title}</h4>
                  <p className="text-sm text-gray-400">{spot.description}</p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const bentoVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const BentoGrid = ({ setPage }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <motion.div
      custom={0}
      variants={bentoVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="md:col-span-2 md:row-span-2 rounded-3xl bg-gray-900/50 p-8 flex flex-col justify-between group relative overflow-hidden"
    >
      <img
        loading="lazy"
        src="/chaotic-mobile.png"
        alt="Mobile Skins"
        className="absolute right-0 -bottom-1/4 w-1/2 h-3/4 object-contain object-bottom group-hover:scale-110 transition-transform duration-300"
      />
      <div>
        <h3 className="text-3xl font-bold">The Layers Ecosystem</h3>
        <p className="text-gray-400 mt-2">
          More than just skins. A universe of personalization.
        </p>
      </div>
      <button
        onClick={() => setPage("Products")}
        className="self-start mt-4 bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors"
      >
        Explore
      </button>
    </motion.div>
    <motion.div
      custom={1}
      variants={bentoVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="md:col-span-2 rounded-3xl bg-gray-900/50 p-8 flex flex-col justify-center items-center text-center"
    >
      <Gem size={32} className="text-blue-500 mb-2" />
      <h3 className="text-xl font-bold">Premium Materials</h3>
      <p className="text-gray-400 text-sm">
        Only authentic 3M vinyl & titanium.
      </p>
    </motion.div>
    <motion.div
      custom={2}
      variants={bentoVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-3xl bg-blue-600 hover:bg-blue-700 p-8 flex flex-col justify-center items-center text-center cursor-pointer transition-colors"
      onClick={() => setPage("Products")}
    >
      <div>
        <h3 className="text-2xl font-bold">Shop All Products</h3>
        <ArrowRight size={32} className="mt-2" />
      </div>
    </motion.div>
    <motion.div
      custom={3}
      variants={bentoVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-3xl bg-gray-900/50 p-8 flex flex-col justify-center items-center text-center"
    >
      <LayersIcon size={32} className="text-blue-500 mb-2" />
      <h3 className="text-xl font-bold">Precision Fit</h3>
      <p className="text-gray-400 text-sm">Cut to perfection.</p>
    </motion.div>
  </div>
);

const FoundersSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:col-span-3"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
          We Believe in Chaos.
        </h2>
        <div className="text-lg text-gray-300 space-y-4">
          <p>
            At Layers, we believe Chaos is a superpower. It helps you break out
            of moulds, do your own thing, find your own place.
          </p>
          <p>
            Without chaos there would be no innovation. Without chaos there
            would be no new ideas of greatness.
          </p>
          <p>
            Chaos unsettles those who can’t deal with it.{" "}
            <span className="text-white">We chase it.</span>
          </p>
        </div>
        <p className="text-white font-semibold mt-6">
          Neel & Shlok, Co-founders of Layers
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:col-span-2"
      >
        <div className="rounded-3xl overflow-hidden aspect-square">
          <img
            loading="lazy"
            src="/founder-main.png"
            alt="Neel & Shlok"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </motion.div>
    </div>
  );
};

const ScrollingGallery = ({ images }) => {
    const duplicatedImages = [...images, ...images]; 

    return (
        <div className="relative h-[60vh] overflow-hidden">
            <div className="flex space-x-6">
                <motion.div 
                    className="flex space-x-6"
                    animate={{ x: ['-100%', '0%'] }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                    {duplicatedImages.map((img, i) => <div key={i} className="w-80 h-96 flex-shrink-0 rounded-2xl overflow-hidden"><img loading="lazy" src={img} className="w-full h-full object-cover"/></div>)}
                </motion.div>
                <motion.div 
                    className="flex space-x-6"
                    animate={{ x: ['-100%', '0%'] }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                    {duplicatedImages.map((img, i) => <div key={i+images.length} className="w-80 h-96 flex-shrink-0 rounded-2xl overflow-hidden"><img loading="lazy" src={img} className="w-full h-full object-cover"/></div>)}
                </motion.div>
            </div>
        </div>
    );
};

const FinalCTA = ({ setPage }) => (
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
      Are you ready to be an agent of chaos?
    </h2>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-black p-6 rounded-2xl text-left"
      >
        <img
          loading="lazy"
          src="/product-dark-brilliance.png"
          className="rounded-xl mb-4"
          alt="Dark Brilliance"
        />
        <h3 className="text-2xl font-bold">Dark Brilliance</h3>
        <p className="text-gray-400">₹ 6849/-</p>
        <button
          className="mt-4 w-full bg-white text-black font-bold py-2 rounded-lg"
          onClick={() => setPage("Products")}
        >
          Buy Now
        </button>
      </motion.div>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-black p-6 rounded-2xl text-left"
      >
        <img
          loading="lazy"
          src="/product-frost-blaze.png"
          className="rounded-2xl mb-4"
          alt="Frost Blaze"
        />
        <h3 className="text-2xl font-bold">Frost Blaze</h3>
        <p className="text-gray-400">₹ 6849/-</p>
        <button
          className="mt-4 w-full bg-white text-black font-bold py-2 rounded-lg"
          onClick={() => setPage("Products")}
        >
          Buy Now
        </button>
      </motion.div>
    </div>
    <div className="mt-16">
      <h3 className="text-4xl font-bold">Chaotic Essentials</h3>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          className="bg-gray-900 p-6 rounded-2xl text-left flex flex-col justify-between cursor-pointer hover:bg-gray-800 transition-colors"
          onClick={() => setPage("Products")}
        >
          <img
            loading="lazy"
            src="/chaotic-mobile.png"
            alt="Mobile Skins"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div>
            <h4 className="text-xl font-bold">Mobile skins</h4>
            <p className="text-gray-400">Because naked phones are boring.</p>
          </div>
        </div>
        <div
          className="bg-gray-900 p-6 rounded-2xl text-left flex flex-col justify-between cursor-pointer hover:bg-gray-800 transition-colors"
          onClick={() => setPage("Products")}
        >
          <img
            loading="lazy"
            src="/chaotic-strap.png"
            alt="Arc Straps"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div>
            <h4 className="text-xl font-bold">Arc Straps</h4>
            <p className="text-gray-400">Straps that match your vibe.</p>
          </div>
        </div>
        <div
          className="bg-gray-900 p-6 rounded-2xl text-left flex flex-col justify-between cursor-pointer hover:bg-gray-800 transition-colors"
          onClick={() => setPage("Products")}
        >
          <img
            loading="lazy"
            src="/laptop-skin-carbon.png"
            alt="Laptop/Tablet Skins"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div>
            <h4 className="text-xl font-bold">Laptop/Tablet Skins</h4>
            <p className="text-gray-400">Style your laptop or tablet effortlessly.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;