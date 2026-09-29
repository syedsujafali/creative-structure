import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { NAV, COMPANY } from "@/data/site";
import { useActiveSection, useScrollY } from "@/lib/motion";
import { ArrowUpRight, Monogram } from "./ui";

const SECTION_IDS = ["home", "about", "services", "projects", "contact"];

export default function Header({ ready }: { ready: boolean }) {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const active = useActiveSection(SECTION_IDS);
  const scrolled = y > 24;
  const [docH, setDocH] = useState(1);

  useEffect(() => {
    const measure = () =>
      setDocH(Math.max(document.body.scrollHeight - window.innerHeight, 1));
    measure();
    window.addEventListener("resize", measure);
    const t = window.setInterval(measure, 2000);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearInterval(t);
    };
  }, []);

  const progress = Math.min(Math.max(y / docH, 0), 1);

  /* hide on scroll-down, reveal on scroll-up (mobile friendly) */
  useEffect(() => {
    if (open) return;
    if (y > 240 && y > lastY + 6) setHidden(true);
    else if (y < lastY - 6 || y < 120) setHidden(false);
    setLastY(y);
  }, [y, lastY, open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    if (open) {
      setOpen(false);
      window.setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        380,
      );
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-transform duration-[600ms] ease-[cubic-bezier(.32,.72,0,1)]",
          ready ? "translate-y-0" : "-translate-y-full",
          hidden && !open && "!-translate-y-full",
          "theme-amethyst",
        )}
      >
        <div
          className={cn(
            "transition-colors duration-500",
            scrolled && !open
              ? "border-b border-mist/15 bg-ink/92 backdrop-blur-xl"
              : "border-b border-transparent",
          )}
        >
          <div
            className={cn(
              "shell flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(.32,.72,0,1)]",
              scrolled ? "h-[3.75rem] md:h-[4.25rem]" : "h-[4.25rem] md:h-[5.5rem]",
            )}
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                go("#home");
              }}
              className="group flex items-center"
            >
              <Monogram className="h-[2.2rem] w-auto sm:h-[2.8rem] md:h-[3.1rem]" />
            </a>

            <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-active={active === item.href.slice(1)}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="nav-link"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("#contact");
                }}
                className="btn btn-primary group hidden !h-11 !px-6 md:inline-flex"
              >
                Request an Estimate
                <span className="nudge">
                  <ArrowUpRight />
                </span>
              </a>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="relative z-[130] -mr-1 grid h-11 w-11 place-items-center border border-mist/30 bg-ink/40 backdrop-blur-sm transition-colors duration-400 active:border-lilac lg:hidden"
              >
                <span className="relative block h-[9px] w-[18px]">
                  <span
                    className={cn(
                      "absolute left-0 block h-px w-full bg-paper transition-all duration-400 ease-[cubic-bezier(.32,.72,0,1)]",
                      open ? "top-1 rotate-45" : "top-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 block h-px bg-paper transition-all duration-400 ease-[cubic-bezier(.32,.72,0,1)]",
                      open ? "top-1 w-full -rotate-45" : "top-2 w-[70%]",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* scroll progress hairline */}
        <span
          aria-hidden="true"
          className={cn(
            "block h-px origin-left bg-bronze transition-opacity duration-500",
            scrolled && !open ? "opacity-60" : "opacity-0",
          )}
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* ---------------- Mobile menu ---------------- */}
      <div
        className={cn(
          "theme-amethyst fixed inset-0 z-[120] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink transition-transform duration-[700ms] ease-[cubic-bezier(.76,0,.24,1)]",
            open ? "translate-y-0" : "-translate-y-full",
          )}
        />
        <div className="relative flex h-full flex-col overflow-y-auto px-[1.375rem] pb-9 pt-[4.25rem] sm:px-7">
          <div className="flex-1 pt-6">
            <span
              className={cn(
                "t-label block text-dim transition-all duration-600 ease-[cubic-bezier(.16,1,.3,1)]",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: "180ms" }}
            >
              Menu
            </span>

            <nav className="mt-5 flex flex-col">
              {NAV.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="group flex items-center justify-between gap-4 border-b border-mist/15 py-[1.15rem]"
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className={cn(
                        "t-num glow-num transition-all duration-600 ease-[cubic-bezier(.16,1,.3,1)]",
                        open
                          ? "translate-y-0 opacity-100"
                          : "translate-y-5 opacity-0",
                      )}
                      style={{ transitionDelay: `${230 + i * 55}ms` }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "block font-display text-[2rem] font-light leading-none tracking-[-0.03em] text-paper transition-all duration-600 ease-[cubic-bezier(.16,1,.3,1)] sm:text-[2.4rem]",
                        open
                          ? "translate-y-0 opacity-100"
                          : "translate-y-6 opacity-0",
                      )}
                      style={{ transitionDelay: `${260 + i * 55}ms` }}
                    >
                      {item.label}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "text-dim transition-all duration-600",
                      open ? "opacity-100" : "opacity-0",
                    )}
                    style={{ transitionDelay: `${300 + i * 55}ms` }}
                  >
                    <ArrowUpRight />
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div
            className={cn(
              "mt-10 transition-all duration-600 ease-[cubic-bezier(.16,1,.3,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: "540ms" }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("#contact");
              }}
              className="btn btn-primary w-full"
            >
              Request an Estimate
            </a>
            <div className="mt-6 flex flex-col gap-1.5 border-t border-mist/15 pt-5">
              <a
                href={`mailto:${COMPANY.email}`}
                className="t-small text-paper/80"
              >
                {COMPANY.email}
              </a>
              <span className="t-small text-mist">{COMPANY.areaLong}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
