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
      className="relative w-[344px] h-[640px] bg-white flex flex-col justify-start items-center gap-[24px] overflow-hidden"
      style={{
        width: "344px",
        height: "640px",
        padding: "30px 20px",
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Portrait Image Container (Matching Framer reference: 304px x 310px, 16px radius, flat backdrop) */}
      <div
        className="relative w-full h-[310px] overflow-hidden flex items-center justify-center shrink-0"
        style={{
          background: "#1B1E22",
          borderRadius: "16px",
        }}
      >
        <img
          src="/images/my-headshot/croped-mine.webp"
          alt="Asim Ali"
          className="w-full h-full object-cover object-top filter contrast-[1.14] brightness-[1.02]"
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

          {/* Specialization Bio */}
          <p className="text-[13.5px] font-medium text-dim leading-[135%] font-display max-w-[290px]">
            Backend Software Engineer specializing in PHP/Laravel, APIs,
            business systems, and backend architecture.
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
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange hover:text-[#d35422] transition-transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="mailto:asim@example.com"
            className="text-orange hover:text-[#d35422] transition-transform hover:scale-110"
            aria-label="Email"
          >
            <FaEnvelope size={20} />
          </a>
          <a
            href="/resume.pdf"
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
