"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const placeholderLogos = [1, 2, 3, 4, 5];

const placeholderTestimonials = [
  {
    quote: "[Testimonial content placeholder - pending actual client feedback regarding manpower deployment efficiency and quality.]",
    author: "[Client Name]",
    role: "[Project Manager]",
    company: "[Partner Company A]",
  },
  {
    quote: "[Testimonial content placeholder - pending actual client feedback regarding safety standards and technical expertise.]",
    author: "[Client Name]",
    role: "[Operations Director]",
    company: "[Partner Company B]",
  },
  {
    quote: "[Testimonial content placeholder - pending actual client feedback regarding scalability and fast coordination.]",
    author: "[Client Name]",
    role: "[Managing Director]",
    company: "[Partner Company C]",
  }
];

const placeholderCertifications = [
  "ISO 9001 Placeholder",
  "Safety Certification Placeholder",
  "Industry Standard Placeholder"
];

export default function Trust() {
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
    <section className="bg-shahjahane-light py-16 sm:py-24 md:py-32 overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-shahjahane-navy mb-4 sm:mb-6 tracking-tight"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-slate-600 text-base sm:text-lg md:text-xl font-light"
          >
            Delivering excellence to the world's most demanding projects.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-12 sm:gap-16 md:gap-24"
        >
          {/* Client Logos Row */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-16 opacity-60">
            {placeholderLogos.map((num) => (
              <div 
                key={num}
                className="h-10 sm:h-12 md:h-16 w-24 sm:w-32 md:w-44 bg-slate-300/40 rounded flex items-center justify-center"
                title="Client Logo Placeholder"
              >
                <span className="text-slate-400 font-medium text-[10px] sm:text-xs text-center px-1">Logo {num}</span>
              </div>
            ))}
          </motion.div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {placeholderTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 sm:p-8 md:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(11,34,66,0.06)] transition-all duration-500 ease-[0.22,1,0.36,1] hover:-translate-y-1 relative group"
              >
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-shahjahane-gold/20 mb-4 sm:mb-6" />
                
                <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 italic font-light">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                
                <div className="mt-auto border-t border-slate-100 pt-4 sm:pt-6">
                  <div className="font-bold text-shahjahane-navy text-sm sm:text-base">
                    {testimonial.author}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1">
                    {testimonial.role} <span className="mx-1">·</span> <span className="text-shahjahane-gold">{testimonial.company}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications Row */}
          <motion.div variants={itemVariants} className="flex flex-col items-center pt-6 sm:pt-8 border-t border-slate-200/60">
            <h3 className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 sm:mb-6">Accreditations & Standards</h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-12">
              {placeholderCertifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-200 flex items-center justify-center">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-slate-400 rounded-sm" />
                  </div>
                  <span className="text-slate-600 font-medium text-xs sm:text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
