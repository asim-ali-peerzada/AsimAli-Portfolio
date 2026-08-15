import { Briefcase, Cpu, FolderGit2, Home, Mail, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", href: "#hero", icon: Home },
  { id: "projects", label: "Projects", href: "#projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", href: "#experience", icon: Briefcase },
  { id: "impact", label: "Highlights", href: "#impact", icon: Zap },
  { id: "tech-stack", label: "Stack", href: "#tech-stack", icon: Cpu },
  { id: "contact-form-section", label: "Contact", href: "#contact-form-section", icon: Mail },
];

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <nav
      className="nav-anim absolute top-[30px] left-1/2 -translate-x-1/2 z-50 flex h-12 items-center gap-1.5 sm:gap-2.5 rounded-2xl px-3 transition-all duration-300 pointer-events-auto"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        animationDelay: "0.1s",
      }}
    >
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeSection === item.id;

        return (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            aria-label={item.label}
            className={`group relative flex h-[38px] w-[38px] items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-white/10 text-orange shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/5 active:scale-95"
            }`}
          >
            <IconComponent
              size={19}
              strokeWidth={isActive ? 2.2 : 1.75}
              className={isActive ? "text-orange" : "transition-colors group-hover:text-white"}
            />

            {/* Active Glow Dot Indicator */}
            {isActive && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-orange shadow-[0_0_6px_#F46C38]"></span>
            )}

            {/* Floating Tooltip with 6px floating gap */}
            <span
              className="pointer-events-none absolute top-[48px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-[12px] font-display font-medium text-white transition-all duration-200 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible z-50 shadow-xl"
              style={{
                backgroundColor: "#151312",
                border: "1px solid rgba(255, 255, 255, 0.14)",
              }}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
};

export default Navbar;
