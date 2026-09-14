"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import AbstractBackground from "@/components/AbstractBackground";

function Counter({
  from = 0,
  to,
  suffix = "",
  duration = 2.0,
}: {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
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
  }, [from, to, suffix, duration, inView]);

  return (
    <span ref={nodeRef}>
      {from}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 98, suffix: "%", label: "On-time mobilisation rate", detail: "GCC & international operations" },
  { value: 24, suffix: "h", label: "Shortlist turnaround", detail: "Pre-screened trade bench" },
  { value: 3, suffix: "", label: "Core manpower verticals", detail: "Construction · Hotel · Industry" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#070b12] py-8 sm:py-11">
      <AbstractBackground variant="dark" />

      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="glass-card-dark rounded-2xl p-6 text-center transition-all duration-300 hover:border-white/20"
            >
              <div className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm font-semibold tracking-wide text-white/90">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-white/50">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
