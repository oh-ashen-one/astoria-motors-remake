import React, { useEffect, useState } from "react";
import { asset, CONTACT, LINKS } from "../data";

const NAV = [
  { label: "Inventory", href: LINKS.inventory, external: true },
  { label: "Financing", href: "#financing", external: false },
  { label: "About", href: "#about", external: false },
  { label: "Visit", href: "#visit", external: false },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <a className="site-header__logo" href="#top" onClick={() => setOpen(false)} aria-label="Astoria Motors, LLC — home">
        <img src={asset("logo-transparent.png")} alt="Astoria Motors, LLC" />
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
        <a className="site-nav__phone" href={CONTACT.salesTel}>
          {CONTACT.salesPhone}
        </a>
        <a
          className="btn btn--accent site-nav__cta"
          href={LINKS.inventory}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          Browse inventory
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
