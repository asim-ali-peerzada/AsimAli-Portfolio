import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './Hero';
import Metrics from './Metrics';
import Projects from './Projects';
import HowIBuild from './HowIBuild';
import TechnicalAuthority from './TechnicalAuthority';
import Experience from './Experience';
import { TooltipProvider } from './ui/tooltip';
import { Toaster } from './ui/toaster';
import { Toaster as Sonner } from './ui/sonner';

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
    <TooltipProvider>
      <Navbar />
      <main id="main-content" className="pt-16 md:pt-20">
        <Hero />
        <Metrics />
        <Projects />
        <HowIBuild />
        <TechnicalAuthority />
        <Experience />
      </main>
      <Footer />
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}
