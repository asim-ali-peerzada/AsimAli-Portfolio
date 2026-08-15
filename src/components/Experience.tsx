import { ArrowUpRight } from 'lucide-react';

const experiences = [
  {
    company: 'Surfiq Technologies',
    role: 'Backend Software Engineer',
    description:
      'Building and maintaining business-critical web applications, backend services, integrations, and workflow-driven systems across CRM, logistics, workforce, identity, and SaaS domains.',
    dates: '2024 — Present',
  },
  {
    company: 'Independent Software Developer',
    role: 'Freelance Software Development',
    description:
      'Delivered custom software solutions for clients, translating business requirements into production-ready web applications, backend services, integrations, and operational workflows.',
    dates: '2023 — 2024',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="w-full flex flex-col items-start pt-[90px] lg:pt-[120px] pb-10">
      {/* Section Heading */}
      <h2 className="text-[42px] sm:text-[74px] lg:text-[90px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
        PROFESSIONAL <br />
        <span className="text-ghost">EXPERIENCE</span>
      </h2>

      {/* Experience Timeline Container */}
      <div className="w-full relative flex flex-col mt-10 sm:mt-14">
        {experiences.map((exp, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === experiences.length - 1;

          return (
            <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* Left Timeline Track */}
              <div className="relative flex flex-col items-center shrink-0 self-stretch">
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute top-7 bottom-0 w-[2px] bg-linear-to-b from-orange via-white/20 to-white/10" />
                )}

                {/* Node / Stop Point Dot */}
                <div
                  className={`relative z-10 w-4 h-4 rounded-full mt-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-125 ${
                    isFirst
                      ? 'bg-orange ring-4 ring-orange/20 shadow-[0_0_12px_rgba(244,108,56,0.5)]'
                      : 'bg-white/40 border-2 border-canvas group-hover:bg-orange'
                  }`}
                >
                  {isFirst && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </div>
              </div>

              {/* Experience Card */}
              <div className="link-row flex-1 flex items-start justify-between rounded-2xl p-5 sm:p-6 mb-4 cursor-pointer">
                {/* Left Content */}
                <div className="flex flex-col gap-2.5 flex-1 pr-6 max-w-[540px]">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-[20px] sm:text-[23px] font-semibold text-white leading-[120%] font-display">
                      {exp.company}
                    </h3>
                    <span className="text-[14px] sm:text-[15px] font-medium text-orange leading-[120%] font-display">
                      {exp.role}
                    </span>
                  </div>

                  <p className="text-[14px] sm:text-[15px] text-muted leading-[140%] font-display">
                    {exp.description}
                  </p>
                </div>

                {/* Right Meta (Arrow + Date) */}
                <div className="flex flex-col items-end justify-between shrink-0 self-stretch">
                  <span className="text-[22px] text-orange transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight size={22} strokeWidth={2.5} />
                  </span>
                  <p className="text-[13px] sm:text-[14px] text-muted font-medium font-display mt-auto pt-4 whitespace-nowrap">
                    {exp.dates}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
