const heroImage = "/src/assets/images/guruji.png";
const leftDesign = "/src/assets/images/hero-left-design-1.png";
const rightDesign = "/src/assets/images/hero-right-design-1.png";

const Hero = () => {
    return (
        <section className="hero-section relative w-full overflow-hidden">
            {/* Background (CSS background-image via .hero-background) */}
            <div className="hero-background" aria-hidden />
            <div className="hero-overlay absolute inset-0 z-0" />

            {/* Left Decorative Design */}
            <div className="hero-ornament pointer-events-none absolute top-0 left-0 z-10">
                <img src={leftDesign} alt="" className="h-auto w-full" />
            </div>

            {/* Right Decorative Design */}
            <div className="hero-ornament pointer-events-none absolute right-0 bottom-0 z-10">
                <img src={rightDesign} alt="" className="h-auto w-full" />
            </div>

            {/* Social Icons - Left Side */}
            <div className="hero-social absolute top-100 left-0 z-20 hidden -translate-y-1/2 flex-col gap-3 sm:flex">
                {[
                    <svg key="fb" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
                    <svg key="tw" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>,
                    <svg key="in" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                ].map((icon, i) => (
                    <button
                        key={i}
                        type="button"
                        className="hero-social-btn flex cursor-pointer items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
                    >
                        {icon}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="hero-main relative z-20 flex h-full w-full flex-col items-center justify-center gap-0 px-6 py-16 sm:px-10 lg:flex-row lg:gap-0 lg:py-0 lg:pl-30 xl:px-10">
                {/* Left Text Content */}
                <div className="hero-copy flex w-full max-w-2xl flex-col items-center justify-center text-center text-white lg:w-1/2 lg:items-start lg:text-left">
                    <p className="hero-org-title mb-5 text-white">
                        Science of Spirituality
                    </p>

                    <p className="hero-subhead mb-4 uppercase">
                        Connect to disconnect
                    </p>

                    <h1 className="hero-headline mb-5 font-bold">
                        <span className="text-white">Start Healing</span>
                        <br />
                        <span className="text-white">Your Mind,</span>
                        <br />
                        <span className="hero-headline-accent">Body &amp; Soul</span>
                    </h1>

                    <div className="hero-quote-block">
                        <p className="hero-quote text-center lg:text-left">
                            To reunite with God, our soul needs to be free from all that is not Love.
                        </p>
                        <p className="hero-attribution">
                            — Sant Rajinder Singh Ji Maharaj
                        </p>
                    </div>
                </div>

                {/* Right Hero Image */}
                <div className="hero-figure mt-8 flex shrink-0 items-center justify-center lg:mt-0 lg:justify-start">
                    <div className="hero-img-wrap relative overflow-hidden">
                        <img
                            src={heroImage}
                            alt="Sant Rajinder Singh Ji Maharaj"
                            className="elementor-animation-bob block h-auto w-full object-cover p-[10px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
