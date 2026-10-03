import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { site } from "@/lib/site";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Enterprise Workforce & Manpower Solutions`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
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
    title: `${site.name} | Enterprise Workforce & Manpower Solutions`,
    description: site.description,
    url: site.url,
    siteName: site.legalName,
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/hero-enterprise.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} - Enterprise Workforce Solutions`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Enterprise Workforce & Manpower Solutions`,
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
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  image: `${site.url}/images/hero-enterprise.jpg`,
  description: site.description,
  telephone: site.phoneUae,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.addressUaeLines.join(" "),
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  sameAs: [
    site.social.instagram,
    site.social.facebook,
    site.social.youtube,
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
