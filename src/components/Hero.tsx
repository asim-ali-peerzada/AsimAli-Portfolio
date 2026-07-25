import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ArrowDown, Mail, Terminal } from 'lucide-react';

const Hero = () => {
  return (
    <div className="pt-5 px-4 md:px-8">
      {/* DEVELOPER HERO SECTION */}
      <section className="w-full mx-auto border border-[#e2e8f0] bg-[#f8fafc] rounded-[32px] relative pt-[90px] md:pt-[110px] pb-[80px] md:pb-[95px] px-[20px] flex flex-col items-center text-center justify-center transition-all duration-300 overflow-hidden font-['Urbanist',sans-serif]">
        
        {/* Availability Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#047857]/30 bg-[#047857]/10 text-[#047857] text-[13px] md:text-[14px] font-semibold mb-8 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#047857] animate-pulse" />
          Available for Backend Architecture & Full-Stack Roles
        </div>

        {/* Personal Greeting */}
        <p className="text-[#047857] font-medium text-base sm:text-lg md:text-xl tracking-tight mb-3">
          Hi, I'm Asim Ali 👋
        </p>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-[68px] lg:text-[80px] font-medium tracking-tight text-[#0a0a0a] max-w-5xl mx-auto leading-[1.15] md:leading-[1.08] mb-6 text-balance">
          Laravel Backend Architect <br className="hidden sm:block" />
          <span className="text-[#334155]">&amp; Enterprise Systems Engineer</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-[20px] text-[#64748b] max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          Building secure, multi-tenant SaaS platforms, event-driven queue systems, and automated data pipelines that scale enterprise operations.
        </p>

        {/* Developer Action Bar (Direct Contact & Links) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0a0a0a] text-white font-semibold text-[15px] shadow-sm transition-all hover:bg-[#1e293b]"
          >
            <span>Explore Featured Work</span>
            <ArrowDown size={16} strokeWidth={2} />
          </a>

          <a
            href="https://github.com/asim-ali-peerzada"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#e2e8f0] text-[#0a0a0a] font-medium text-[15px] shadow-xs transition-all hover:bg-[#f1f5f9] hover:border-[#cbd5e1]"
          >
            <FaGithub size={18} />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/the-asimali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#e2e8f0] text-[#0a0a0a] font-medium text-[15px] shadow-xs transition-all hover:bg-[#f1f5f9] hover:border-[#cbd5e1]"
          >
            <FaLinkedin size={18} />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:asimalipeerzada@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#e2e8f0] text-[#0a0a0a] font-medium text-[15px] shadow-xs transition-all hover:bg-[#f1f5f9] hover:border-[#cbd5e1]"
          >
            <Mail size={18} strokeWidth={1.75} />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Tech Stack Strip */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#64748b] flex-wrap">
          <Terminal size={14} className="text-[#047857] shrink-0" />
          <span>PHP 8.3</span>
          <span className="text-[#cbd5e1]">•</span>
          <span>Laravel 12</span>
          <span className="text-[#cbd5e1]">•</span>
          <span>React 19</span>
          <span className="text-[#cbd5e1]">•</span>
          <span>MySQL</span>
          <span className="text-[#cbd5e1]">•</span>
          <span>Redis</span>
          <span className="text-[#cbd5e1]">•</span>
          <span>REST APIs</span>
          <span className="text-[#cbd5e1]">•</span>
          <span>Docker</span>
        </div>
      </section>
    </div>
  );
};

export default Hero;
