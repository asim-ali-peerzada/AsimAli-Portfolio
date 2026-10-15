import { useEffect } from 'react';
import LeftPortraitCard from './LeftPortraitCard';
import HeroContent from './HeroContent';
import Projects from './Projects';
import Experience from './Experience';
import EngineeringImpact from './EngineeringImpact';
import TechStack from './TechStack';
import ContactSection from './ContactSection';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const SCROLL_KEY = 'homepage_scroll';

export default function HomeRoot() {
  useEffect(() => {
    const navTarget = sessionStorage.getItem('nav_target');
    if (navTarget) {
      sessionStorage.removeItem('nav_target');
      const scrollToSection = () => {
        const el = document.getElementById(navTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
      requestAnimationFrame(scrollToSection);
      const timer = setTimeout(scrollToSection, 100);
      return () => clearTimeout(timer);
    }

    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      const y = Number.parseInt(saved, 10);
      if (!Number.isNaN(y)) {
        requestAnimationFrame(() => window.scrollTo(0, y));
      }
      sessionStorage.removeItem(SCROLL_KEY);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main id="main-content" className="w-full bg-canvas min-h-screen flex flex-col items-center relative">
        <div className="w-full max-w-285 px-5 sm:px-8 pt-28 sm:pt-36 pb-20 flex flex-col lg:flex-row items-center lg:items-start gap-12.5 lg:gap-25 relative">
          
          {/* Sticky Left Column (Centered on Mobile, Pinned on Desktop) */}
          <aside className="w-full max-w-86 shrink-0 lg:sticky lg:top-12.5 z-20 flex justify-center px-0">
            <LeftPortraitCard />
          </aside>

          {/* Scrollable Right Column — `@container` lets the hero stat grid
              respond to its own width. Viewport breakpoints are not enough here:
              this column's width depends on whether the portrait card is beside
              it, so the same viewport size yields very different space. */}
          <div className="@container flex-1 w-full max-w-174 flex flex-col items-start min-w-0">
            <HeroContent />
            <Projects />
            <Experience />
            <EngineeringImpact />
            <TechStack />
            <ContactSection />
          </div>
        </div>

        {/* Global Bottom Footer */}
        <Footer />
      </main>
      <Toaster />
    </>
  );
}
