import { Briefcase, Cpu, FolderGit2, Home, Mail, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

interface NavItem {
  id?: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

/**
 * Section hrefs are absolute ("/#projects"), not bare fragments ("#projects").
 *
 * A bare fragment is resolved against the *current* document, so on /about/
 * the browser treated "#projects" as "/about/#projects" — a same-document jump
 * to a non-existent anchor that left the visitor stranded. That happened
 * whenever JS had not hydrated yet (slow connection, cached shell, or a script
 * failure), because nothing had intercepted the click.
 *
 * "Home" carries no hash at all. "/" lands at the top of the page, whereas
 * "/#hero" makes the browser anchor to #hero — which sits below the page's top
 * padding and strands the visitor ~144px down the page.
 */
const navItems: NavItem[] = [
  { id: "hero", label: "Home", href: "/", icon: Home },
  { id: "projects", label: "Projects", href: "/#projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", href: "/#experience", icon: Briefcase },
  { id: "impact", label: "Achievements", href: "/#impact", icon: Zap },
  { id: "tech-stack", label: "Stack", href: "/#tech-stack", icon: Cpu },
  // Also a section: the home page ends with the contact form, so this item
  // needs an id for the scroll-spy to light up there, while still behaving as
  // a normal page link on every other page.
  { id: "contact-form-section", label: "Contact", href: "/#contact-form-section", icon: Mail },
];

interface NavbarProps {
  /**
   * Current path, injected by Layout.astro from `Astro.url.pathname`.
   *
   * This must come from the build, not `window.location` read in an effect:
   * reading it client-side left the server-rendered HTML with the default "/",
   * so Home rendered as active on every page and only corrected itself once
   * hydration finished.
   */
  pathname: string;
}

/** Strip trailing slashes without a regex, keeping the match unambiguous. */
const normalise = (p: string) => {
  let out = p;
  while (out.length > 1 && out.endsWith('/')) out = out.slice(0, -1);
  return out || '/';
};

const Navbar: React.FC<NavbarProps> = ({ pathname: rawPathname }) => {
  const pathname = normalise(rawPathname || "/");
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const sectionIds = navItems.filter((item) => item.id).map((item) => item.id!);
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    // Section highlighting only applies to the home page — those anchors do
    // not exist on subpages, where a page link owns the active state instead.
    if (pathname !== "/") return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // "Home": already on the home page, so scroll to the top rather than
    // reloading it. From a subpage, the plain "/" href navigates correctly
    // with or without JavaScript.
    if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const [path, hash] = href.split("#");
    if (!hash) return; // page link — normal navigation

    // Section link from another page: let the browser follow the absolute
    // href so navigation still works before hydration.
    if (path && path !== pathname) return;

    const el = document.getElementById(hash);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", hash);
  };

  return (
    <nav
      // Fixed: the bar stays visible after scrolling on every page.
      className="nav-anim fixed top-5 left-1/2 -translate-x-1/2 z-50 flex h-12 items-center gap-1 sm:gap-2 rounded-2xl px-2.5 sm:px-3 transition-all duration-300 pointer-events-auto max-w-[calc(100vw-16px)] overflow-visible"
      style={{
        backgroundColor: "rgba(21, 19, 18, 0.75)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        animationDelay: "0s",
      }}
    >
      {navItems.map((item) => {
        const IconComponent = item.icon;
        // A nav item can be a home-page section anchor, a page link, or both —
        // Contact is a form at the foot of the home page *and* its own page.
        // On the home page the anchor wins; elsewhere fall back to the URL.
        const isUrlMatch = pathname === item.href;
        const isActive = item.id
          ? pathname === "/"
            ? activeSection === item.id
            : isUrlMatch
          : isUrlMatch;
        // "page" when the URL says so, "true" when it is only the scroll
        // position — Contact is the one item that can be either.
        const ariaCurrent = isActive ? (isUrlMatch ? "page" : "true") : undefined;

        return (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            aria-label={item.label}
            aria-current={ariaCurrent}
            className={`group relative flex h-9.5 w-8.5 sm:w-9.5 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
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
              className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-[12px] font-display font-medium text-white transition-all duration-200 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible z-50 shadow-xl"
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
