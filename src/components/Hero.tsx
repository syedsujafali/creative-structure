import { cn } from "@/utils/cn";
import { IMG } from "@/data/site";
import { useParallax } from "@/lib/motion";
import { ArrowDown, ArrowUpRight, scrollToId } from "./ui";

const LINE_1 = ["Crafted", "Spaces."];
const LINE_2 = ["Built", "With", "Care."];

/**
 * Split hero: type column on navy, image column bleeding to the right edge,
 * with a dark red rail tying the two together.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const parallax = useParallax<HTMLDivElement>(0.12);

  return (
    <section
      id="home"
      className="theme-iris relative isolate overflow-hidden bg-ink pt-[4.75rem] md:pt-[5.5rem]"
    >
      {/* ambient — layered jewel light */}
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_80%_at_18%_0%,rgba(168,126,79,.14)_0%,transparent_60%)]" />
      <span className="pointer-events-none absolute -right-[12%] top-[4%] h-[48vh] w-[48vh] rounded-full bg-[radial-gradient(circle,rgba(201,162,115,.12)_0%,transparent_66%)]" />

      <div className="shell relative">
        <div className="grid items-stretch gap-0 lg:grid-cols-12">
          {/* ---------- Type column ---------- */}
          <div className="relative flex flex-col justify-center py-10 sm:py-14 lg:col-span-6 lg:min-h-[78svh] lg:py-20 lg:pr-14 xl:col-span-6">
            <div
              className={cn(
                "flex items-center gap-3 transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)]",
                ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: "120ms" }}
            >
              <span className="glow-rule h-px w-8 sm:w-12" />
              <span className="t-label text-mist">
                Residential & Small Commercial · NJ
              </span>
            </div>

            <h1 className="t-display mt-6 text-paper md:mt-8">
              <span className="block">
                {LINE_1.map((w, i) => (
                  <span
                    key={w}
                    className={cn(
                      "word-mask mr-[0.2em] last:mr-0",
                      ready && "in",
                    )}
                  >
                    <span style={{ transitionDelay: `${220 + i * 80}ms` }}>
                      {w}
                    </span>
                  </span>
                ))}
              </span>
              <span className="block">
                {LINE_2.map((w, i) => (
                  <span
                    key={w}
                    className={cn(
                      "word-mask mr-[0.2em] last:mr-0",
                      ready && "in",
                    )}
                  >
                    <span
                      className={cn(w === "Care." && "serif grad-text")}
                      style={{ transitionDelay: `${380 + i * 80}ms` }}
                    >
                      {w}
                    </span>
                  </span>
                ))}
              </span>
            </h1>

            <p
              className={cn(
                "t-lead mt-6 max-w-[42ch] text-mist transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] md:mt-8",
                ready ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
              )}
              style={{ transitionDelay: "620ms" }}
            >
              Construction and renovation for New Jersey homes and small
              businesses — built with quality craftsmanship and clear
              communication.
            </p>

            <div
              className={cn(
                "mt-8 flex flex-col gap-2.5 transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] sm:flex-row md:mt-10",
                ready ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
              )}
              style={{ transitionDelay: "720ms" }}
            >
              <button
                type="button"
                onClick={() => scrollToId("#contact")}
                className="btn btn-primary group w-full sm:w-auto"
              >
                Request an Estimate
                <span className="nudge">
                  <ArrowUpRight />
                </span>
              </button>
              <button
                type="button"
                onClick={() => scrollToId("#projects")}
                className="btn btn-ghost w-full sm:w-auto"
              >
                View Our Work
              </button>
            </div>
          </div>

          {/* ---------- Image column ---------- */}
          <div className="relative lg:col-span-6 xl:col-span-6">
            {/* red rail */}
            <span
              className={cn(
                "absolute -left-3 top-0 hidden w-px bg-gradient-to-b from-transparent via-bronze to-transparent transition-all duration-[1400ms] ease-[cubic-bezier(.32,.72,0,1)] lg:block",
                ready ? "bottom-0 opacity-70" : "bottom-full opacity-0",
              )}
            />

            <div
              className={cn(
                "relative -mx-[1.375rem] h-[52svh] overflow-hidden transition-opacity duration-1000 sm:-mx-7 sm:h-[58svh] md:-mx-11 lg:mx-0 lg:h-full lg:min-h-[78svh] xl:-mr-[4.5rem]",
                ready ? "opacity-100" : "opacity-0",
              )}
            >
              <div
                ref={parallax}
                className="absolute -inset-y-[6%] inset-x-0"
              >
                <picture>
                  <source media="(max-width: 767px)" srcSet={IMG.heroMobile} />
                  <img
                    src={IMG.hero}
                    alt={IMG.heroAlt}
                    fetchPriority="high"
                    className={cn(
                      "h-full w-full object-cover object-[58%_58%] saturate-[0.78] transition-transform duration-[1800ms] ease-[cubic-bezier(.32,.72,0,1)] lg:object-[50%_60%]",
                      ready ? "scale-100" : "scale-[1.12]",
                    )}
                  />
                </picture>
              </div>
              <span className="absolute inset-0 bg-[#3a2f22] opacity-35 mix-blend-color" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/10 lg:to-transparent" />
              <span className="grain absolute inset-0" />
            </div>
          </div>
        </div>

        {/* ---------- Bottom index strip ---------- */}
        <div
          className={cn(
            "relative flex items-center justify-between gap-6 border-t border-mist/18 py-5 transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] md:py-6",
            ready ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
          style={{ transitionDelay: "820ms" }}
        >
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5 sm:gap-x-9">
            {["Renovations", "Additions", "Roofing", "Exteriors"].map((m, i) => (
              <li
                key={m}
                className="flex items-center gap-2.5 font-display text-[0.6rem] uppercase tracking-[0.2em] text-mist sm:text-[0.65rem] sm:tracking-[0.22em]"
              >
                {i > 0 && (
                  <span className="hidden h-1 w-1 rotate-45 bg-bronze/70 sm:block" />
                )}
                {m}
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label="Scroll to next section"
            onClick={() => scrollToId("#about")}
            className="group hidden shrink-0 items-center gap-3 text-mist transition-colors duration-500 hover:text-paper md:flex"
          >
            <span className="font-display text-[0.62rem] uppercase tracking-[0.22em]">
              Scroll
            </span>
            <ArrowDown className="transition-transform duration-500 group-hover:translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
