import {
  Code2,
  Plug,
  Database,
  Activity,
  Shield,
  ArrowLeftRight,
  Building2,
  Zap,
} from 'lucide-react';
import AnimatedTitle from './ui/AnimatedTitle';

const expertise = [
  {
    icon: Code2,
    title: 'Laravel & PHP',
    description:
      'Building maintainable business apps using Laravel service-oriented architecture, modular design, and clean domain principles.',
  },
  {
    icon: Plug,
    title: 'API Design',
    description:
      'Designing secure, versioned RESTful APIs with rate limiting, structured responses, and robust third-party integrations.',
  },
  {
    icon: Database,
    title: 'PostgreSQL & MySQL',
    description:
      'Architecting relational schemas, optimizing deep query execution, and managing data migrations safely at scale.',
  },
  {
    icon: Activity,
    title: 'Redis & Caching',
    description:
      'Accelerating app performance via distributed caching, session management, rate limiting, and real-time state tracking.',
  },
  {
    icon: Shield,
    title: 'Authentication & SSO',
    description:
      'Implementing secure JWT token exchange, OAuth, RBAC hierarchies, and centralized enterprise identity systems.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Queue & Job Systems',
    description:
      'Handling long-running processes, background tasks, scheduled jobs, and high-volume workloads asynchronously.',
  },
  {
    icon: Building2,
    title: 'Multi-Tenant SaaS',
    description:
      'Engineering isolated tenant databases, custom domain mappings, and data segmentation for growing platforms.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description:
      'Maximizing execution speed through aggressive query tuning, caching strategies, and background processing.',
  },
];

const TechnicalAuthority = () => {
  return (
    <section id="expertise" className="w-full max-w-[1600px] px-4 md:px-8 mx-auto py-24 md:py-32">
      <div className="text-center mb-14">
        <AnimatedTitle
          title="Backend Engineering Expertise"
          textClassName="font-bold text-[#0a0a0a]"
        />
        <p className="text-[16px] text-[#64748b] font-normal tracking-wide max-w-2xl mx-auto font-['Urbanist',sans-serif]">
          Specialized in Laravel architecture, API design, multi-tenancy, and performance
          optimization.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
        {expertise.map((item) => (
          <div
            key={item.title}
            className="w-full max-w-[344px] h-[260px] py-[36px] px-[28px] border border-[#e2e8f0] bg-white rounded-[32px] flex flex-col font-['Urbanist',sans-serif] antialiased hover:border-[#10b981] hover:shadow-[0_0_0_1px_#10b981] transition-all duration-300"
          >
            <item.icon className="w-7 h-7 text-[#10b981] mb-5" strokeWidth={1.5} />

            <h3 className="text-[20px] font-medium tracking-tight text-[#0a0a0a] mb-2 leading-tight">
              {item.title}
            </h3>

            <p className="text-[13px] text-[#64748b] font-normal leading-relaxed tracking-wide">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnicalAuthority;
