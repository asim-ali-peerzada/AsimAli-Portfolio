import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { haptic } from '../lib/haptic';
import { srcSet } from '../lib/utils';

interface Project {
  slug: string;
  title: string;
  niche: string;
  image: string;
  screenshots: string[];
  services: string[];
  tools: string[];
  overview: string;
  problem: string;
  solution: string;
  highlights: string[];
  role: string;
  tags: string[];
}

interface ProjectDetailContentProps {
  project: Project;
}

const FormattedText = ({ text }: { text?: string }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-bold text-[#0a0a0a]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
};

const getProjectMetrics = (slug: string) => {
  switch (slug) {
    case 'shipment-tracker-&-ims':
      return [
        { value: '100%', label: 'Automated Email Parsing' },
        { value: '0', label: 'Manual Logistics Entries' },
        { value: 'Real-Time', label: 'Inventory & Item Tracking' },
        { value: 'Lead Architect', label: 'Engineering Role' },
      ];
    case 'sales-&-contact-management-(ccms)':
      return [
        { value: '100%', label: 'State-Based Lead Routing' },
        { value: '0', label: 'Pipeline Visibility Gaps' },
        { value: '5-Tier', label: 'Hierarchical RBAC Model' },
        { value: 'Lead Architect', label: 'System Engineering Role' },
      ];
    case 'enterprise-single-sign-on':
      return [
        { value: '100%', label: 'Cross-Domain Identity Sync' },
        { value: 'TOTP / 2FA', label: 'Zero-Trust Security' },
        { value: '0', label: 'Manual Access Bottlenecks' },
        { value: 'Security Lead', label: 'Identity Systems Role' },
      ];
    case 'ai-assistant-platform':
      return [
        { value: '100%', label: 'Multi-Tenant Isolation' },
        { value: 'RAG Engine', label: 'Vector Knowledge Search' },
        { value: '< 500ms', label: 'Microservice Response' },
        { value: 'Full-Stack Lead', label: 'AI Architecture Role' },
      ];
    case 'zametrix':
      return [
        { value: '4-Role', label: 'Verification & Governance' },
        { value: '100%', label: 'Verified Property Data' },
        { value: 'Real-Time', label: 'Market Analytics Pulse' },
        { value: 'Full-Stack Lead', label: 'PropTech Systems Role' },
      ];
    case 'genealogy-saas-platform':
      return [
        { value: '2', label: 'External Archive APIs Integrated' },
        { value: 'OCR', label: 'Automated Document Extraction' },
        { value: 'Multi-Tenant', label: 'Isolated Family Tree Data' },
        { value: 'Lead Backend', label: 'Architecture Role' },
      ];
    default:
      return [
        { value: '100%', label: 'Automated Workflows' },
        { value: '0', label: 'Manual Data Entry' },
        { value: 'Production', label: 'Scalable Architecture' },
        { value: 'Lead Engineer', label: 'Full-Stack Role' },
      ];
  }
};

const getRoleList = (slug: string, rawRole?: string) => {
  switch (slug) {
    case 'shipment-tracker-&-ims':
      return [
        { category: 'Architecture', text: 'Designed relational database schema and state-machine logistics workflows for item-level tracking.' },
        { category: 'Backend & Automation', text: 'Built IMAP email ingestion engine, regex data extraction pipelines, and background queue workers.' },
        { category: 'Security & Identity', text: 'Integrated external Single Sign-On (SSO) authentication with granular role-based access control.' },
        { category: 'Frontend & Dashboards', text: 'Built administrative monitoring dashboards, Livewire UI, and real-time operational interfaces.' },
      ];
    case 'sales-&-contact-management-(ccms)':
      return [
        { category: 'Architecture', text: 'Designed complex relational schema for multi-level reporting hierarchies (CEO down to Sales Reps).' },
        { category: 'Backend & APIs', text: 'Architected RESTful API layer in Laravel 11 secured with Sanctum token authorization.' },
        { category: 'Workflow Automation', text: 'Implemented automated state-based lead assignment logic and quote-to-order pipeline.' },
        { category: 'Analytics & Dashboards', text: 'Built aggregation endpoints powering real-time executive sales dashboards.' },
      ];
    case 'enterprise-single-sign-on':
      return [
        { category: 'Architecture & Security', text: 'Designed JWT authentication flows, Google 2FA protocols, and cross-domain token blacklisting.' },
        { category: 'Backend Integrations', text: 'Developed external API synchronization logic and queued background job processing.' },
        { category: 'Data Pipelines', text: 'Built queue-based engine for bulk Excel infrastructure data processing and import.' },
        { category: 'Frontend & Governance', text: 'Delivered React-based control panel utilizing Recharts for real-time access monitoring.' },
      ];
    case 'ai-assistant-platform':
      return [
        { category: 'System Architecture', text: 'Decoupled system into Laravel 12 API foundation, FastAPI AI intelligence engine, and React 19 UI.' },
        { category: 'AI & RAG Engineering', text: 'Built Retrieval-Augmented Generation pipeline with Pinecone vector DB and LLM integrations.' },
        { category: 'Multi-Tenant Security', text: 'Engineered strict workspace tenant data isolation, RBAC, subscription billing, and audit logs.' },
        { category: 'Multimodal Workflows', text: 'Integrated Whisper/Deepgram STT and ElevenLabs/OpenAI TTS for voice automation.' },
      ];
    case 'zametrix':
      return [
        { category: 'Full-Stack Architecture', text: 'Designed Laravel REST APIs and responsive React/TypeScript frontend.' },
        { category: 'Governance & RBAC', text: 'Architected 4-role access hierarchy (Admin, Partner, Agent, Public) with Spatie RBAC.' },
        { category: 'Data Pipelines', text: 'Engineered structured reporting and administrative verification pipeline for market updates.' },
        { category: 'Analytics & CRM', text: 'Built property pulse comparison tools, PDF generation, and lead routing CRM module.' },
      ];
    case 'genealogy-saas-platform':
      return [
        { category: 'Backend Architecture', text: 'Designed multi-tenant data isolation model and GEDCOM archival schemas.' },
        { category: 'API Integrations', text: 'Integrated NARA and OpenArch external historical archive APIs.' },
        { category: 'OCR Pipeline', text: 'Built document extraction and fuzzy record-matching algorithms.' },
        { category: 'Real-Time Collaboration', text: 'Implemented Pusher-based collaborative tree editing with real-time sync across family members.' },
      ];
    default:
      return rawRole
        ? [{ category: 'Engineering Focus', text: rawRole }]
        : [{ category: 'Full-Stack Development', text: 'Designed and built full application workflow.' }];
  }
};

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 400], [1, 1.03]);

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };
    forceScrollTop();
    const rafId = requestAnimationFrame(forceScrollTop);
    const t1 = setTimeout(forceScrollTop, 20);
    const t2 = setTimeout(forceScrollTop, 100);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [project.slug]);

  const handleBackToProjects = () => {
    haptic.light();
    sessionStorage.setItem('nav_target', 'projects');
    window.location.href = '/';
  };

  const handlePrev = () => {
    haptic.light();
    setActiveSlide((prev) => (prev === 0 ? (project.screenshots?.length || 1) - 1 : prev - 1));
  };

  const handleNext = () => {
    haptic.light();
    setActiveSlide((prev) => (prev === (project.screenshots?.length || 1) - 1 ? 0 : prev + 1));
  };

  const impactMetrics = getProjectMetrics(project.slug);
  const roleList = getRoleList(project.slug, project.role);

  const problemTexts: Record<string, string> = {
    'shipment-tracker-&-ims': 'Logistics and engineering teams were **heavily reliant on manual data entry** to process shipment updates arriving via email. This fragmented communication led to slow, error-prone record-keeping, creating **severe operational blind spots** in tracking shipment lifecycles, identifying missing parts, and managing field technician assignments.',
    'sales-&-contact-management-(ccms)': 'The organization was struggling with **fragmented client data**, untracked sales pipelines, and manual lead distribution. They required a centralized system that could **enforce strict data visibility** based on corporate hierarchy and geographic territories while providing real-time executive sales analytics.',
    'enterprise-single-sign-on': 'Managing user access across multiple internal and external applications created **severe administrative bottlenecks**. Manual approval workflows led to **inconsistent onboarding/offboarding**, weak security enforcement, and fragmented infrastructure data, increasing both operational overhead and security vulnerabilities.',
    'ai-assistant-platform': 'Businesses increasingly require AI automation but struggle to **securely integrate proprietary data**. Implementing intelligent chatbots often leads to **disconnected workflows and poor data isolation**, lacking backend infrastructure to manage multi-tenant access, document processing, and multi-channel customer conversations.',
    zametrix: 'The real estate industry suffers from **fragmented, inconsistent, and unstructured property data**. Investors lack reliable location-based intelligence, field agents rely on manual reporting, and administrative teams struggle with **weak visibility and inefficient moderation workflows**.',
  };

  const solutionTexts: Record<string, string> = {
    'shipment-tracker-&-ims': 'Architected an **automated data pipeline that connects directly to an IMAP mailbox** to fetch, parse, and classify incoming email notifications into structured shipment records. The system utilizes background queue processing for **reliable data extraction** and enforces a multi-step business workflow, allowing administrative teams to **track item-level quantities, flag missing equipment, and monitor technician transfers** through a centralized, SSO-secured dashboard.',
    'sales-&-contact-management-(ccms)': 'Engineered a **robust Laravel-based CRM** that automates the entire sales lifecycle. The system **routes leads dynamically based on state-mapping**, digitizes the quote-to-order pipeline, and implements hierarchical dashboards giving executives **real-time aggregated insights into quarterly sales valuations** and team performance.',
    'enterprise-single-sign-on': 'Architected a **centralized identity platform** that eliminates manual access handling. The system provides **secure, 2FA-fortified login** and enforces strict role-based access control (RBAC), allowing administrators to **seamlessly provision, synchronize, and monitor user access** across connected enterprise applications.',
    'ai-assistant-platform': 'Architected a **full-stack SaaS solution** that securely isolates tenant data while providing advanced conversational AI. The platform leverages a Python/FastAPI microservice for **Retrieval-Augmented Generation (RAG)**, governed by a Laravel 12 API layer that **strictly enforces RBAC, subscription billing, and audit logging**.',
    zametrix: 'Architected a **centralized, multi-role intelligence platform** that standardizes property data collection and moderation. Field agent submissions are **routed through administrative verification** before feeding a public analytics portal where users can **compare locations and explore property trends**.',
  };

  const problemText = problemTexts[project.slug] ?? project.problem;
  const solutionText = solutionTexts[project.slug] ?? project.solution;

  return (
    <main id="main-content" className="pt-28 md:pt-36 pb-24 px-4 md:px-8 max-w-[1600px] mx-auto space-y-12 md:space-y-16">
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={handleBackToProjects}
          className="flex items-center gap-2 pl-[9px] pr-[27px] py-[9px] rounded-full bg-[#f8fafc] text-[#0a0a0a] font-normal text-[18px] md:text-[20px] hover:bg-[#e2e8f0] transition-colors font-['Urbanist',sans-serif]"
        >
          <ArrowLeft size={22} strokeWidth={1.5} color="#0a0a0a" />
          Back to Projects
        </button>
      </div>

      {/* Hero Container */}
      <div className="w-full bg-slate-50/50 border border-slate-100/80 rounded-[40px] pt-10 px-4 md:px-8 pb-8 flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-[76px] font-medium tracking-tight text-[#0a0a0a] mb-4 leading-[1.1] font-['Urbanist',sans-serif] text-center">
          {project.title}
        </h1>
        <p className="text-[16px] md:text-[20px] font-normal text-[#64748b] tracking-wide mb-8 font-['Urbanist',sans-serif] text-center max-w-4xl">
          {project.niche}
        </p>

        <div className="w-full flex items-center justify-center relative mb-8 overflow-hidden rounded-[24px]">
          <motion.img
            style={{ scale }}
            src={project.image}
            alt={project.title}
            loading="eager"
            fetchpriority="high"
            width={1920}
            height={1280}
            srcSet={srcSet(project.image, ['800w', '1600w'])}
            className="w-full h-auto object-cover rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-200/50"
          />
        </div>

        {/* Impact Metrics */}
        <div className="w-full bg-emerald-50/70 border border-emerald-100/80 rounded-[32px] p-6 md:p-8 my-10 md:my-14 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-emerald-200/60">
            {impactMetrics.map((metric, idx) => (
              <div key={idx} className={`flex flex-col items-center justify-center text-center ${idx > 0 ? 'pt-4 lg:pt-0' : ''}`}>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0d9668] font-['Urbanist',sans-serif]">
                  {metric.value}
                </span>
                <span className="text-[11px] sm:text-[12px] lg:text-[13px] font-semibold text-slate-800 tracking-wider uppercase mt-1 font-['Urbanist',sans-serif]">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Services & Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full mt-2">
          <div className="lg:col-span-6 bg-white border border-gray-200/60 rounded-[32px] p-6 lg:p-8 space-y-5 h-full shadow-xs">
            <h3 className="text-[24px] md:text-[28px] font-semibold text-black tracking-tight font-['Urbanist',sans-serif]">
              Services
            </h3>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {project.services?.map((s, idx) => (
                <span key={idx} className="px-4 py-2 rounded-full bg-[#f1f5f9] text-[#0a0a0a] text-[13px] lg:text-[14px] font-medium tracking-wide font-['Urbanist',sans-serif]">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 bg-white border border-gray-200/60 rounded-[32px] p-6 lg:p-8 space-y-5 h-full shadow-xs">
            <h3 className="text-[24px] md:text-[28px] font-semibold text-black tracking-tight font-['Urbanist',sans-serif]">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {project.tools?.map((tool, idx) => (
                <span key={idx} className="px-4 py-2 rounded-full bg-[#f1f5f9] text-[#0a0a0a] text-[13px] lg:text-[14px] font-medium tracking-wide font-['Urbanist',sans-serif]">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overview & Problem */}
      <section className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:w-[40%] bg-[#f8fafc] border border-gray-100 rounded-[32px] px-[32px] md:px-[39px] py-[36px] md:py-[45px] flex flex-col">
          <h2 className="text-[32px] md:text-[48px] font-medium tracking-tight text-[#0a0a0a] mb-6 leading-[1.1] font-['Urbanist',sans-serif]">
            Overview
          </h2>
          <p className="text-[16px] md:text-[19px] text-[#475569] leading-relaxed font-normal font-['Urbanist',sans-serif]">
            <FormattedText text={project.overview} />
          </p>
        </div>
        <div className="w-full lg:w-[60%] bg-[#f8fafc] border border-gray-100 rounded-[32px] px-[32px] md:px-[39px] py-[36px] md:py-[45px] flex flex-col">
          <h2 className="text-[32px] md:text-[48px] font-medium tracking-tight text-[#0a0a0a] mb-6 leading-[1.1] font-['Urbanist',sans-serif]">
            Problem
          </h2>
          <p className="text-[16px] md:text-[19px] text-[#475569] leading-relaxed font-normal font-['Urbanist',sans-serif]">
            <FormattedText text={problemText} />
          </p>
        </div>
      </section>

      {/* Screenshots Carousel */}
      <section className="w-full rounded-[40px] py-8 md:py-12 px-4 md:px-8 flex flex-col items-center bg-slate-50/40 border border-slate-100/60">
        <div className="w-full max-w-5xl flex flex-col items-center">
          <div className="w-full overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-200/60 bg-white">
            <img
              src={project.screenshots[activeSlide]}
              alt={`screenshot-${activeSlide}`}
              loading="lazy"
              width={1920}
              height={1280}
              srcSet={srcSet(project.screenshots[activeSlide], ['800w', '1600w'])}
              className="w-full h-auto object-cover rounded-[24px]"
            />
          </div>
          <div className="flex items-center justify-center gap-4 mt-8 p-1.5 rounded-full bg-white border border-gray-200/80 shadow-md">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#f8fafc] border border-gray-200 text-[#0a0a0a] flex items-center justify-center hover:bg-[#10b981] hover:text-white hover:border-[#10b981] active:scale-95 transition-all shadow-xs"
              aria-label="Previous screenshot"
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </button>
            <div className="px-4 py-1 rounded-full bg-[#f1f5f9] text-[13px] font-semibold text-[#0a0a0a] font-['Urbanist',sans-serif] tracking-wider">
              {activeSlide + 1} <span className="text-gray-400 font-normal">/</span> {project.screenshots?.length}
            </div>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#f8fafc] border border-gray-200 text-[#0a0a0a] flex items-center justify-center hover:bg-[#10b981] hover:text-white hover:border-[#10b981] active:scale-95 transition-all shadow-xs"
              aria-label="Next screenshot"
            >
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>

      {/* Solution, Role & Highlights */}
      <section className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        <div className="lg:w-[55%] space-y-12">
          <div className="space-y-4">
            <h2 className="text-[32px] md:text-[48px] font-medium tracking-tight text-[#0a0a0a] leading-[1.1] font-['Urbanist',sans-serif] text-left">
              Solution
            </h2>
            <p className="text-[16px] md:text-[19px] text-[#475569] leading-relaxed font-normal font-['Urbanist',sans-serif]">
              <FormattedText text={solutionText} />
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-[32px] md:text-[48px] font-medium tracking-tight text-[#0a0a0a] leading-[1.1] font-['Urbanist',sans-serif] text-left">
              My Role
            </h2>
            <div className="space-y-4">
              {roleList.map((item, idx) => (
                <div key={idx} className="p-5 rounded-[20px] bg-[#f8fafc] border border-gray-200/60 flex items-start gap-4 transition-all hover:border-gray-300">
                  <div className="w-8 h-8 rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-[16px] md:text-[18px] font-bold text-[#0a0a0a] font-['Urbanist',sans-serif]">
                      {item.category}
                    </h4>
                    <p className="text-[14px] md:text-[16px] text-[#475569] leading-relaxed font-normal font-['Urbanist',sans-serif] mt-1">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-[45%] w-full bg-[#f8fafc] border border-gray-100 rounded-[32px] p-8 md:p-12">
          <h2 className="text-[32px] md:text-[48px] font-medium tracking-tight text-[#0a0a0a] leading-[1.1] mb-8 font-['Urbanist',sans-serif] text-left">
            Highlights
          </h2>
          <ul className="space-y-5">
            {project.highlights?.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <CheckCircle size={20} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-[#10b981]" />
                <span className="text-[15px] md:text-[17px] text-[#0a0a0a] font-medium leading-relaxed font-['Urbanist',sans-serif]">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
