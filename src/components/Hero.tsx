import React, { useEffect, useRef, useState } from "react";
import { Player } from "@remotion/player";
import { HeroComposition, HERO_DURATION, HERO_FPS } from "../remotion/HeroComposition";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { asset, LINKS } from "../data";

function useIsTall() {
  const [tall, setTall] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 760
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 759px)");
    const onChange = () => setTall(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return tall;
}

export const Hero: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const tall = useIsTall();
  const wrapRef = useRef<HTMLDivElement>(null);

  // quiet fade as the hero scrolls away — motion answering the scroll
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const p = Math.min(1, window.scrollY / window.innerHeight);
        el.style.transform = `translateY(${window.scrollY * 0.28}px)`;
        el.style.opacity = String(1 - p * 0.85);
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
            <div className="hero-static__top">
              <span className="meta">Welcome to Astoria Motors, LLC</span>
              <span className="meta">Long Island City, New York</span>
            </div>
            <div
              className="hero-static__plate"
              style={{ backgroundImage: `url(${asset("01.jpg")})` }}
            />
            <div className="hero-static__body">
              <h1>
                We sell quality
                <br />
                pre-owned vehicles.
              </h1>
              <div className="hero-static__rule" />
              <div className="hero-static__ctas">
                <a className="btn btn--red" href={LINKS.inventory} target="_blank" rel="noopener noreferrer">
                  Browse live inventory
                </a>
                <a className="btn btn--line" href={LINKS.creditApp} target="_blank" rel="noopener noreferrer">
                  Apply for financing
                </a>
              </div>
            </div>
          </div>
        ) : (
          <Player
            key={tall ? "tall" : "wide"}
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

      {/* real HTML CTAs layered under the headline */}
      {!reduced && (
        <div className="hero__ctas">
          <a className="btn btn--red" href={LINKS.inventory} target="_blank" rel="noopener noreferrer">
            Browse live inventory
          </a>
          <a className="btn btn--line" href={LINKS.creditApp} target="_blank" rel="noopener noreferrer">
            Apply for financing
          </a>
        </div>
      )}
    </section>
  );
};
