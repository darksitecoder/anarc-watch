import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import Footer from "../components/Footer";
import {
  TIMELINE_EVENTS,
  FOUNDER_IMAGE,
  CAROUSEL_IMAGES,
  ABOUT_CTA_IMAGE,
} from "../data/mockData";
import {
  Heart,
  Zap,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Quote,
} from "lucide-react";

// --- KINETIC TYPOGRAPHY HERO ---
const KineticHero = () => {
  const words = ["PASSION", "INNOVATION", "COMMUNITY"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 1500);
    if (index >= words.length) clearInterval(timer);
    return () => clearInterval(timer);
  }, [index, words.length]);

  const wordVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  const finalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-center">
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-olive"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: `+=${(Math.random() - 0.5) * 200}`,
              y: `+=${(Math.random() - 0.5) * 200}`,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/80 to-black z-10"></div>
      <div className="relative z-20">
        <AnimatePresence mode="wait">
          {index < words.length ? (
            <motion.h2
              key={words[index]}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-5xl md:text-7xl font-semibold tracking-wider text-gray-400"
            >
              {words[index]}
            </motion.h2>
          ) : (
            <motion.div
              variants={finalVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                We Chase
              </h1>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-olive">
                Chaos.
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// --- ENHANCED FOUNDERS SECTION ---
const FoundersSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };
  const textItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section ref={targetRef} className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              style={{ y: imageY }}
              className="z-10 shadow-2xl shadow-[#6b7a1f] rounded-2xl"
            >
              <img
                src={FOUNDER_IMAGE}
                alt="Neel & Shlok, Co-founders"
                className="rounded-2xl w-full h-auto object-cover"
              />
            </motion.div>
            <div className="absolute -inset-8 bg-[#6b7a1f]/30 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center"
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h2
              variants={textItemVariants}
              className="text-4xl md:text-5xl font-bold tracking-tighter mb-4"
            >
              The Architects of Chaos
            </motion.h2>
            <motion.p
              variants={textItemVariants}
              className="text-gray-400 text-lg mb-8"
            >
              Neel & Shlok, Co-founders of Layers
            </motion.p>
            <motion.div
              variants={textItemVariants}
              className="relative border-[#6b7a1f] pl-8 py-4"
            >
              <Quote
                className="absolute top-2 -left-5 text-[#6b7a1f]/50"
                size={40}
              />
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed italic">
                "Chaos is a superpower. It helps you break out of moulds, do
                your own thing, and find your own place."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- RESPONSIVE & ENHANCED TIMELINE SECTION ---
const TimelineSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section ref={targetRef} className="py-16 md:py-24">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: "all" }}
        className="text-4xl md:text-5xl font-bold tracking-tighter mb-20 text-center"
      >
        Our Journey
      </motion.h2>
      <div className="relative max-w-3xl mx-auto md:max-w-none">
        {/* Desktop timeline bar */}
        <motion.div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 w-0.5 bg-[#6b7a1f]"
          style={{ height: lineHeight }}
        />
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 h-full w-0.5 bg-gray-800 -z-10" />

        {/* Mobile timeline bar */}
        <motion.div
          className="md:hidden absolute left-4 top-2 w-0.5 bg-[#6b7a1f]"
          style={{ height: lineHeight }}
        />
        <div className="md:hidden absolute left-4 top-2 h-full w-0.5 bg-gray-800 -z-10" />

        {TIMELINE_EVENTS.map((event, index) => (
          <TimelineEvent key={index} event={event} index={index} />
        ))}
      </div>
    </section>
  );
};

const TimelineEvent = ({ event, index }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start center"],
  });
  const scale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [0.5, 1]);

  return (
    <motion.div
      ref={targetRef}
      style={{ scale, opacity }}
      className={`relative flex items-center mb-8 md:mb-16 w-full md:w-auto ${
        index % 2 === 0 ? "md:justify-start" : "md:justify-end"
      }`}
    >
      {/* Mobile layout uses padding-left */}
      <div className="md:hidden w-full pl-12">
        <div className="absolute left-4 top-1 -translate-x-1/2">
          <div className="w-5 h-5 bg-[#6b7a1f] rounded-full border-4 border-black ring-4 ring-[#6b7a1f]/30"></div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl backdrop-blur-sm">
          <p className="text-[#6b7a1f] font-semibold text-lg">{event.year}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{event.title}</h3>
          <p className="text-gray-400 mt-2">{event.description}</p>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block w-[calc(50%-2rem)]">
        <div className="absolute left-1/2 top-1 -translate-x-1/2">
          <div className="w-5 h-5 bg-[#6b7a1f] rounded-full border-4 border-black ring-4 ring-[#6b7a1f]/30"></div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-[#6b7a1f]/50 hover:bg-gray-900 hover:-translate-y-1">
          <p className="text-[#6b7a1f] font-semibold text-lg">{event.year}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{event.title}</h3>
          <p className="text-gray-400 mt-2">{event.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// --- PHILOSOPHY SECTION ---
const PhilosophySection = () => {
  return (
    <section className="py-16 md:py-24">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Our Philosophy
        </h2>
      </motion.div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PhilosophyCard
          icon={Heart}
          title="Passion"
          description="Driven by a genuine love for technology and design that challenges the status quo."
          color="red"
        />
        <PhilosophyCard
          icon={Zap}
          title="Innovation"
          description="Constantly pushing boundaries to create what's next, born from creative chaos."
          color="yellow"
        />
        <PhilosophyCard
          icon={Users}
          title="Community"
          description="Built for and by a collective of creators, enthusiasts, and rebels."
          color="blue"
        />
      </div>
    </section>
  );
};

// --- COMMUNITY CAROUSEL SECTION ---
const CommunityCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleNext = () =>
    setActiveIndex((p) => (p + 1) % CAROUSEL_IMAGES.length);
  const handlePrev = () =>
    setActiveIndex(
      (p) => (p - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length
    );

  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 text-center">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16">
        From The Community
      </h2>
      <div
        className="relative flex items-center justify-center h-[500px]"
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence>
          {CAROUSEL_IMAGES.map((img, i) => {
            const offset = i - activeIndex;
            const isVisible = Math.abs(offset) <= 2;
            return (
              isVisible && (
                <motion.div
                  key={i}
                  className="absolute w-72 h-96 rounded-2xl overflow-hidden cursor-pointer"
                  initial={{
                    scale: 0,
                    opacity: 0,
                    rotateY: offset > 0 ? 90 : -90,
                  }}
                  animate={{
                    scale: offset === 0 ? 1.1 : 0.8,
                    opacity: offset === 0 ? 1 : 0.4,
                    x: `${offset * 55}%`,
                    zIndex: CAROUSEL_IMAGES.length - Math.abs(offset),
                    rotateY: offset === 0 ? 0 : offset > 0 ? -40 : 40,
                    transition: { type: "spring", stiffness: 260, damping: 30 },
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={() => setActiveIndex(i)}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt={`Community submission ${i + 1}`}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                </motion.div>
              )
            );
          })}
        </AnimatePresence>
        <motion.button
          onClick={handlePrev}
          className="absolute left-0 md:left-8 z-30 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          onClick={handleNext}
          className="absolute right-0 md:right-8 z-30 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </section>
  );
};

// --- RESPONSIVE & ENHANCED FINAL CTA SECTION ---
const FinalCTA = ({ setPage }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["50px", "0px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-16 md:py-24">
      <motion.div
        className="relative rounded-3xl p-8 md:p-20 text-center overflow-hidden bg-gray-900"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ABOUT_CTA_IMAGE})` }}
        ></div>
        <div className="absolute inset-0 z-0 bg-black/60"></div>

        <motion.div
          className="relative z-10"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
            Find Your Layer.
          </h2>
          <p className="text-base md:text-lg text-gray-300 mt-4 max-w-xl mx-auto">
            Ready to break the mould? Explore our collection and find the tools
            to express your unique identity.
          </p>
          <div className="mt-8">
            <motion.button
              onClick={() => setPage("Products")}
              className="bg-blue-600 text-white font-bold px-8 py-4 rounded-lg flex items-center mx-auto space-x-2 relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 30px rgba(107, 122, 31, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite] pointer-events-none"></span>
              <span>Explore Products</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---
const AboutPage = ({ setPage }) => {
  return (
    <AnimatedPage>
      <div className="bg-black text-white min-h-screen overflow-x-hidden">
        <KineticHero />
        <div className="relative z-10 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FoundersSection />
            <TimelineSection />
            <PhilosophySection />
            <CommunityCarousel />
            <FinalCTA setPage={setPage} />
          </div>
        </div>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

// --- Philosophy Card Component ---
const PhilosophyCard = ({
  icon: Icon,
  title,
  description,
  color,
  className,
}) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const colorClasses = {
    red: {
      glow: "hover:shadow-red-500/20",
      border: "hover:border-red-500/50",
      icon: "text-red-400",
    },
    yellow: {
      glow: "hover:shadow-yellow-500/20",
      border: "hover:border-yellow-500/50",
      icon: "text-yellow-400",
    },
    blue: {
      glow: "hover:shadow-[#6b7a1f]/20",
      border: "hover:border-[#6b7a1f]/50",
      icon: "text-[#6b7a1f]",
    },
  };
  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      className={`bg-gray-900/40 p-8 rounded-xl border border-gray-800 backdrop-blur-sm transition-all duration-500 shadow-xl shadow-transparent ${colorClasses[color].glow} ${colorClasses[color].border} ${className}`}
    >
      <Icon className={`mb-4 ${colorClasses[color].icon}`} size={32} />
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default AboutPage;