"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";

function Counter({ 
  from = 0, 
  to, 
  suffix = "", 
  duration = 2.5 
}: { 
  from?: number; 
  to: number; 
  suffix?: string; 
  duration?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: [0.22, 1, 0.36, 1] as const,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, suffix, duration, inView]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

const statsData = [
  {
    value: 18,
    suffix: "+",
    label: "Years experience",
  },
  {
    value: 45,
    suffix: "K+",
    label: "Workers deployed",
  },
  {
    value: 120,
    suffix: "+",
    label: "Clients served",
  }
];

export default function Stats() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
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
    <section className="bg-shahjahane-blue py-14 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-3 gap-4 sm:gap-8 text-center"
        >
          {statsData.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <div className="text-3xl sm:text-5xl lg:text-7xl font-bold text-shahjahane-gold mb-2 sm:mb-4 tracking-tighter">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-300 text-xs sm:text-base lg:text-xl font-medium tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-shahjahane-navy/50 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-shahjahane-gold/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
