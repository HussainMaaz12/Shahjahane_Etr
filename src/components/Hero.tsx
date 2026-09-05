"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 24 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } 
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative bg-shahjahane-navy pt-12 sm:pt-20 md:pt-32 pb-10 sm:pb-16 overflow-hidden min-h-[85vh] sm:min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start max-w-3xl"
        >
          <motion.h1 
            variants={textVariant}
            className="text-[2rem] leading-[1.15] sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight md:leading-tight mb-5 sm:mb-6"
          >
            Building the Future with Precision
          </motion.h1>
          
          <motion.p 
            variants={textVariant}
            className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 max-w-2xl leading-relaxed font-light"
          >
            Delivering top-tier manpower and technical expertise for your most demanding projects.
          </motion.p>
          
          <motion.div 
            variants={textVariant}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 mb-10 sm:mb-16 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ease: [0.22, 1, 0.36, 1] as const, duration: 0.4 }}
              className="bg-shahjahane-gold text-shahjahane-navy font-semibold px-7 py-3.5 rounded-sm hover:bg-shahjahane-gold-hover transition-colors shadow-sm text-center"
            >
              Request manpower
            </motion.button>
            
            <motion.button
              whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ ease: [0.22, 1, 0.36, 1] as const, duration: 0.4 }}
              className="bg-transparent text-white font-semibold px-7 py-3.5 rounded-sm border border-white/20 hover:border-white/50 transition-colors text-center"
            >
              Explore our capabilities
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Image with Parallax */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ y: imageY, opacity }}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden shadow-2xl border border-white/10"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1541888088325-15a9ab350dc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-shahjahane-navy/80 via-transparent to-transparent mix-blend-multiply" />
        </motion.div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-shahjahane-gold/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
