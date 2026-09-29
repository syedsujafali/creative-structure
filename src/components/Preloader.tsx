import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

/**
 * Short, lightweight brand preloader.
 * ~900ms of counting, then a single clean wipe into the hero.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(r);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 120 : 900;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        window.setTimeout(() => setExiting(true), 160);
        window.setTimeout(
          () => {
            setGone(true);
            onDone();
          },
          reduced ? 200 : 1180,
        );
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      className={cn(
        "theme-amethyst fixed inset-0 z-[200] overflow-hidden",
        exiting && "pointer-events-none",
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0 bg-ink transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)]",
          exiting ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <span className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,rgba(168,126,79,.12)_0%,transparent_68%)]" />
        <span className="absolute -bottom-[22%] left-[30%] h-[58vh] w-[58vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,115,.1)_0%,transparent_65%)]" />
      </div>

      <div
        className={cn(
          "relative flex h-full w-full flex-col justify-end transition-all duration-600 ease-[cubic-bezier(.16,1,.3,1)]",
          exiting && "-translate-y-4 opacity-0",
        )}
      >
        <div className="shell pb-9 md:pb-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span
                className="t-label mb-3.5 block text-mist md:mb-5"
                style={{ animation: "fadeUp .7s cubic-bezier(.16,1,.3,1) both" }}
              >
                Creative Structures NJ LLC
              </span>
              <h1 className="font-display text-[clamp(2.1rem,10vw,5rem)] font-light leading-[0.95] tracking-[-0.04em] text-paper">
                {["Crafted", "Spaces."].map((w, i) => (
                  <span
                    key={w}
                    className={cn(
                      "word-mask mr-[0.22em] last:mr-0",
                      entered && "in",
                    )}
                  >
                    <span style={{ transitionDelay: `${80 + i * 90}ms` }}>
                      {w}
                    </span>
                  </span>
                ))}
              </h1>
            </div>
            <span className="t-num shrink-0 pb-1 text-mist">
              {String(progress).padStart(3, "0")}
            </span>
          </div>

          <div className="relative mt-7 h-px w-full bg-mist/15 md:mt-9">
            <span
              className="absolute inset-y-0 left-0 block bg-bronze"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
