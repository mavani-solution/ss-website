import { useState } from "react";
import { ChevronRight } from "lucide-react";
import PillarQuizDialog from "./PillarQuizDialog";

const PILLARS = [
  {
    id: "karma",
    title: "Karma",
  },
  {
    id: "gratitude",
    title: "Gratitude",
  },
  {
    id: "selfless-service",
    title: "Selfless service",
  },
  {
    id: "ethical-life",
    title: "Ethical life",
  },
  {
    id: "social-media-pages-of-maharaji",
    title: "Social media pages of maharaji",
  },
  {
    id: "happiness",
    title: "Happiness",
  },
  {
    id: "vegetarian-diet",
    title: "Vegetarian diet",
  },
  {
    id: "meditation",
    title: "Meditation, inner light & sound",
  },
];

/** Large decorative leaf cluster — top-left */
function ServicesLeafBackdrop() {
  return (
    <div className="services-leaf-backdrop pointer-events-none" aria-hidden>
      <svg
        className="services-leaf-svg services-leaf-svg--primary"
        viewBox="0 0 520 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          className="services-leaf-stroke"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M40 380 C 80 280, 20 180, 120 120 C 200 70, 280 100, 320 40"
            opacity="0.45"
          />
          <path
            d="M120 400 C 160 300, 100 200, 200 140 C 260 100, 340 120, 400 60"
            opacity="0.35"
          />
          <path d="M60 320 Q 140 240, 220 200 T 380 100" opacity="0.3" />
          <ellipse
            cx="180"
            cy="200"
            rx="85"
            ry="38"
            transform="rotate(-35 180 200)"
            opacity="0.2"
            fill="currentColor"
            stroke="none"
          />
          <ellipse
            cx="260"
            cy="140"
            rx="72"
            ry="32"
            transform="rotate(-18 260 140)"
            opacity="0.15"
            fill="currentColor"
            stroke="none"
          />
          <ellipse
            cx="100"
            cy="300"
            rx="95"
            ry="42"
            transform="rotate(-48 100 300)"
            opacity="0.18"
            fill="currentColor"
            stroke="none"
          />
        </g>
      </svg>
      <svg
        className="services-leaf-svg services-leaf-svg--secondary"
        viewBox="0 0 400 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.35" fill="currentColor">
          <path
            d="M280 40 C340 80 380 160 360 240 C340 320 260 360 200 340 C160 200 200 80 280 40Z"
            opacity="0.12"
          />
          <path
            d="M320 120 C360 160 380 220 360 280 C330 340 260 360 220 320 C200 220 240 120 320 120Z"
            opacity="0.1"
          />
        </g>
      </svg>
    </div>
  );
}

export default function ServicesSection() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [, setRegistrations] = useState([]);

  const handleOpenChange = (next) => {
    setOpen(next);
    if (!next) setActive(null);
  };

  const handleRegistrationComplete = (payload) => {
    setRegistrations((prev) => [...prev, payload]);
  };

  return (
    <section className="services-section relative overflow-hidden">
      <div
        className="services-bg-mesh pointer-events-none absolute inset-0"
        aria-hidden
      />
      <ServicesLeafBackdrop />
      <div
        className="services-bg-accent pointer-events-none absolute -right-24 -bottom-20 h-[320px] w-[400px] opacity-[0.12]"
        aria-hidden
      />

      <div className="services-inner relative z-[1] mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
        <header className="services-header mb-10 text-center sm:mb-12">
          <h2 className="services-title font-['Playfair_Display',Georgia,serif] text-3xl leading-tight font-bold text-[#2d2430] sm:text-4xl lg:text-[2.65rem]">
            Pillars of Wheel
          </h2>
        </header>

        <div className="services-grid">
          {PILLARS.map((pillar, index) => (
            <button
              key={pillar.id}
              type="button"
              aria-label={`Open quiz: ${pillar.title}`}
              className="service-card service-card--carousel service-card--carousel-title-only group relative flex min-h-0 w-full cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden text-center"
              style={{ animationDelay: `${index * 70}ms` }}
              onClick={() => {
                setActive(pillar);
                setOpen(true);
              }}
            >
              <span
                className="service-card-shine pointer-events-none"
                aria-hidden
              />
              <span className="service-card-title service-card-title--carousel-only font-['Playfair_Display',Georgia,serif]">
                {pillar.title}
              </span>
              <span className="service-card-pillar-hint">
                <span>Open quiz</span>
                <ChevronRight
                  className="service-card-pillar-hint-icon size-3.5 shrink-0"
                  aria-hidden
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      <PillarQuizDialog
        open={open}
        onOpenChange={handleOpenChange}
        pillar={active}
        onRegistrationComplete={handleRegistrationComplete}
      />
    </section>
  );
}
