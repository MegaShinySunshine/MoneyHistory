import { Hero } from "@/components/Hero";
import { CurvedTimeline } from "@/components/CurvedTimeline";
import { Footer } from "@/components/Footer";

/**
 * Root application component.
 * Single-page timeline with hero, curved animated path, and footer.
 */
export function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-x-hidden">
      <Hero />
      <CurvedTimeline />
      <Footer />
    </div>
  );
}
