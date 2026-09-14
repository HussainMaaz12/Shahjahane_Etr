import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <article className="container-premium max-w-3xl pt-28 pb-20 sm:pt-36">
      <p className="eyebrow mb-4">Legal</p>
      <h1 className="mb-6 font-serif text-4xl font-bold text-ink">Terms of Service</h1>
      <div className="space-y-5 text-sm leading-relaxed text-navy-mid/85 sm:text-base">
        <p>
          This website is provided by {site.legalName} for information and
          business enquiries. Content is not a binding offer of manpower until
          confirmed in a written contract, purchase order, or mobilisation
          agreement.
        </p>
        <p>
          Workforce supply is subject to screening outcomes, visa and
          immigration rules, medical fitness, and client site requirements.
          Photographs are representative of the environments we serve.
        </p>
        <p>
          Questions:{" "}
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
