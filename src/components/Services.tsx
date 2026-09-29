import { useState } from "react";
import { cn } from "@/utils/cn";
import { ALL_SERVICES } from "@/data/site";
import { Reveal, Words } from "@/lib/motion";
import { ArrowUpRight, Img, SectionLabel, scrollToId } from "./ui";

/**
 * Navy service index: a numbered editorial list on the left with a synced
 * image panel on the right (desktop), stacked image cards on mobile.
 */
export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="services"
      className="theme-amethyst bloom-right sec relative overflow-hidden bg-ink"
    >
      <div className="shell relative">
        {/* heading */}
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <SectionLabel index="02">What we do</SectionLabel>
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(1.8rem,3.9vw,3rem)] font-light leading-[1.08] tracking-[-0.032em] text-paper md:mt-8">
              <Words text="Services built around real homes." />
            </h2>
          </div>
          <Reveal delay={90} className="md:col-span-5">
            <p className="t-body max-w-[44ch] text-mist md:ml-auto">
              From a single room to a full addition — the work that makes a
              property better to live in, look at and take care of.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-14">
          {/* ---------- List (desktop) ---------- */}
          <div className="hidden lg:col-span-7 lg:block">
            <ul className="border-t border-mist/18">
              {ALL_SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 60} as="li">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => scrollToId("#contact")}
                    className="group relative flex w-full items-center gap-7 border-b border-mist/18 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "wash-row pointer-events-none absolute inset-y-0 -left-6 -right-6 -z-10 transition-opacity duration-500",
                        active === i ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span
                      className={cn(
                        "t-num shrink-0 transition-colors duration-400",
                        active === i ? "glow-num" : "text-dim",
                      )}
                    >
                      {s.index}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[1.65rem] font-light tracking-[-0.028em] transition-all duration-600 ease-[cubic-bezier(.32,.72,0,1)] xl:text-[2rem]",
                        active === i
                          ? "translate-x-1.5 text-paper"
                          : "text-paper/45",
                      )}
                    >
                      {s.title}
                    </span>
                    <span
                      className={cn(
                        "ml-auto flex items-center gap-4 transition-opacity duration-500",
                        active === i ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <span className="t-small max-w-[26ch] text-right text-mist">
                        {s.copy}
                      </span>
                      <span className="glow-frame grid h-9 w-9 shrink-0 place-items-center border text-a-lit">
                        <span className="nudge">
                          <ArrowUpRight />
                        </span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* ---------- Synced image panel (desktop) ---------- */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <Reveal
                variant="image"
                className="relative aspect-[4/5] w-full overflow-hidden bg-[#1a1714]"
              >
                {ALL_SERVICES.map((s, i) => (
                  <Img
                    key={s.title}
                    src={s.image!}
                    alt={s.alt!}
                    focal={s.focal}
                    sizes="40vw"
                    priority={i === 0}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover saturate-[0.7] transition-all duration-[1100ms] ease-[cubic-bezier(.32,.72,0,1)]",
                      active === i
                        ? "scale-100 opacity-100"
                        : "scale-[1.05] opacity-0",
                    )}
                  />
                ))}
                <span className="absolute inset-0 bg-[#3a2f22] opacity-32 mix-blend-color" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,#c9a273,rgba(201,162,115,.35),transparent)]" />
              </Reveal>

              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-mist/18 pt-4">
                <span className="t-label text-paper">
                  {ALL_SERVICES[active].title}
                </span>
                <span className="t-num glow-num">
                  {ALL_SERVICES[active].index} / 06
                </span>
              </div>
            </div>
          </div>

          {/* ---------- Mobile / tablet cards ---------- */}
          <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
            {ALL_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 80}>
                <button
                  type="button"
                  onClick={() => scrollToId("#contact")}
                  className="group block w-full text-left"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1d1a18]">
                    <Img
                      src={s.image!}
                      alt={s.alt!}
                      focal={s.focal}
                      sizes="(max-width: 639px) 100vw, 46vw"
                      priority={i === 0}
                      className="h-full w-full object-cover saturate-[0.7] brightness-[0.75] transition-transform duration-[1200ms] ease-[cubic-bezier(.32,.72,0,1)] group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-[#3a2f22] opacity-38 mix-blend-color" />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                    <span className="absolute left-4 top-4 t-num glow-num">
                      {s.index}
                    </span>
                    <span className="absolute inset-x-4 bottom-4 t-h3 block text-paper">
                      {s.title}
                    </span>
                  </div>
                  <p className="t-small mt-3 max-w-[44ch] text-mist">
                    {s.copy}
                  </p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
