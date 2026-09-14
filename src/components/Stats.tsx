import React, { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const CountUp: React.FC<{ target: number; suffix?: string; run: boolean }> = ({
  target,
  suffix = "",
  run,
}) => {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);
  const started = useRef(false);

  useEffect(() => {
    if (!run || started.current) return;
    started.current = true;
    if (reduced) {
      setValue(target);
      return;
    }
    const duration = 1600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, reduced]);

  return (
    <span className="stat__number">
      {value}
      {suffix}
    </span>
  );
};

const STATS = [
  { number: 23, suffix: "+", label: "Years Serving NY & NJ", count: true },
  { number: 2, suffix: "", label: "States Served — NY & NJ", count: true },
  { number: 0, suffix: "", label: "All Credit Welcome", count: false, big: "Yes" },
  { number: 0, suffix: "", label: "Cars • SUVs • Trucks", count: false, big: "All" },
];

export const Stats: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);

  return (
    <section className="stats" id="stats" ref={ref}>
      <div className={`stats__grid ${inView ? "is-inview" : ""}`}>
        {STATS.map((s, i) => (
          <div className="stat reveal" style={{ transitionDelay: `${i * 90}ms` }} key={s.label}>
            {s.count ? (
              <CountUp target={s.number} suffix={s.suffix} run={inView} />
            ) : (
              <span className="stat__number">{s.big}</span>
            )}
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
