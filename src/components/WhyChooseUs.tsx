"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Globe, Layers, Timer, Users } from "lucide-react";
import AbstractBackground from "@/components/AbstractBackground";

const valueProps = [
  {
    title: "Scale on demand",
    description:
      "Ramp crews from tens to thousands without losing screening standards or site discipline.",
    icon: Layers,
  },
  {
    title: "Vetted workforce",
    description:
      "Medical, document, and role-fit checks before a professional reaches your site, hotel, or plant.",
    icon: BadgeCheck,
  },
  {
    title: "International corridor",
    description:
      "UAE headquarters with India sourcing and GCC–Europe deployment pathways.",
    icon: Globe,
  },
  {
    title: "Rapid mobilisation",
    description:
      "Visa, logistics, and onboarding protocols designed for project-critical timelines.",
    icon: Timer,
  },
  {
    title: "Flexible contracts",
    description:
      "Short-term surge labour or multi-year enterprise agreements, structured to your operation.",
    icon: Users,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#090d16] py-12 sm:py-16 lg:py-20 text-white">
      <AbstractBackground variant="dark" />

      <div className="container-premium relative z-10">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 backdrop-blur-md">
            <span className="text-[11px] font-semibold tracking-[0.24em] text-blue-300 uppercase">
              Why Shahjahane
            </span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Built like an institution.
          </h2>
          <p className="text-base font-normal text-white/70 sm:text-lg">
            The operating standard enterprise clients expect from a long-term
            manpower partner.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className={`glass-card-dark rounded-2xl p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] ${
                  index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-blue-300 shadow-inner">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2.5 font-serif text-2xl font-bold text-white tracking-tight">
                  {prop.title}
                </h3>
                <p className="text-sm font-normal leading-relaxed text-white/70">
                  {prop.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
