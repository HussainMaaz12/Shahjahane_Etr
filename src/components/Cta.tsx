"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Cta() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section 
      ref={containerRef}
      className="relative py-20 sm:py-32 md:py-44 overflow-hidden flex items-center justify-center bg-shahjahane-navy"
    >
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y: imageY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Industrial architecture"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-shahjahane-navy/90" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            Ready to scale your workforce?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <p className="text-slate-300 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Deploy skilled, vetted professionals to your projects immediately.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ ease: [0.22, 1, 0.36, 1] as const, duration: 0.4 }}
            className="bg-shahjahane-gold text-shahjahane-navy font-bold text-base sm:text-lg md:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-sm hover:bg-shahjahane-gold-hover transition-colors shadow-sm w-full sm:w-auto"
          >
            Request Manpower
          </motion.button>
        </motion.div>

      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-2xl bg-shahjahane-gold/3 blur-[120px] rounded-full pointer-events-none z-0" />
    </section>
  );
}
