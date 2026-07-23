import AnimatedTitle from '@/components/ui/AnimatedTitle';
import { Bot, Building2, Layers, MessageSquare, Network, Zap } from 'lucide-react';

const Experience = () => {
  const achievements = [
    {
      icon: Network,
      badge: 'Enterprise Security & Identity',
      title: 'Architected a unified SSO ecosystem',
      description:
        'Centralized authentication using OAuth 2.0 and JWT. Spearheaded the transition to a Zero-Trust security model with mandatory TOTP 2FA and secure token rotation.',
    },
    {
      icon: Zap,
      badge: 'Performance Optimization',
      title: 'Reduced API latency by 45%',
      description:
        'Reduced API latency by 45% through eager loading, Redis caching, and query optimization. Integrated Microsoft Graph API to automate Teams conferencing workflows.',
    },
    {
      icon: Layers,
      badge: 'Distributed Systems & Automation',
      title: 'Automated high-volume data processing',
      description:
        'Implemented a distributed Queue/Job system to process thousands of monthly Excel records, reducing manual data entry by 70% and ensuring 99.9% accuracy.',
    },
    {
      icon: Bot,
      badge: 'Complex State Machines',
      title: 'Built a 7-stage logistics engine',
      description:
        'Developed a Laravel-based system to automate data extraction from HTML receipts, reducing manual overhead by 90% and achieving 100% end-to-end traceability.',
    },
    {
      icon: MessageSquare,
      badge: 'Real-time Architecture',
      title: 'Engineered event-driven WebSockets',
      description:
        'Deployed a real-time architecture using Pusher for instant 1:1 and group chats, alongside live system notifications, increasing operational decision-making speed by 25%.',
    },
    {
      icon: Building2,
      badge: 'Fintech & Billing',
      title: 'Engineered a multi-gateway subscription engine',
      description:
        'Integrated PayPal alongside Stripe through a flexible, driver-based architecture supporting dynamic provider selection and automated plan synchronization.',
    },
  ];

  return (
    <div className="px-4 md:px-8">
      {/* 1. IMPACT & ENGINEERING (DARK CARD) */}
      <section
        id="experience"
        className="w-full mx-auto rounded-[40px] bg-[#0a0a0a] flex flex-col lg:flex-row gap-16 lg:gap-32 items-start py-24 md:py-32 px-8 lg:px-[100px] transition-all duration-300 relative overflow-hidden font-['Urbanist',sans-serif] antialiased"
      >
        {/* Left column */}
        <div className="lg:w-[40%] space-y-8">
          <div>
            <AnimatedTitle
              title="Impact & Engineering"
              popupText="real results"
              textClassName="text-white text-4xl md:text-[56px] font-medium tracking-tighter leading-[1.1]"
              className="mb-4"
            />
            <p className="text-[16px] md:text-[18px] text-white/70 font-normal tracking-wide">
              Some real things I've built along the way. I focus on building scalable systems,
              optimizing performance, and automating complex workflows.
            </p>
          </div>

          <a
            href="#contact-form-section"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-[#0a0a0a] font-bold text-base transition-all shadow-lg"
          >
            Let's Build Something Better <span className="text-lg">→</span>
          </a>
        </div>

        {/* Right column */}
        <div className="lg:w-[60%] w-full flex flex-col gap-14 lg:mt-3">
          {achievements.map((a) => (
            <div key={a.title} className="flex gap-6 items-start">
              {/* Icon */}
              <div className="flex-shrink-0 pt-[3px]">
                <a.icon className="w-6 h-6 text-[#10b981]" strokeWidth={1.5} />
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-start">
                <span className="px-3 py-1 rounded-full bg-white/[0.06] text-white/70 text-[11px] font-medium tracking-wide mb-3 leading-none">
                  {a.badge}
                </span>
                <h3 className="text-[22px] md:text-[24px] font-medium text-white tracking-tight mb-1.5 leading-tight">
                  {a.title}
                </h3>
                <p className="text-[13px] md:text-[14px] text-white/50 font-normal tracking-wide">
                  {a.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. THINGS I'M GOOD AT (SKILLS) - hidden */}
    </div>
  );
};

export default Experience;
