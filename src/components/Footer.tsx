import { ALL_SERVICES, COMPANY, NAV } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { ArrowUpRight, Monogram, scrollToId } from "./ui";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="theme-amethyst relative overflow-hidden bg-ink">
      {/* closing band */}
      <div className="theme-amethyst surface-spectrum relative overflow-hidden">
        <span className="grain pointer-events-none absolute inset-0" />
        <div className="shell relative flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between md:py-10">
          <div>
            <p className="t-label text-bronze">Ready when you are</p>
            <p className="mt-2.5 max-w-[22ch] font-display text-[1.5rem] font-light leading-[1.1] tracking-[-0.03em] text-paper sm:max-w-none md:text-[1.9rem]">
              Let's talk about what you're planning.
            </p>
          </div>
          <a
            href={`mailto:${COMPANY.email}`}
            className="btn btn-primary group w-full shrink-0 sm:w-auto"
          >
            {COMPANY.email}
            <span className="nudge">
              <ArrowUpRight />
            </span>
          </a>
        </div>
      </div>

      <div className="shell relative pt-12 md:pt-16">
        <div className="grid gap-9 border-b border-mist/18 pb-10 md:grid-cols-12 md:gap-8 md:pb-14">
          <div className="md:col-span-5 lg:col-span-4">
            <Monogram className="h-[2.4rem] w-auto md:h-[3rem]" />
            <p className="t-small mt-5 max-w-[38ch] text-mist">
              Residential and small commercial construction across New Jersey —
              renovations, additions, roofing and exterior improvements.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3 lg:col-span-8">
            <div>
              <p className="font-display text-[0.6rem] uppercase tracking-[0.24em] text-dim">
                Navigation
              </p>
              <ul className="mt-4 space-y-2.5">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(n.href);
                      }}
                      className="t-small text-mist transition-colors duration-400 hover:text-paper"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-display text-[0.6rem] uppercase tracking-[0.24em] text-dim">
                Services
              </p>
              <ul className="mt-4 space-y-2.5">
                {ALL_SERVICES.map((s) => (
                  <li key={s.title}>
                    <a
                      href="#services"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId("#services");
                      }}
                      className="t-small text-mist transition-colors duration-400 hover:text-paper"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <p className="font-display text-[0.6rem] uppercase tracking-[0.24em] text-dim">
                Service area
              </p>
              <p className="t-small mt-4 text-mist">
                {COMPANY.area}
                <br />
                Residential & small commercial
              </p>
              <p className="t-small mt-3 text-mist">{COMPANY.hours}</p>
            </div>
          </div>
        </div>

        <Reveal variant="fade" className="py-8 md:py-10">
          <span className="block select-none whitespace-nowrap bg-[linear-gradient(100deg,rgba(201,162,115,.42),rgba(236,231,221,.16)_58%,rgba(201,162,115,.24))] bg-clip-text font-display text-[clamp(1.55rem,8.2vw,7rem)] font-light leading-none tracking-[-0.05em] text-transparent">
            Creative Structures NJ
          </span>
        </Reveal>

        <div className="flex flex-col gap-3 border-t border-mist/18 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[0.62rem] uppercase tracking-[0.16em] text-dim">
            © {year} {COMPANY.name}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 self-start font-display text-[0.62rem] uppercase tracking-[0.16em] text-mist transition-colors duration-500 hover:text-paper sm:self-auto"
          >
            Back to top
            <svg
              viewBox="0 0 12 14"
              fill="none"
              className="h-3 w-3 transition-transform duration-500 group-hover:-translate-y-1"
            >
              <path
                d="M6 13V1M1 6l5-5 5 5"
                stroke="currentColor"
                strokeWidth="1.15"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
