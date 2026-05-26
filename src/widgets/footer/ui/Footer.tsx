import Link from "next/link";

const hours = [
  { day: "Monday – Thursday", time: "5:00 PM – 11:00 PM" },
  { day: "Friday – Saturday", time: "5:00 PM – 12:00 AM" },
  { day: "Sunday", time: "4:00 PM – 10:00 PM" },
];

const navLinks = ["Menu", "About Us", "Reservations", "Private Dining", "Contact"];

export function Footer() {
  return (
    <footer id="contact" className="bg-[#080706] border-t border-amber-900/20 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold tracking-[0.25em] text-amber-400 mb-4">
              EL NIGO
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              Premium steakhouse offering an unforgettable dining experience in the heart of Zagreb.
            </p>
            <div className="flex gap-2">
              {[
                { label: "IG", href: "#" },
                { label: "FB", href: "#" },
                { label: "TW", href: "#" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-amber-900/40 flex items-center justify-center text-stone-500 text-[10px] tracking-widest hover:border-amber-400 hover:text-amber-400 transition-all duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] tracking-[0.35em] text-amber-500/80 uppercase mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-stone-400 text-sm hover:text-amber-400 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[10px] tracking-[0.35em] text-amber-500/80 uppercase mb-5">
              Hours
            </h4>
            <ul className="space-y-4">
              {hours.map(({ day, time }) => (
                <li key={day}>
                  <p className="text-stone-500 text-xs mb-0.5">{day}</p>
                  <p className="text-stone-300 text-sm">{time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-[0.35em] text-amber-500/80 uppercase mb-5">
              Find Us
            </h4>
            <address className="not-italic space-y-4">
              <div>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Ilica 123
                  <br />
                  10000 Zagreb, Croatia
                </p>
              </div>
              <div>
                <a
                  href="tel:+38512345678"
                  className="text-stone-400 text-sm hover:text-amber-400 transition-colors"
                >
                  +385 1 234 5678
                </a>
              </div>
              <div>
                <a
                  href="mailto:info@elnigo.hr"
                  className="text-stone-400 text-sm hover:text-amber-400 transition-colors"
                >
                  info@elnigo.hr
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-amber-900/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} El Nigo Steakhouse. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-stone-600 text-xs hover:text-stone-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
