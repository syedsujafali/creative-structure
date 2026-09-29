import { WHY } from "@/data/site";
import { Reveal, Words } from "@/lib/motion";
import { SectionLabel } from "./ui";

/** Compact navy band — five reasons in a sparse ledger layout. */
export default function WhyUs() {
  return (
    <section className="theme-mauve bloom-top sec-tight relative overflow-hidden bg-coal">
      <div className="shell relative">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionLabel index="05">Why clients choose us</SectionLabel>
            <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(1.5rem,2.9vw,2.1rem)] font-normal leading-[1.14] tracking-[-0.025em] text-paper md:mt-7">
              <Words text="Good work, done the honest way." />
            </h2>
            <Reveal delay={100}>
              <p className="t-small mt-4 hidden max-w-[34ch] text-mist lg:block">
                No layers of management, no handing your project off. Just a way
                of working that keeps quality and communication first.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-mist/18">
              {WHY.map((w, i) => (
                <Reveal
                  key={w.title}
                  delay={i * 70}
                  className="group relative flex flex-col gap-1.5 border-b border-mist/18 py-5 sm:flex-row sm:items-baseline sm:gap-8 sm:py-6"
                >
                  <span className="wash-row pointer-events-none absolute inset-y-0 -left-5 -right-5 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:-left-9 md:-right-9" />
                  <span className="flex shrink-0 items-baseline gap-3.5 sm:w-[17rem]">
                    <span className="t-num glow-num transition-[text-shadow] duration-500">
                      {w.index}
                    </span>
                    <h3 className="t-h3 text-paper transition-transform duration-600 ease-[cubic-bezier(.32,.72,0,1)] group-hover:translate-x-1">
                      {w.title}
                    </h3>
                  </span>
                  <p className="t-small max-w-[46ch] pl-[2.1rem] text-mist sm:pl-0">
                    {w.copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
