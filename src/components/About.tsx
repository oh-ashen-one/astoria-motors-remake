import React from "react";
import { ABOUT_COPY, asset, TOWNS } from "../data";

export const About: React.FC = () => {
  return (
    <section className="section about" id="about">
      <div className="about__grid">
        <div className="about__frame">
          <img
            src={asset("slider-shop1.jpg")}
            alt="The Astoria Motors lot on Gale Avenue"
            loading="lazy"
          />
        </div>
        <div className="about__body">
          <h2>Full service, on Gale Avenue.</h2>
          <p>{ABOUT_COPY}</p>
          <div className="about__towns" aria-label="Towns we serve">
            {TOWNS.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
