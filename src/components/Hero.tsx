import { Asterisk, Target, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <div className="pt-5 px-4 md:px-8">
      {/* 1. HERO SECTION CARD */}
      <section className="w-full mx-auto border border-[#e2e8f0] bg-[#f8fafc] rounded-[32px] relative pt-[120px] pb-[100px] px-[20px] flex flex-col items-center text-center justify-center transition-all duration-300 overflow-hidden">
        {/* Topic Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 font-['Urbanist',sans-serif] antialiased">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0a0a] text-white text-[13px] md:text-[14px] font-medium tracking-wide">
            <Target size={16} strokeWidth={2} />
            Enterprise SaaS
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#059669] text-white text-[13px] md:text-[14px] font-medium tracking-wide">
            <Zap size={16} strokeWidth={2} />
            Product Engineering
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#64748b] text-white text-[13px] md:text-[14px] font-medium tracking-wide">
            <Asterisk size={16} strokeWidth={2} />
            AI Integration
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-[70px] lg:text-[88px] font-medium tracking-tighter text-[#0a0a0a] max-w-5xl mx-auto leading-[1.15] md:leading-[1.1] mb-10 font-['Urbanist',sans-serif] text-center text-balance">
          Laravel Backend Architect <br className="block" />
          <span>& Enterprise Systems Engineer</span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base md:text-[20px] text-[#64748b] max-w-3xl mx-auto leading-relaxed mb-12 font-normal font-['Urbanist',sans-serif] text-center">
          Building secure, multi-tenant SaaS platforms and automated workflows that scale complex
          business operations.
        </p>

        {/* CTA */}
        <a
          href="https://calendly.com/asimalipeerzada/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#059669] text-white font-bold text-[17px] font-['Urbanist',sans-serif] shadow-md transition-colors hover:bg-[#047857]"
        >
          Schedule a call <span>➔</span>
        </a>

        {/* Trust Signal */}
        <p className="text-[13px] text-[#64748b] font-medium tracking-wide mt-6 font-['Urbanist',sans-serif]">
          ✓ Expertise in advanced RBAC, complex data migrations, and custom API integrations.
        </p>
      </section>
    </div>
  );
};

export default Hero;
