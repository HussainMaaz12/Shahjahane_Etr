"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
            {/* Brand Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-xs font-bold tracking-tight text-white sm:h-10 sm:w-10 shadow-sm transition-transform duration-300 group-hover:scale-105">
                ST
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold tracking-[0.16em] text-ink uppercase sm:text-base">
                  Shahjahane
                </div>
                <div className="text-[10px] font-semibold tracking-[0.2em] text-steel uppercase sm:text-[11px]">
                  Technical Services
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-medium tracking-wider text-slate-700 uppercase transition-colors hover:text-blue"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Direct CTA */}
            <div className="hidden lg:block">
              <MotionLink href="#contact" className="btn-primary py-2.5 text-xs tracking-wide uppercase">
                Request manpower
              </MotionLink>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-ink lg:hidden rounded-lg hover:bg-black/5"
              aria-label="Toggle mobile navigation menu"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
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
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block border-b border-line py-4 text-xl font-medium text-ink"
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
