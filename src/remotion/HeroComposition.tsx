import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Easing,
  useCurrentFrame,
} from "remotion";
import { asset, HERO_IMAGES } from "../data";

export const HERO_FPS = 30;
export const HERO_DURATION = 360; // 12s loop: ~4.7s intro, then plates keep drifting

const FRAMES_PER_IMAGE = 72;
const CROSSFADE = 24;

interface Layout {
  margin: number;
  creditY: number;
  creditSize: number;
  plateTop: number;
  plateH: number;
  h1Size: number;
  h1Top: number;
}

const DESKTOP: Layout = {
  margin: 110,
  creditY: 64,
  creditSize: 23,
  plateTop: 170,
  plateH: 670,
  h1Size: 116,
  h1Top: 720,
};

const TALL: Layout = {
  margin: 64,
  creditY: 58,
  creditSize: 21,
  plateTop: 150,
  plateH: 377,
  h1Size: 96,
  h1Top: 600,
};

// Intro timeline (shared)
const PLATE_OPEN = [8, 46] as const;
const LINE1 = [50, 82] as const;
const LINE2 = [60, 92] as const;
const CREDITS = [96, 128] as const;

const rise = (
  frame: number,
  range: readonly [number, number],
  dist: number
) => {
  const p = interpolate(frame, range, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
};

export const HeroComposition: React.FC<{ tall?: boolean }> = ({ tall }) => {
  const frame = useCurrentFrame();
  const L = tall ? TALL : DESKTOP;

  const plateOpen = interpolate(frame, PLATE_OPEN, [0.015, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Letterboxed cinemascope plate — opens from a hairline */}
      <div
        style={{
          position: "absolute",
          top: L.plateTop,
          left: 0,
          width: "100%",
          height: L.plateH,
          overflow: "hidden",
          transform: `scaleY(${plateOpen})`,
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
          const zoomIn = i % 2 === 0;
          const scale = interpolate(
            Math.max(0, local),
            [0, FRAMES_PER_IMAGE],
            zoomIn ? [1.0, 1.07] : [1.07, 1.0],
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
        {/* scrim so the overlapping headline stays legible */}
        <div
          style={{
            position: "absolute",
            inset: "55% 0 0 0",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.62) 100%)",
          }}
        />
      </div>

      {/* Title-card credits */}
      <div
        style={{
          position: "absolute",
          top: L.creditY,
          left: L.margin,
          right: L.margin,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 500,
          fontSize: L.creditSize,
          color: "#83868c",
          ...rise(frame, CREDITS, 14),
        }}
      >
        <span>Welcome to Astoria Motors, LLC</span>
        <span>Long Island City, New York</span>
      </div>

      {/* Headline breaking the plate's frame */}
      <div
        style={{
          position: "absolute",
          top: L.h1Top,
          left: L.margin,
          right: L.margin,
          fontFamily: "'Fraunces', Georgia, serif",
          fontVariationSettings: "'opsz' 144",
          fontWeight: 560,
          fontSize: L.h1Size,
          lineHeight: 1.04,
          letterSpacing: "-0.015em",
          color: "#f2f2f4",
        }}
      >
        <div style={rise(frame, LINE1, 54)}>We sell quality</div>
        <div style={rise(frame, LINE2, 54)}>pre-owned vehicles.</div>
      </div>
    </AbsoluteFill>
  );
};
