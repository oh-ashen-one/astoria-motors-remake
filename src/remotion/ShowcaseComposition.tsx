import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Easing,
  useCurrentFrame,
} from "remotion";
import { asset } from "../data";

export const SHOWCASE_FPS = 30;
export const SHOWCASE_DURATION = 320; // 4 plates × 80 frames, scroll-driven

const INK = "#0f172a";
const MUTED = "#475569";
const ACCENT = "#dc2626";

interface Scene {
  img: string;
  plate: string;
  caption: string;
  detail: string;
}

const SCENES: Scene[] = [
  {
    img: "02.jpg",
    plate: "Plate 01",
    caption: "Hand-picked inventory",
    detail: "Cars, SUVs, minivans and trucks, chosen for condition.",
  },
  {
    img: "slider-shop1.jpg",
    plate: "Plate 02",
    caption: "Inspected and warranty-ready",
    detail: "Many vehicles eligible for extended service contracts.",
  },
  {
    img: "05.jpg",
    plate: "Plate 03",
    caption: "All makes and models",
    detail: "Quality pre-owned vehicles across the range.",
  },
  {
    img: "slider-shop2.jpg",
    plate: "Plate 04",
    caption: "Minutes from Manhattan",
    detail: "32-72 Gale Ave, Long Island City — stop by the lot.",
  },
];

const PER = SHOWCASE_DURATION / SCENES.length; // 80
const FADE = 14;

interface Layout {
  frameX: number;
  frameY: number;
  frameW: number;
  frameH: number;
  capY: number;
  hSize: number;
  dSize: number;
  barY: number;
  margin: number;
  counterSize: number;
}

const DESKTOP: Layout = {
  frameX: 330,
  frameY: 110,
  frameW: 1260,
  frameH: 640,
  capY: 800,
  hSize: 46,
  dSize: 24,
  barY: 1010,
  margin: 330,
  counterSize: 24,
};

const TALL: Layout = {
  frameX: 64,
  frameY: 120,
  frameW: 952,
  frameH: 560,
  capY: 740,
  hSize: 44,
  dSize: 24,
  barY: 1330,
  margin: 64,
  counterSize: 40,
};

const SceneView: React.FC<{ scene: Scene; local: number; L: Layout }> = ({
  scene,
  local,
  L,
}) => {
  const zoom = interpolate(local, [0, PER], [1.0, 1.07], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const capIn = interpolate(local, [4, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: L.frameX,
          top: L.frameY,
          width: L.frameW,
          height: L.frameH,
          borderRadius: 36,
          background: "#ffffff",
          padding: 10,
          boxShadow: "0 28px 56px -20px rgba(15,23,42,0.25)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 27,
            overflow: "hidden",
            background: "#e2e8f0",
          }}
        >
          <Img
            src={asset(scene.img)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${zoom})`,
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: L.margin,
          top: L.capY,
          right: L.margin,
          opacity: capIn,
          transform: `translateY(${(1 - capIn) * 22}px)`,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: ACCENT,
            borderRadius: 999,
            padding: "6px 16px",
            fontSize: 17,
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {scene.plate}
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: L.hSize,
            letterSpacing: "-0.02em",
            color: INK,
            marginTop: 14,
          }}
        >
          {scene.caption}
        </div>
        <div className="scomp-detail" style={{ fontSize: L.dSize, color: MUTED, marginTop: 8 }}>
          {scene.detail}
        </div>
      </div>
    </>
  );
};

/** Scroll-driven catalog sequence — the page seeks frames directly. */
export const ShowcaseComposition: React.FC<{ tall?: boolean }> = ({ tall }) => {
  const frame = useCurrentFrame();
  const L = tall ? TALL : DESKTOP;

  return (
    <AbsoluteFill style={{ backgroundColor: "#f8fafc" }}>
      {SCENES.map((scene, i) => {
        const start = i * PER;
        const end = start + PER;
        if (frame < start - FADE || frame > end + FADE) return null;
        const opacity = interpolate(
          frame,
          [start - FADE, start, end - FADE / 2, end],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <AbsoluteFill key={scene.plate} style={{ opacity }}>
            <SceneView scene={scene} local={Math.max(0, frame - start)} L={L} />
          </AbsoluteFill>
        );
      })}

      {/* progress track + accent fill */}
      <div
        style={{
          position: "absolute",
          top: L.barY,
          left: L.margin,
          right: L.margin,
          height: 6,
          borderRadius: 999,
          background: "#e2e8f0",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / (SHOWCASE_DURATION - 1)) * 100}%`,
            borderRadius: 999,
            background: ACCENT,
          }}
        />
      </div>

      {/* plate counter */}
      <div
        style={{
          position: "absolute",
          right: L.margin,
          top: L.barY + 18,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: L.counterSize,
          color: MUTED,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ color: INK }}>
          {String(Math.min(SCENES.length, Math.floor(frame / PER) + 1)).padStart(2, "0")}
        </span>
        {" / "}
        {String(SCENES.length).padStart(2, "0")}
      </div>
    </AbsoluteFill>
  );
};
