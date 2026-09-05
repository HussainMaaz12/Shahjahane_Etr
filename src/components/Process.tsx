"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Share Requirement",
    description: "Provide your manpower needs, project scope, and timelines.",
  },
  {
    num: "02",
    title: "Source & Screen",
    description: "Our network sources candidates with rigorous technical and medical screening.",
  },
  {
    num: "03",
    title: "Shortlist & Approve",
    description: "Review a curated shortlist of verified professionals for your approval.",
  },
  {
    num: "04",
    title: "Deployment",
    description: "Complete mobilization, visa processing, and seamless site deployment.",
  }
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
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
    <section className="bg-shahjahane-light py-16 sm:py-24 md:py-32 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 sm:mb-20 md:mb-28 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-shahjahane-navy mb-4 sm:mb-6 tracking-tight"
          >
            Our Process
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-slate-600 text-base sm:text-lg md:text-xl font-light"
          >
            A streamlined, transparent methodology ensuring precise deployment at every stage.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-[44px] left-[40px] right-[40px] h-[2px] bg-slate-200" />
          <motion.div 
            className="hidden lg:block absolute top-[44px] left-[40px] h-[2px] bg-shahjahane-gold origin-left"
            style={{ scaleX: pathLength, width: 'calc(100% - 80px)' }}
          />

          {/* Mobile connecting line */}
          <div className="lg:hidden absolute top-[32px] bottom-[32px] left-[31px] sm:left-[39px] w-[2px] bg-slate-200" />
          <motion.div 
            className="lg:hidden absolute top-[32px] left-[31px] sm:left-[39px] w-[2px] bg-shahjahane-gold origin-top"
            style={{ scaleY: pathLength, height: 'calc(100% - 64px)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="relative flex flex-row lg:flex-col items-start lg:items-center group"
              >
                {/* Node */}
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full bg-white border-3 sm:border-4 border-shahjahane-light shadow-md flex items-center justify-center relative z-10 mr-5 sm:mr-8 lg:mr-0 lg:mb-6 group-hover:border-shahjahane-gold/30 transition-colors duration-500">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-shahjahane-navy group-hover:text-shahjahane-gold transition-colors duration-500">
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col pt-1 sm:pt-2 lg:pt-0 lg:text-center flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-shahjahane-navy mb-2 sm:mb-3 group-hover:text-shahjahane-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
