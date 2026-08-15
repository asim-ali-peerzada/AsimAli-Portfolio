import { useEffect } from 'react';
import Navbar from './Navbar';
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
      const y = parseInt(saved, 10);
      if (!isNaN(y)) {
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
        <Navbar />
        {/* Main 1140px Canvas Container */}
        <div className="w-full max-w-[1140px] px-5 sm:px-8 lg:px-0 pt-28 sm:pt-36 pb-20 flex flex-col lg:flex-row items-center lg:items-start gap-[50px] lg:gap-[100px] relative">
          
          {/* Sticky Left Column (Centered on Mobile, Pinned on Desktop) */}
          <aside className="w-full max-w-[344px] shrink-0 lg:sticky lg:top-[50px] z-20 flex justify-center">
            <LeftPortraitCard />
          </aside>

          {/* Scrollable Right Column */}
          <div className="flex-1 w-full max-w-[696px] flex flex-col items-start min-w-0">
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
