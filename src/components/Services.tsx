"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Factory, HardHat, Hotel } from "lucide-react";
import Image from "next/image";
import AbstractBackground from "@/components/AbstractBackground";

const services = [
  {
    id: "construction",
    title: "Construction labour",
    image: "/images/service-construction.jpg",
    icon: HardHat,
    roleTags: "Masons · Carpenters · Steel Fixers · General Labour",
    description:
      "Skilled and unskilled labour for building, infrastructure, and site operations — masons, carpenters, steel fixers, helpers, and general construction crews.",
  },
  {
    id: "hotel",
    title: "Hotel management manpower",
    image: "/images/service-hospitality.jpg",
    icon: Hotel,
    roleTags: "F&B · Front Desk · Housekeeping · Kitchen Stewarding",
    description:
      "Hospitality teams for hotels and resorts — front office, housekeeping, F&B service, kitchen support, and hotel operations staff.",
  },
  {
    id: "manufacturing",
    title: "Manufacturing & packaging",
    image: "/images/service-manufacturing.jpg",
    icon: Factory,
    roleTags: "Packers · Assembly · Machine Operators · Quality Support",
    description:
      "Production, packing, and plant manpower for manufacturing and packaging lines — operators, packers, quality support, and warehouse crews.",
  },
];

export default function Services() {
  const handleEnquire = (categoryId: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-labor-category", { detail: categoryId })
      );
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden bg-paper py-12 sm:py-16 lg:py-20">
      <AbstractBackground variant="light" />

      <div className="container-premium relative z-10">
        <div className="mb-8 flex max-w-3xl flex-col sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-900/15 bg-blue-50/60 px-3.5 py-1 w-fit backdrop-blur-sm">
            <span className="text-[11px] font-semibold tracking-[0.24em] text-blue uppercase">
              Capabilities
            </span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Three verticals. One workforce partner.
          </h2>
          <p className="text-base font-normal leading-relaxed text-navy-mid sm:text-lg">
            Construction labour, hotel management manpower, and manufacturing
            &amp; packaging teams — sourced, screened, and deployed to site.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -6 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-line bg-white/90 shadow-[0_16px_45px_rgba(10,10,10,0.05)] backdrop-blur-md transition-all duration-300 hover:border-blue-300/80 hover:shadow-[0_20px_50px_rgba(30,79,154,0.09)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Subtle role tags overlay badge */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block rounded-lg border border-white/20 bg-black/65 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                      {service.roleTags}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white shadow-sm transition-colors group-hover:bg-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEnquire(service.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-all duration-300 hover:scale-110 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] cursor-pointer"
                    >
                      <span className="sr-only">Enquire about {service.title}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="mb-2 font-serif text-2xl font-bold text-ink">
                    {service.title}
                  </h3>

                  <p className="text-sm font-normal leading-relaxed text-navy-mid mb-5">
                    {service.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleEnquire(service.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue hover:text-blue-700 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>Request manpower</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
