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
  plateTop: number;
  plateH: number;
  margin: number;
  labelSize: number;
  hSize: number;
  dSize: number;
  capTop: number;
  barBottom: number;
  counterSize: number;
}

const DESKTOP: Layout = {
  plateTop: 120,
  plateH: 670,
  margin: 110,
  labelSize: 24,
  hSize: 64,
  dSize: 27,
  capTop: 838,
  barBottom: 28,
  counterSize: 24,
};

const TALL: Layout = {
  plateTop: 150,
  plateH: 520,
  margin: 64,
  labelSize: 22,
  hSize: 52,
  dSize: 24,
  capTop: 720,
  barBottom: 30,
  counterSize: 42,
};

const SceneView: React.FC<{ scene: Scene; local: number; L: Layout }> = ({
  scene,
  local,
  L,
}) => {
  const zoom = interpolate(local, [0, PER], [1.0, 1.08], {
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
          top: L.plateTop,
          left: 0,
          width: "100%",
          height: L.plateH,
          overflow: "hidden",
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
      <div
        style={{
          position: "absolute",
          top: L.capTop,
          left: L.margin,
          right: L.margin,
          opacity: capIn,
          transform: `translateY(${(1 - capIn) * 26}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 500,
            fontSize: L.labelSize,
            color: "#e10600",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {scene.plate}
        </div>
        <div
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontVariationSettings: "'opsz' 144",
            fontWeight: 560,
            fontSize: L.hSize,
            letterSpacing: "-0.015em",
            color: "#f2f2f4",
            lineHeight: 1.08,
            marginTop: 10,
          }}
        >
          {scene.caption}
        </div>
        <div
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: L.dSize,
            color: "#83868c",
            marginTop: 12,
            maxWidth: "64ch",
          }}
        >
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
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
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

      {/* plate counter */}
      <div
        style={{
          position: "absolute",
          right: L.margin,
          bottom: L.barBottom + 10,
          fontFamily: "'Fraunces', Georgia, serif",
          fontVariationSettings: "'opsz' 144",
          fontSize: L.counterSize,
          color: "#83868c",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ color: "#d9dbdf" }}>
          {String(Math.min(SCENES.length, Math.floor(frame / PER) + 1)).padStart(2, "0")}
        </span>
        {" / "}
        {String(SCENES.length).padStart(2, "0")}
      </div>

      {/* red progress hairline */}
      <div
        style={{
          position: "absolute",
          bottom: L.barBottom,
          left: L.margin,
          right: L.margin,
          height: 2,
          background: "rgba(217,219,223,0.14)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / (SHOWCASE_DURATION - 1)) * 100}%`,
            background: "#e10600",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
