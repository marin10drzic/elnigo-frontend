"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Speisekarte", href: "#menu" },
  { label: "Über uns", href: "#about" },
  { label: "Reservierungen", href: "#reservations" },
  { label: "Kontakt", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0908]/90 backdrop-blur-md border-b border-amber-900/20">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-[0.25em] text-amber-400">
          EL NIGO
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-xs tracking-[0.25em] text-stone-300 hover:text-amber-400 transition-colors duration-200"
            >
              {label.toUpperCase()}
            </Link>
          ))}
        </div>

        <Link
          href="#reservations"
          className="hidden md:inline-flex items-center px-5 py-2.5 border border-amber-500/70 text-amber-400 text-xs tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all duration-200"
        >
          TISCH RESERVIEREN
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menü öffnen"
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${open ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#0d0b09] border-t border-amber-900/20 px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-xs tracking-[0.25em] text-stone-300 hover:text-amber-400 transition-colors"
            >
              {label.toUpperCase()}
            </Link>
          ))}
          <Link
            href="#reservations"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex justify-center px-5 py-3 border border-amber-500/70 text-amber-400 text-xs tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all"
          >
            TISCH RESERVIEREN
          </Link>
        </div>
      )}
    </header>
  );
}
