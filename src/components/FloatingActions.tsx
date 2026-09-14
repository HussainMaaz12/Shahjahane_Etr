"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "@/components/SocialIcons";

export default function FloatingActions() {
  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <motion.a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Shahjahane on WhatsApp"
        whileHover={{ y: -3, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-emerald-600 text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)] backdrop-blur-md transition-colors hover:bg-emerald-500 sm:h-13 sm:w-13"
      >
        <WhatsAppIcon className="h-5 w-5" />
        
        {/* Subtle tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-black/10 bg-black/85 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100 hidden sm:block">
          Direct WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
