import { ArrowUpRight, Server, Workflow } from "lucide-react";

/**
 * Hero stat tiles.
 *
 * Each `lines` array is rendered with explicit breaks so every value is exactly
 * two lines tall. Free wrapping is width-dependent and produced a three-line
 * tile whenever a phrase was long enough to overflow its column.
 */
const stats = [
  {
    lines: ['3 YEARS', 'EXPERIENCE'],
    label: 'Production Delivery',
    body: 'Building and maintaining production software across enterprise systems and SaaS products.',
  },
  {
    lines: ['BUSINESS', 'SYSTEMS'],
    label: 'Purpose-Built Platforms',
    body: 'Software designed around real operational requirements, business rules, and user workflows.',
  },
  {
    lines: ['WORKFLOW', 'AUTOMATION'],
    label: 'Reliable Backend Processes',
    body: 'APIs, queues, background jobs, integrations, and asynchronous processing.',
  },
];

const HeroContent = () => {
  return (
    <div id="hero" className="w-full flex flex-col items-start pt-0 pb-10">
      {/* Main Display Heading.

          The specialisation line lives INSIDE the h1 rather than in the
          paragraph below it: it has to be part of the heading for the stack
          keywords to carry any weight, but at display scale it has to read as a
          kicker or it would wrap across four lines. */}
      <h1
        className="entrance-anim text-[44px] sm:text-[76px] lg:text-[100px] font-bold text-white leading-[100%] tracking-normal font-display"
        style={{ animationDelay: "0.02s" }}
      >
        BACKEND <br />
        <span className="text-ghost">ENGINEER</span>
        <span className="mt-4 sm:mt-5 block text-[12px] sm:text-[14px] font-medium uppercase tracking-[0.09em] text-dim leading-[140%] text-balance">
          System Architecture · PHP & Laravel · REST APIs · Workflow Automation
        </span>
      </h1>

      {/* Compact Supporting Line */}
      <p
        className="entrance-anim text-[18px] text-muted leading-[140%] font-normal font-display max-w-140 mt-6 w-full"
        style={{ animationDelay: "0.05s" }}
      >
        I architect secure, high-reliability backend systems for SaaS and
        enterprise platforms—specializing in centralized SSO &amp; access control,
        stateful workflow engines, background processing pipelines, and
        high-throughput APIs.{" "}
      </p>

      {/* Stats / Proof Counters with fixed line baseline.

          `lines` is an explicit array so each value occupies exactly two lines.
          Letting the text wrap freely pushed "CUSTOM BUSINESS SYSTEMS" onto
          three lines, which broke the shared baseline across the three tiles. */}
      <div
        // Always three columns once there is room for them. The value font
        // scales with the container via query breakpoints, so "CUSTOM
        // BUSINESS" still fits its column on a 1024px viewport where this
        // column is only ~516px wide — without dropping the third tile onto a
        // second row.
        className="entrance-anim grid grid-cols-1 @[400px]:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-7 my-8 w-full"
        style={{ animationDelay: "0.11s" }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col justify-start min-w-0">
            <div className="min-h-11 sm:min-h-12.5 flex items-end">
              <p className="text-[20px] @[400px]:text-[14px] @[540px]:text-[17px] @[680px]:text-[21px] font-bold text-white leading-[115%] tracking-tight font-display">
                {stat.lines.map((line) => (
                  <span key={line}>
                    {line}
                    {line !== stat.lines.at(-1) && <br />}
                  </span>
                ))}
              </p>
            </div>
            <p className="text-[12px] sm:text-[12.5px] uppercase tracking-[0.06em] text-muted font-semibold font-display mt-3">
              {stat.label}
            </p>
            <p className="text-[13.5px] sm:text-[14px] text-muted leading-[140%] font-display mt-2 max-w-55">
              {stat.body}
            </p>
          </div>
        ))}
      </div>

      {/* Two Pill Cards */}
      <div
        className="entrance-anim w-full flex flex-col sm:flex-row gap-5 lg:gap-7.5 min-h-60"
        style={{ animationDelay: "0.14s" }}
      >
        {/* Orange Card */}
        <a
          href="#experience"
          className="relative cursor-pointer flex-1 min-w-0 rounded-[10px] bg-orange px-5 pb-5.5 pt-6 flex flex-col justify-between overflow-hidden group transition-transform duration-200 active:scale-98"
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

          <div className="relative z-10">
            <Server size={28} className="text-white mb-4" strokeWidth={2} />
            <p className="text-[22px] font-semibold text-white leading-[110%] font-display">
              Enterprise &amp; SaaS Systems
            </p>
            <p className="text-[13.5px] font-normal text-white/80 leading-[145%] font-display mt-2.5">
              I build backend systems for enterprise applications, SaaS platforms,
              CRM products, and operational workflows that support real business
              processes.
            </p>
            <p className="text-[12px] font-medium text-white/70 leading-[140%] font-display mt-3">
              Enterprise SaaS · Stateful Workflows · RBAC/ABAC · System Integrations
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
          className="relative cursor-pointer flex-1 rounded-[10px] bg-[#1C2128] border border-lime/25 px-5 pb-5.5 pt-6 flex flex-col justify-between overflow-hidden group transition-transform duration-200 active:scale-98"
        >
          {/* Decorative Zigzag Doodle Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
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

          <div className="relative z-10">
            <Workflow
              size={28}
              className="text-lime mb-4"
              strokeWidth={2}
            />
            <p className="text-[22px] font-semibold text-white leading-[110%] font-display">
              Built for Production
            </p>
            <p className="text-[13.5px] font-normal text-white/75 leading-[145%] font-display mt-2.5">
              I focus on secure architecture, reliable background processing,
              database performance, and maintainable integrations—building systems
              designed to handle real-world complexity and ongoing change.
            </p>
            <p className="text-[12px] font-medium text-lime/85 leading-[140%] font-display mt-3">
              Security · Performance · Queues · Caching · Integrations
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
