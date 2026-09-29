import { cn } from "@/utils/cn";
import { PROCESS } from "@/data/site";
import { Reveal, Words, useInView } from "@/lib/motion";
import { SectionLabel } from "./ui";

/** Dark red band — the strongest color moment on the page. */
export default function Process() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="theme-iris surface-a sec-tight relative overflow-hidden">
      <span className="grain pointer-events-none absolute inset-0" />

      <div className="shell relative">
        <div className="grid gap-5 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <SectionLabel index="04" tone="red">
              How it works
            </SectionLabel>
            <h2 className="mt-5 max-w-[15ch] font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.08] tracking-[-0.03em] text-paper md:mt-7">
              <Words text="A clear process, start to finish." />
            </h2>
          </div>
          <Reveal delay={80} className="md:col-span-5">
            <p className="t-body max-w-[40ch] text-paper/75 md:ml-auto">
              Five straightforward steps, so you always know where things stand
              and what happens next.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-10 md:mt-14">
          <span className="absolute inset-x-0 top-0 hidden h-px bg-paper/25 lg:block" />
          <span
            className={cn(
              "absolute inset-x-0 top-0 hidden h-px origin-left bg-paper transition-transform duration-[1500ms] ease-[cubic-bezier(.32,.72,0,1)] lg:block",
              inView ? "scale-x-100" : "scale-x-0",
            )}
          />
          <span className="absolute bottom-7 left-[9px] top-2 w-px bg-paper/25 lg:hidden" />

          <ol className="grid gap-0 lg:grid-cols-5">
            {PROCESS.map((p, i) => (
              <Reveal
                key={p.step}
                delay={i * 90}
                as="li"
                className="group relative flex gap-5 pb-6 last:pb-0 lg:block lg:pb-0 lg:pr-7 lg:pt-8"
              >
                <span className="relative z-10 mt-[0.5rem] h-[5px] w-[5px] shrink-0 translate-x-[7px] rounded-full bg-paper lg:hidden" />

                <div className="flex-1 lg:flex lg:flex-col">
                  <span className="t-num block text-paper/70 lg:hidden">
                    {p.step}
                  </span>
                  <span className="hidden font-display text-[2.8rem] font-extralight leading-none tracking-[-0.045em] text-paper/30 transition-colors duration-500 group-hover:text-paper lg:block xl:text-[3.2rem]">
                    {p.step}
                  </span>
                  <h3 className="t-h3 mt-1.5 text-paper lg:mt-7">{p.title}</h3>
                  <p className="t-small mt-1.5 max-w-[36ch] text-paper/70 lg:mt-2.5">
                    {p.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
