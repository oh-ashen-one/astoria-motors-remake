import React, { useEffect, useRef, useState } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { HeroComposition, HERO_DURATION, HERO_FPS } from "../remotion/HeroComposition";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { asset, LINKS } from "../data";

const CTAS = (
  <>
    <a className="btn btn--accent" href={LINKS.inventory} target="_blank" rel="noopener noreferrer">
      Browse live inventory
    </a>
    <a className="btn btn--outline" href={LINKS.creditApp} target="_blank" rel="noopener noreferrer">
      Get pre-approved
    </a>
  </>
);

export const Hero: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [tall, setTall] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 760
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 759px)");
    const onChange = () => setTall(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // belt-and-suspenders: never leave the hero frozen even if autoplay stalls
  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => {
      const player = playerRef.current;
      if (player && !player.isPlaying()) player.play();
    }, 250);
    return () => window.clearTimeout(t);
  }, [reduced, tall]);

  // quiet fade as the hero scrolls away
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const p = Math.min(1, window.scrollY / window.innerHeight);
        el.style.transform = `translateY(${window.scrollY * 0.22}px)`;
        el.style.opacity = String(1 - p * 0.8);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section className={`hero ${reduced ? "hero--static" : ""}`} id="top">
      <div className="hero__media" ref={wrapRef}>
        {reduced ? (
          <div className="hero-static">
            <div className="hero-static__text">
              <span className="chip">
                <span className="chip__dot" />
                Long Island City, New York
              </span>
              <h1>We sell quality pre-owned vehicles.</h1>
              <p>
                Welcome to Astoria Motors, LLC — inspected cars, SUVs and trucks
                with extended warranty options, minutes from Manhattan.
              </p>
              <div className="hero-static__ctas">{CTAS}</div>
            </div>
            <div
              className="hero-static__frame"
              style={{ backgroundImage: `url(${asset("01.jpg")})` }}
              role="img"
              aria-label="Pre-owned vehicle against the New York skyline"
            />
          </div>
        ) : (
          <Player
            key={tall ? "tall" : "wide"}
            ref={playerRef}
            component={HeroComposition}
            inputProps={{ tall }}
            durationInFrames={HERO_DURATION}
            fps={HERO_FPS}
            compositionWidth={tall ? 1080 : 1920}
            compositionHeight={tall ? 1440 : 1080}
            autoPlay
            loop
            controls={false}
            clickToPlay={false}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>

      {!reduced && <div className="hero__ctas">{CTAS}</div>}
    </section>
  );
};
