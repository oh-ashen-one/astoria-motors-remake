import React from "react";
import { FINANCE_COPY, LINKS } from "../data";

export const Financing: React.FC = () => {
  return (
    <section className="financing" id="financing">
      <div className="financing__inner">
        <h2>
          Good credit, bad credit, or no credit at all — we believe you can get
          financed.
        </h2>
        <p className="financing__copy">{FINANCE_COPY}</p>
        <a className="btn btn--red" href={LINKS.creditApp} target="_blank" rel="noopener noreferrer">
          Apply for financing
        </a>
      </div>
    </section>
  );
};
