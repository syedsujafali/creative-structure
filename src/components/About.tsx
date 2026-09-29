import { IMG } from "@/data/site";
import { Reveal, Words, useParallax } from "@/lib/motion";
import { Img, SectionLabel } from "./ui";

const FACTS = [
  ["Locally operated", "Based in and working across New Jersey."],
  ["Directly involved", "The people you meet are on your project."],
  ["Detail-oriented", "Finish work judged up close, not from the curb."],
];

/**
 * Off-white editorial section — intro and about consolidated into one
 * statement block, a portrait image and a fact ledger.
 */
export default function About() {
  const parallax = useParallax<HTMLDivElement>(0.06);

  return (
    <section
      id="about"
      className="theme-orchid sec relative overflow-hidden bg-paper text-deep"
    >
      <span className="pointer-events-none absolute -right-[8%] bottom-[-10%] h-[42vh] w-[42vh] rounded-full bg-[radial-gradient(circle,rgba(168,126,79,.09)_0%,transparent_68%)]" />
      <div className="shell relative">
        {/* statement */}
        <div className="grid gap-7 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionLabel index="01" tone="light">
              Who we are
            </SectionLabel>
            <h2 className="t-h2 mt-6 max-w-[17ch] text-deep md:mt-8">
              <Words text="Local enough to care." />{" "}
              <span className="serif text-a">
                <Words text="Experienced enough to deliver." delay={300} />
              </span>
            </h2>
          </div>

          <Reveal delay={80} className="lg:col-span-5 lg:pt-3">
            <p className="t-lead max-w-[50ch] text-ash">
              Creative Structures NJ LLC works with homeowners and small
              businesses on renovations, additions, roofing and exterior
              improvements. Projects stay with the people who planned them — so
              the work stays consistent and you always know who to call.
            </p>
          </Reveal>
        </div>

        {/* image + ledger */}
        <div className="mt-11 grid gap-8 md:mt-14 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-7">
            <Reveal
              variant="image"
              className="relative aspect-[4/3] w-full overflow-hidden bg-[#e7ddcf] sm:aspect-[16/10]"
            >
              <div ref={parallax} className="absolute -inset-y-[5%] inset-x-0">
                <div className="zoomer h-full w-full bg-[#e7ddcf]">
                  <Img
                    src={IMG.aboutMain}
                    alt="Two builders reviewing plans inside a home under renovation"
                    focal="55% 45%"
                    sizes="(max-width: 1023px) 100vw, 58vw"
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={180}
              className="relative z-10 -mt-px border-l-2 border-a bg-chalk px-5 py-6 shadow-[0_18px_50px_rgba(34,28,41,.09)] sm:absolute sm:bottom-0 sm:right-0 sm:mt-0 sm:max-w-[21rem] sm:px-7 sm:py-7"
            >
              <p className="serif text-[1.1rem] leading-snug text-deep sm:text-[1.2rem]">
                “The details people notice later are the ones we get right
                first.”
              </p>
              <p className="t-label mt-4 text-ash">Creative Structures NJ</p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <p className="t-body max-w-[46ch] text-ash">
              We're a New Jersey team focused on homes and small commercial
              spaces. We take on work we can do well, show up when we say we
              will, and finish what we start.
            </p>

            <div className="mt-7 border-t border-deep/12">
              {FACTS.map(([k, v], i) => (
                <Reveal
                  key={k}
                  delay={i * 90}
                  className="group flex gap-5 border-b border-deep/12 py-4"
                >
                  <span
                    className="t-num shrink-0 pt-[3px]"
                    style={{ color: ["#a87e4f", "#b07d55", "#8a6a44"][i] }}
                  >
                    0{i + 1}
                  </span>
                  <span>
                    <span className="t-label block text-deep">{k}</span>
                    <span className="t-small mt-1.5 block max-w-[34ch] text-ash">
                      {v}
                    </span>
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
