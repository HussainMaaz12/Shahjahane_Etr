"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/site";
import { MotionLink } from "@/components/MotionControls";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-line/80 bg-white/85 shadow-[0_4px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            : "border-b border-black/[0.04] bg-white/65 backdrop-blur-md"
        }`}
      >
        <div className="container-premium">
          <div className="flex h-16 items-center justify-between sm:h-20">
                        <Link href="/" className="flex flex-shrink-0 items-center gap-3.5 sm:gap-4 group">
              <div className="relative flex h-11 w-11 items-center justify-center sm:h-[50px] sm:w-[50px] lg:h-[54px] lg:w-[54px] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Shahjahane Technical Services official corporate logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-base font-bold tracking-[0.12em] text-[#0284c7] uppercase sm:text-lg lg:text-xl leading-none transition-colors group-hover:text-[#0369a1]">
                  Shahjahane
                </div>
                <div className="text-[10px] font-semibold tracking-[0.2em] text-[#152038] uppercase sm:text-[11px] lg:text-xs mt-1 sm:mt-1.5 leading-none">
                  Technical Services
                </div>
              </div>
            </Link>

                        <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    const hash = link.href.includes("#") ? link.href.split("#")[1] : "";
                    if (hash && typeof window !== "undefined" && window.location.pathname === "/") {
                      const targetEl = document.getElementById(hash);
                      if (targetEl) {
                        e.preventDefault();
                        targetEl.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className="text-xs font-medium tracking-wider text-slate-700 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:text-blue cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

                        <div className="hidden lg:block">
              <MotionLink href="#contact" className="btn-primary py-2.5 text-xs tracking-wide uppercase">
                Request manpower
              </MotionLink>
            </div>

                        <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-ink lg:hidden rounded-lg hover:bg-black/5 cursor-pointer transition-transform hover:scale-105"
              aria-label="Toggle mobile navigation menu"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

            <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-white/95 backdrop-blur-2xl sm:top-20 lg:hidden"
          >
            <div className="flex min-h-full flex-col justify-between px-6 py-8">
              <nav id="mobile-navigation" className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        const hash = link.href.includes("#") ? link.href.split("#")[1] : "";
                        if (hash && typeof window !== "undefined" && window.location.pathname === "/") {
                          const targetEl = document.getElementById(hash);
                          if (targetEl) {
                            e.preventDefault();
                            targetEl.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                      }}
                      className="block border-b border-line py-4 text-xl font-medium text-ink transition-colors hover:text-blue"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="pt-6">
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full justify-center py-4 text-sm"
                >
                  Request manpower
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
