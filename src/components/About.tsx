import AnimatedTitle from '@/components/ui/AnimatedTitle';
import { Building2, Send, Target, TrendingUp } from 'lucide-react';

const About = () => {
  const collaborators = [
    {
      icon: Send,
      title: 'Startups building their first serious platform',
      description: 'Turning ambitious ideas into scalable SaaS products.',
    },
    {
      icon: Building2,
      title: 'Businesses drowning in manual processes',
      description: 'Replacing spreadsheets, emails, and repetitive work with software.',
    },
    {
      icon: TrendingUp,
      title: 'Growing teams outgrowing off-the-shelf tools',
      description: 'Building systems tailored to how your business actually operates.',
    },
    {
      icon: Target,
      title: 'Companies solving complex operational challenges',
      description: 'Creating software that scales with users, data, and business growth.',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'We discuss',
      description:
        'I learn how your business works, where the bottlenecks are, and what problem the software actually needs to solve.',
    },
    {
      num: '02',
      title: 'I architect',
      description:
        'Workflows, system design, database structure, integrations, and a clear roadmap before writing code.',
    },
    {
      num: '03',
      title: 'I build',
      description:
        'From enterprise SaaS platforms to workflow automation systems, I turn requirements into reliable software.',
    },
    {
      num: '04',
      title: 'You scale',
      description:
        'Less manual work, better visibility, and systems designed to support business growth.',
    },
  ];

  return (
    <div className="px-4 md:px-5 pb-12">
      {/* 1. COLLABORATORS SECTION */}
      <section className="w-full max-w-[1480px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start py-20 px-8 lg:px-[100px] font-['Urbanist',sans-serif] antialiased">
        {/* Left column */}
        {/* Restricted to 40% width to allow the right cards to expand to their proper wide ratio */}
        <div className="lg:w-[40%] space-y-6 lg:sticky lg:top-32">
          <h2 className="text-3xl md:text-[40px] font-medium text-[#0a0a0a] tracking-tight leading-tight xl:whitespace-nowrap">
            Who I work best with{' '}
          </h2>
          <p className="text-[16px] leading-[1.3] text-[#64748b] font-['Urbanist',sans-serif] font-medium max-w-[466px]">
            I work with founders, startups, and growing businesses that need more than a website
            they need software that streamlines operations, automates workflows, and supports
            long-term growth.
          </p>
        </div>

        {/* Right column */}
        {/* Expanded to 60% width and increased the gap between cards */}
        <div className="lg:w-[60%] w-full flex flex-col gap-6">
          {collaborators.map((c) => (
            <div
              key={c.title}
              // Increased padding to px-8 py-8 for that taller, spacious look. Increased radius to 32px.
              className="flex items-center gap-6 px-8 py-8 rounded-[32px] bg-[#f8fafc]"
            >
              {/* Icon Box */}
              {/* Slightly enlarged to 56x56 to balance the taller card height */}
              <div className="w-[56px] h-[56px] rounded-[16px] bg-[#10b981] flex items-center justify-center flex-shrink-0">
                <c.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <h3 className="text-[22px] md:text-[24px] font-medium text-[#0a0a0a] tracking-tight mb-1 leading-tight">
                  {c.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#64748b] font-normal tracking-wide">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. THE PROCESS SECTION */}
      <section className="w-full max-w-[1480px] mx-auto py-24">
        <div className="text-center mb-16">
          <AnimatedTitle title="The process" popupText="It's pretty Simple" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {steps.map((s) => (
            <div
              key={s.num}
              className="w-full max-w-[344px] h-[224px] bg-[#f8fafc] rounded-[32px] p-[30px] flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="w-[60px] h-[60px] rounded-[20px] bg-[#10b981] flex items-center justify-center text-white/90 font-medium text-[20px] mb-4 font-['Urbanist',sans-serif] transition-transform group-hover:scale-105">
                {s.num}
              </div>
              <h3 className="text-[24px] font-medium text-[#0a0a0a] font-['Urbanist',sans-serif] mb-2 leading-tight">
                {s.title}
              </h3>
              <p className="text-[16px] text-[#64748b] leading-snug font-['Urbanist',sans-serif] opacity-80">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
