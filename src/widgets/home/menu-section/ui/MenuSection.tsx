"use client";

import { useState, useEffect } from "react";
import { useMenuCategories, useMenuItems } from "@/entities/menu";
import { beilagen } from "./menuData";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price);
}

export function MenuSection() {
  const { data: categories, isLoading: catsLoading } = useMenuCategories();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (categories && categories.length > 0 && !activeId) {
      setActiveId(categories[0].id);
    }
  }, [categories, activeId]);

  const { data: items, isLoading: itemsLoading } = useMenuItems(
    activeId ? { categoryId: activeId } : undefined
  );

  const activeCategory = categories?.find((c) => c.id === activeId);
  const isSteaks = activeCategory?.name === "Steaks";

  return (
    <section id="speisekarte" className="bg-[#0d0b09] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-amber-500/60" />
            <span className="text-amber-500 text-[10px] tracking-[0.5em] uppercase">El Nigo</span>
            <div className="h-px w-12 bg-amber-500/60" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Speisekarte</h2>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Alle Preise inkl. MwSt. und Bedienung. Allergene auf Anfrage.
          </p>
        </div>

        {/* Category tabs */}
        {catsLoading ? (
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-8 w-28 bg-amber-900/20 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {categories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className={`px-5 py-2 text-xs tracking-[0.2em] uppercase border transition-all duration-200 ${
                  activeId === cat.id
                    ? "bg-amber-500 border-amber-500 text-black font-semibold"
                    : "border-amber-500/30 text-stone-400 hover:border-amber-400 hover:text-amber-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Items grid */}
        {itemsLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-amber-900/10">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-[#0d0b09] p-6 animate-pulse">
                <div className="flex justify-between mb-2">
                  <div className="h-4 bg-amber-900/20 w-2/3" />
                  <div className="h-4 bg-amber-900/20 w-12" />
                </div>
                <div className="h-3 bg-amber-900/10 w-1/2 mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-amber-900/10">
            {items?.map((item) => (
              <div
                key={item.id}
                className="bg-[#0d0b09] p-6 hover:bg-[#131008] transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-serif text-white text-base leading-snug group-hover:text-amber-400 transition-colors duration-200">
                    {item.name}
                  </h3>
                  <span className="font-serif text-amber-400 text-base shrink-0">
                    {formatPrice(item.price)}
                  </span>
                </div>
                {item.description && (
                  <p className="text-stone-500 text-xs leading-relaxed">{item.description}</p>
                )}
                {item.tags?.includes("sharing") && (
                  <span className="inline-block mt-2 text-[10px] tracking-widest text-amber-600 uppercase border border-amber-600/30 px-2 py-0.5">
                    2 Personen
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Beilagen note */}
        {isSteaks && (
          <div className="mt-10 border border-amber-500/15 p-6">
            <p className="text-amber-500 text-[10px] tracking-[0.3em] uppercase mb-4">Beilagen</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-3">
              {beilagen.map((b) => (
                <div key={b.name} className="flex items-center justify-between gap-2">
                  <span className="text-stone-400 text-xs">{b.name}</span>
                  <span className="text-amber-500/70 text-xs shrink-0">{b.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
