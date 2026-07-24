import { srcSet } from '@/lib/utils';
import portfolioHd from '@/assets/images/my-headshot/croped-mine.png';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Work', href: '#projects' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Impact', href: '#experience' },
  { label: 'Contact', href: '#contact-form-section' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      sessionStorage.setItem('nav_target', href.replace('#', ''));
      window.location.href = '/';
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden bg-white border-b border-gray-100/80 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20 box-border">
        {/* Left: Avatar + Name */}
        <div
          onClick={() => (window.location.href = '/')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') window.location.href = '/';
          }}
          className="flex items-center gap-3 cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Go to home page"
        >
          <div className="relative w-10 h-10 flex-shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden shadow-sm">
              <img src={typeof portfolioHd === 'string' ? portfolioHd : (portfolioHd as any).src} alt="Asim Ali" width={40} height={40} srcSet={srcSet(typeof portfolioHd === 'string' ? portfolioHd : (portfolioHd as any).src, ['40w', '120w'])} className="w-full h-full object-cover" />
            </div>
          </div>

          <span className="text-[17px] font-medium text-[#0a0a0a] font-['Urbanist',sans-serif] tracking-tight antialiased hidden sm:block">
            Asim Ali
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-4 py-2 text-[16px] font-medium text-[#374151] hover:text-[#10b981] font-['Urbanist',sans-serif] tracking-wide transition-colors rounded-full hover:bg-[#f1f5f9]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#f1f5f9] transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 shadow-lg max-w-full transition-all duration-200 overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-4 py-3 text-[16px] font-medium text-[#374151] hover:text-[#10b981] font-['Urbanist',sans-serif] tracking-wide transition-colors rounded-full hover:bg-[#f1f5f9]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
