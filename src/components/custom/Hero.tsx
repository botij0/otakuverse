import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative max-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in font-title">
          <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Discover Your Next
          </span>
          <br />
          <span className="text-foreground text-2xl md:text-4xl">Otaku Adventure</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in text-pretty">
          Search through thousands of anime and manga titles. Find your next obsession.
        </p>
      </div>
    </section>
  );
};

export default Hero;
