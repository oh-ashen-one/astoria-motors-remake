import React from "react";
import { useInView } from "../hooks/useInView";
import { FINANCE_COPY, LINKS } from "../data";

export const Financing: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section className="financing" id="financing" ref={ref}>
      <div className={`financing__inner ${inView ? "is-inview" : ""}`}>
        <span className="section-head__kicker reveal">Financing</span>
        <h2 className="financing__title reveal" style={{ transitionDelay: "80ms" }}>
          Good credit, bad credit,
          <br />
          or <span className="text-red">no credit at all</span> —<br />
          we believe you can get financed.
        </h2>
        <p className="financing__copy reveal" style={{ transitionDelay: "160ms" }}>
          {FINANCE_COPY}
        </p>
        <div className="reveal" style={{ transitionDelay: "240ms" }}>
          <a
            className="btn btn--red btn--lg"
            href={LINKS.creditApp}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply for Financing
          </a>
        </div>
      </div>
      <div className="financing__glow" aria-hidden="true" />
    </section>
  );
};
