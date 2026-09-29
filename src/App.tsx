import { useCallback, useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const t = window.setTimeout(() => setReady(true), reduced ? 100 : 1080);
    return () => window.clearTimeout(t);
  }, []);

  const onDone = useCallback(() => setLoading(false), []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink">
      {loading && <Preloader onDone={onDone} />}
      <Header ready={ready} />
      <main>
        {/* navy */}
        <Hero ready={ready} />
        {/* dark red band */}
        <Marquee />
        {/* off-white */}
        <About />
        {/* navy */}
        <Services />
        <Projects />
        {/* dark red */}
        <Process />
        {/* navy */}
        <WhyUs />
        <CTA />
        {/* off-white */}
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
