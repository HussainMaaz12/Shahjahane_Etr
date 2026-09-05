import Image from "next/image";

const locations = [
  {
    id: "europe",
    name: "Europe",
    position: "left-[27%] md:left-[35%] top-[29%]",
    labelPosition: "left-1/2 top-full mt-2 -translate-x-1/2",
  },
  {
    id: "saudi",
    name: "Saudi Arabia",
    position: "left-[63%] md:left-[59%] top-[66%]",
    labelPosition: "right-full top-1/2 mr-2 -translate-y-1/2",
  },
  {
    id: "qatar",
    name: "Qatar",
    position: "left-[68%] md:left-[62.5%] top-[62%]",
    labelPosition: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  },
  {
    id: "uae",
    name: "UAE (HQ)",
    position: "left-[70%] md:left-[64%] top-[66%]",
    labelPosition: "left-full top-full ml-2 mt-1",
    featured: true,
  },
  {
    id: "yemen",
    name: "Yemen",
    position: "left-[63%] md:left-[59.5%] top-[73%]",
    labelPosition: "right-0 top-full mt-2",
  },
];

export default function GlobalReach() {
  return (
    <section id="global-reach" className="relative overflow-hidden bg-[#08182E] py-16 sm:py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-20">
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            Global Reach
          </h2>
          <p className="text-base font-light text-slate-300 sm:text-lg md:text-xl">
            Manpower sourced, screened and deployed at scale across key international markets.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-5xl aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-[#0a1f38] shadow-2xl sm:aspect-[3/2] sm:rounded-xl md:aspect-[2/1]">
          <Image
            src="/assets/global-reach-map.png"
            alt="Terrain map spanning Europe, the Middle East, and South Asia"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#08182E]/10" aria-hidden="true" />

          {locations.map((location) => (
            <div
              key={location.id}
              className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${location.position}`}
              aria-label={location.name}
            >
              <span
                className={`block rounded-full border-2 border-white/80 bg-shahjahane-gold shadow-[0_0_0_5px_rgba(217,167,60,0.22),0_0_18px_rgba(217,167,60,0.65)] ${location.featured ? "h-4 w-4" : "h-3 w-3"}`}
                aria-hidden="true"
              />
              <span
                className={`absolute whitespace-nowrap rounded bg-[#08182E]/95 px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-white shadow-lg ring-1 ring-white/10 sm:px-3 sm:text-[10px] ${location.labelPosition} ${location.featured ? "text-shahjahane-gold" : ""}`}
              >
                {location.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-shahjahane-blue/8 blur-[100px]" />
    </section>
  );
}
