import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/SocialIcons";

const socials = [
  { icon: InstagramIcon, href: site.social.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: site.social.facebook, label: "Facebook" },
  { icon: YouTubeIcon, href: site.social.youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white/65">
      <div className="container-premium pt-16 pb-8 sm:pt-20">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
                ST
              </div>
              <div>
                <div className="text-sm font-semibold tracking-[0.16em] text-white uppercase">
                  Shahjahane
                </div>
                <div className="text-[10px] tracking-[0.2em] text-steel uppercase">
                  Technical Services
                </div>
              </div>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed font-light">
              {site.tagline}
            </p>
            <div className="flex gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white hover:text-black"
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
              UAE office
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
              India office
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <span>{site.addressIndia}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <a href={site.phoneIndiaHref} className="hover:text-white">
                  {site.phoneIndia}
                </a>
              </li>
              <li className="text-sm">
                Careers:{" "}
                <a href={`mailto:${site.careersEmail}`} className="hover:text-white">
                  {site.careersEmail}
                </a>
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
            <a href={site.whatsappHref} className="hover:text-white">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
