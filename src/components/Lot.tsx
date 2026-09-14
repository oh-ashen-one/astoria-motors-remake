import React from "react";
import { ABOUT_COPY, asset } from "../data";

export const Lot: React.FC = () => {
  return (
    <section className="lot" id="about">
      <div className="plate">
        <img src={asset("slider-shop1.jpg")} alt="The Astoria Motors lot on Gale Avenue" loading="lazy" />
      </div>
      <div className="lot__body">
        <h2>Full service, on Gale Avenue.</h2>
        <p>{ABOUT_COPY}</p>
      </div>
    </section>
  );
};
