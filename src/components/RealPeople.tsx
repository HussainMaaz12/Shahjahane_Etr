"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function RealPeople() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  
  const textVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <section className="bg-white py-16 sm:py-24 md:py-32 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <div className="relative order-2 lg:order-1 h-[320px] sm:h-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl group">
            <motion.div 
              style={{ y: imageY }}
              className="absolute inset-0 w-full h-[110%]"
            >
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Real people in operations"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            {/* Reveal overlay */}
            <motion.div 
              initial={{ height: "100%" }}
              whileInView={{ height: "0%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
              className="absolute top-0 left-0 w-full bg-white z-10 origin-bottom"
            />
            
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Floating stat */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-shahjahane-navy/90 backdrop-blur-md p-4 sm:p-5 rounded-lg border border-white/10 shadow-xl"
            >
              <div className="text-2xl sm:text-3xl font-bold text-shahjahane-gold mb-0.5">100%</div>
              <div className="text-white text-xs sm:text-sm font-medium tracking-wide">Medically Cleared & Vetted</div>
            </motion.div>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="max-w-xl"
            >
              <motion.div variants={textVariants} className="text-shahjahane-gold font-semibold uppercase tracking-wider text-xs sm:text-sm mb-3 sm:mb-4">
                Real People. Real Operations.
              </motion.div>
              
              <motion.h2 
                variants={textVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-shahjahane-navy mb-5 sm:mb-8 tracking-tight leading-tight"
              >
                The workforce behind global operations.
              </motion.h2>
              
              <motion.p 
                variants={textVariants}
                className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 font-light"
              >
                We don't rely on generic recruitment databases. Our people are highly vetted tradesmen, technicians, and specialists who have proven their reliability in the field. 
              </motion.p>
              
              <motion.p 
                variants={textVariants}
                className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 font-light"
              >
                When you partner with Shahjahane, you are deploying an authentic, credible workforce that seamlessly integrates into your existing operations.
              </motion.p>

              <motion.div variants={textVariants}>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ ease: [0.22, 1, 0.36, 1] as const, duration: 0.4 }}
                  className="bg-transparent text-shahjahane-navy border-2 border-shahjahane-navy font-semibold px-7 py-3 sm:py-3.5 rounded-sm hover:bg-shahjahane-navy hover:text-white transition-colors duration-300 text-sm sm:text-base"
                >
                  Meet the team
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
