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
          "fixed inset-x-0 top-0 z-[140] transition-transform duration-[600ms] ease-[cubic-bezier(.32,.72,0,1)]",
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
                className={cn(
                  "relative z-[150] -mr-1 grid h-11 w-11 place-items-center border backdrop-blur-sm transition-all duration-300 active:border-lilac lg:hidden",
                  open
                    ? "border-mist/40 bg-ink/70 text-paper"
                    : "border-mist/30 bg-ink/40 text-paper hover:border-bronze",
                )}
              >
                <span className="relative flex h-[18px] w-[18px] items-center justify-center">
                  <span
                    className={cn(
                      "absolute block h-[1.5px] w-[18px] rounded-full bg-paper transition-all duration-300 ease-[cubic-bezier(.32,.72,0,1)]",
                      open ? "rotate-45" : "-translate-y-[6px]",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute block h-[1.5px] w-[18px] rounded-full bg-paper transition-all duration-300 ease-[cubic-bezier(.32,.72,0,1)]",
                      open ? "scale-x-0 opacity-0" : "opacity-100",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute block h-[1.5px] w-[18px] rounded-full bg-paper transition-all duration-300 ease-[cubic-bezier(.32,.72,0,1)]",
                      open ? "-rotate-45" : "translate-y-[6px]",
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
          "theme-amethyst fixed inset-0 z-[120] flex flex-col bg-ink lg:hidden transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)]",
          open
            ? "translate-y-0 opacity-100 pointer-events-auto visible"
            : "-translate-y-full opacity-0 pointer-events-none invisible",
        )}
      >
        <div className="relative flex h-full flex-col overflow-y-auto px-[1.375rem] pb-9 pt-[4.5rem] sm:px-7">
          <div className="flex-1 pt-4">
            <span
              className={cn(
                "t-label block text-dim transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: open ? "160ms" : "0ms" }}
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
                  className="group flex items-center justify-between gap-4 border-b border-mist/15 py-[1.15rem] transition-colors duration-300 hover:border-bronze"
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className={cn(
                        "t-num glow-num transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                        open
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0",
                      )}
                      style={{
                        transitionDelay: open ? `${190 + i * 45}ms` : "0ms",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "block font-display text-[2rem] font-light leading-none tracking-[-0.03em] text-paper transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:text-lilac sm:text-[2.4rem]",
                        open
                          ? "translate-y-0 opacity-100"
                          : "translate-y-5 opacity-0",
                      )}
                      style={{
                        transitionDelay: open ? `${220 + i * 45}ms` : "0ms",
                      }}
                    >
                      {item.label}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "text-dim transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bronze",
                      open ? "opacity-100" : "opacity-0",
                    )}
                    style={{
                      transitionDelay: open ? `${250 + i * 45}ms` : "0ms",
                    }}
                  >
                    <ArrowUpRight />
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div
            className={cn(
              "mt-8 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: open ? "440ms" : "0ms" }}
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
            <div className="mt-5 flex flex-col gap-1.5 border-t border-mist/15 pt-4">
              <a
                href={`mailto:${COMPANY.email}`}
                className="t-small text-paper/80 transition-colors hover:text-lilac"
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
