const experiences = [
  {
    company: 'Surfiq Technologies',
    role: 'Backend Engineer (PHP / Laravel)',
    description:
      'Architecting and maintaining production backend systems across telecom, CRM, logistics, and workforce operations — including centralized SSO/OAuth2 identity infrastructure, multi-stage approval and PDF generation pipelines, IMAP email automation, and fine-grained RBAC/ABAC access control.',
    dates: '2024 — Present',
  },
  {
    company: 'Independent & Contract Engineering',
    role: 'Backend & Full-Stack Developer',
    description:
      'Designed and shipped custom web platforms and RESTful APIs for early-stage and SMB clients — owning database schema design, third-party payment and webhook integrations, authentication flows, and end-to-end production delivery.',
    dates: '2023 — 2024',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="w-full flex flex-col items-start pt-22.5 lg:pt-30 pb-10 scroll-mt-18 sm:scroll-mt-24">
      {/* Section Heading */}
      <h2 className="text-[34px] xs:text-[38px] sm:text-[64px] lg:text-[84px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
        PROFESSIONAL <br />
        <span className="text-ghost">EXPERIENCE</span>
      </h2>

      {/* Experience Timeline Container */}
      <div className="w-full relative flex flex-col mt-10 sm:mt-14">
        {experiences.map((exp, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === experiences.length - 1;

          return (
            <div key={exp.company} className="relative flex items-start gap-3 sm:gap-6 min-w-0">
              {/* Left Timeline Track */}
              <div className="relative flex flex-col items-center shrink-0 self-stretch">
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute top-7 bottom-0 w-0.5 bg-linear-to-b from-orange via-white/20 to-white/10" />
                )}

                {/* Node / Stop Point Dot */}
                <div
                  className={`relative z-10 w-4 h-4 rounded-full mt-6 flex items-center justify-center ${
                    isFirst
                      ? 'bg-orange ring-4 ring-orange/20 shadow-[0_0_12px_rgba(244,108,56,0.5)]'
                      : 'bg-white/40 border-2 border-canvas'
                  }`}
                >
                  {isFirst && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </div>
              </div>

              {/* Experience Entry. Deliberately not a link: there is no detail
                  view or external proof behind it, so the card carries no
                  pointer cursor, hover fill, or external-link arrow. The date
                  sits top-right, where a recruiter scans first on a timeline. */}
              <div className="flex-1 min-w-0 flex items-start justify-between gap-3 sm:gap-6 rounded-2xl p-4 sm:p-6 mb-4">
                {/* Left Content */}
                <div className="flex flex-col gap-2.5 flex-1 min-w-0 max-w-135">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-[18px] sm:text-[23px] font-semibold text-white leading-[120%] font-display">
                      {exp.company}
                    </h3>
                    <span className="text-[13.5px] sm:text-[15px] font-medium text-orange leading-[120%] font-display">
                      {exp.role}
                    </span>
                  </div>

                  <p className="text-[14px] sm:text-[15px] text-muted leading-[140%] font-display">
                    {exp.description}
                  </p>
                </div>

                {/* Date, aligned with the company line */}
                <p className="shrink-0 text-[12px] sm:text-[14px] text-muted font-medium font-display whitespace-nowrap pt-1 sm:pt-1.5">
                  {exp.dates}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
