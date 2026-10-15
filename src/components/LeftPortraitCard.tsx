import { Flame, MapPin } from "lucide-react";
import {
  FaEnvelope,
  FaFileDownload,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

const LeftPortraitCard = () => {
  return (
    <div
      // Fluid width. An inline `width: 344px` overrode Tailwind here and forced
      // horizontal overflow on any viewport narrower than the card, which is
      // what produced the dead space to the right of the page on mobile.
      className="relative w-full max-w-86 h-160 bg-white flex flex-col justify-start items-center gap-6 overflow-hidden"
      style={{
        padding: "30px 20px",
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Portrait Image Container (Matching Framer reference: 304px x 310px, 16px radius, flat backdrop) */}
      <div
        className="relative w-full max-w-76 h-77.5 overflow-hidden flex items-center justify-center shrink-0"
        style={{
          background: "#1B1E22",
          borderRadius: "16px",
        }}
      >
        <img
          src="/images/my-headshot/croped-mine.webp"
          alt="Asim Ali"
          className="w-full h-full object-cover object-top filter contrast-[1.14] brightness-[1.02] border border-black/6"
          style={{
            objectPosition: "center 12%",
          }}
        />
      </div>

      {/* 2. Text & Content Area */}
      <div className="w-full flex flex-col items-center justify-between flex-1 text-center">
        {/* Name */}
        <h2 className="text-[34px] font-black text-canvas leading-[110%] tracking-[-0.04em] font-display">
          Asim Ali
        </h2>

        {/* Bio & Details Container */}
        <div className="flex flex-col items-center gap-2">
          {/* Flame Badge */}
          <div className="w-7 h-7 rounded-full bg-orange flex items-center justify-center text-white shadow-sm">
            <Flame size={14} fill="currentColor" />
          </div>

          {/* Specialization Bio. "Specializing in" is deliberate: it signals
              depth in a stack rather than a ceiling. Saying it here, rather than
              in the job title, keeps the headline backend-first while giving
              recruiters and ATS an unambiguous Laravel keyword match. */}
          <p className="text-[13.5px] font-medium text-dim leading-[135%] font-display max-w-72.5 w-full">
            Backend Engineer specializing in PHP and Laravel, architecting
            enterprise systems, identity integrations, and automated workflows.
          </p>

          {/* Location */}
          <div className="flex items-center justify-center gap-1 mt-0.5">
            <MapPin size={12} className="text-orange" />
            <p className="text-[11.5px] font-medium text-dim font-display">
              Punjab, Pakistan
            </p>
          </div>
        </div>

        {/* 3. Bottom Social / Action Icons */}
        <div className="w-full flex items-center justify-center gap-6 pt-1">
          <a
            href="https://github.com/asim-ali-peerzada"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange hover:text-[#d35422] transition-transform hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/the-asimali"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange hover:text-[#d35422] transition-transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="mailto:asimalipeerzada@gmail.com"
            className="text-orange hover:text-[#d35422] transition-transform hover:scale-110"
            aria-label="Email"
          >
            <FaEnvelope size={20} />
          </a>
          <a
            href="/Asim_Ali_Resume.pdf"
            download
            className="text-orange hover:text-[#d35422] transition-transform hover:scale-110"
            aria-label="Download Resume"
          >
            <FaFileDownload size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeftPortraitCard;
