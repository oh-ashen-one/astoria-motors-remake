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
export const SHOWCASE_DURATION = 300; // 10s of frames, driven by scroll

interface Scene {
  img: string;
  caption: string;
  sub: string;
  from: number;
  to: number;
  pan: "in" | "out" | "left" | "right";
}

const SCENES: Scene[] = [
  { img: "02.jpg", caption: "Hand-Picked Inventory", sub: "Every vehicle chosen for quality", from: 0, to: 90, pan: "in" },
  { img: "slider-shop1.jpg", caption: "Inspected & Warranty-Ready", sub: "Extended service contracts available", from: 90, to: 180, pan: "right" },
  { img: "05.jpg", caption: "All Makes & Models", sub: "Cars • SUVs • Minivans • Trucks", from: 180, to: 270, pan: "out" },
  { img: "slider-shop2.jpg", caption: "Visit Us in Long Island City", sub: "32-72 Gale Ave — minutes from Manhattan", from: 270, to: 300, pan: "left" },
];

const FADE = 16;

const SceneView: React.FC<{ scene: Scene; local: number }> = ({ scene, local }) => {
  const len = scene.to - scene.from;
  const e = Easing.inOut(Easing.quad);
  let scale = 1.12;
  let tx = 0;
  if (scene.pan === "in") scale = interpolate(local, [0, len], [1.0, 1.18], { easing: e });
  if (scene.pan === "out") scale = interpolate(local, [0, len], [1.18, 1.0], { easing: e });
  if (scene.pan === "left") {
    scale = 1.14;
    tx = interpolate(local, [0, len], [3, -3], { easing: e });
  }
  if (scene.pan === "right") {
    scale = 1.14;
    tx = interpolate(local, [0, len], [-3, 3], { easing: e });
  }

  const captionIn = interpolate(local, [6, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const captionOut = interpolate(local, [len - 18, len - 4], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cap = Math.min(captionIn, captionOut);

  return (
    <AbsoluteFill>
      <Img
        src={asset(scene.img)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${tx}%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,12,0.82) 0%, rgba(10,10,12,0.35) 55%, rgba(10,10,12,0.15) 100%)",
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 110 }}>
        <div
          style={{
            opacity: cap,
            transform: `translateX(${(1 - cap) * -60}px)`,
            maxWidth: 720,
          }}
        >
          <div
            style={{
              width: 64,
              height: 5,
              background: "#e10600",
              boxShadow: "0 0 18px rgba(225,6,0,0.7)",
              marginBottom: 26,
              transform: `scaleX(${cap})`,
              transformOrigin: "left",
            }}
          />
          <div
            style={{
              fontFamily: "'Oswald', 'Arial Narrow', sans-serif",
              fontWeight: 700,
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: "0.03em",
              color: "#f5f5f7",
              textShadow: "0 4px 26px rgba(0,0,0,0.7)",
              textTransform: "uppercase",
            }}
          >
            {scene.caption}
          </div>
          <div
            style={{
              marginTop: 18,
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 500,
              fontSize: 26,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#c8c8d0",
            }}
          >
            {scene.sub}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Scroll-driven cinematic sequence — the page seeks frames directly. */
export const ShowcaseComposition: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0c" }}>
      {SCENES.map((scene) => {
        if (frame < scene.from - FADE || frame > scene.to + FADE) return null;
        const local = Math.max(0, frame - scene.from);
        const opacity = interpolate(
          frame,
          [scene.from - FADE, scene.from, scene.to, scene.to + FADE],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <AbsoluteFill key={scene.caption} style={{ opacity }}>
            <SceneView scene={scene} local={local} />
          </AbsoluteFill>
        );
      })}

      {/* Progress hint bar */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 110,
          right: 110,
          height: 3,
          background: "rgba(255,255,255,0.14)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / SHOWCASE_DURATION) * 100}%`,
            background: "#e10600",
            boxShadow: "0 0 12px rgba(225,6,0,0.8)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
