import Image from "next/image";
import Link from "next/link";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/SocialIcons";

const socials = [
  { icon: YouTubeIcon, href: site.social.youtube, label: "YouTube" },
  { icon: InstagramIcon, href: site.social.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: site.social.facebook, label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white/65">
      <div className="container-premium pt-16 pb-8 sm:pt-20">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-5 flex items-center gap-3.5 group">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1 sm:h-12 sm:w-12 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="Shahjahane Technical Services official corporate logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-base font-bold tracking-[0.12em] text-[#38bdf8] uppercase sm:text-lg transition-colors group-hover:text-white leading-none">
                  Shahjahane
                </div>
                <div className="text-[10px] font-semibold tracking-[0.2em] text-white/80 uppercase sm:text-[11px] mt-1 leading-none">
                  Technical Services
                </div>
              </div>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed font-light">
              {site.tagline}
            </p>
            <div className="flex gap-2.5">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Official Shahjahane on ${social.label}`}
                    title={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white hover:text-black cursor-pointer shadow-sm"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold tracking-[0.22em] text-white uppercase">
              Navigate
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold tracking-[0.22em] text-white uppercase">
              Dubai Office
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <span>{site.addressUae}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <a href={site.phoneUaeHref} className="hover:text-white">
                  {site.phoneUae}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold tracking-[0.22em] text-white uppercase">
              India Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <a href={site.phoneIndiaHref} className="hover:text-white">
                  {site.phoneIndia}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <Link
                  href="/"
                  className="hover:text-white"
                >
                  {site.website}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[11px] sm:flex-row sm:text-xs">
          <p>
            © 2026 {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
