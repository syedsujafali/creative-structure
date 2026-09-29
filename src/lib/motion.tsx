import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* In-view observer                                                     */
/* ------------------------------------------------------------------ */
export function useInView<T extends HTMLElement>(
  opts: { threshold?: number; rootMargin?: string } = {},
) {
  const { threshold = 0.14, rootMargin = "0px 0px -6% 0px" } = opts;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || prefersReduced()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/* Reveal                                                               */
/* ------------------------------------------------------------------ */
type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "image" | "line";
  as?: ElementType;
  threshold?: number;
  style?: CSSProperties;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as,
  threshold = 0.12,
  style,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });

  const base =
    variant === "image"
      ? "img-rv"
      : variant === "line"
        ? "line-rv"
        : variant === "fade"
          ? "rv rv-fade"
          : "rv";

  return (
    <Tag
      ref={ref}
      className={cn(base, inView && "in", className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Masked word reveal                                                   */
/* ------------------------------------------------------------------ */
export function Words({
  text,
  className,
  delay = 0,
  stagger = 55,
  play,
  as,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  play?: boolean;
  as?: ElementType;
}) {
  const Tag = (as ?? "span") as ElementType;
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.2 });
  const active = play === undefined ? inView : play;
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={cn("inline", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className={cn("word-mask", active && "in")}>
          <span style={{ transitionDelay: `${delay + i * stagger}ms` }}>
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax — desktop only, rAF throttled                               */
/* ------------------------------------------------------------------ */
export function useParallax<T extends HTMLElement>(speed = 0.1) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -100 || rect.top > vh + 100) return;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(progress * speed * 100).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const attach = () => {
      if (mq.matches) {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
      } else {
        el.style.transform = "";
        window.removeEventListener("scroll", onScroll);
      }
    };
    attach();
    mq.addEventListener("change", attach);
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", attach);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return ref;
}

/* ------------------------------------------------------------------ */
/* Scroll position                                                      */
/* ------------------------------------------------------------------ */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setY(window.scrollY);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return y;
}

/* ------------------------------------------------------------------ */
/* Active section for nav                                               */
/* ------------------------------------------------------------------ */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");
  useEffect(() => {
    const els = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
  return active;
}

/* ------------------------------------------------------------------ */
/* Media query                                                          */
/* ------------------------------------------------------------------ */
export function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}
