import portfolioHd from '@/assets/images/my-headshot/croped-mine.png';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Work', href: '#projects' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Impact', href: '#experience' },
  { label: 'Contact', href: '#contact-form-section' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      navigate('/');
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden bg-white border-b border-gray-100/80 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20 box-border">
        {/* Left: Avatar + Name */}
        <motion.div
          layout
          onClick={() => navigate('/')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') navigate('/');
          }}
          className="flex items-center gap-3 cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Go to home page"
        >
          <div className="relative w-10 h-10 flex-shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden shadow-sm">
              <img src={portfolioHd} alt="Asim Ali" className="w-full h-full object-cover" />
            </div>
          </div>

          <span className="text-[17px] font-medium text-[#0a0a0a] font-['Urbanist',sans-serif] tracking-tight antialiased hidden sm:block">
            Asim Ali
          </span>
        </motion.div>

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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg max-w-full"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
