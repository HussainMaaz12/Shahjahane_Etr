interface AbstractBackgroundProps {
  variant?: "light" | "dark" | "hero" | "technical" | "subtle" | "shapes";
  className?: string;
}

export default function AbstractBackground({
  variant = "subtle",
  className = "",
}: AbstractBackgroundProps) {
  const isDark = variant === "dark";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      {/* 1. Base technical grid overlay */}
      <div
        className={`absolute inset-0 ${
          isDark ? "bg-grid-pattern-dark opacity-70" : "bg-grid-pattern opacity-50"
        }`}
      />

      {/* 2. Distinct Light-Color Abstract Geometric Shapes (used selectively, not everywhere) */}
      {variant === "hero" && (
        <>
          {/* Light-colored abstract tilted rounded geometric plane */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:-right-16 h-[380px] w-[380px] sm:h-[480px] sm:w-[480px] rounded-[48px] border border-blue-200/60 bg-gradient-to-tr from-blue-100/40 via-sky-50/30 to-transparent rotate-[14deg] shadow-[0_20px_60px_rgba(59,130,246,0.06)]" />

          {/* Secondary concentric geometric ring */}
          <div className="absolute top-1/3 -left-16 h-[320px] w-[320px] rounded-full border border-blue-300/30 bg-blue-50/20" />
          <div className="absolute top-1/3 -left-8 h-[240px] w-[240px] rounded-full border border-dashed border-sky-300/25" />

          {/* Floating light pill shape */}
          <div className="absolute bottom-16 right-1/4 h-14 w-44 rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-50/60 to-transparent -rotate-6" />

          {/* Soft ambient light glows */}
          <div className="absolute -top-24 -left-20 h-[380px] w-[380px] rounded-full bg-blue-400/10 blur-[90px]" />
          <div className="absolute top-1/4 right-0 h-[360px] w-[360px] rounded-full bg-sky-300/15 blur-[100px]" />
        </>
      )}

      {variant === "light" && (
        <>
          {/* Subtle light-blue geometric accent shape in Services */}
          <div className="absolute -top-16 -right-12 h-[340px] w-[340px] rounded-[40px] border border-blue-200/50 bg-gradient-to-bl from-blue-100/35 via-slate-50/20 to-transparent rotate-[-12deg]" />
          <div className="absolute -bottom-10 left-10 h-[260px] w-[260px] rounded-full border border-blue-200/40 bg-sky-50/30" />
        </>
      )}

      {variant === "shapes" && (
        <>
          {/* Soft light geometric quadrant / polygon in RealPeople */}
          <div className="absolute top-1/4 -right-10 h-[360px] w-[360px] rounded-[52px] border border-blue-200/50 bg-gradient-to-br from-sky-100/40 via-blue-50/20 to-transparent rotate-[18deg]" />
          <div className="absolute -bottom-12 left-1/4 h-[220px] w-[220px] rounded-full border border-dashed border-blue-300/30" />
        </>
      )}

      {/* 3. Architectural coordinate crosses (+) */}
      <div
        className={`absolute top-4 left-4 font-mono text-[10px] select-none tracking-widest ${
          isDark ? "text-white/15" : "text-black/15"
        }`}
      >
        +
      </div>
      <div
        className={`absolute top-4 right-4 font-mono text-[10px] select-none tracking-widest ${
          isDark ? "text-white/15" : "text-black/15"
        }`}
      >
        +
      </div>
      <div
        className={`absolute bottom-4 left-4 font-mono text-[10px] select-none tracking-widest ${
          isDark ? "text-white/15" : "text-black/15"
        }`}
      >
        +
      </div>
      <div
        className={`absolute bottom-4 right-4 font-mono text-[10px] select-none tracking-widest ${
          isDark ? "text-white/15" : "text-black/15"
        }`}
      >
        +
      </div>

      {/* 4. Fine hairline perimeter accent */}
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
          isDark ? "via-white/10" : "via-black/5"
        } to-transparent`}
      />
    </div>
  );
}
