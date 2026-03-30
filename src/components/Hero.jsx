const heroImage = "/guruji.png";
const leftDesign = "/hero-left-design-1.png";
const rightDesign = "/hero-right-design-1.png";

const socialMedia = [
  {
    key: "fb",
    href: "https://www.facebook.com/SantRajinderSinghJiMaharaj",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    key: "yt",
    href: "https://www.youtube.com/@SantRajinderSinghJiMaharaj",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C15.9 4.9 12 4.9 12 4.9h0s-3.9 0-6 .2c-.4.1-1.3.1-2.1.9-.6.6-.8 2-.8 2S3 9.6 3 11.2v1.6C3 14.4 3.1 16 3.1 16s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.8.2 5.7.2 5.7.2s3.9 0 6-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.1-1.6.1-3.2v-1.6C21.9 9.6 21.8 8 21.8 8ZM10 15.4V8.6l5.2 3.4L10 15.4z" />
      </svg>
    ),
  },
  {
    key: "ig",
    href: "https://www.instagram.com/sant.rajinder.singh.ji.maharaj/",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "wa",
    href: "https://skrm.sos.org/stayconnected/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.52 3.48A11.8 11.8 0 0 0 12.1.01C5.57.01.23 5.35.23 11.88c0 2.1.55 4.15 1.6 5.96L.06 24l6.34-1.66a11.8 11.8 0 0 0 5.67 1.45h.01c6.52 0 11.87-5.34 11.87-11.88 0-3.17-1.23-6.16-3.43-8.43ZM12.08 21.8h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.76.99 1-3.66-.23-.38a9.88 9.88 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.9-9.9a9.86 9.86 0 0 1 7.01 2.91 9.83 9.83 0 0 1 2.89 6.99c0 5.46-4.45 9.9-9.89 9.9Zm5.43-7.42c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.23-.64.08-.3-.15-1.25-.46-2.38-1.47a8.88 8.88 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.53.08-.8.38-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.35.2 1.86.12.56-.08 1.78-.73 2.03-1.44.25-.71.25-1.31.17-1.44-.07-.13-.27-.2-.56-.35Z" />
      </svg>
    ),
  },
];

const Hero = () => {
  return (
    <section className="hero-section relative w-full overflow-hidden">
      <div className="hero-background" aria-hidden />
      <div className="hero-overlay absolute inset-0 z-0" />

      <div className="hero-ornament pointer-events-none absolute top-0 left-0 z-10">
        <img src={leftDesign} alt="" className="h-auto w-full" />
      </div>

      <div className="hero-ornament pointer-events-none absolute right-0 bottom-0 z-10">
        <img src={rightDesign} alt="" className="h-auto w-full" />
      </div>

      <div className="hero-social pointer-events-auto absolute top-1/2 left-0 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {socialMedia.map((item) => (
          <a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="hero-social-btn flex cursor-pointer items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* Main Content (text only) */}
      <div className="hero-main relative z-20 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-0 px-6 pt-8 pb-0 sm:px-10 sm:pt-10 sm:pb-0 lg:items-start lg:justify-center lg:py-0 xl:px-10">
        {/* Left Text Content */}
        <div className="hero-copy flex w-full max-w-2xl flex-col items-center justify-center text-center text-white lg:w-1/2 lg:items-start lg:text-left">
          <p className="hero-org-title mb-5 text-white">
            Science of Spirituality
          </p>

          <p className="hero-subhead mb-4 uppercase">Connect to disconnect</p>

          <h1 className="hero-headline mb-5 font-bold">
            <span className="text-white">Start Healing</span>
            <br />
            <span className="text-white">Your Mind,</span>
            <br />
            <span className="hero-headline-accent">Body &amp; Soul</span>
          </h1>

          <div className="hero-quote-block">
            <p className="hero-quote text-center lg:text-left">
              To reunite with God, our soul needs to be free from all that is
              not Love.
            </p>
            <p className="hero-attribution">— Sant Rajinder Singh Ji Maharaj</p>
          </div>
        </div>
      </div>

      {/* Hero image anchored to full hero-section bottom */}
      <div className="hero-figure pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-center lg:inset-x-auto lg:right-[4%] lg:justify-end">
        <div className="hero-img-wrap relative overflow-hidden">
          <img
            src={heroImage}
            alt="Sant Rajinder Singh Ji Maharaj"
            className="hero-guru-image elementor-animation-bob block h-auto w-full object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
