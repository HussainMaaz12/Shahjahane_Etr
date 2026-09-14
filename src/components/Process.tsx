"use client";

import { motion } from "framer-motion";
import AbstractBackground from "@/components/AbstractBackground";

const steps = [
  {
    num: "01",
    title: "Brief",
    description: "Share headcount, roles, location, and mobilisation window.",
  },
  {
    num: "02",
    title: "Source & screen",
    description: "Role, medical, and documentation checks across our talent corridor.",
  },
  {
    num: "03",
    title: "Approve",
    description: "You review a curated shortlist. We refine until the bench is signed off.",
  },
  {
    num: "04",
    title: "Deploy",
    description: "Visa, travel, onboarding, and site induction — handled as one programme.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-ice py-12 sm:py-16 lg:py-20">
      <AbstractBackground variant="technical" />

      <div className="container-premium relative z-10">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-900/15 bg-blue-50/70 px-3.5 py-1 backdrop-blur-sm">
            <span className="text-[11px] font-semibold tracking-[0.24em] text-blue uppercase">
              Operating Model
            </span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Four steps. Zero ambiguity.
          </h2>
          <p className="text-base font-normal leading-relaxed text-navy-mid sm:text-lg">
            A mobilisation system designed for procurement, HSE, and project controls.
          </p>
        </div>

        <div className="relative">
          {/* Subtle connecting line across cards on desktop only */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent -translate-y-6 pointer-events-none z-0" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="group relative rounded-2xl border border-line/80 bg-white/85 p-7 shadow-[0_12px_35px_rgba(10,10,10,0.04)] backdrop-blur-md transition-all duration-300 hover:border-blue-300 hover:shadow-[0_16px_40px_rgba(30,79,154,0.08)]"
              >
                {/* Step number with subtle glow */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-blue-900/40 transition-colors group-hover:text-blue">
                    {step.num}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-blue-200 transition-colors group-hover:bg-blue-600" />
                </div>

                <h3 className="mb-2 font-serif text-2xl font-bold text-ink">
                  {step.title}
                </h3>
                <p className="text-sm font-normal leading-relaxed text-navy-mid">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
