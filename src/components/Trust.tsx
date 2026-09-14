"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Quote, ShieldCheck } from "lucide-react";
import AbstractBackground from "@/components/AbstractBackground";

const clients = ["Gulf Infra", "Palm Hotels", "Northline Pack", "Qasir Group", "Helix Build"];

const testimonials = [
  {
    quote:
      "Construction crews arrived documented, inducted, and productive. Mobilisation was treated like a programme, not a recruitment job.",
    author: "Projects Director",
    company: "Infrastructure Contractor, UAE",
  },
  {
    quote:
      "Housekeeping and F&B coverage stayed stable through peak season. The hotel never felt understaffed.",
    author: "General Manager",
    company: "Hospitality Group, GCC",
  },
  {
    quote:
      "Packing-line operators and warehouse crews were role-fit and reliable on shift. Procurement and plant both signed off.",
    author: "Plant Operations Manager",
    company: "Manufacturing & Packaging Client",
  },
];

const certifications = ["ISO 9001 Quality", "ISO 45001 Safety", "Licensed Recruitment"];

export default function Trust() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-mist py-12 sm:py-16 lg:py-20">
      <AbstractBackground variant="subtle" />

      <div className="container-premium relative z-10">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-900/15 bg-blue-50/70 px-3.5 py-1 backdrop-blur-sm">
            <span className="text-[11px] font-semibold tracking-[0.24em] text-blue uppercase">
              Trust &amp; Compliance
            </span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            The standard of a prime contractor.
          </h2>
          <p className="text-base font-normal text-navy-mid sm:text-lg">
            Delivery language that procurement, HSE, and the board already understand.
          </p>
        </div>

        {/* Client Partner Badges */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 sm:mb-10">
          {clients.map((client) => (
            <div
              key={client}
              className="rounded-full border border-line/90 bg-white/80 px-6 py-2.5 text-xs font-semibold tracking-[0.18em] text-slate-700 uppercase backdrop-blur-sm shadow-sm transition-colors hover:border-slate-400"
            >
              {client}
            </div>
          ))}
        </div>

        {/* Verified Enterprise Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="relative flex flex-col justify-between rounded-2xl border border-line/80 bg-white/85 p-7 shadow-[0_12px_35px_rgba(10,10,10,0.04)] backdrop-blur-md transition-all duration-300 hover:border-blue-300 hover:shadow-[0_18px_45px_rgba(30,79,154,0.08)] sm:p-8"
            >
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <Quote className="h-6 w-6 text-blue-600/30" />
                  <span className="inline-flex items-center gap-1 rounded-md border border-emerald-600/20 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    <BadgeCheck className="h-3 w-3 text-emerald-600" />
                    <span>Verified Client</span>
                  </span>
                </div>
                <p className="mb-8 text-sm font-normal leading-relaxed text-navy-mid sm:text-base">
                  “{item.quote}”
                </p>
              </div>

              <footer className="border-t border-line/60 pt-4">
                <div className="font-semibold text-ink text-sm">{item.author}</div>
                <div className="mt-0.5 text-xs text-steel">{item.company}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Certifications Strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-line pt-8">
          {certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-800 uppercase sm:text-sm">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
