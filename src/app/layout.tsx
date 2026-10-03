import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { site } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#070a10",
  width: "device-width",
  initialScale: 1,
};

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: site.canonicalUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/images/logo.png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.canonicalUrl,
    siteName: site.legalName,
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/hero-enterprise.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} - Manpower Supply & Workforce Solutions UAE`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/hero-enterprise.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: site.name,
  legalName: site.legalName,
  url: site.canonicalUrl,
  logo: `${site.url}/images/logo.png`,
  image: `${site.url}/images/hero-enterprise.jpg`,
  description: site.description,
  telephone: site.phoneUae,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Nabaesi BLDG, Office No. 03, Reego Road, Deira",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  identifier: {
    "@type": "PropertyValue",
    name: "UAE Trade License",
    value: site.tradeLicense,
  },
  sameAs: [
    site.social.youtube,
    site.social.instagram,
    site.social.facebook,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${outfit.variable} ${cormorant.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
