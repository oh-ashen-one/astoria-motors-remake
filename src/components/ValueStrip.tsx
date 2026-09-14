import React from "react";

const VALUES = [
  {
    title: "Inspected vehicles",
    desc: "Every car checked before the lot",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
        <path d="M9 12l2.2 2.2L15.5 10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Extended warranties",
    desc: "Service contracts on many vehicles",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" strokeLinejoin="round" />
        <path d="M14 3v5h5M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "All credit welcome",
    desc: "Good, bad or no credit history",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="6" width="18" height="13" rx="2.5" />
        <path d="M3 10.5h18M7 15h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Serving NY & NJ",
    desc: "Queens to Jersey City and beyond",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    ),
  },
];

export const ValueStrip: React.FC = () => {
  return (
    <section className="values" aria-label="Why buy from Astoria Motors">
      <div className="values__row">
        {VALUES.map((v) => (
          <div className="value" key={v.title}>
            <div className="value__icon">{v.icon}</div>
            <div>
              <div className="value__title">{v.title}</div>
              <div className="value__desc">{v.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
