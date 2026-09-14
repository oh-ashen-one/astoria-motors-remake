import React, { useEffect, useState } from "react";
import { asset, CONTACT, LINKS } from "../data";

const NAV = [
  { label: "Inventory", href: LINKS.inventory, external: true },
  { label: "Financing", href: "#financing", external: false },
  { label: "About", href: "#about", external: false },
  { label: "Visit Us", href: "#visit", external: false },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <a className="site-header__brand" href="#top" onClick={() => setOpen(false)}>
        <img src={asset("logo.png")} alt="Astoria Motors, LLC" className="site-header__logo" />
      </a>

      <nav className={`site-nav ${open ? "site-nav--open" : ""}`}>
        {NAV.map((item) => (
          <a
            key={item.label}
            className="site-nav__link"
            href={item.href}
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a className="btn btn--red site-nav__cta" href={CONTACT.salesTel}>
          {CONTACT.salesPhone}
        </a>
      </nav>

      <button
        className={`hamburger ${open ? "hamburger--open" : ""}`}
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
};
