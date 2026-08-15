import { FaEnvelope, FaFileDownload, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-canvas py-16 sm:py-20 flex flex-col items-center justify-center">
      <div className="w-full max-w-[1140px] px-5 sm:px-8 flex flex-col items-center text-center">
        {/* Brand & Engineering Focus */}
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[18px] sm:text-[19px] font-semibold text-white font-display">
            Asim Ali
          </p>
          <p className="text-[14px] font-medium text-orange font-display">
            Backend Software Engineer
          </p>
          <p className="text-[13px] text-muted font-display tracking-wide">
            Laravel · Custom Business Systems · Backend Architecture & Automation
          </p>
        </div>

        {/* Strategic Social & Action Links */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-2">
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
            href="/resume.pdf"
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
