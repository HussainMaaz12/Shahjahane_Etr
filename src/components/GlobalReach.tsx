"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import AbstractBackground from "@/components/AbstractBackground";

interface LocationItem {
  id: string;
  name: string;
  mobileName?: string;
  role: string;
  mobileRole?: string;
  x: number;
  y: number;
  desktopPlacement: "top" | "left" | "right" | "bottom";
  featured?: boolean;
  summary: string;
  coords?: string;
  statusLabel?: string;
}

const locations: LocationItem[] = [
  {
    id: "uae",
    name: "UAE",
    mobileName: "UAE",
    role: "HQ / Operations",
    mobileRole: "HQ / Operations",
    x: 63.9,
    y: 49.7,
    desktopPlacement: "right",
    featured: true,
    summary: "Central operational management, visa logistics, client relations, and deployment headquarters in Dubai.",
    coords: "25.2°N 55.3°E",
    statusLabel: "Global HQ",
  },
  {
    id: "saudi",
    name: "Saudi Arabia",
    mobileName: "Saudi Arabia",
    role: "GCC",
    mobileRole: "GCC Deployment",
    x: 58.9,
    y: 50.4,
    desktopPlacement: "left",
    summary: "Large-scale manpower mobilisation for infrastructure, industrial plants, and civil developments.",
    coords: "24.7°N 46.7°E",
    statusLabel: "Mega Projects",
  },
  {
    id: "qatar",
    name: "Qatar",
    mobileName: "Qatar",
    role: "GCC",
    mobileRole: "GCC Deployment",
    x: 61.0,
    y: 48.8,
    desktopPlacement: "top",
    summary: "Turnkey workforce deployment across hospitality, facilities management, and engineering sectors.",
    coords: "25.3°N 51.5°E",
    statusLabel: "Turnkey Workforce",
  },
  {
    id: "israel",
    name: "Israel",
    mobileName: "Israel",
    role: "Corridor",
    mobileRole: "Regional Corridor",
    x: 50.9,
    y: 42.6,
    desktopPlacement: "left",
    summary: "Strategic regional deployment corridor for civil infrastructure, construction, and specialized technical trade teams.",
    coords: "31.0°N 34.8°E",
    statusLabel: "Civil Infrastructure",
  },
  {
    id: "yemen",
    name: "Yemen",
    mobileName: "Yemen",
    role: "Corridor",
    mobileRole: "Regional Corridor",
    x: 56.9,
    y: 60.3,
    desktopPlacement: "bottom",
    summary: "Regional corridor logistics, maritime trade route staffing, and regional infrastructure operations.",
    coords: "15.5°N 48.5°E",
    statusLabel: "Maritime Logistics",
  },
  {
    id: "india",
    name: "India Hub",
    mobileName: "India",
    role: "Sourcing",
    mobileRole: "Sourcing Hub",
    x: 77.5,
    y: 52.0,
    desktopPlacement: "bottom",
    featured: true,
    summary: "Primary multi-state recruitment centres, trade testing facilities, and verified document screening hubs.",
    coords: "20.5°N 78.9°E",
    statusLabel: "Primary Sourcing Hub",
  },
  {
    id: "europe",
    name: "Europe",
    mobileName: "Europe",
    role: "Deployment",
    mobileRole: "Europe Deployment",
    x: 34.0,
    y: 24.3,
    desktopPlacement: "top",
    summary: "Active skilled workforce deployment across industrial, manufacturing, and commercial infrastructure projects.",
    coords: "48.8°N 2.3°E",
    statusLabel: "Continental Reach",
  },
];

const mobileOrder = ["india", "uae", "saudi", "qatar", "israel", "yemen", "europe"];
const mobileLocations = mobileOrder.map((id) => locations.find((l) => l.id === id)!);

function GeoLocator({ id }: { id: string }) {
  const svgs: Record<string, React.ReactNode> = {
    india: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="26" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <path
          d="M50 14 C36 14 26 22 24 36 C22 46 28 54 34 62 C38 68 44 76 48 88 C52 76 58 68 62 62 C68 54 74 46 72 36 C70 22 60 14 50 14 Z"
          stroke="rgba(52,211,153,0.45)"
          strokeWidth="1.2"
          fill="rgba(16,185,129,0.08)"
        />
        <path d="M42 32 L48 44 L56 40 L52 56 L48 70" stroke="rgba(52,211,153,0.3)" strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx="48" cy="44" r="9" stroke="#34d399" strokeWidth="0.8" opacity="0.3" className="animate-ping" style={{ transformOrigin: "48px 44px" }} />
        <circle cx="48" cy="44" r="4.5" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.7" />
        <circle cx="48" cy="44" r="2.5" fill="#34d399" />
      </svg>
    ),
    uae: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="26" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <path
          d="M22 62 L32 46 L50 38 L68 34 L82 38 L76 52 L60 62 L44 66 Z"
          stroke="rgba(96,165,250,0.5)"
          strokeWidth="1.2"
          fill="rgba(59,130,246,0.08)"
        />
        <path d="M16 68 Q44 48 78 40" stroke="rgba(96,165,250,0.2)" strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx="68" cy="38" r="9" stroke="#60a5fa" strokeWidth="0.8" opacity="0.3" className="animate-ping" style={{ transformOrigin: "68px 38px" }} />
        <circle cx="68" cy="38" r="4.5" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.7" />
        <circle cx="68" cy="38" r="2.5" fill="#60a5fa" />
      </svg>
    ),
    saudi: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="26" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <path
          d="M32 20 L58 16 L76 26 L82 44 L78 66 L64 82 L46 86 L28 78 L20 58 L24 38 Z"
          stroke="rgba(251,191,36,0.45)"
          strokeWidth="1.2"
          fill="rgba(245,158,11,0.07)"
        />
        <path d="M26 40 L54 48 L70 42" stroke="rgba(251,191,36,0.25)" strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx="54" cy="48" r="9" stroke="#fbbf24" strokeWidth="0.8" opacity="0.3" className="animate-ping" style={{ transformOrigin: "54px 48px" }} />
        <circle cx="54" cy="48" r="4.5" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.7" />
        <circle cx="54" cy="48" r="2.5" fill="#fbbf24" />
      </svg>
    ),
    qatar: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="26" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <path
          d="M36 22 C48 18 60 18 64 26 C68 36 66 54 62 68 C58 78 48 84 40 80 C34 76 30 62 32 46 Z"
          stroke="rgba(251,191,36,0.5)"
          strokeWidth="1.2"
          fill="rgba(245,158,11,0.08)"
        />
        <path d="M24 78 Q50 68 76 74" stroke="rgba(251,191,36,0.2)" strokeWidth="0.8" />
        <circle cx="56" cy="44" r="9" stroke="#fbbf24" strokeWidth="0.8" opacity="0.3" className="animate-ping" style={{ transformOrigin: "56px 44px" }} />
        <circle cx="56" cy="44" r="4.5" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.7" />
        <circle cx="56" cy="44" r="2.5" fill="#fbbf24" />
      </svg>
    ),
    israel: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="26" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <path
          d="M38 14 L56 16 L60 30 L56 52 L50 72 L44 88 L38 72 L32 50 L30 30 Z"
          stroke="rgba(167,139,250,0.5)"
          strokeWidth="1.2"
          fill="rgba(139,92,246,0.08)"
        />
        <path d="M22 84 Q48 72 74 82" stroke="rgba(167,139,250,0.2)" strokeWidth="0.8" />
        <circle cx="48" cy="42" r="9" stroke="#a78bfa" strokeWidth="0.8" opacity="0.3" className="animate-ping" style={{ transformOrigin: "48px 42px" }} />
        <circle cx="48" cy="42" r="4.5" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.7" />
        <circle cx="48" cy="42" r="2.5" fill="#a78bfa" />
      </svg>
    ),
    yemen: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="26" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <path
          d="M20 38 L42 28 L66 24 L84 32 L88 44 L76 56 L52 64 L30 62 L18 52 Z"
          stroke="rgba(167,139,250,0.5)"
          strokeWidth="1.2"
          fill="rgba(139,92,246,0.08)"
        />
        <path d="M14 68 Q50 54 86 64" stroke="rgba(167,139,250,0.2)" strokeWidth="0.8" />
        <circle cx="52" cy="42" r="9" stroke="#a78bfa" strokeWidth="0.8" opacity="0.3" className="animate-ping" style={{ transformOrigin: "52px 42px" }} />
        <circle cx="52" cy="42" r="4.5" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.7" />
        <circle cx="52" cy="42" r="2.5" fill="#a78bfa" />
      </svg>
    ),
    europe: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="26" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <path
          d="M32 18 L54 14 L68 20 L78 30 L80 44 L74 58 L62 66 L46 70 L32 62 L24 48 L22 34 Z"
          stroke="rgba(34,211,238,0.5)"
          strokeWidth="1.2"
          fill="rgba(6,182,212,0.08)"
        />
        <path d="M42 66 L44 76 L52 74" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx="52" cy="38" r="9" stroke="#22d3ee" strokeWidth="0.8" opacity="0.3" className="animate-ping" style={{ transformOrigin: "52px 38px" }} />
        <circle cx="52" cy="38" r="4.5" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.7" />
        <circle cx="52" cy="38" r="2.5" fill="#22d3ee" />
      </svg>
    ),
  };

  return (
    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      {svgs[id] || null}
    </div>
  );
}

function roleColor(role: string) {
  switch (role) {
    case "Sourcing Hub":
    case "Sourcing":
      return "bg-emerald-500/15 text-emerald-300 ring-emerald-400/25";
    case "HQ / Operations":
      return "bg-blue-500/15 text-blue-300 ring-blue-400/25";
    case "GCC Deployment":
    case "GCC":
      return "bg-amber-500/15 text-amber-300 ring-amber-400/25";
    case "Europe Deployment":
    case "Deployment":
      return "bg-cyan-500/15 text-cyan-300 ring-cyan-400/25";
    case "Regional Corridor":
    case "Corridor":
      return "bg-violet-500/15 text-violet-300 ring-violet-400/25";
    default:
      return "bg-white/10 text-white/70 ring-white/20";
  }
}

function MobileGlobalReach() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>(".mobile-snap-card");
    if (!cards.length) return;

    const scrollLeft = el.scrollLeft;
    let closestIndex = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const diff = Math.abs(card.offsetLeft - 20 - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToCard = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".mobile-snap-card");
    if (cards[index]) {
      el.scrollTo({
        left: cards[index].offsetLeft - 20,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="block lg:hidden -mx-5 sm:-mx-8">
            <div
        ref={scrollRef}
        className="mobile-snap-scroll flex gap-4 overflow-x-auto px-5 pb-5 pt-2 no-scrollbar select-none"
      >
        {mobileLocations.map((loc, i) => {
          const isActive = i === activeIndex;
          const role = loc.mobileRole || loc.role;
          const name = loc.mobileName || loc.name;

          return (
            <div
              key={loc.id}
              onClick={() => scrollToCard(i)}
              className="mobile-snap-card group relative flex-shrink-0 cursor-pointer transition-transform duration-300 active:scale-[0.99]"
              style={{ width: "calc(100vw - 84px)", maxWidth: "320px" }}
            >
              <div
                className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-500 ${
                  isActive
                    ? "border-blue-500/35 bg-gradient-to-br from-[#0c1424] via-[#090e1a] to-[#060912] shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(59,130,246,0.18)]"
                    : "border-white/10 bg-[#080c14]/90 opacity-75 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                }`}
                style={{ minHeight: "310px" }}
              >
                                <div
                  className={`pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl transition-opacity duration-700 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      role.includes("Sourcing")
                        ? "radial-gradient(circle, rgba(16,185,129,0.18), transparent 70%)"
                        : role.includes("GCC")
                        ? "radial-gradient(circle, rgba(245,158,11,0.18), transparent 70%)"
                        : "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)",
                  }}
                />

                                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                                <div className="relative z-10">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase ring-1 backdrop-blur-md transition-colors duration-300 ${roleColor(
                        role
                      )}`}
                    >
                      {role}
                    </span>
                    <GeoLocator id={loc.id} />
                  </div>

                                    <h3 className="mb-2.5 font-serif text-3xl font-bold tracking-tight text-white leading-tight">
                    {name}
                  </h3>

                                    <p className="text-sm leading-relaxed text-white/70 font-light">
                    {loc.summary}
                  </p>
                </div>

                                <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-[10px] font-medium tracking-widest text-white/40 uppercase">
                      {loc.statusLabel || (loc.featured ? "Key Market" : "Active")}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-white/30">
                    {loc.coords}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

                <div className="w-5 flex-shrink-0" aria-hidden="true" />
      </div>

            <div className="mt-2 flex items-center justify-between px-5">
        <div className="flex items-center gap-2 text-[10px] font-medium tracking-widest text-white/35 uppercase">
          <span className="h-1 w-1 rounded-full bg-blue-400/70" />
          <span>Swipe corridors</span>
        </div>

                <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold tabular-nums text-white">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <div className="relative h-[2px] w-20 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-300 ease-out"
              style={{ width: `${((activeIndex + 1) / mobileLocations.length) * 100}%` }}
            />
          </div>
          <span className="font-mono text-xs font-medium tabular-nums text-white/30">
            {String(mobileLocations.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

function DesktopGlobalReach() {
  const [activeLocationId, setActiveLocationId] = useState<string>("uae");
  const activeLocation = locations.find((l) => l.id === activeLocationId) || locations[0];

  return (
    <div className="hidden lg:block">
            <div className="relative mx-auto w-full max-w-5xl aspect-[16/9] overflow-hidden rounded-2xl border border-white/15 bg-[#070b12] shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
        <Image
          src="/images/global-map.jpg"
          alt="Shahjahane international workforce corridors and deployment destinations across Europe, the GCC, and India"
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover opacity-90"
          priority={true}
        />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b12]/60 via-transparent to-[#070b12]/30 pointer-events-none" />

                {locations.map((loc) => {
          const isSelected = loc.id === activeLocationId;

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
                                <span
                  className={`absolute inline-flex rounded-full transition-all duration-300 ${
                    isSelected
                      ? "h-7 w-7 animate-ping bg-blue-400/40"
                      : "h-5 w-5 bg-white/20"
                  }`}
                />

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
    </div>
  );
}

export default function GlobalReach() {
  return (
    <section id="global-reach" className="relative overflow-hidden bg-black py-10 sm:py-14 lg:py-16">
      <AbstractBackground variant="dark" />

      <div className="container-premium relative z-10">
                <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 backdrop-blur-md">
            <span className="text-xs">🌐</span>
            <span className="text-[11px] font-semibold tracking-[0.24em] text-blue-300 uppercase">
              Global Corridors
            </span>
          </div>
          <h2 className="mb-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Global deployment corridors.
          </h2>
          <p className="text-sm font-normal text-white/70 sm:text-base">
            Talent sourced from India. Mobilised from the UAE. Deployed across the GCC and Europe.
          </p>
        </div>

                <DesktopGlobalReach />

                <MobileGlobalReach />
      </div>
    </section>
  );
}
