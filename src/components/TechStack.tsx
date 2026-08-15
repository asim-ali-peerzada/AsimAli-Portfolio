import { ShieldCheck, Zap } from "lucide-react";
import { SiLaravel, SiMysql, SiPostman, SiRedis } from "react-icons/si";

const techGroups = [
  {
    name: "Laravel & PHP",
    role: "Core Backend & Architecture",
    detail:
      "Service layers, Eloquent ORM, robust RESTful API design & middleware.",
    icon: SiLaravel,
    iconColor: "#FF2D20",
  },
  {
    name: "MySQL & Databases",
    role: "Schema & Query Optimization",
    detail:
      "Indexing strategies, complex relations, deep foreign keys & eager loading.",
    icon: SiMysql,
    iconColor: "#00618A",
  },
  {
    name: "Redis & Queue Jobs",
    role: "Caching & Background Tasks",
    detail:
      "Distributed caching, high-throughput workers & job retry pipelines.",
    icon: SiRedis,
    iconColor: "#DC382D",
  },
  {
    name: "OAuth 2.0, JWT & 2FA",
    role: "Security & Identity Systems",
    detail:
      "Enterprise SSO, multi-tenant RBAC, Google TOTP 2FA & token rotation.",
    icon: ShieldCheck,
    iconColor: "#F46C38",
  },
  {
    name: "WebSockets & APIs",
    role: "Real-Time & Integrations",
    detail:
      "Pusher, Laravel Reverb, Microsoft Graph API & webhook ingestion engines.",
    icon: Zap,
    iconColor: "#E5A50A",
  },
  {
    name: "Tooling & Testing",
    role: "DevOps & Quality Assurance",
    detail:
      "Git / GitHub, Postman, PHPUnit, Linux CLI environments, and React.",
    icon: SiPostman,
    iconColor: "#FF6C37",
  },
];

const TechStack = () => {
  return (
    <section
      id="tech-stack"
      className="w-full flex flex-col items-start pt-[90px] lg:pt-[120px] pb-10"
    >
      {/* Section Heading */}
      <h2 className="text-[42px] sm:text-[74px] lg:text-[90px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
        TECHNOLOGY <br />
        <span className="text-ghost">STACK</span>
      </h2>

      {/* Tech Stack 2-Column Equal-Height Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mt-10 sm:mt-14 items-stretch">
        {techGroups.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div
              key={idx}
              className="link-row flex items-start gap-4 rounded-2xl p-4 sm:p-5 bg-white/2 border border-white/7 hover:border-white/14 hover:bg-white/4 transition-all duration-200 cursor-pointer group h-full"
            >
              {/* 56x56 White Icon Container with strictly centered logo */}
              <div className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-xl bg-white flex items-center justify-center p-2.5 shadow-sm shrink-0 mt-0.5">
                <Icon
                  size={28}
                  style={{ color: tech.iconColor }}
                  className="shrink-0"
                />
              </div>

              {/* Structured Content Block with unified vertical alignment */}
              <div className="flex flex-col justify-between flex-1 h-full min-w-0">
                <div>
                  <h3 className="text-[18px] sm:text-[19.5px] font-semibold text-white leading-[120%] font-display group-hover:text-white transition-colors truncate">
                    {tech.name}
                  </h3>
                  <span className="inline-block text-[12.5px] sm:text-[13px] font-medium text-orange/90 leading-[120%] font-display mt-0.5">
                    {tech.role}
                  </span>
                </div>
                <p className="text-[13px] sm:text-[13.5px] text-muted leading-[135%] font-display mt-2">
                  {tech.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStack;
