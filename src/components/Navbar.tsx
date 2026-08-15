import { Briefcase, Cpu, FolderGit2, Home, Mail, Zap } from "lucide-react";
import React from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Highlights", href: "#impact", icon: Zap },
  { label: "Stack", href: "#tech-stack", icon: Cpu },
  { label: "Contact", href: "#contact-form-section", icon: Mail },
];

const Navbar: React.FC = () => {
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
      className="nav-anim fixed top-[30px] left-1/2 -translate-x-1/2 z-50 flex h-12 items-center gap-[18px] rounded-2xl px-5 backdrop-blur-md transition-all duration-300 pointer-events-auto"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        animationDelay: "0.1s",
      }}
    >
      {navItems.map((item) => {
        const IconComponent = item.icon;

        return (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            aria-label={item.label}
            className="group relative flex h-[32px] w-[32px] items-center justify-center rounded-full text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <IconComponent size={20} strokeWidth={1.75} />

            {/* Pure CSS Hover Tooltip */}
            <span
              className="pointer-events-none absolute top-[44px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-[12px] font-display text-white transition-all duration-200 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible z-50 shadow-2xl"
              style={{
                backgroundColor: "rgba(21, 19, 18, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
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
