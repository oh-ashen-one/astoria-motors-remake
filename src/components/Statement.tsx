import React from "react";
import { LINKS } from "../data";

const ACTIONS = [
  {
    label: "Browse live inventory",
    note: "Updated daily on autofunds.com",
    href: LINKS.inventory,
  },
  {
    label: "Get pre-approved",
    note: "Secure credit application — takes minutes",
    href: LINKS.creditApp,
  },
  {
    label: "Let us find your car",
    note: "Tell us what you want; we'll source it",
    href: LINKS.findCar,
  },
  {
    label: "Get driving directions",
    note: "32-72 Gale Ave, Long Island City",
    href: LINKS.directions,
  },
];

export const Statement: React.FC = () => {
  return (
    <section className="statement">
      <h2>
        A full-service used car dealer in Long Island City — inspected cars,
        SUVs, minivans and trucks, many eligible for extended service contracts
        and warranties.
      </h2>
      <div className="linkrow">
        {ACTIONS.map((a) => (
          <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer">
            <span className="linkrow__label">{a.label}</span>
            <span className="linkrow__note">{a.note}</span>
          </a>
        ))}
      </div>
    </section>
  );
};
