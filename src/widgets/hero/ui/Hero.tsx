export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Real interior photo background */}
      <img
        src="/WhatsApp%20Image%202026-05-22%20at%2006.56.35.jpeg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Warm radial glow matching restaurant's wood tones */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(160,90,30,0.15)_0%,transparent_70%)]" />

      {/* Decorative corner lines */}
      <div className="absolute top-24 left-8 md:left-16 w-16 h-16 border-t border-l border-amber-500/40" />
      <div className="absolute top-24 right-8 md:right-16 w-16 h-16 border-t border-r border-amber-500/40" />
      <div className="absolute bottom-16 left-8 md:left-16 w-16 h-16 border-b border-l border-amber-500/40" />
      <div className="absolute bottom-16 right-8 md:right-16 w-16 h-16 border-b border-r border-amber-500/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-12 md:w-20 bg-amber-500/70" />
          <span className="text-amber-500/90 text-[10px] tracking-[0.5em] uppercase">
            Seit 1994 · Steakhouse
          </span>
          <div className="h-px w-12 md:w-20 bg-amber-500/70" />
        </div>

        <h1 className="font-serif text-7xl md:text-[9rem] lg:text-[11rem] font-bold tracking-[0.15em] text-white leading-none mb-3">
          EL NIGO
        </h1>

        <p className="text-amber-400/90 text-base md:text-lg tracking-[0.6em] uppercase mb-8 font-light">
          Steakhouse
        </p>

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-8 bg-amber-500/40" />
          <div className="w-1 h-1 rounded-full bg-amber-500/60" />
          <div className="h-px w-8 bg-amber-500/40" />
        </div>

        <p className="text-stone-300 text-base md:text-lg max-w-xl mx-auto mb-12 font-light leading-relaxed tracking-wide">
          Über 30 Jahre Leidenschaft für das perfekte Steak — Steaks, Grillgerichte und mehr in familiärer Atmosphäre.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="px-9 py-4 bg-amber-500 text-black text-xs tracking-[0.25em] font-semibold hover:bg-amber-400 transition-colors duration-200"
          >
            SPEISEKARTE
          </a>
          <a
            href="#reservations"
            className="px-9 py-4 border border-amber-500/60 text-amber-400 text-xs tracking-[0.25em] hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-200"
          >
            TISCH RESERVIEREN
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.4em] text-stone-500 uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-amber-500/50 to-transparent" />
      </div>
    </section>
  );
}
