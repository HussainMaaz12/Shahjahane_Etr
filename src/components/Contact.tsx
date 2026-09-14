"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  User,
  Users2,
  X,
} from "lucide-react";
import { site } from "@/lib/site";
import AbstractBackground from "@/components/AbstractBackground";

interface CategoryDefinition {
  id: string;
  name: string;
  roles: string[];
}

const laborCategories: CategoryDefinition[] = [
  {
    id: "construction",
    name: "Construction Labour",
    roles: [
      "Masons",
      "Steel Fixers",
      "Shuttering Carpenters",
      "General Helpers",
      "Scaffolders",
      "Electricians",
      "Plumbers",
      "Riggers",
      "Site Supervisors",
    ],
  },
  {
    id: "hotel",
    name: "Hotel & Hospitality",
    roles: [
      "Housekeeping Crew",
      "Front Office",
      "F&B Stewards / Waiters",
      "Kitchen Stewards",
      "Commis Chefs",
      "Bellboys",
      "Laundry Attendants",
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Packaging",
    roles: [
      "Assembly Line Workers",
      "Packing Crews",
      "Quality Checkers",
      "Machine Operators",
      "Warehouse Pickers",
      "Forklift Operators",
    ],
  },
  {
    id: "technical",
    name: "MEP & Technical Services",
    roles: [
      "HVAC Technicians",
      "Pipe Fitters",
      "Industrial Electricians",
      "Maintenance Crews",
    ],
  },
  {
    id: "logistics",
    name: "Logistics & Warehousing",
    roles: [
      "Material Handlers",
      "Inventory Clerks",
      "Loading Crews",
      "Dispatch Assistants",
    ],
  },
];

const headcountOptions = ["10–50", "50–200", "200–500", "500+"];

export default function Contact() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("construction");
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Masons", "Steel Fixers"]);
  const [headcount, setHeadcount] = useState<string>("50–200");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // Listen for custom labor category selection from Hero shortcuts
  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const matched = laborCategories.find((cat) => cat.id === customEvent.detail);
      if (matched) {
        setSelectedCategoryId(matched.id);
        // Pre-select first two roles from matched category
        setSelectedRoles(matched.roles.slice(0, 2));
      }
    };

    window.addEventListener("select-labor-category", handleSelectCategory);
    return () => {
      window.removeEventListener("select-labor-category", handleSelectCategory);
    };
  }, []);

  const currentCategory =
    laborCategories.find((cat) => cat.id === selectedCategoryId) || laborCategories[0];

  const handleCategorySwitch = (catId: string) => {
    setSelectedCategoryId(catId);
  };

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const removeRole = (role: string) => {
    setSelectedRoles((prev) => prev.filter((r) => r !== role));
  };

  // Build the live auto-generated workforce brief
  const generatedBrief = `${currentCategory.name} — ${headcount} personnel${
    selectedRoles.length > 0 ? ` — Roles: ${selectedRoles.join(", ")}` : ""
  }`;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const company = data.get("company")?.toString() || "Enterprise Client";
    const name = data.get("name")?.toString() || "";
    const email = data.get("email")?.toString() || "";
    const phone = data.get("phone")?.toString() || "";

    const fullRequirementBody = [
      `WORKFORCE REQUIREMENT BRIEF:`,
      generatedBrief,
      `Headcount: ${headcount}`,
      `Category: ${currentCategory.name}`,
      `Selected Roles: ${selectedRoles.length > 0 ? selectedRoles.join(", ") : "General crew"}`,
      additionalNotes ? `Additional Specifications:\n${additionalNotes}` : "",
      `\nCONTACT DETAILS:`,
      `Full Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
    ]
      .filter(Boolean)
      .join("\n");

    const subject = encodeURIComponent(`Manpower Brief: ${currentCategory.name} — ${company}`);
    const mailtoBody = encodeURIComponent(fullRequirementBody);

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${mailtoBody}`;
    setSent(true);
    setIsSubmitting(false);
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-[#070a10] py-12 sm:py-16 lg:py-20 text-white">
      <AbstractBackground variant="dark" />

      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Corporate Office Coordinates & Direct Desk */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 backdrop-blur-md">
                <span className="text-[11px] font-semibold tracking-[0.24em] text-blue-300 uppercase">
                  Procurement Desk
                </span>
              </div>
              <h2 className="mb-5 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Mobilise your workforce.
              </h2>
              <p className="mb-8 text-sm font-normal leading-relaxed text-white/70 sm:text-base">
                Configure your manpower requirement directly. Sourced in India,
                mobilised through Dubai, and delivered to your site or facility.
              </p>

              <div className="space-y-6 border-t border-white/10 pt-6 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-blue-400" />
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                      Direct Email
                    </div>
                    <a href={`mailto:${site.email}`} className="font-medium text-white hover:text-blue-300 transition-colors">
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-blue-400" />
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                      Operational Lines
                    </div>
                    <a href={site.phoneUaeHref} className="block text-white hover:text-blue-300 transition-colors">
                      UAE: {site.phoneUae}
                    </a>
                    <a href={site.phoneIndiaHref} className="block text-white hover:text-blue-300 transition-colors mt-0.5">
                      India: {site.phoneIndia}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-400" />
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                      Regional Commands
                    </div>
                    <p className="text-white/80">{site.addressUae}</p>
                    <p className="text-white/60 text-xs mt-1">{site.addressIndia}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/60">
              <div className="flex items-center gap-2 font-medium text-white/90">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Enterprise SLA Compliance</span>
              </div>
              <p className="mt-1 leading-relaxed text-[11px]">
                Pre-screened talent bench. Medically certified and document verified prior to site departure.
              </p>
            </div>
          </div>

          {/* Right Column: Executive Manpower Requirement Console */}
          <div className="lg:col-span-8">
            <div className="glass-glow-behind">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border border-white/15 bg-[#0c121e]/90 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-9"
              >
                {/* Console Top Header */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                  <div>
                    <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
                      Executive Requirement Console
                    </h3>
                    <p className="text-xs text-white/60">
                      Step 1: Select sector and workforce roles
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Direct Desk Active</span>
                  </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Category Selector Tabs (Horizontally Scrollable) */}
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold tracking-wider text-white/70 uppercase">
                      1. Select Manpower Vertical
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                      {laborCategories.map((cat) => {
                        const isSelected = cat.id === selectedCategoryId;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleCategorySwitch(cat.id)}
                            className={`flex shrink-0 items-center rounded-xl px-4 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "border border-blue-400 bg-blue-600 text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)]"
                                : "border border-white/10 bg-white/[0.04] text-white/75 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                            }`}
                          >
                            <span>{cat.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Role Chips (Multiselect) */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-[11px] font-semibold tracking-wider text-white/70 uppercase">
                        2. Select Required Trade Roles (Multi-select)
                      </label>
                      <span className="text-[11px] text-blue-300">
                        {selectedRoles.length} selected
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {currentCategory.roles.map((role) => {
                        const isSelected = selectedRoles.includes(role);
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => toggleRole(role)}
                            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "border border-blue-400 bg-blue-500/20 text-blue-200 ring-1 ring-blue-400/40"
                                : "border border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:text-white hover:bg-white/[0.06]"
                            }`}
                          >
                            <span>{role}</span>
                            {isSelected ? (
                              <CheckCircle2 className="h-3 w-3 text-blue-300" />
                            ) : (
                              <span className="text-white/30 text-xs">+</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Roles Preview Tag Cloud */}
                  {selectedRoles.length > 0 && (
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="mb-1.5 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                        Selected Workforce Bench:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedRoles.map((role) => (
                          <span
                            key={role}
                            className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white"
                          >
                            <span>{role}</span>
                            <button
                              type="button"
                              onClick={() => removeRole(role)}
                              aria-label={`Remove ${role}`}
                              className="text-white/50 hover:text-white"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Headcount Selection */}
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold tracking-wider text-white/70 uppercase">
                      3. Estimated Headcount
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {headcountOptions.map((opt) => {
                        const isSelected = headcount === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setHeadcount(opt)}
                            className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "border-blue-400 bg-blue-600/30 text-white ring-1 ring-blue-400/50"
                                : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            <Users2 className="h-3.5 w-3.5 opacity-60" />
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Auto-Generated Summary Banner */}
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3.5 text-xs text-blue-200">
                    <div className="flex items-center gap-1.5 font-semibold text-white">
                      <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                      <span>Auto-Generated Requirement Summary:</span>
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-blue-100">
                      {generatedBrief}
                    </div>
                  </div>

                  {/* Corporate Contact Credentials */}
                  <div className="border-t border-white/10 pt-5">
                    <div className="mb-3 text-[11px] font-semibold tracking-wider text-white/70 uppercase">
                      4. Procurement Officer &amp; Entity Details
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-white/70">
                          Full Name *
                        </label>
                        <div className="relative mt-1.5">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            required
                            name="name"
                            placeholder="e.g. Tariq Al Mansoori"
                            className="w-full rounded-xl border border-white/15 bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-400 focus:bg-white/[0.08]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-white/70">
                          Company / Project Entity *
                        </label>
                        <div className="relative mt-1.5">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            required
                            name="company"
                            placeholder="e.g. Apex Infrastructure LLC"
                            className="w-full rounded-xl border border-white/15 bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-400 focus:bg-white/[0.08]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-white/70">
                          Corporate Email *
                        </label>
                        <div className="relative mt-1.5">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            required
                            type="email"
                            name="email"
                            placeholder="t.mansoori@company.com"
                            className="w-full rounded-xl border border-white/15 bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-400 focus:bg-white/[0.08]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-white/70">
                          Phone Number *
                        </label>
                        <div className="relative mt-1.5">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            required
                            name="phone"
                            placeholder="+971 50 000 0000"
                            className="w-full rounded-xl border border-white/15 bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-400 focus:bg-white/[0.08]"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-white/70">
                          Additional Project Timeline or Specific Notes
                        </label>
                        <textarea
                          name="notes"
                          rows={3}
                          value={additionalNotes}
                          onChange={(e) => setAdditionalNotes(e.target.value)}
                          placeholder="Mobilisation date, site location, accommodation or special certifications needed..."
                          className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-400 focus:bg-white/[0.08]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Executive CTA Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(37,99,235,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(37,99,235,0.5)] hover:brightness-110 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      <span>Transmit Manpower Brief</span>
                      <ChevronRight className="h-4 w-4 opacity-60" />
                    </button>

                    {sent && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-xs text-emerald-300"
                      >
                        Your mail client will open with the configured brief. You can also write directly to{" "}
                        <span className="font-semibold text-white">{site.email}</span>.
                      </motion.div>
                    )}
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
