const dishes = [
  {
    name: "Beef Carpaccio",
    description: "Hauchdünn geschnittenes Rindfleisch, Parmesan, Cherry-Tomaten, Balsamico-Creme",
    price: "€14,50",
    image: "/WhatsApp%20Image%202026-05-22%20at%2006.56.53%20%284%29.jpeg",
    tag: "Vorspeise",
  },
  {
    name: "El Nigo Grillplatte",
    description: "Rindersteak, Cordon Bleu, Hähnchen, Lammkrone, Beilagen — für 2 Personen",
    price: "€46,80",
    image: "/WhatsApp%20Image%202026-05-22%20at%2006.56.52%20%283%29.jpeg",
    tag: "Signature",
  },
  {
    name: "Mix-Vorspeise",
    description: "Knoblauchbrot, Alioli, Putenspiess, Chorizo, Mini-Mozzarella, Hackfleischbällchen — für 2 Personen",
    price: "€35,80",
    image: "/WhatsApp%20Image%202026-05-22%20at%2006.56.55%20%282%29.jpeg",
    tag: "Zum Teilen",
  },
];

export function MenuHighlights() {
  return (
    <section id="menu" className="bg-[#0a0908] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-amber-500/60" />
            <span className="text-amber-500 text-[10px] tracking-[0.5em] uppercase">
              Unsere Empfehlungen
            </span>
            <div className="h-px w-12 bg-amber-500/60" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Signature Gerichte</h2>
          <p className="text-stone-500 text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Hausgemacht mit Liebe — jedes Gericht ein Erlebnis.
          </p>
        </div>

        {/* Dish grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {dishes.map((dish) => (
            <div key={dish.name} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-900 mb-6">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[9px] tracking-[0.25em] bg-amber-500 text-black px-3 py-1 uppercase font-semibold">
                    {dish.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-serif text-2xl text-amber-400">{dish.price}</span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-white mb-2">{dish.name}</h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{dish.description}</p>
                </div>
                <span className="font-serif text-lg text-amber-400 shrink-0 mt-1">{dish.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-9 py-4 border border-amber-500/40 text-amber-400 text-xs tracking-[0.25em] hover:border-amber-400 hover:bg-amber-500/5 transition-all duration-200"
          >
            VOLLSTÄNDIGE SPEISEKARTE
            <span className="text-base">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
