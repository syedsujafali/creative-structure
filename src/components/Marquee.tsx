const ITEMS = [
  "Home Renovations",
  "Additions",
  "Kitchens & Baths",
  "Roofing",
  "Siding & Exteriors",
  "Finish Carpentry",
  "Small Commercial",
];

/** Spectrum band separating the hero from the editorial content. */
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-label="What we build"
      className="surface-spectrum relative overflow-hidden"
    >
      <span className="grain pointer-events-none absolute inset-0" />

      <div className="relative flex py-4 md:py-5">
        <div className="marquee items-center gap-8 md:gap-12">
          {row.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-8 md:gap-12"
            >
              <span className="whitespace-nowrap font-display text-[0.72rem] font-medium uppercase tracking-[0.26em] text-paper/85 md:text-[0.8rem]">
                {item}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-bronze" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
