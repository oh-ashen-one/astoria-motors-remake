import React from "react";
import { asset, CONTACT, LINKS } from "../data";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={asset("logo.png")} alt="Astoria Motors, LLC" className="footer__logo" />
          <p className="footer__addr">
            {CONTACT.address}
            <br />
            <a href={CONTACT.salesTel}>{CONTACT.salesPhone}</a>
          </p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h5>Inventory</h5>
            <a href={LINKS.inventory} {...ext}>View used cars</a>
            <a href={LINKS.inventory} {...ext}>Featured used cars</a>
            <a href={LINKS.findCar} {...ext}>Used car finder</a>
            <a href={LINKS.inventory} {...ext}>Under $10,000</a>
            <a href={LINKS.inventory} {...ext}>$10,000–$15,000</a>
            <a href={LINKS.inventory} {...ext}>$15,000–$20,000</a>
            <a href={LINKS.inventory} {...ext}>Over $20,000</a>
          </div>
          <div className="footer__col">
            <h5>Financing</h5>
            <a href={LINKS.creditApp} {...ext}>Credit application</a>
            <a href={LINKS.warranties} {...ext}>Our warranties</a>
            <a href={LINKS.doNotSell} {...ext}>Do Not Sell or Share Personal Information</a>
          </div>
          <div className="footer__col">
            <h5>Dealership</h5>
            <a href={LINKS.staff} {...ext}>Our staff</a>
            <a href={LINKS.contact} {...ext}>Contact us</a>
            <a href={LINKS.directions} {...ext}>Driving directions</a>
            <a href={LINKS.employment} {...ext}>Employment opportunities</a>
          </div>
          <div className="footer__col">
            <h5>Legal</h5>
            <a href={LINKS.sitemap} {...ext}>Sitemap</a>
            <a href={LINKS.terms} {...ext}>Terms of Use</a>
            <a href={LINKS.privacy} {...ext}>Privacy policy</a>
          </div>
        </div>
      </div>
      <div className="footer__bar">
        <span>All rights reserved. © 2003-2026 Astoria Motors, LLC</span>
      </div>
    </footer>
  );
};
