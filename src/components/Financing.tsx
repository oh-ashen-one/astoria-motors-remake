import React from "react";
import { CONTACT, FINANCE_COPY, LINKS } from "../data";

export const Financing: React.FC = () => {
  return (
    <section className="section financing" id="financing">
      <div className="financing__glow" aria-hidden="true" />
      <div className="financing__inner">
        <h2>
          Good credit, bad credit, or no credit at all — we believe you can get
          financed.
        </h2>
        <p className="financing__copy">{FINANCE_COPY}</p>
        <div className="financing__actions">
          <a className="btn btn--accent" href={LINKS.creditApp} target="_blank" rel="noopener noreferrer">
            Apply for financing
          </a>
          <a className="btn btn--outline" href={CONTACT.salesTel}>
            Call {CONTACT.salesPhone}
          </a>
        </div>
      </div>
    </section>
  );
};
