import { ArrowUpRight, Server, Workflow } from "lucide-react";

const HeroContent = () => {
  return (
    <div id="hero" className="w-full flex flex-col items-start pt-0 pb-10">
      {/* Main Display Heading */}
      <h1
        className="entrance-anim text-[52px] sm:text-[86px] lg:text-[110px] font-bold text-white leading-[100%] tracking-normal font-display"
        style={{ animationDelay: "0.45s" }}
      >
        BACKEND <br />
        <span className="text-ghost">ENGINEER</span>
      </h1>

      {/* Compact Supporting Line */}
      <p
        className="entrance-anim text-[18px] text-muted leading-[140%] font-normal font-display max-w-[480px] mt-6"
        style={{ animationDelay: "0.6s" }}
      >
        Building secure, maintainable backend systems for SaaS platforms,
        business operations, and complex workflows.{" "}
      </p>

      {/* Technical Anchor */}
      <p
        className="entrance-anim text-[13.5px] font-medium text-muted tracking-[0.02em] font-display mt-4"
        style={{ animationDelay: "0.66s" }}
      >
        PHP · Laravel · REST APIs · SQL · Redis
      </p>

      {/* Stats / Proof Counters with fixed line baseline */}
      <div
        className="entrance-anim grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 my-8 w-full"
        style={{ animationDelay: "0.72s" }}
      >
        <div className="flex flex-col justify-start">
          <div className="h-[48px] sm:h-[56px] flex items-end">
            <p className="text-[28px] sm:text-[34px] font-bold text-white leading-none tracking-tight font-display">
              3+ YEARS
            </p>
          </div>
          <p className="text-[12px] sm:text-[12.5px] uppercase tracking-[0.06em] text-muted font-semibold font-display mt-3">
            Professional Experience
          </p>
          <p className="text-[13.5px] sm:text-[14px] text-muted leading-[140%] font-display mt-2 max-w-[220px]">
            Building and maintaining production software across enterprise
            systems and SaaS products.
          </p>
        </div>

        <div className="flex flex-col justify-start">
          <div className="h-[48px] sm:h-[56px] flex items-end">
            <p className="text-[20px] sm:text-[23px] font-bold text-white leading-[115%] tracking-tight font-display">
              CUSTOM BUSINESS SYSTEMS
            </p>
          </div>
          <p className="text-[12px] sm:text-[12.5px] uppercase tracking-[0.06em] text-muted font-semibold font-display mt-3">
            Operational Platforms
          </p>
          <p className="text-[13.5px] sm:text-[14px] text-muted leading-[140%] font-display mt-2 max-w-[220px]">
            Purpose-built software for real operational needs.
          </p>
        </div>

        <div className="flex flex-col justify-start">
          <div className="h-[48px] sm:h-[56px] flex items-end">
            <p className="text-[20px] sm:text-[23px] font-bold text-white leading-[115%] tracking-tight font-display">
              AUTOMATED WORKFLOWS
            </p>
          </div>
          <p className="text-[12px] sm:text-[12.5px] uppercase tracking-[0.06em] text-muted font-semibold font-display mt-3">
            Operational Software
          </p>
          <p className="text-[13.5px] sm:text-[14px] text-muted leading-[140%] font-display mt-2 max-w-[220px]">
            APIs, queues, background jobs, integrations, and event-driven
            systems.
          </p>
        </div>
      </div>

      {/* Two Pill Cards */}
      <div
        className="entrance-anim w-full flex flex-col sm:flex-row gap-[20px] lg:gap-[30px] min-h-[240px]"
        style={{ animationDelay: "0.85s" }}
      >
        {/* Orange Card */}
        <a
          href="#experience"
          className="relative flex-1 sm:w-[300px] rounded-[10px] bg-orange px-5 pb-[22px] pt-12 flex flex-col justify-between overflow-hidden group transition-transform duration-200 active:scale-98"
        >
          {/* Decorative Doodle Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            viewBox="0 0 300 240"
            fill="none"
          >
            <path
              d="M-20,180 Q60,120 150,190 T320,130"
              stroke="rgba(202,89,46,0.6)"
              strokeWidth="28"
              fill="none"
            />
          </svg>

          <div className="relative z-10 pt-2.5">
            <Server size={28} className="text-white mb-4" strokeWidth={2} />
            <p className="text-[22px] font-semibold text-white leading-[110%] font-display">
              Enterprise Software
            </p>
            <p className="text-[13.5px] font-normal text-white/80 leading-[145%] font-display mt-2.5 max-w-[250px]">
              I build the backend systems behind CRM platforms, SaaS products,
              operational tools, and business workflows.
            </p>
            <p className="text-[12px] font-medium text-white/70 leading-[140%] font-display mt-3">
              Laravel · APIs · RBAC · Multi-Tenant Systems · Integrations
            </p>
          </div>

          <div className="relative z-10 self-end">
            <span className="w-8 h-8 rounded-md border border-white flex items-center justify-center text-white text-base group-hover:bg-white group-hover:text-orange transition-colors">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </div>
        </a>

        {/* Dark Slate Card (green accent) */}
        <a
          href="#projects"
          className="relative flex-1 rounded-[10px] bg-[#1C2128] border border-lime/25 px-5 pb-[22px] pt-12 flex flex-col justify-between overflow-hidden group transition-transform duration-200 active:scale-98"
        >
          {/* Decorative Zigzag Doodle Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
            viewBox="0 0 400 240"
            fill="none"
          >
            <path
              d="M0,160 L60,80 L120,200 L180,60 L240,180 L300,40 L360,190 L420,70"
              stroke="rgba(108,227,182,0.7)"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="relative z-10 pt-2.5">
            <Workflow
              size={28}
              className="text-lime mb-4"
              strokeWidth={2}
            />
            <p className="text-[22px] font-semibold text-white leading-[110%] font-display">
              Built for the Real World
            </p>
            <p className="text-[13.5px] font-normal text-white/75 leading-[145%] font-display mt-2.5 max-w-[250px]">
              Secure architecture, maintainable code, background processing,
              performance optimization, and integrations designed for long-term
              maintenance.
            </p>
            <p className="text-[12px] font-medium text-lime/85 leading-[140%] font-display mt-3">
              Security · Performance · Queues · Caching · Automation
            </p>
          </div>

          <div className="relative z-10 self-end">
            <span className="w-8 h-8 rounded-md border border-lime/50 flex items-center justify-center text-lime text-base group-hover:bg-lime group-hover:text-canvas transition-colors">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
