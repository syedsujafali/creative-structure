import { cn } from "@/utils/cn";
import {
  PROJECTS,
  PROJECT_CLOSER,
  PROJECT_FEATURED,
  type Project,
} from "@/data/site";
import { Reveal, Words } from "@/lib/motion";
import { ArrowUpRight, Img, SectionLabel, scrollToId } from "./ui";

/* ---------------- Shared media frame ---------------- */
function Media({
  project,
  ratio,
  sizes,
}: {
  project: Project;
  ratio: string;
  sizes: string;
}) {
  return (
    <div
      className={cn("tint-a relative w-full overflow-hidden bg-coal", ratio)}
    >
      <Img
        src={project.image}
        alt={project.alt}
        focal={project.focal}
        sizes={sizes}
        className="h-full w-full object-cover saturate-[0.7] brightness-[0.8] transition-[transform,filter] duration-[1500ms] ease-[cubic-bezier(.32,.72,0,1)] group-hover:scale-[1.04] group-hover:saturate-100 group-hover:brightness-100"
      />
      <span className="absolute inset-0 z-[1] bg-gradient-to-t from-ink/88 via-transparent to-transparent" />
      <span className="absolute inset-0 z-[1] border border-transparent transition-all duration-700 group-hover:border-a-lit group-hover:shadow-[inset_0_0_60px_rgb(var(--a-glow)/0.25)]" />
    </div>
  );
}

/* ---------------- Full-bleed hero project ---------------- */
function WideProject({ project }: { project: Project }) {
  return (
    <Reveal className="group">
      <button
        type="button"
        onClick={() => scrollToId("#contact")}
        className="block w-full text-left"
      >
        <div className="relative">
          <Media
            project={project}
            ratio="aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/8]"
            sizes="100vw"
          />
          <span className="absolute inset-x-5 bottom-5 z-[2] flex items-end justify-between gap-5 sm:inset-x-7 sm:bottom-7">
            <span>
              <span className="flex items-center gap-2.5">
                <span className="t-num glow-num">
                  {project.no}
                </span>
                <span className="h-px w-6 bg-paper/40" />
                <span className="font-display text-[0.6rem] uppercase tracking-[0.2em] text-paper/75">
                  {project.type}
                </span>
              </span>
              <span className="mt-2.5 block max-w-[18ch] font-display text-[1.5rem] font-light leading-[1.08] tracking-[-0.03em] text-paper sm:text-[2.1rem] lg:text-[2.8rem]">
                {project.title}
              </span>
            </span>
            <span className="glow-frame z-[2] grid h-10 w-10 shrink-0 translate-y-1 place-items-center border bg-ink/40 text-a-lit opacity-0 backdrop-blur-sm transition-all duration-600 group-hover:translate-y-0 group-hover:opacity-100 sm:h-12 sm:w-12">
              <span className="nudge">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </span>
          </span>
        </div>
        <div className="mt-3.5 flex items-start justify-between gap-5 border-t border-mist/18 pt-3.5 transition-colors duration-500 group-hover:border-a-lit">
          <p className="t-small max-w-[56ch] text-mist">{project.copy}</p>
          <span className="shrink-0 font-display text-[0.6rem] uppercase tracking-[0.18em] text-dim">
            {project.location}
          </span>
        </div>
      </button>
    </Reveal>
  );
}

/* ---------------- Alternating editorial row ---------------- */
function RowProject({
  project,
  flip,
}: {
  project: Project;
  flip?: boolean;
}) {
  return (
    <Reveal className="group border-t border-mist/18 pt-7 md:pt-9">
      <button
        type="button"
        onClick={() => scrollToId("#contact")}
        className="grid w-full items-center gap-5 text-left md:grid-cols-12 md:gap-10"
      >
        <div
          className={cn(
            "md:col-span-7",
            flip ? "md:order-2" : "md:order-1",
          )}
        >
          <Media
            project={project}
            ratio="aspect-[4/3] md:aspect-[16/10]"
            sizes="(max-width: 767px) 100vw, 56vw"
          />
        </div>

        <div
          className={cn(
            "md:col-span-5",
            flip ? "md:order-1 md:pr-6" : "md:order-2 md:pl-4",
          )}
        >
          <span className="flex items-center gap-3">
            <span className="glow-hover-g font-display text-[2.4rem] font-extralight leading-none tracking-[-0.045em] text-paper/15 transition-all duration-600 md:text-[3rem]">
              {project.no}
            </span>
            <span className="font-display text-[0.6rem] uppercase tracking-[0.2em] text-mist">
              {project.type}
            </span>
          </span>

          <h3 className="mt-3 max-w-[16ch] font-display text-[1.45rem] font-light leading-[1.12] tracking-[-0.028em] text-paper transition-transform duration-600 ease-[cubic-bezier(.32,.72,0,1)] group-hover:translate-x-1 md:text-[1.8rem]">
            {project.title}
          </h3>

          <p className="t-small mt-3 max-w-[40ch] text-mist">{project.copy}</p>

          <span className="mt-5 flex items-center gap-3 border-t border-mist/18 pt-4 transition-colors duration-500 group-hover:border-a-lit">
            <span className="font-display text-[0.6rem] uppercase tracking-[0.18em] text-dim">
              {project.location}
            </span>
            <span className="ml-auto text-a-lit opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="nudge">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </span>
          </span>
        </div>
      </button>
    </Reveal>
  );
}

/* ---------------- Section ---------------- */
export default function Projects() {
  return (
    <section
      id="projects"
      className="theme-cerulean bloom-left sec-loose relative overflow-hidden bg-stone"
    >
      <div className="shell relative">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <SectionLabel index="03">Selected work</SectionLabel>
            <h2 className="mt-6 max-w-[13ch] font-display text-[clamp(2.1rem,5vw,3.9rem)] font-light leading-[1.03] tracking-[-0.038em] text-paper md:mt-8">
              <Words text="Projects from around the neighborhood." />
            </h2>
          </div>
          <Reveal delay={90} className="md:col-span-5">
            <p className="t-body max-w-[42ch] text-mist md:ml-auto">
              Renovations, additions, roofs and exteriors for New Jersey homes
              and small businesses.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 md:mt-14">
          <WideProject project={PROJECT_FEATURED} />
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 md:gap-14">
          {PROJECTS.map((p, i) => (
            <RowProject key={p.no} project={p} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <WideProject project={PROJECT_CLOSER} />
        </div>

        <Reveal
          delay={60}
          className="mt-10 flex flex-col items-start gap-4 border-t border-mist/18 pt-7 sm:flex-row sm:items-center sm:justify-between md:mt-14"
        >
          <p className="t-body max-w-[42ch] text-mist">
            Planning something similar? We'd be glad to take a look.
          </p>
          <button
            type="button"
            onClick={() => scrollToId("#contact")}
            className="btn btn-ghost group w-full sm:w-auto"
          >
            Start a Conversation
            <span className="nudge">
              <ArrowUpRight />
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
