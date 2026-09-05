"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Construction",
    image: "/assets/construction-site.png",
    description: "Skilled and unskilled labor for large-scale infrastructure and building projects.",
  },
  {
    title: "Technical",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Specialized technicians, electricians, and operators for complex deployments.",
  },
  {
    title: "Engineering",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Certified engineers and project managers ensuring precision and compliance.",
  }
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  };

  const cardVariants = {
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
    <section id="services" className="bg-shahjahane-light py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-16 md:mb-24 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-shahjahane-navy mb-4 sm:mb-6 tracking-tight"
          >
            Manpower solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-slate-600 text-base sm:text-lg md:text-xl font-light"
          >
            Categories of workforce supplied, sourced and screened before deployment.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group cursor-pointer bg-white rounded-xl p-3.5 sm:p-4 md:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-slate-100 relative overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-5 sm:mb-6 bg-slate-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1]"
                />
                <div className="absolute inset-0 bg-shahjahane-navy/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="px-1 sm:px-2 pb-3 sm:pb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-shahjahane-navy mb-2 sm:mb-3 group-hover:text-shahjahane-gold transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 sm:mt-6 flex items-center text-shahjahane-navy font-semibold text-sm tracking-wide group-hover:text-shahjahane-gold transition-colors duration-300">
                  <span>Explore category</span>
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
              
              {/* Bottom accent border */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-shahjahane-gold w-0 group-hover:w-full transition-all duration-500 ease-[0.22,1,0.36,1]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
