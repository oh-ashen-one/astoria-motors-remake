import React, { useState } from "react";
import { CONTACT, LINKS } from "../data";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const Visit: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry from ${name || "a customer"}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <section className="visit" id="visit">
      <div className="visit__grid">
        <div>
          <h2>Visit the lot</h2>
          <p className="visit__address">{CONTACT.address}</p>
          <div className="visit__actions">
            <a className="btn btn--red" href={LINKS.directions} target="_blank" rel="noopener noreferrer">
              Get driving directions
            </a>
            <a className="btn btn--line" href={CONTACT.salesTel}>
              Call {CONTACT.salesPhone}
            </a>
          </div>

          <div className="directory">
            <div className="directory__row">
              <span className="directory__label">Sales</span>
              <a className="directory__value" href={CONTACT.salesTel}>
                {CONTACT.salesPhone}
              </a>
            </div>
            <div className="directory__row">
              <span className="directory__label">Call or text</span>
              <a className="directory__value" href={CONTACT.callOrTextTel}>
                {CONTACT.callOrText}
              </a>
            </div>
            <div className="directory__row">
              <span className="directory__label">Fax</span>
              <span className="directory__value">{CONTACT.fax}</span>
            </div>
          </div>

          <div className="hours">
            <h3>Showroom hours</h3>
            <div className="hours__days">
              {DAYS.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <p className="hours__note">
              Hours vary — call <a href={CONTACT.salesTel}>{CONTACT.salesPhone}</a> for today's
              hours.
            </p>
          </div>

          <form className="message" onSubmit={onSubmit}>
            <h3>Send us a message</h3>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Your name"
            />
            <textarea
              placeholder="What are you looking for?"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Your message"
            />
            <button className="btn btn--line" type="submit">
              Send by email
            </button>
            <p className="message__note">
              Prefer to talk? Call or text{" "}
              <a href={CONTACT.callOrTextTel}>{CONTACT.callOrText}</a>.
            </p>
          </form>
        </div>

        <div className="visit__map">
          <iframe
            title="Map to Astoria Motors, LLC — 32-72 Gale Ave, Long Island City, NY 11101"
            src={LINKS.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};
