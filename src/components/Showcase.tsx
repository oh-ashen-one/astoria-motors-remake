import React, { useEffect, useRef } from "react";
import { Player, PlayerRef } from "@remotion/player";
import {
  ShowcaseComposition,
  SHOWCASE_DURATION,
  SHOWCASE_FPS,
} from "../remotion/ShowcaseComposition";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { asset } from "../data";

/**
 * Scrollytelling: a 300vh track with a sticky Remotion Player.
 * Scroll progress maps to composition frames via playerRef.seekTo(),
 * rAF-throttled so we seek at most once per frame.
 */
export const Showcase: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);

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
      <section className="showcase showcase--static">
        <div
          className="showcase__static-slide"
          style={{ backgroundImage: `url(${asset("02.jpg")})` }}
        >
          <div className="showcase__static-caption">
            <h2>Hand-Picked Inventory</h2>
            <p>Inspected &amp; warranty-ready — all makes &amp; models.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="showcase" ref={trackRef} aria-label="Inventory showcase">
      <div className="showcase__sticky">
        <Player
          ref={playerRef}
          component={ShowcaseComposition}
          durationInFrames={SHOWCASE_DURATION}
          fps={SHOWCASE_FPS}
          compositionWidth={1920}
          compositionHeight={1080}
          controls={false}
          clickToPlay={false}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </section>
  );
};
