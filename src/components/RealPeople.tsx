"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { MotionLink } from "@/components/MotionControls";
import AbstractBackground from "@/components/AbstractBackground";

export default function RealPeople() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <AbstractBackground variant="shapes" />

      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative h-[340px] overflow-hidden rounded-2xl border border-white/80 p-2 shadow-[0_20px_50px_rgba(10,10,10,0.08)] bg-white/50 backdrop-blur-md sm:h-[420px] lg:h-[500px]">
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                src="/images/workforce.jpg"
                alt="Document-verified and medically cleared Shahjahane workforce deployed on an active site"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-black/80 p-5 shadow-2xl backdrop-blur-xl sm:bottom-8 sm:left-8 sm:max-w-xs text-white">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <div className="font-serif text-3xl font-bold">100%</div>
              </div>
              <div className="text-xs font-normal leading-relaxed text-white/80">
                Medically cleared and document-verified before mobilisation
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-900/15 bg-blue-50/70 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-[11px] font-semibold tracking-[0.24em] text-blue uppercase">
                Workforce Standards
              </span>
            </div>
            <h2 className="mb-5 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              The bench behind the bid.
            </h2>
            <p className="mb-5 text-base font-normal leading-relaxed text-navy-mid sm:text-lg">
              Shahjahane is not a database dump. Every professional is screened
              for role competence, medical fitness, and workplace readiness —
              then matched to your operation.
            </p>
            <p className="mb-8 text-base font-normal leading-relaxed text-navy-mid sm:text-lg">
              From construction sites to hotel floors and packaging lines, the
              people we send are expected to represent your brand on day one.
            </p>
            <MotionLink href="#contact" className="btn-outline">
              Brief our team
            </MotionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
