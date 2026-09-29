import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "@/lib/motion";
import logoUrl from "../../logo.png";

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={cn("h-3.5 w-3.5", className)}
      aria-hidden="true"
    >
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ArrowDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 16"
      fill="none"
      className={cn("h-4 w-3", className)}
      aria-hidden="true"
    >
      <path
        d="M6 0v14M1 9l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Section eyebrow: index + hairline + label. Adapts to navy, off-white or red surfaces. */
export function SectionLabel({
  children,
  index,
  tone = "dark",
  className,
  delay = 0,
}: {
  children: ReactNode;
  index?: string;
  tone?: "dark" | "light" | "red";
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal
      variant="fade"
      delay={delay}
      className={cn("flex items-center gap-3.5", className)}
    >
      {index && (
        <span
          className={cn(
            "t-num",
            tone === "dark" && "glow-num",
            tone === "light" && "text-a",
            tone === "red" && "text-paper",
          )}
        >
          {index}
        </span>
      )}
      <span
        className={cn(
          "h-px w-7 sm:w-10",
          tone === "dark" && "bg-mist/30",
          tone === "light" && "bg-deep/20",
          tone === "red" && "bg-paper/40",
        )}
      />
      <span
        className={cn(
          "t-label",
          tone === "dark" && "text-mist",
          tone === "light" && "text-ash",
          tone === "red" && "text-paper/75",
        )}
      >
        {children}
      </span>
    </Reveal>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Creative Structures NJ LLC"
      className={cn("block h-auto max-h-[3.5rem] w-auto object-contain", className)}
      draggable="false"
    />
  );
}

/** Smooth in-page scroll helper */
export const scrollToId = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/**
 * Responsive image — builds a srcset from the Pexels width parameter so
 * phones download a fraction of the desktop payload.
 */
export function Img({
  src,
  alt,
  className,
  focal,
  sizes = "(max-width: 767px) 100vw, (max-width: 1279px) 60vw, 50vw",
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  focal?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const widths = [480, 768, 1080, 1440, 1800];
  const srcSet = /w=\d+/.test(src)
    ? widths.map((w) => `${src.replace(/w=\d+/, `w=${w}`)} ${w}w`).join(", ")
    : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("block h-full w-full object-cover", className)}
      style={focal ? { objectPosition: focal, display: "block" } : { display: "block" }}
    />
  );
}
