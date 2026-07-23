import { useEffect } from 'react';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowIBuild from '@/components/HowIBuild';
import Metrics from '@/components/Metrics';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import TechnicalAuthority from '@/components/TechnicalAuthority';

const SCROLL_KEY = 'homepage_scroll';

const Index = () => {
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
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Hero />
        <Metrics />
        <Projects />
        <HowIBuild />
        <TechnicalAuthority />
        <Experience />
        {/* <BackendArchitecture /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
