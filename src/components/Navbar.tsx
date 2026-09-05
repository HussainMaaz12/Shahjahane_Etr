"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "About Us", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-shahjahane-navy/95 backdrop-blur-xl border-b border-white/5 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-shahjahane-gold rounded-sm flex items-center justify-center text-shahjahane-navy font-bold text-lg sm:text-xl transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-105">
              S
            </div>
            <div className="font-bold text-lg sm:text-xl tracking-tight text-white">
              Shahjahane<br/>
              <span className="text-[10px] sm:text-xs font-normal text-slate-300 tracking-wide uppercase">Technical Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-shahjahane-gold ${
                  isScrolled ? "text-slate-300" : "text-white/90"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ease: [0.22, 1, 0.36, 1] as const, duration: 0.4 }}
              className="bg-shahjahane-gold text-shahjahane-navy font-semibold px-7 py-2.5 rounded-sm hover:bg-shahjahane-gold-hover transition-colors shadow-sm"
            >
              Request Manpower
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-shahjahane-gold transition-colors focus:outline-none p-1"
              aria-label="Toggle mobile menu"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        </div>

      </header>

      {isMounted && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-shahjahane-navy/98 backdrop-blur-xl sm:top-20 lg:hidden"
            >
              <div className="flex min-h-full flex-col justify-between px-6 py-8 sm:px-8 sm:py-10">
                <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block border-b border-white/10 py-3 text-2xl font-light text-white transition-colors hover:text-shahjahane-gold focus:text-shahjahane-gold focus:outline-none"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-shahjahane-gold text-shahjahane-navy font-semibold px-6 py-4 rounded-sm hover:bg-shahjahane-gold-hover transition-colors text-center text-lg"
                  >
                    Request Manpower
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
