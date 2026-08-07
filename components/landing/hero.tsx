"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { HeroCanvas } from "@/components/landing/hero-canvas";
import { MagneticButton } from "@/components/landing/magnetic-button";

gsap.registerPlugin(ScrollTrigger);

const pressLogos = ["FORBES", "BLOOMBERG", "FINANCIAL TIMES", "THE ECONOMIST"];

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(".hero-reveal", { opacity: 0, y: 40 })
        .to(".hero-badge", { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .to(
          ".hero-line",
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 },
          0.25,
        )
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        .to(
          ".hero-cta",
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          0.85,
        )
        .to(".hero-press", { opacity: 1, y: 0, duration: 0.7 }, 1.05);

      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        });

        gsap.to(".hero-fade-out", {
          opacity: 0,
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient gradient-mesh blobs, drifting behind the 3D canvas */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="hero-blob hero-blob-a absolute w-[38rem] h-[38rem] rounded-full bg-accent/25 blur-[110px]" />
        <div className="hero-blob hero-blob-b absolute w-[30rem] h-[30rem] rounded-full bg-accent/15 blur-[100px]" />
        <div className="hero-blob hero-blob-c absolute w-[24rem] h-[24rem] rounded-full bg-primary/10 blur-[90px]" />
      </div>

      {/* Grain texture for atmosphere */}
      <div className="hero-grain pointer-events-none absolute inset-0 -z-[15] opacity-[0.06]" />

      <HeroCanvas scrollProgress={scrollProgress} />

      {/* Vignette for text legibility over the 3D field */}
      <div className="pointer-events-none absolute inset-0 z-[-5] bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_78%)]" />

      <div className="hero-fade-out flex flex-col items-center">
        {/* Badge */}
        <div className="hero-badge hero-reveal flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/70 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">{t("badge")}</span>
        </div>

        {/* Headline */}
        <h1 className="text-center max-w-4xl">
          <span className="hero-line hero-reveal block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight">
            {t("headline1")}
          </span>
          <span className="hero-line hero-reveal block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic leading-tight metallic-gold">
            {t("headline2")}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub hero-reveal mt-8 text-center max-w-2xl text-muted-foreground text-lg leading-relaxed">
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <MagneticButton className="hero-cta hero-reveal">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              {t("cta1")}
            </Link>
          </MagneticButton>
          <MagneticButton className="hero-cta hero-reveal">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border bg-card/40 backdrop-blur-sm text-foreground font-medium hover:bg-secondary transition-colors"
            >
              {t("cta2")}
            </Link>
          </MagneticButton>
        </div>

        {/* Press logos */}
        <div className="hero-press hero-reveal mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {pressLogos.map((logo) => (
            <span
              key={logo}
              className="text-xs sm:text-sm tracking-widest text-muted-foreground/60 font-medium"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
