import { Navbar } from "@/widgets/navbar";
import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { MenuHighlights } from "@/widgets/menu-highlights";
import { Gallery } from "@/widgets/gallery";
import { ReservationCta } from "@/widgets/reservation-cta";
import { Footer } from "@/widgets/footer";

export function HomePage() {
  return (
    <main className="bg-[#0a0908]">
      <Navbar />
      <Hero />
      <About />
      <MenuHighlights />
      <Gallery />
      <ReservationCta />
      <Footer />
    </main>
  );
}
