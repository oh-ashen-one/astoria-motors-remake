import React from "react";
import { LINKS } from "../data";

const Arrow: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const STEPS = [
  {
    num: "01",
    title: "Browse the inventory",
    copy: "Cars, SUVs, minivans and trucks — live listings updated on our dealer portal.",
    link: "See what's on the lot",
    href: LINKS.inventory,
  },
  {
    num: "02",
    title: "Get pre-approved",
    copy: "Our finance team works with most NY banks and lenders. Good, bad or no credit — apply in minutes.",
    link: "Start the application",
    href: LINKS.creditApp,
  },
  {
    num: "03",
    title: "Drive off the lot",
    copy: "Stop by 32-72 Gale Ave in Long Island City — minutes from Manhattan, easy to reach from NY or NJ.",
    link: "Get directions",
    href: LINKS.directions,
  },
];

export const Steps: React.FC = () => {
  return (
    <section className="section steps" id="steps">
      <div className="section__head">
        <h2>Three steps to your next car</h2>
        <p>No pressure, no runaround — here's exactly how buying from us works.</p>
      </div>
      <div className="steps__grid">
        {STEPS.map((s) => (
          <a className="step-card" key={s.num} href={s.href} target="_blank" rel="noopener noreferrer">
            <span className="step-card__num">{s.num}</span>
            <span className="step-card__title">{s.title}</span>
            <span className="step-card__copy">{s.copy}</span>
            <span className="step-card__link">
              {s.link}
              <Arrow />
            </span>
          </a>
        ))}
      </div>
      <div className="steps__finder">
        <p>Don't see the car you want? Tell us — we'll find it for you.</p>
        <a className="btn btn--accent" href={LINKS.findCar} target="_blank" rel="noopener noreferrer">
          Let us find your car
        </a>
      </div>
    </section>
  );
};
