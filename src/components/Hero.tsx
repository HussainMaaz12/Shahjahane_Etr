"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Clock, Globe2, Sparkles } from "lucide-react";
import { MotionLink } from "@/components/MotionControls";
import AbstractBackground from "@/components/AbstractBackground";

const laborShortcuts = [
  { id: "construction", label: "Construction" },
  { id: "hotel", label: "Hotel Manpower" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "technical", label: "Technical / MEP" },
];

export default function Hero() {
  const handleShortcutClick = (categoryId: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-labor-category", { detail: categoryId })
      );
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesEl = document.getElementById("services");
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-paper pt-16 sm:pt-20 lg:pt-24">
      <AbstractBackground variant="hero" />

      <div className="container-premium relative z-10 grid items-center gap-10 py-8 sm:py-10 lg:grid-cols-12 lg:gap-12 lg:py-12">
                <div className="lg:col-span-6">
                    <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-blue-900/15 bg-blue-50/70 px-3.5 py-1 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-600 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>
            <span className="text-[11px] font-semibold tracking-[0.24em] text-blue uppercase">
              UAE · GCC · Europe · India
            </span>
          </motion.div>

                    <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 font-serif text-[2.75rem] leading-[1.04] font-bold tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]"
          >
            Workforce at{" "}
            <br />
            <span className="text-gradient-blue font-semibold">
              enterprise scale.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 max-w-xl text-base font-normal leading-relaxed text-navy-mid sm:text-lg"
          >
            Construction labour, hotel management manpower, and manufacturing
            &amp; packaging teams — screened and deployed for enterprise
            operations.
          </motion.p>

                    <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <MotionLink href="#contact" className="btn-primary">
              Request manpower
              <ArrowUpRight className="h-4 w-4" />
            </MotionLink>
            <MotionLink href="#services" onClick={handleScrollToServices} className="btn-ghost">
              View capabilities
              <ArrowDownRight className="h-4 w-4" />
            </MotionLink>
          </motion.div>

                    <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-xl border border-line bg-white/70 p-3.5 backdrop-blur-md"
          >
            <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-steel uppercase">
              <Sparkles className="h-3.5 w-3.5 text-blue" />
              <span>Direct workforce procurement:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {laborShortcuts.map((shortcut) => (
                <button
                  key={shortcut.id}
                  type="button"
                  onClick={() => handleShortcutClick(shortcut.id)}
                  className="group flex items-center rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-50 hover:text-blue hover:shadow-[0_4px_14px_rgba(37,99,235,0.15)] active:scale-95 cursor-pointer"
                >
                  <span>{shortcut.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

                <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
                    <div className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/60 bg-white/40 p-2 shadow-[0_24px_60px_rgba(10,10,10,0.1)] backdrop-blur-xl sm:min-h-[460px] lg:min-h-[560px]">
            <div className="relative h-full w-full min-h-[340px] overflow-hidden rounded-xl sm:min-h-[440px] lg:min-h-[540px]">
              <Image
                src="/images/hero-enterprise.jpg"
                alt="Enterprise infrastructure operations by Shahjahane Technical Services"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            </div>

                        <div className="pointer-events-none absolute top-6 right-6 hidden sm:block">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/75 px-3.5 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-md"
              >
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                <span>24-Hour Shortlist Turnaround</span>
              </motion.div>
            </div>

            <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex flex-col gap-2.5 sm:right-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/80 px-4 py-2.5 text-xs font-medium text-white shadow-xl backdrop-blur-md"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>100% Medical &amp; Document Verification</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/80 px-4 py-2 text-[11px] font-medium text-white/90 shadow-xl backdrop-blur-md"
              >
                <Globe2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <span>Sourced in India · Deployed in UAE &amp; GCC</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

            <div className="relative z-10 border-t border-line bg-white/80 backdrop-blur-md">
        <div className="container-premium grid grid-cols-2 gap-6 py-5 sm:grid-cols-4 sm:py-7">
          {[
            ["18+", "Years operating"],
            ["45K+", "Professionals deployed"],
            ["120+", "Enterprise clients"],
            ["5", "Operating regions"],
          ].map(([value, label], idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="relative pl-3 sm:pl-4 border-l border-line"
            >
              <div className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {value}
              </div>
              <div className="mt-1 text-[11px] font-medium tracking-[0.16em] text-steel uppercase">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
