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
  metadataBase: new URL("https://shahjahane.com"),
  title: {
    default: `${site.name} | Enterprise Manpower`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "construction labour supply",
    "hotel management manpower",
    "manufacturing manpower",
    "packaging industry staffing",
    "manpower supply UAE",
    "GCC workforce",
  ],
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    images: [{ url: "/images/hero-enterprise.jpg" }],
  },
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
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
