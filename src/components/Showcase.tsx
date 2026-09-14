import React, { useEffect, useRef, useState } from "react";
import { Player, PlayerRef } from "@remotion/player";
import {
  ShowcaseComposition,
  SHOWCASE_DURATION,
  SHOWCASE_FPS,
} from "../remotion/ShowcaseComposition";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { asset } from "../data";

/**
 * Scrollytelling: a tall track with a sticky Remotion Player.
 * Scroll progress maps to composition frames via playerRef.seekTo(),
 * rAF-throttled so we seek at most once per paint.
 */
export const Showcase: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [tall, setTall] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 760
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 759px)");
    const onChange = () => setTall(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let lastFrame = -1;

    const update = () => {
      raf = 0;
      const track = trackRef.current;
      const player = playerRef.current;
      if (!track || !player) return;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const frame = Math.round(progress * (SHOWCASE_DURATION - 1));
      if (frame !== lastFrame) {
        lastFrame = frame;
        player.seekTo(frame);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="showcase-static" aria-label="Inventory showcase">
        <div
          className="showcase-static__plate"
          style={{ backgroundImage: `url(${asset("02.jpg")})` }}
        />
        <div className="showcase-static__caption">
          <span className="meta" style={{ color: "var(--red)" }}>
            Plate 01
          </span>
          <h2>Hand-picked inventory</h2>
          <p>
            Cars, SUVs, minivans and trucks, chosen for condition — inspected,
            and many eligible for extended service contracts.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="showcase" ref={trackRef} aria-label="Inventory showcase">
      <div className="showcase__sticky">
        <Player
          key={tall ? "tall" : "wide"}
          ref={playerRef}
          component={ShowcaseComposition}
          inputProps={{ tall }}
          durationInFrames={SHOWCASE_DURATION}
          fps={SHOWCASE_FPS}
          compositionWidth={tall ? 1080 : 1920}
          compositionHeight={tall ? 1440 : 1080}
          controls={false}
          clickToPlay={false}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </section>
  );
};
