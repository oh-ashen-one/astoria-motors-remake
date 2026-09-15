import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  Easing,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { asset, HERO_IMAGES } from "../data";

export const HERO_FPS = 30;
export const HERO_DURATION = 360; // 12s loop: ~3.5s intro, then plates drift

const FRAMES_PER_IMAGE = 72;
const CROSSFADE = 24;

const INK = "#0f172a";
const MUTED = "#475569";
const BORDER = "#e2e8f0";
const ACCENT = "#dc2626";

interface Layout {
  margin: number;
  chipY: number;
  h1Y: number;
  h1Size: number;
  subY: number;
  subSize: number;
  subWidth: number;
  trustY: number;
  frameX: number;
  frameY: number;
  frameW: number;
  frameH: number;
  cardAX: number;
  cardAY: number;
  cardBX: number;
  cardBY: number;
}

const DESKTOP: Layout = {
  margin: 150,
  chipY: 292,
  h1Y: 344,
  h1Size: 88,
  subY: 566,
  subSize: 29,
  subWidth: 640,
  trustY: 726,
  frameX: 1020,
  frameY: 180,
  frameW: 750,
  frameH: 720,
  cardAX: 948,
  cardAY: 252,
  cardBX: 1320,
  cardBY: 786,
};

const TALL: Layout = {
  margin: 64,
  chipY: 122,
  h1Y: 172,
  h1Size: 74,
  subY: 352,
  subSize: 26,
  subWidth: 880,
  trustY: 500,
  frameX: 64,
  frameY: 600,
  frameW: 952,
  frameH: 620,
  cardAX: 84,
  cardAY: 640,
  cardBX: 380,
  cardBY: 1060,
};

const Check: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#dcfce7" />
    <path
      d="M7 12.5l3.2 3.2L17 9"
      stroke="#16a34a"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FloatCard: React.FC<{
  title: string;
  desc: string;
  icon: React.ReactNode;
  bob: number;
  style: React.CSSProperties;
}> = ({ title, desc, icon, bob, style }) => (
  <div
    style={{
      position: "absolute",
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "#ffffff",
      borderRadius: 20,
      padding: "16px 22px",
      boxShadow: "0 24px 48px -16px rgba(15,23,42,0.22)",
      border: `1px solid ${BORDER}`,
      transform: `translateY(${bob}px)`,
      ...style,
    }}
  >
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 14,
        background: "#fef2f2",
        display: "grid",
        placeItems: "center",
        flex: "none",
      }}
    >
      {icon}
    </div>
    <div>
      <div style={{ fontWeight: 800, fontSize: 22, color: INK, letterSpacing: "-0.01em" }}>
        {title}
      </div>
      <div className="fcard-desc" style={{ fontSize: 16, color: MUTED }}>{desc}</div>
    </div>
  </div>
);

export const HeroComposition: React.FC<{ tall?: boolean }> = ({ tall }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = tall ? TALL : DESKTOP;

  const pop = (delay: number) =>
    spring({
      frame: frame - delay,
      fps,
      config: { damping: 13, stiffness: 120, mass: 0.9 },
    });

  // subtle settle only — the composed hero is the floor at every frame
  const frameSettle = interpolate(frame, [0, 50], [1.045, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const bobA = frame > 60 ? Math.sin(frame / 34) * 7 : 0;
  const bobB = frame > 80 ? Math.sin(frame / 29 + 1.6) * 7 : 0;

  const pA = pop(58);
  const pB = pop(76);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* soft decorative blobs */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          top: -260,
          left: tall ? -200 : -160,
          background: "radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          bottom: -380,
          right: -240,
          background: "radial-gradient(circle, rgba(30,41,59,0.06) 0%, transparent 65%)",
        }}
      />

      {/* framed image card */}
      <div
        style={{
          position: "absolute",
          left: L.frameX,
          top: L.frameY,
          width: L.frameW,
          height: L.frameH,
          borderRadius: 40,
          background: "#ffffff",
          padding: 12,
          boxShadow: "0 32px 64px -24px rgba(15,23,42,0.28)",
          transform: `scale(${frameSettle})`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 30,
            overflow: "hidden",
            position: "relative",
            background: "#e2e8f0",
          }}
        >
          {HERO_IMAGES.map((img, i) => {
            const start = i * (FRAMES_PER_IMAGE - CROSSFADE);
            const end = start + FRAMES_PER_IMAGE;
            const local = frame - start;
            if (local < -CROSSFADE || local > FRAMES_PER_IMAGE) return null;
            const opacity =
              i === 0
                ? interpolate(frame, [end - CROSSFADE, end], [1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })
                : interpolate(
                    frame,
                    [start, start + CROSSFADE, end - CROSSFADE, end],
                    [0, 1, 1, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  );
            const scale = interpolate(
              Math.max(0, local),
              [0, FRAMES_PER_IMAGE],
              i % 2 === 0 ? [1.0, 1.06] : [1.06, 1.0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={img}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: Math.max(0, Math.min(1, opacity)),
                }}
              >
                <Img
                  src={asset(img)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale})`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* floating UI cards over the frame */}
      <div style={{ transform: `scale(${0.92 + pA * 0.08})` }}>
        <FloatCard
          title="Inspected & warranty-ready"
          desc="Extended service contracts available"
          bob={bobA}
          style={{ left: L.cardAX, top: L.cardAY }}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2">
              <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
              <path d="M9 12l2.2 2.2L15.5 10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
      </div>
      <div style={{ transform: `scale(${0.92 + pB * 0.08})` }}>
        <FloatCard
          title="All credit welcome"
          desc="Good, bad or no credit history"
          bob={bobB}
          style={{ left: L.cardBX, top: L.cardBY }}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2">
              <rect x="3" y="6" width="18" height="13" rx="2.5" />
              <path d="M3 10.5h18M7 15h4" strokeLinecap="round" />
            </svg>
          }
        />
      </div>

      {/* left text column */}
      <div
        style={{
          position: "absolute",
          left: L.margin,
          top: L.chipY,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "#ffffff",
          border: `1px solid ${BORDER}`,
          borderRadius: 999,
          padding: "10px 20px",
          fontSize: 19,
          fontWeight: 600,
          color: "#1e293b",
          boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
        }}
      >
        <span
          style={{ width: 9, height: 9, borderRadius: "50%", background: ACCENT }}
        />
        Long Island City, New York
      </div>

      <div
        style={{
          position: "absolute",
          left: L.margin,
          top: L.h1Y,
          fontWeight: 800,
          fontSize: L.h1Size,
          lineHeight: 1.06,
          letterSpacing: "-0.03em",
          color: INK,
        }}
      >
        <div>We sell quality</div>
        <div>pre-owned vehicles.</div>
      </div>

      <div
        className="hcomp-sub"
        style={{
          position: "absolute",
          left: L.margin,
          top: L.subY,
          width: L.subWidth,
          fontSize: L.subSize,
          lineHeight: 1.55,
          color: MUTED,
        }}
      >
        Welcome to Astoria Motors, LLC — inspected cars, SUVs and trucks with
        extended warranty options, minutes from Manhattan.
      </div>

      <div
        style={{
          position: "absolute",
          left: L.margin,
          top: L.trustY,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {["Inspected vehicles", "Warranty options", "All credit welcome"].map((t) => (
          <div
            key={t}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "#ffffff",
              border: `1px solid ${BORDER}`,
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 18,
              fontWeight: 600,
              color: "#1e293b",
              boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
            }}
          >
            <Check />
            {t}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
