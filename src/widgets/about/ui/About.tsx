export function About() {
  return (
    <section id="about" className="bg-[#0d0b09] py-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image block */}
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden relative">
            <img
              src="/WhatsApp%20Image%202026-05-22%20at%2006.56.36%20%281%29.jpeg"
              alt="30 Jahre El Nigo Steakhouse"
              loading="lazy"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/50 to-transparent" />
          </div>
          {/* Offset border accent */}
          <div className="absolute -bottom-5 -right-5 w-full h-full border border-amber-500/25 pointer-events-none" />
        </div>

        {/* Text block */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-amber-500" />
            <span className="text-amber-500 text-[10px] tracking-[0.4em] uppercase">Unsere Geschichte</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
            30 Jahre{" "}
            <span className="text-amber-400 italic">Leidenschaft</span>
            <br />für das Steak
          </h2>

          <p className="text-stone-400 leading-relaxed mb-5 text-[15px]">
            Seit über 30 Jahren steht El Nigo für erstklassige Steaks, herzliche Gastfreundschaft und unvergessliche Abende. Was als kleines Steakhouse begann, ist heute ein fester Bestandteil der lokalen Gastronomie.
          </p>

          <p className="text-stone-400 leading-relaxed mb-10 text-[15px]">
            Jedes Detail — von der Auswahl der besten Fleischstücke bis hin zu unseren hausgemachten Soßen — spiegelt unsere Hingabe an echte Qualität und familiäre Wärme wider. Restaurant Guru Empfehlung 2024.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 mb-10 pt-8 border-t border-stone-800">
            {[
              { value: "30+", label: "Jahre Erfahrung" },
              { value: "40+", label: "Signature Gerichte" },
              { value: "★ 2024", label: "Restaurant Guru" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-2xl text-amber-400 mb-1">{value}</p>
                <p className="text-stone-500 text-xs tracking-wide">{label}</p>
              </div>
            ))}
          </div>

          <a
            href="#reservations"
            className="inline-flex items-center gap-3 text-amber-400 text-xs tracking-[0.3em] uppercase hover:gap-5 transition-all duration-200"
          >
            Tisch reservieren
            <span className="text-base">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
