"use client";

import { motion } from "framer-motion";
import { Maximize, ShieldCheck, Globe, Zap, Sliders } from "lucide-react";

const valueProps = [
  {
    title: "Scalability",
    description: "Rapidly ramp up workforce numbers to meet the evolving demands of large-scale projects without compromising quality.",
    icon: Maximize,
  },
  {
    title: "Reliable Workforce",
    description: "Extensively vetted, medically cleared, and highly trained professionals ensuring consistent performance on-site.",
    icon: ShieldCheck,
  },
  {
    title: "International Reach",
    description: "Seamless sourcing and deployment across key markets including the UAE, Saudi Arabia, Qatar, Yemen, and Europe.",
    icon: Globe,
  },
  {
    title: "Fast Coordination",
    description: "Streamlined logistics, visa processing, and mobilization protocols to accelerate your project timelines.",
    icon: Zap,
  },
  {
    title: "Flexible Deployment",
    description: "Tailored short-term and long-term manpower contracts designed to align perfectly with your operational requirements.",
    icon: Sliders,
  }
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <section className="bg-white py-16 sm:py-24 md:py-32 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-shahjahane-navy mb-4 sm:mb-6 tracking-tight"
          >
            Why Shahjahane
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-slate-600 text-base sm:text-lg md:text-xl font-light"
          >
            Delivering unparalleled technical services built on a foundation of trust, speed, and uncompromising scale.
          </motion.p>
        </div>

        {/* 5-Card Grid layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8 justify-center"
        >
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative bg-shahjahane-light rounded-xl p-6 sm:p-8 lg:p-10 transition-all duration-500 ease-[0.22,1,0.36,1] hover:shadow-[0_20px_40px_rgba(11,34,66,0.06)] hover:-translate-y-1 overflow-hidden border border-slate-100/50"
              >
                {/* Accent Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-shahjahane-gold/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 group-hover:bg-shahjahane-gold/10 transition-all duration-700 ease-[0.22,1,0.36,1]" />
                
                {/* Icon Container */}
                <div className="relative mb-5 sm:mb-8 w-11 h-11 sm:w-14 sm:h-14 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center transform group-hover:-translate-y-1 transition-transform duration-500 ease-[0.22,1,0.36,1]">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-shahjahane-navy" />
                </div>

                {/* Text Content */}
                <h3 className="relative text-lg sm:text-xl md:text-2xl font-bold text-shahjahane-navy mb-2 sm:mb-4 group-hover:text-shahjahane-gold transition-colors duration-500 ease-[0.22,1,0.36,1]">
                  {prop.title}
                </h3>
                <p className="relative text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  {prop.description}
                </p>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
