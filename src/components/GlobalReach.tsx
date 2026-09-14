"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Globe, Landmark, MapPin } from "lucide-react";
import AbstractBackground from "@/components/AbstractBackground";

interface LocationItem {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  desktopPlacement: "top" | "left" | "right" | "bottom";
  featured?: boolean;
  summary: string;
}

const locations: LocationItem[] = [
  {
    id: "europe",
    name: "Europe",
    role: "Deployment",
    x: 34.8,
    y: 24.6,
    desktopPlacement: "top",
    summary: "Active deployment across industrial, infrastructure, and technical projects.",
  },
  {
    id: "saudi",
    name: "Saudi Arabia",
    role: "GCC",
    x: 49.5,
    y: 44.5,
    desktopPlacement: "left",
    summary: "Large-scale manpower mobilisation for infrastructure and civil developments.",
  },
  {
    id: "qatar",
    name: "Qatar",
    role: "GCC",
    x: 54.0,
    y: 38.0,
    desktopPlacement: "top",
    summary: "Turnkey workforce deployment across hospitality and facility sectors.",
  },
  {
    id: "uae",
    name: "UAE Headquarters",
    role: "HQ",
    x: 58.5,
    y: 43.5,
    desktopPlacement: "right",
    featured: true,
    summary: "Central executive management, client delivery, and visa logistics in Dubai.",
  },
  {
    id: "india",
    name: "India Hub",
    role: "Sourcing",
    x: 79.5,
    y: 46.8,
    desktopPlacement: "bottom",
    featured: true,
    summary: "Primary multi-state trade testing and document screening centres.",
  },
];

const hubs = [
  {
    icon: Landmark,
    title: "India Hub",
    role: "Primary Sourcing",
    copy: "Screened labour, hospitality talent, and verified trade testing centres.",
  },
  {
    icon: Building2,
    title: "UAE Headquarters",
    role: "Operational Command",
    copy: "Mobilisation, visas, compliance, and client delivery from Dubai.",
  },
  {
    icon: Globe,
    title: "Europe & GCC",
    role: "Strategic Corridors",
    copy: "Active deployments across Europe, Saudi Arabia, Qatar, and the wider Gulf.",
  },
];

export default function GlobalReach() {
  const [activeLocationId, setActiveLocationId] = useState<string>("uae");
  const activeLocation = locations.find((l) => l.id === activeLocationId) || locations[3];

  return (
    <section id="global-reach" className="relative overflow-hidden bg-black py-10 sm:py-14 lg:py-16">
      <AbstractBackground variant="dark" />

      <div className="container-premium relative z-10">
        {/* Compact, Restrained Section Header */}
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 backdrop-blur-md">
            <span className="text-xs">🌐</span>
            <span className="text-[11px] font-semibold tracking-[0.24em] text-blue-300 uppercase">
              Global Corridors
            </span>
          </div>
          <h2 className="mb-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Command of the corridor.
          </h2>
          <p className="text-sm font-normal text-white/70 sm:text-base">
            Talent sourced from India. Mobilised from the UAE. Deployed across the GCC and Europe.
          </p>
        </div>

        {/* Widescreen Deliberate Map Container */}
        <div className="relative mx-auto h-[260px] sm:h-[360px] lg:h-[420px] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#070b12] shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
          <Image
            src="/images/global-map.jpg"
            alt="Global operations map spanning Europe, GCC, and India"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover opacity-85"
            priority={false}
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-[#070b12]/30 pointer-events-none" />

          {/* Desktop & Mobile Interactive Location Pins */}
          {locations.map((loc) => {
            const isSelected = loc.id === activeLocationId;

            // Desktop label placement styles to strictly avoid overlap
            let desktopPosClass = "top-full left-1/2 -translate-x-1/2 mt-2.5";
            if (loc.desktopPlacement === "top") {
              desktopPosClass = "bottom-full left-1/2 -translate-x-1/2 mb-2.5";
            } else if (loc.desktopPlacement === "left") {
              desktopPosClass = "top-1/2 right-full -translate-y-1/2 mr-2.5";
            } else if (loc.desktopPlacement === "right") {
              desktopPosClass = "top-1/2 left-full -translate-y-1/2 ml-2.5";
            }

            return (
              <div
                key={loc.id}
                className="absolute z-20 cursor-pointer"
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                onClick={() => setActiveLocationId(loc.id)}
              >
                <div className="-translate-x-1/2 -translate-y-1/2 relative flex items-center justify-center">
                  {/* Pulse Ring */}
                  <span
                    className={`absolute inline-flex rounded-full transition-all duration-300 ${
                      isSelected
                        ? "h-7 w-7 animate-ping bg-blue-400/40"
                        : "h-5 w-5 bg-white/20"
                    }`}
                  />

                  {/* Core Radar Dot */}
                  <button
                    type="button"
                    aria-label={`Select corridor ${loc.name}`}
                    className={`relative flex items-center justify-center rounded-full border transition-all duration-300 ${
                      isSelected
                        ? "h-4 w-4 border-white bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)] ring-4 ring-blue-500/25"
                        : loc.featured
                        ? "h-3.5 w-3.5 border-white/80 bg-blue-400 hover:scale-125"
                        : "h-2.5 w-2.5 border-white/60 bg-white/90 hover:scale-125"
                    }`}
                  />

                  {/* Desktop Only Labels - Non-colliding staggered placement */}
                  <div
                    className={`hidden md:block absolute whitespace-nowrap pointer-events-none transition-all duration-300 ${desktopPosClass}`}
                  >
                    <div
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-lg ring-1 ring-white/30"
                          : "bg-black/85 text-white/90 ring-1 ring-white/15 backdrop-blur-sm"
                      }`}
                    >
                      <span>{loc.name}</span>
                      <span className="text-[9px] opacity-60">· {loc.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile-First Clean Corridor Selector */}
        <div className="mt-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar sm:justify-center">
            {locations.map((loc) => {
              const isSelected = loc.id === activeLocationId;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setActiveLocationId(loc.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)]"
                      : "border border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  <MapPin className={`h-3.5 w-3.5 ${isSelected ? "text-white" : "text-blue-400"}`} />
                  <span>{loc.name}</span>
                  {loc.featured && (
                    <span
                      className={`rounded px-1.5 py-0.2 text-[9px] font-bold uppercase ${
                        isSelected ? "bg-white/20 text-white" : "bg-blue-900/50 text-blue-300"
                      }`}
                    >
                      {loc.role}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Corridor Brief (Dynamic card below selector) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLocation.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-3 max-w-xl rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-center text-xs text-white/70 backdrop-blur-sm"
            >
              <span className="font-semibold text-white">{activeLocation.name}</span>:{" "}
              {activeLocation.summary}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Premium Dark Glass Hub Cards */}
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {hubs.map((hub, index) => {
            const Icon = hub.icon;
            return (
              <motion.div
                key={hub.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index, duration: 0.5 }}
                className="glass-card-dark rounded-2xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white">
                    <Icon className="h-5 w-5 text-blue-300" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">
                    {hub.role}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-white">{hub.title}</h3>
                <p className="text-xs font-normal leading-relaxed text-white/70 sm:text-sm">
                  {hub.copy}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
