import React, { useState } from "react";
import { useInView } from "../hooks/useInView";
import { CONTACT, LINKS } from "../data";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const Contact: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry from ${name || "a customer"}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact" id="visit" ref={ref}>
      <div className={`contact__inner ${inView ? "is-inview" : ""}`}>
        <div className="section-head">
          <span className="section-head__kicker reveal">Visit Us</span>
          <h2 className="section-head__title reveal" style={{ transitionDelay: "80ms" }}>
            Find Us in Long Island City
          </h2>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__block reveal" style={{ transitionDelay: "120ms" }}>
              <h3 className="contact__heading">{CONTACT.name}</h3>
              <p className="contact__address">{CONTACT.address}</p>
              <a
                className="btn btn--ghost"
                href={LINKS.directions}
                target="_blank"
                rel="noopener noreferrer"
              >
                Driving Directions
              </a>
            </div>

            <div className="contact__block reveal" style={{ transitionDelay: "200ms" }}>
              <h4 className="contact__subhead">Sales</h4>
              <a className="contact__tel" href={CONTACT.salesTel}>
                {CONTACT.salesPhone}
              </a>
              <h4 className="contact__subhead">Call or Text</h4>
              <a className="contact__tel" href={CONTACT.callOrTextTel}>
                {CONTACT.callOrText}
              </a>
              <h4 className="contact__subhead">Fax</h4>
              <span className="contact__tel contact__tel--plain">{CONTACT.fax}</span>
            </div>

            <div className="contact__block reveal" style={{ transitionDelay: "280ms" }}>
              <h4 className="contact__subhead">Showroom Hours</h4>
              <ul className="hours">
                {DAYS.map((d) => (
                  <li key={d}>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="hours__note">
                Call <a href={CONTACT.salesTel}>{CONTACT.salesPhone}</a> for today's hours
              </p>
            </div>

            <form className="contact__form reveal" style={{ transitionDelay: "360ms" }} onSubmit={onSubmit}>
              <h4 className="contact__subhead">Send Us a Message</h4>
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
              <button className="btn btn--red" type="submit">
                Send via Email
              </button>
              <p className="contact__form-note">
                Prefer to talk? Call or text{" "}
                <a href={CONTACT.callOrTextTel}>{CONTACT.callOrText}</a>
              </p>
            </form>
          </div>

          <div className="contact__map reveal" style={{ transitionDelay: "200ms" }}>
            <iframe
              title="Map to Astoria Motors, LLC — 32-72 Gale Ave, Long Island City, NY 11101"
              src={LINKS.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};
