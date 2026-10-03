import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy and data handling practices for ${site.legalName}. Learn how client enquiries and workforce data are protected.`,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: `Privacy Policy | ${site.shortName}`,
    description: `Privacy policy and data handling practices for ${site.legalName}.`,
    url: `${site.url}/privacy`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Privacy Policy | ${site.shortName}`,
    description: `Privacy policy and data handling practices for ${site.legalName}.`,
  },
};

export default function PrivacyPage() {
  return (
    <article className="container-premium max-w-3xl pt-28 pb-20 sm:pt-36">
      <p className="eyebrow mb-4">Legal</p>
      <h1 className="mb-6 font-serif text-4xl font-bold text-ink">Privacy Policy</h1>
      <div className="space-y-5 text-sm leading-relaxed text-navy-mid/85 sm:text-base">
        <p>
          {site.legalName} (“we”) collects business contact details you submit
          through this website — typically name, company, email, phone, and
          manpower requirements — solely to respond to enquiries and deliver
          services.
        </p>
        <p>
          We do not sell personal data. Information may be shared with
          authorised operations staff in the UAE and India, and with
          processors required to fulfil a mobilisation (for example visa or
          travel partners), under confidentiality obligations.
        </p>
        <p>
          Enquiries:{" "}
          <a className="text-blue" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <p>
          <Link href="/" className="text-blue">
            Return home
          </Link>
        </p>
      </div>
    </article>
  );
}
