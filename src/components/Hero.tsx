import React, { useEffect, useRef } from "react";
import { Player } from "@remotion/player";
import { HeroComposition, HERO_DURATION, HERO_FPS } from "../remotion/HeroComposition";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { asset, LINKS } from "../data";

export const Hero: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Parallax fade-away on scroll
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const y = window.scrollY;
        const h = window.innerHeight;
        const p = Math.min(1, y / h);
        el.style.transform = `translateY(${y * 0.35}px)`;
        el.style.opacity = String(1 - p * 0.9);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section className="hero" id="top">
      <div className="hero__media" ref={wrapRef}>
        {reduced ? (
          <div
            className="hero__static"
            style={{ backgroundImage: `url(${asset("01.jpg")})` }}
          />
        ) : (
          <Player
            component={HeroComposition}
            durationInFrames={HERO_DURATION}
            fps={HERO_FPS}
            compositionWidth={1920}
            compositionHeight={1080}
            autoPlay
            loop
            controls={false}
            clickToPlay={false}
            style={{ width: "100%", height: "100%" }}
          />
        )}
        {reduced && (
          <div className="hero__static-overlay">
            <img src={asset("logo.png")} alt="Astoria Motors, LLC" className="hero__static-logo" />
            <h1 className="hero__static-headline">
              We Sell Quality
              <br />
              Pre-Owned Vehicles
            </h1>
            <p className="hero__static-sub">Welcome to Astoria Motors, LLC</p>
          </div>
        )}
      </div>

      {/* Real HTML CTAs layered over the player */}
      <div className="hero__ctas">
        <a className="btn btn--red btn--lg" href={LINKS.inventory} target="_blank" rel="noopener noreferrer">
          View Inventory
        </a>
        <a className="btn btn--ghost btn--lg" href={LINKS.creditApp} target="_blank" rel="noopener noreferrer">
          Get Financed
        </a>
      </div>

      <a className="hero__scroll-hint" href="#stats" aria-label="Scroll down">
        <span className="hero__chevron" />
      </a>
    </section>
  );
};
