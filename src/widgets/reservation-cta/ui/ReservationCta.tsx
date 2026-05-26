export function ReservationCta() {
  return (
    <section id="reservations" className="relative py-32 px-6 overflow-hidden">
      {/* Terrace photo background */}
      <img
        src="/WhatsApp%20Image%202026-05-22%20at%2006.56.51%20%281%29.jpeg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,146,42,0.08)_0%,transparent_65%)]" />

      {/* Decorative inset border */}
      <div className="absolute inset-6 md:inset-10 border border-amber-500/15 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-amber-500/60" />
          <span className="text-amber-500 text-[10px] tracking-[0.5em] uppercase">Reservierungen</span>
          <div className="h-px w-12 bg-amber-500/60" />
        </div>

        <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
          Reservieren Sie{" "}
          <br />
          <span className="text-amber-400 italic">Ihren Tisch</span>
        </h2>

        <p className="text-stone-400 text-base mb-4 max-w-lg mx-auto leading-relaxed">
          Genießen Sie einen unvergesslichen Abend bei uns. Wir empfehlen eine Vorab-Reservierung, um Ihren Wunschtisch zu sichern.
        </p>

        <a
          href="tel:+38512345678"
          className="inline-block font-serif text-2xl md:text-3xl text-amber-400 tracking-[0.15em] mb-10 hover:text-amber-300 transition-colors"
        >
          +385 1 234 5678
        </a>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="px-10 py-4 bg-amber-500 text-black text-xs tracking-[0.25em] font-semibold hover:bg-amber-400 transition-colors duration-200"
          >
            ONLINE BUCHEN
          </a>
          <a
            href="tel:+38512345678"
            className="px-10 py-4 border border-amber-500/60 text-amber-400 text-xs tracking-[0.25em] hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-200"
          >
            ANRUFEN
          </a>
        </div>

        <p className="text-stone-600 text-xs mt-10 tracking-wide">
          Mo–Do 17:00–23:00 · Fr–Sa 17:00–00:00 · So 16:00–22:00
        </p>
      </div>
    </section>
  );
}
