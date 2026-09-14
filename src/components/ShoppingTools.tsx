import React from "react";
import { useInView } from "../hooks/useInView";
import { LINKS } from "../data";

const TOOLS = [
  {
    title: "Our Inventory",
    copy: "We Sell Pre-Owned Vehicles",
    href: LINKS.inventory,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 13l1.5-5A2 2 0 0 1 6.4 6.5h11.2a2 2 0 0 1 1.9 1.5L21 13" />
        <path d="M3 13h18v5h-2.5M3 13v5h2.5M8 18h8" />
        <circle cx="7" cy="16" r="1.4" />
        <circle cx="17" cy="16" r="1.4" />
      </svg>
    ),
  },
  {
    title: "Easy Financing",
    copy: "Get pre-approved in minutes",
    href: LINKS.creditApp,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </svg>
    ),
  },
  {
    title: "Find Your Car",
    copy: "We will find a car for you at Astoria Motors, LLC",
    href: LINKS.findCar,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.5 15.5L21 21" />
      </svg>
    ),
  },
  {
    title: "Driving Direction",
    copy: "Driving directions to Astoria Motors, LLC",
    href: LINKS.directions,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    ),
  },
];

export const ShoppingTools: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section className="tools" ref={ref}>
      <div className={`section-head ${inView ? "is-inview" : ""}`}>
        <span className="section-head__kicker reveal">Shopping Tools</span>
        <h2 className="section-head__title reveal" style={{ transitionDelay: "80ms" }}>
          Start Your Search
        </h2>
      </div>
      <div className={`tools__grid ${inView ? "is-inview" : ""}`}>
        {TOOLS.map((t, i) => (
          <a
            key={t.title}
            className="tool-card reveal"
            style={{ transitionDelay: `${120 + i * 100}ms` }}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="tool-card__accent" />
            <span className="tool-card__icon">{t.icon}</span>
            <span className="tool-card__title">{t.title}</span>
            <span className="tool-card__copy">{t.copy}</span>
            <span className="tool-card__arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
};
