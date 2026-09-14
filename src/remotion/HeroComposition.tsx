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
export const HERO_DURATION = 360; // 12s loop
const FRAMES_PER_IMAGE = 72;
const CROSSFADE = 24;

const KenBurnsImage: React.FC<{ src: string; local: number; seed: number }> = ({
  src,
  local,
  seed,
}) => {
  // Alternate pan directions per slide for variety
  const zoomIn = seed % 2 === 0;
  const scale = interpolate(local, [0, FRAMES_PER_IMAGE], zoomIn ? [1.02, 1.16] : [1.16, 1.02], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tx = interpolate(
    local,
    [0, FRAMES_PER_IMAGE],
    seed % 3 === 0 ? [-2.5, 2.5] : [2.5, -2.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <Img
      src={src}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${scale}) translateX(${tx}%)`,
      }}
    />
  );
};

const HEADLINE = ["WE", "SELL", "QUALITY", "PRE-OWNED", "VEHICLES"];
const REVEAL_START = 42;

export const HeroComposition: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0c" }}>
      {/* Cinematic Ken Burns slideshow with crossfades */}
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
        return (
          <AbsoluteFill key={img} style={{ opacity: Math.max(0, Math.min(1, opacity)) }}>
            <KenBurnsImage src={asset(img)} local={Math.max(0, local)} seed={i} />
          </AbsoluteFill>
        );
      })}

      {/* Cinematic dark grade + vignette */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.25) 40%, rgba(10,10,12,0.78) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Logo reveal: scale + glow */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 110,
        }}
      >
        <div
          style={{
            opacity: interpolate(frame, [REVEAL_START, REVEAL_START + 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }),
            transform: `scale(${interpolate(
              frame,
              [REVEAL_START, REVEAL_START + 30],
              [0.72, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.back(1.4)),
              }
            )})`,
            filter: `drop-shadow(0 0 ${interpolate(
              frame,
              [REVEAL_START, REVEAL_START + 40, HERO_DURATION],
              [40, 18, 14],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}px rgba(225,6,0,0.55))`,
          }}
        >
          <Img src={asset("logo.png")} style={{ width: 240 }} />
        </div>
      </AbsoluteFill>

      {/* Headline: staggered word reveal */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 190,
        }}
      >
        <div style={{ textAlign: "center", padding: "0 60px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 26px",
            }}
          >
            {HEADLINE.map((word, i) => {
              const wStart = REVEAL_START + 20 + i * 7;
              const p = interpolate(frame, [wStart, wStart + 16], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              });
              return (
                <span
                  key={word}
                  style={{
                    fontFamily: "'Oswald', 'Arial Narrow', sans-serif",
                    fontWeight: 700,
                    fontSize: 92,
                    letterSpacing: "0.04em",
                    lineHeight: 1.05,
                    color: "#f5f5f7",
                    textShadow: "0 4px 30px rgba(0,0,0,0.6)",
                    opacity: p,
                    transform: `translateY(${(1 - p) * 44}px)`,
                    display: "inline-block",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Red underline sweep */}
          <div
            style={{
              height: 5,
              margin: "26px auto 0",
              width: `${interpolate(
                frame,
                [REVEAL_START + 58, REVEAL_START + 88],
                [0, 420],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.inOut(Easing.cubic),
                }
              )}px`,
              background: "linear-gradient(90deg, #e10600, #ff3b30)",
              boxShadow: "0 0 24px rgba(225,6,0,0.7)",
            }}
          />

          {/* Sub copy */}
          <div
            style={{
              marginTop: 30,
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 500,
              fontSize: 30,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#c8c8d0",
              opacity: interpolate(
                frame,
                [REVEAL_START + 78, REVEAL_START + 104],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              transform: `translateY(${interpolate(
                frame,
                [REVEAL_START + 78, REVEAL_START + 104],
                [18, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.cubic),
                }
              )}px)`,
            }}
          >
            Welcome to Astoria Motors, LLC
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
