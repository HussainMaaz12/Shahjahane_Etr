"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Send,
  ShieldCheck,
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

const commonCountries = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Kuwait",
  "Bahrain",
  "India",
  "Israel",
  "Germany",
  "United Kingdom",
];

interface FormErrors {
  company?: string;
  contactPerson?: string;
  businessEmail?: string;
  phone?: string;
  country?: string;
  requiredLocation?: string;
  projectRequirement?: string;
}

interface SubmittedSummary {
  company: string;
  contactPerson: string;
  businessEmail: string;
  phone: string;
  country: string;
  requiredLocation: string;
  category: string;
  workersRequired: string;
  selectedRoles: string[];
  projectNotes?: string;
  projectRequirement?: string;
  submittedAt: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("construction");
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Masons", "Steel Fixers"]);
  const [headcount, setHeadcount] = useState<string>("50–200");

  const [company, setCompany] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [businessEmail, setBusinessEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [country, setCountry] = useState<string>("United Arab Emirates");
  const [requiredLocation, setRequiredLocation] = useState<string>("");
  const [projectNotes, setProjectNotes] = useState<string>("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedSummary | null>(null);

  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const matched = laborCategories.find((cat) => cat.id === customEvent.detail);
      if (matched) {
        setSelectedCategoryId(matched.id);
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

  const generatedBrief = `${currentCategory.name} — ${headcount} personnel${
    selectedRoles.length > 0 ? ` — Roles: ${selectedRoles.join(", ")}` : ""
  }`;

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!company.trim()) {
      newErrors.company = "Company name is required.";
    } else if (company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters.";
    }

    if (!contactPerson.trim()) {
      newErrors.contactPerson = "Contact person name is required.";
    } else if (contactPerson.trim().length < 2) {
      newErrors.contactPerson = "Name must be at least 2 characters.";
    }

    if (!businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required.";
    } else if (!EMAIL_REGEX.test(businessEmail.trim())) {
      newErrors.businessEmail = "Please enter a valid business email address.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone or WhatsApp number is required.";
    } else if (phone.trim().length < 7) {
      newErrors.phone = "Please enter a valid phone number (minimum 7 digits).";
    }

    if (!country.trim()) {
      newErrors.country = "Deployment country is required.";
    }

    if (!requiredLocation.trim()) {
      newErrors.requiredLocation = "Required deployment location or site is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const compiledRequirement = [
      selectedRoles.length > 0
        ? `Selected Roles: ${selectedRoles.join(", ")}`
        : "Selected Roles: General deployment crew",
      projectNotes.trim() ? `Project Notes:\n${projectNotes.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const payload = {
      company: company.trim(),
      contactPerson: contactPerson.trim(),
      businessEmail: businessEmail.trim(),
      phone: phone.trim(),
      country: country.trim(),
      requiredLocation: requiredLocation.trim(),
      category: currentCategory.name,
      workersRequired: headcount,
      selectedRoles: selectedRoles.length > 0 ? selectedRoles : ["General deployment crew"],
      projectNotes: projectNotes.trim(),
      projectRequirement: compiledRequirement,
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to transmit enquiry. Please try again.");
      }

      const now = new Date();
      const formattedDate =
        now.toLocaleString("en-GB", {
          timeZone: "Asia/Dubai",
          dateStyle: "full",
          timeStyle: "medium",
        }) + " (GST / Dubai)";

      setSubmittedData({
        ...payload,
        submittedAt: data.reference?.submittedAt || formattedDate,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again or write directly to " + site.email;
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setSubmittedData(null);
    setServerError(null);
    setErrors({});
    setCompany("");
    setContactPerson("");
    setBusinessEmail("");
    setPhone("");
    setRequiredLocation("");
    setProjectNotes("");
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-[#070a10] py-12 sm:py-16 lg:py-20 text-white">
      <AbstractBackground variant="dark" />

      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
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
                mobilised through Dubai, and delivered to your site or facility across the GCC and Europe.
              </p>

              <div className="space-y-6 border-t border-white/10 pt-6 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-blue-400" />
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                      Configured Business Email
                    </div>
                    <a
                      href={`mailto:${site.email}`}
                      className="font-medium text-white hover:text-blue-300 transition-colors"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-blue-400" />
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                      Direct Contact Numbers
                    </div>
                    <a href={site.phoneUaeHref} className="block text-white hover:text-blue-300 transition-colors">
                      UAE: {site.phoneUae}
                    </a>
                    <a href={site.phoneIndiaHref} className="block text-white hover:text-blue-300 transition-colors mt-0.5">
                      India Contact: {site.phoneIndia}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-400" />
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                      Dubai Office
                    </div>
                    <p className="text-white/80">{site.addressUaeLines[0]}</p>
                    <p className="text-white/80">{site.addressUaeLines[1]}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="mt-1 h-4 w-4 shrink-0 text-blue-400" />
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                      Website &amp; Trade License
                    </div>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-white hover:text-blue-300 transition-colors"
                    >
                      {site.website}
                    </a>
                    <p className="text-xs text-white/50 mt-0.5">
                      UAE License No: {site.tradeLicense}
                    </p>
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

                    <div className="lg:col-span-8">
            <div className="glass-glow-behind">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border border-white/15 bg-[#0c121e]/90 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-9"
              >
                                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                  <div>
                    <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
                      Request Manpower Enquiry
                    </h3>
                    <p className="text-xs text-white/60">
                      Submit your enterprise workforce requirement directly to our procurement desk
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Direct Desk Active</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {submittedData ? (
                                        <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="py-4"
                    >
                      <div className="mx-auto max-w-xl text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                          <CheckCircle2 className="h-9 w-9" />
                        </div>
                        <h4 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          Enquiry Successfully Transmitted
                        </h4>
                        <p className="mt-2 text-sm text-white/70">
                          Thank you, <span className="font-semibold text-white">{submittedData.contactPerson}</span>.
                          Your manpower enquiry has been sent immediately to{" "}
                          <span className="font-semibold text-blue-400">{site.email}</span>.
                        </p>
                      </div>

                                            <div className="mt-6 rounded-xl border border-white/15 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6">
                        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
                            <ShieldCheck className="h-4 w-4" />
                            <span>Transmitted Enquiry Record</span>
                          </div>
                          <span className="text-[11px] text-white/50">
                            {submittedData.submittedAt}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3.5 text-xs sm:grid-cols-2">
                          <div>
                            <span className="text-white/50">Company:</span>
                            <p className="font-semibold text-white">{submittedData.company}</p>
                          </div>
                          <div>
                            <span className="text-white/50">Contact Person:</span>
                            <p className="font-semibold text-white">{submittedData.contactPerson}</p>
                          </div>
                          <div>
                            <span className="text-white/50">Business Email:</span>
                            <p className="font-medium text-white">{submittedData.businessEmail}</p>
                          </div>
                          <div>
                            <span className="text-white/50">Phone / WhatsApp:</span>
                            <p className="font-medium text-white">{submittedData.phone}</p>
                          </div>
                          <div>
                            <span className="text-white/50">Deployment Country:</span>
                            <p className="font-medium text-white">{submittedData.country}</p>
                          </div>
                          <div>
                            <span className="text-white/50">Required Location:</span>
                            <p className="font-medium text-white">{submittedData.requiredLocation}</p>
                          </div>
                          <div>
                            <span className="text-white/50">Manpower Category:</span>
                            <p className="font-medium text-blue-300">{submittedData.category}</p>
                          </div>
                          <div>
                            <span className="text-white/50">Workers Required:</span>
                            <p className="font-semibold text-white">{submittedData.workersRequired}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-white/50">Selected Trade Roles:</span>
                            <p className="font-medium text-blue-200">
                              {submittedData.selectedRoles && submittedData.selectedRoles.length > 0
                                ? submittedData.selectedRoles.join(", ")
                                : "General deployment crew"}
                            </p>
                          </div>
                        </div>

                        {(submittedData.projectNotes || submittedData.projectRequirement) && (
                          <div className="mt-4 border-t border-white/10 pt-3">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                              Project / Requirement Details:
                            </span>
                            <p className="mt-1 whitespace-pre-wrap rounded-lg bg-black/40 p-3 text-xs leading-relaxed text-white/80">
                              {submittedData.projectNotes || submittedData.projectRequirement}
                            </p>
                          </div>
                        )}
                      </div>

                                            <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-xs text-blue-200">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                        <div>
                          <span className="font-semibold text-white">Next Steps:</span> Shahjahane&apos;s executive
                          mobilisation team will review your role requirements, verified candidate pool, and trade
                          testing schedules. You will receive an initial response within 24 hours.
                        </div>
                      </div>

                                            <div className="mt-6 flex justify-center">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-white/20 active:scale-95 cursor-pointer"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span>Submit Another Requirement</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                                        <form onSubmit={onSubmit} className="space-y-6">
                      {serverError && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300"
                        >
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                          <div>{serverError}</div>
                        </motion.div>
                      )}

                                            <div>
                        <label className="mb-2 block text-[11px] font-semibold tracking-wider text-white/70 uppercase">
                          1. Select Manpower Category
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

                                            <div>
                        <label className="mb-2 block text-[11px] font-semibold tracking-wider text-white/70 uppercase">
                          3. Workers Required / Estimated Headcount
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

                                            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3.5 text-xs text-blue-200">
                        <div className="flex items-center gap-1.5 font-semibold text-white">
                          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                          <span>Live Requirement Configuration:</span>
                        </div>
                        <div className="mt-1 font-mono text-[11px] text-blue-100">
                          {generatedBrief}
                        </div>
                      </div>

                                            <div className="border-t border-white/10 pt-5">
                        <div className="mb-3 text-[11px] font-semibold tracking-wider text-white/70 uppercase">
                          4. Company, Contact &amp; Deployment Details
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div>
                            <label className="block text-xs font-medium text-white/70">
                              Company / Project Entity *
                            </label>
                            <div className="relative mt-1.5">
                              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                              <input
                                value={company}
                                onChange={(e) => {
                                  setCompany(e.target.value);
                                  if (errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
                                }}
                                placeholder="e.g. Apex Infrastructure LLC"
                                className={`w-full rounded-xl border bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors ${
                                  errors.company
                                    ? "border-rose-500 focus:border-rose-400"
                                    : "border-white/15 focus:border-blue-400 focus:bg-white/[0.08]"
                                }`}
                              />
                            </div>
                            {errors.company && (
                              <p className="mt-1 text-[11px] text-rose-400">{errors.company}</p>
                            )}
                          </div>

                                                    <div>
                            <label className="block text-xs font-medium text-white/70">
                              Contact Person *
                            </label>
                            <div className="relative mt-1.5">
                              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                              <input
                                value={contactPerson}
                                onChange={(e) => {
                                  setContactPerson(e.target.value);
                                  if (errors.contactPerson) setErrors((prev) => ({ ...prev, contactPerson: undefined }));
                                }}
                                placeholder="e.g. Tariq Al Mansoori"
                                className={`w-full rounded-xl border bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors ${
                                  errors.contactPerson
                                    ? "border-rose-500 focus:border-rose-400"
                                    : "border-white/15 focus:border-blue-400 focus:bg-white/[0.08]"
                                }`}
                              />
                            </div>
                            {errors.contactPerson && (
                              <p className="mt-1 text-[11px] text-rose-400">{errors.contactPerson}</p>
                            )}
                          </div>

                                                    <div>
                            <label className="block text-xs font-medium text-white/70">
                              Business Email *
                            </label>
                            <div className="relative mt-1.5">
                              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                              <input
                                type="email"
                                value={businessEmail}
                                onChange={(e) => {
                                  setBusinessEmail(e.target.value);
                                  if (errors.businessEmail) setErrors((prev) => ({ ...prev, businessEmail: undefined }));
                                }}
                                placeholder="t.mansoori@company.com"
                                className={`w-full rounded-xl border bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors ${
                                  errors.businessEmail
                                    ? "border-rose-500 focus:border-rose-400"
                                    : "border-white/15 focus:border-blue-400 focus:bg-white/[0.08]"
                                }`}
                              />
                            </div>
                            {errors.businessEmail && (
                              <p className="mt-1 text-[11px] text-rose-400">{errors.businessEmail}</p>
                            )}
                          </div>

                                                    <div>
                            <label className="block text-xs font-medium text-white/70">
                              Phone / WhatsApp *
                            </label>
                            <div className="relative mt-1.5">
                              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                              <input
                                value={phone}
                                onChange={(e) => {
                                  setPhone(e.target.value);
                                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                                }}
                                placeholder="+971 50 000 0000"
                                className={`w-full rounded-xl border bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors ${
                                  errors.phone
                                    ? "border-rose-500 focus:border-rose-400"
                                    : "border-white/15 focus:border-blue-400 focus:bg-white/[0.08]"
                                }`}
                              />
                            </div>
                            {errors.phone && (
                              <p className="mt-1 text-[11px] text-rose-400">{errors.phone}</p>
                            )}
                          </div>

                                                    <div>
                            <label className="block text-xs font-medium text-white/70">
                              Country *
                            </label>
                            <div className="relative mt-1.5">
                              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                              <input
                                list="country-suggestions"
                                value={country}
                                onChange={(e) => {
                                  setCountry(e.target.value);
                                  if (errors.country) setErrors((prev) => ({ ...prev, country: undefined }));
                                }}
                                placeholder="e.g. United Arab Emirates"
                                className={`w-full rounded-xl border bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors ${
                                  errors.country
                                    ? "border-rose-500 focus:border-rose-400"
                                    : "border-white/15 focus:border-blue-400 focus:bg-white/[0.08]"
                                }`}
                              />
                              <datalist id="country-suggestions">
                                {commonCountries.map((c) => (
                                  <option key={c} value={c} />
                                ))}
                              </datalist>
                            </div>
                            {errors.country && (
                              <p className="mt-1 text-[11px] text-rose-400">{errors.country}</p>
                            )}
                          </div>

                                                    <div>
                            <label className="block text-xs font-medium text-white/70">
                              Required Location / Site *
                            </label>
                            <div className="relative mt-1.5">
                              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                              <input
                                value={requiredLocation}
                                onChange={(e) => {
                                  setRequiredLocation(e.target.value);
                                  if (errors.requiredLocation) setErrors((prev) => ({ ...prev, requiredLocation: undefined }));
                                }}
                                placeholder="e.g. Dubai Marina / Riyadh Industrial City"
                                className={`w-full rounded-xl border bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors ${
                                  errors.requiredLocation
                                    ? "border-rose-500 focus:border-rose-400"
                                    : "border-white/15 focus:border-blue-400 focus:bg-white/[0.08]"
                                }`}
                              />
                            </div>
                            {errors.requiredLocation && (
                              <p className="mt-1 text-[11px] text-rose-400">{errors.requiredLocation}</p>
                            )}
                          </div>

                                                    <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-white/70">
                              Project / Requirement Specifications
                            </label>
                            <textarea
                              rows={3}
                              value={projectNotes}
                              onChange={(e) => setProjectNotes(e.target.value)}
                              placeholder="Project duration, expected mobilization date, trade certifications, accommodation terms..."
                              className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-400 focus:bg-white/[0.08]"
                            />
                          </div>
                        </div>
                      </div>

                                            <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(37,99,235,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(37,99,235,0.5)] hover:brightness-110 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin text-white" />
                              <span>Transmitting Manpower Brief...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                              <span>Transmit Manpower Brief</span>
                              <ChevronRight className="h-4 w-4 opacity-60" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
