import { Navbar } from "@/widgets/home/navbar";
import { Hero } from "@/widgets/home/hero";
import { About } from "@/widgets/home/about";
import { MenuHighlights } from "@/widgets/home/menu-highlights";
import { MenuSection } from "@/widgets/home/menu-section";
import { Gallery } from "@/widgets/home/gallery";
import { ReservationCta } from "@/widgets/home/reservation-cta";
import { Footer } from "@/widgets/home/footer";

export function HomePage() {
  return (
    <main className="bg-[#0a0908]">
      <Navbar />
      <Hero />
      <About />
      <MenuHighlights />
      <MenuSection />
      <Gallery />
      <ReservationCta />
      <Footer />
    </main>
  );
}
