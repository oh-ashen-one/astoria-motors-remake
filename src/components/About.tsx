import React, { useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { ABOUT_COPY, asset, TOWNS } from "../data";

export const About: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const reduced = usePrefersReducedMotion();
  const img1 = useRef<HTMLDivElement>(null);
  const img2 = useRef<HTMLDivElement>(null);

  // Subtle parallax on the two images
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = window.scrollY + window.innerHeight / 2;
        [img1.current, img2.current].forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const center = window.scrollY + r.top + r.height / 2;
          const delta = (mid - center) * (i === 0 ? 0.06 : -0.06);
          el.style.transform = `translateY(${delta}px)`;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section className="about" id="about" ref={ref}>
      <div className={`about__inner ${inView ? "is-inview" : ""}`}>
        <div className="about__text">
          <span className="section-head__kicker reveal">About Us</span>
          <h2 className="section-head__title reveal" style={{ transitionDelay: "80ms" }}>
            A Full Service New York
            <br />
            Used Car Dealer
          </h2>
          <p className="about__copy reveal" style={{ transitionDelay: "160ms" }}>
            {ABOUT_COPY}
          </p>
        </div>
        <div className="about__images">
          <div className="about__img about__img--a reveal" style={{ transitionDelay: "200ms" }} ref={img1}>
            <img src={asset("slider-shop1.jpg")} alt="Astoria Motors storefront" loading="lazy" />
          </div>
          <div className="about__img about__img--b reveal" style={{ transitionDelay: "300ms" }} ref={img2}>
            <img src={asset("03.jpg")} alt="Pre-owned vehicles at Astoria Motors" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((dup) => (
            <div className="marquee__group" key={dup}>
              {TOWNS.map((t) => (
                <span className="marquee__item" key={`${dup}-${t}`}>
                  {t}
                  <span className="marquee__dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
