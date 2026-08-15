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
      className="nav-anim absolute top-[30px] left-1/2 -translate-x-1/2 z-50 flex h-12 items-center gap-[18px] rounded-2xl px-5 transition-all duration-300 pointer-events-auto"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
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
              className="pointer-events-none absolute top-[44px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-[12px] font-display text-white transition-all duration-200 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible z-50"
              style={{
                backgroundColor: "rgba(21, 19, 18, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
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
