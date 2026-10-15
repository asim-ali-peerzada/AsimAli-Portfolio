import { FaEnvelope, FaFileDownload, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-canvas py-16 sm:py-20 flex flex-col items-center justify-center">
      <div className="w-full max-w-285 px-5 sm:px-8 flex flex-col items-center text-center min-w-0">
        {/* Brand & Engineering Focus */}
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[18px] sm:text-[19px] font-semibold text-white font-display">
            Asim Ali
          </p>
          <p className="text-[14px] font-medium text-orange font-display">
            Backend Engineer · Systems &amp; Identity Architecture
          </p>
          <p className="text-[12.5px] sm:text-[13px] text-muted font-display tracking-wide max-w-full">
            Enterprise Systems · Centralized SSO &amp; RBAC/ABAC · Workflow
            Automation · High-Throughput APIs
          </p>
        </div>

        {/* Internal link cluster — distributes authority to the service pages
            and keeps every landing page within one click of the homepage. */}
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7"
        >
          {/* Genuine navigation only. The keyword landing pages that used to sit here
            were doorway pages competing with the homepage; astro.config.mjs
            redirects their slugs to "/" so the old URLs still resolve. */}
          {[
            { href: "/#projects", label: "Projects" },
            { href: "/#experience", label: "Experience" },
            { href: "/#impact", label: "Achievements" },
            { href: "/#tech-stack", label: "Tech Stack" },
            { href: "/blog", label: "Blog" },
            { href: "/Asim_Ali_Resume.pdf", label: "Resume" },
            { href: "/#contact-form-section", label: "Contact" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-muted transition-colors hover:text-white underline-offset-4 no-underline hover:underline hover:decoration-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Strategic Social & Action Links */}
        <div className="flex items-center justify-center flex-wrap gap-5 sm:gap-6 mt-6 pt-2">
          <a
            href="https://github.com/asim-ali-peerzada"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange hover:text-white transition-all transform hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/the-asimali"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange hover:text-white transition-all transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={18} />
          </a>
          <a
            href="mailto:asimalipeerzada@gmail.com"
            className="text-orange hover:text-white transition-all transform hover:scale-110"
            aria-label="Email"
          >
            <FaEnvelope size={18} />
          </a>
          <a
            href="/Asim_Ali_Resume.pdf"
            download
            className="text-orange hover:text-white transition-all transform hover:scale-110"
            aria-label="Download Resume"
          >
            <FaFileDownload size={18} />
          </a>
        </div>

        {/* Accessible Copyright Line */}
        <p className="text-[13px] text-zinc-400 font-display mt-8 tracking-wide">
          © {new Date().getFullYear()} Asim Ali · Punjab, Pakistan
        </p>
      </div>
    </footer>
  );
};

export default Footer;
