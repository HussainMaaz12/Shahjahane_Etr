"use client";

import Link from "next/link";
import { Globe, Mail, Phone, MapPin, Link2, Share2 } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "#about" },
  { name: "Manpower Solutions", href: "#services" },
  { name: "Global Reach", href: "#global-reach" },
  { name: "Our Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Link2, href: "#", label: "LinkedIn" },
  { icon: Globe, href: "#", label: "Website" },
  { icon: Share2, href: "#", label: "Social" },
];

export default function Footer() {
  return (
    <footer className="bg-[#081930] text-slate-300 pt-14 sm:pt-20 pb-8 sm:pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 mb-12 sm:mb-16">
          
          {/* Column 1: Brand & Info — full width on mobile */}
          <div className="flex flex-col col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-shahjahane-gold rounded-sm flex items-center justify-center text-shahjahane-navy font-bold text-lg sm:text-xl transition-transform group-hover:scale-105">
                S
              </div>
              <div className="font-bold text-lg sm:text-xl tracking-tight text-white">
                Shahjahane<br/>
                <span className="text-[10px] sm:text-xs font-normal text-slate-400 tracking-wide uppercase">Technical Services</span>
              </div>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 max-w-xs">
              The premier workforce provider for global operations, sourcing and screening skilled manpower at scale.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-shahjahane-gold hover:text-shahjahane-navy transition-colors duration-300"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 sm:mb-6 uppercase tracking-wider text-[11px] sm:text-xs">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-slate-400 hover:text-shahjahane-gold transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: UAE Contact & Email */}
          <div>
            <h4 className="text-white font-semibold mb-4 sm:mb-6 uppercase tracking-wider text-[11px] sm:text-xs">UAE Office</h4>
            <ul className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-shahjahane-gold shrink-0 mt-0.5" />
                <span>[UAE Address Placeholder, Dubai]</span>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-shahjahane-gold shrink-0" />
                <a href="tel:#" className="hover:text-white transition-colors">[+971 00 000 0000]</a>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3 mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-white/10">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-shahjahane-gold shrink-0" />
                <a href="mailto:info@shahjahane.com" className="hover:text-white transition-colors">info@shahjahane.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: India Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 sm:mb-6 uppercase tracking-wider text-[11px] sm:text-xs">India Office</h4>
            <ul className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-shahjahane-gold shrink-0 mt-0.5" />
                <span>[India Address Placeholder, Mumbai]</span>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-shahjahane-gold shrink-0" />
                <a href="tel:#" className="hover:text-white transition-colors">[+91 00 0000 0000]</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Shahjahane Technical Services LLC. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
