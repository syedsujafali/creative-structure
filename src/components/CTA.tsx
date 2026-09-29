import { IMG } from "@/data/site";
import { Reveal, Words, useParallax } from "@/lib/motion";
import { ArrowUpRight, Img, scrollToId } from "./ui";

/** Full-bleed image panel with a dark red veil. */
export default function CTA() {
  const parallax = useParallax<HTMLDivElement>(0.1);

  return (
    <section className="theme-orchid relative isolate flex min-h-[56svh] items-end overflow-hidden py-16 sm:min-h-[60svh] md:min-h-[72svh] md:items-center md:py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div ref={parallax} className="absolute -inset-y-[8%] inset-x-0">
          <Img
            src={IMG.cta}
            alt="Suburban home lit softly at dusk"
            focal="55% 60%"
            sizes="100vw"
            className="h-full w-full object-cover saturate-[0.55]"
          />
        </div>
        <span className="absolute inset-0 bg-[#3a2f22] opacity-40 mix-blend-color" />
        <span className="absolute inset-0 bg-ink/82" />
        <span className="absolute inset-0 bg-[linear-gradient(100deg,rgba(18,17,16,.96)_0%,rgba(18,17,16,.72)_48%,rgba(93,67,39,.42)_100%)]" />
        <span className="absolute right-[2%] top-[-12%] h-[52vh] w-[52vh] rounded-full bg-[radial-gradient(circle,rgba(201,162,115,.14)_0%,transparent_66%)]" />
        <span className="grain absolute inset-0" />
      </div>

      <div className="shell relative w-full">
        <div className="max-w-2xl">
          <Reveal variant="fade" className="flex items-center gap-3">
            <span className="glow-rule h-px w-8 sm:w-12" />
            <span className="t-label text-paper/65">Let's build something</span>
          </Reveal>

          <h2 className="mt-6 font-display text-[clamp(2.1rem,5.6vw,4rem)] font-light leading-[1.02] tracking-[-0.035em] text-paper md:mt-8">
            <Words text="Have a project" />{" "}
            <span className="serif grad-text">
              <Words text="in mind?" delay={220} />
            </span>
          </h2>

          <Reveal delay={110}>
            <p className="t-lead mt-5 max-w-[44ch] text-paper/70 md:mt-7">
              Tell us what you're planning. We'll walk the property, talk it
              through and put together a clear estimate.
            </p>
          </Reveal>

          <Reveal
            delay={180}
            className="mt-8 flex flex-col gap-2.5 sm:flex-row md:mt-10"
          >
            <button
              type="button"
              onClick={() => scrollToId("#contact")}
              className="btn btn-paper group w-full sm:w-auto"
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
              See Our Work
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
