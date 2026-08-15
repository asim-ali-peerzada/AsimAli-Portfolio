import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import ContactSection from './ContactSection';
import { projects, type Project } from '@/data/projects';

interface ProjectDetailContentProps {
  project: Project;
}

interface EngineeringCaseStudy {
  headlineSplit: [string, string];
  tagline: string;
  problem: string;
  systemSummary: string;
  roleDescription: string;
  capabilities: { num: string; title: string; desc: string }[];
  architecture: {
    client: string;
    api: string;
    services: string[];
    data: string[];
    external: string[];
  };
  challenge: {
    title: string;
    body: string;
    approach: string;
    decision: string;
    tradeoff: string;
  };
  outcome: string;
}

const caseStudiesData: Record<string, EngineeringCaseStudy> = {
  'sales-&-contact-management-(ccms)': {
    headlineSplit: ['CLIENT CONTACT', 'MANAGEMENT SYSTEM'],
    tagline: 'Multi-tenant enterprise CRM centralizing sales pipelines, customer operations, real-time collaboration, reporting, and role-based access.',
    problem: 'The organization struggled with fragmented client records, untracked multi-stage negotiations, and manual geographic lead distribution. They required a centralized platform enforcing strict corporate hierarchy visibility while providing executives with real-time analytics on quarterly quotas and pending deals.',
    systemSummary: 'Engineered a modular Laravel CRM engine that automates lead assignment by territory, digitizes quote-to-order pipelines, and calculates live performance analytics across hierarchical dashboards.',
    roleDescription: 'Lead Backend Architect: Designed the multi-tier relational schema (CEO down to Sales Reps), built the REST API layer in Laravel, implemented the state-mapping lead router, and crafted real-time aggregation queries for executive dashboards.',
    capabilities: [
      { num: '01', title: 'Multi-Tenant Architecture', desc: 'Isolated customer accounts with strict organization and workspace boundary enforcement.' },
      { num: '02', title: 'Automated Territory Routing', desc: 'State-mapping engine routing incoming prospects to regional directors and account executives.' },
      { num: '03', title: 'Sales Pipeline & Quotes', desc: 'Multi-stage approval workflow converting deals to verified revenue with automated PDF generation.' },
      { num: '04', title: 'Hierarchical RBAC', desc: 'Cascading data visibility model ensuring granular record isolation across 5 corporate tiers.' },
      { num: '05', title: 'Real-Time Sales Pulse', desc: 'High-throughput aggregation endpoints powering executive dashboards with live quarterly metrics.' },
    ],
    architecture: {
      client: 'React 19 + TypeScript SPA / Responsive Executive Dashboard',
      api: 'Laravel REST API Gateway (Sanctum Tokens, Rate Limiting, Route Middleware)',
      services: ['Territory Router Service', 'Quote & Order Pipeline Engine', 'Aggregation & Metric Workers'],
      data: ['MySQL Relational Schema (Cascading Indexes)', 'Redis Performance Cache Layer'],
      external: ['Pusher Real-Time Sync', 'Microsoft Graph Email Ingestion', 'PDF Generator Engine'],
    },
    challenge: {
      title: 'High-Dimensional Reporting Hierarchies Under Strict Data Isolation',
      body: 'Executing hierarchical roll-up reports across thousands of client accounts where visibility dynamically branches based on role, assigned territories, and manager-subordinate relationships without triggering severe N+1 latency bottlenecks.',
      approach: 'Decoupled raw transaction storage from presentation metrics. Built optimized recursive CTE database queries paired with scheduled Redis cache warmers for quarterly aggregated statistics.',
      decision: 'Enforced authorization logic at the database query builder layer rather than in PHP application memory, preventing accidental data leaks and ensuring predictable sub-100ms response times.',
      tradeoff: 'Prioritized read throughput and strict tenant isolation over distributed microservices complexity, keeping the entire transactional boundary atomic inside MySQL.',
    },
    outcome: 'Eliminated manual lead assignment delays, centralized pipeline tracking across 5 operational tiers, and provided C-level leadership with real-time visibility into quarterly revenue forecasting.',
  },
  'enterprise-single-sign-on': {
    headlineSplit: ['ENTERPRISE UNIFIED', 'SINGLE SIGN-ON'],
    tagline: 'Centralized identity and access platform enabling secure cross-domain authentication, role provisioning, JWT lifecycle management, and TOTP multi-factor security.',
    problem: 'Managing user identities and credentials across disparate internal and partner applications created severe administrative overhead, delayed employee onboarding, and introduced critical security blind spots.',
    systemSummary: 'Architected a centralized OAuth 2.0 and JWT identity hub fortified with Google TOTP 2FA, automated domain request workflows, and cross-application session synchronization.',
    roleDescription: 'Security Architect & Full-Stack Lead: Designed cryptographic token lifecycles, implemented zero-trust access control with TOTP 2FA, built queue-based infrastructure processing, and delivered the React administrative monitoring panel.',
    capabilities: [
      { num: '01', title: 'Centralized Identity Hub', desc: 'Single-source-of-truth authentication serving independent web applications and services.' },
      { num: '02', title: 'Zero-Trust 2FA Security', desc: 'Google Authenticator TOTP implementation with secure recovery workflows and rate limiting.' },
      { num: '03', title: 'Cross-Domain Token Sync', desc: 'Cryptographically signed JWT sessions with instant revocation and cross-app token validation.' },
      { num: '04', title: 'Approval-Based Access', desc: 'Self-service domain access request pipeline with admin moderation and audit logging.' },
      { num: '05', title: 'Bulk Data Processing', desc: 'Queue-driven Excel ingestion engine processing thousands of site records in the background.' },
    ],
    architecture: {
      client: 'Vite React Governance Portal + Embedded Login Client Widgets',
      api: 'Laravel 12 Authentication & Identity Gateway',
      services: ['JWT Cryptographic Signer / Verifier', 'TOTP 2FA Engine', 'Background Queue Workers'],
      data: ['MySQL User & Identity Store', 'Redis Token Blacklist & Session Store'],
      external: ['Connected Partner Apps (CCMS, JobFinder, Samsung)', 'SMTP Email Notification Engine'],
    },
    challenge: {
      title: 'Instant Cross-Domain Token Invalidation in Distributed Applications',
      body: 'Stateless JWT tokens cannot be revoked natively until expiry. When an employee is offboarded or a security incident occurs, session access across all connected applications must terminate immediately.',
      approach: 'Implemented a hybrid token strategy: short-lived access tokens paired with a centralized Redis token blacklist and webhook event dispatching to invalidate client sessions in real time.',
      decision: 'Adopted standard RS256 asymmetric signing keys so child applications can independently verify tokens while only the central SSO hub holds the private signing key.',
      tradeoff: 'Introduced a lightweight Redis validation check on critical mutations in exchange for instant, cluster-wide revocation capability.',
    },
    outcome: 'Unified corporate authentication into a single secure gateway, reduced employee onboarding time by 80%, and achieved zero-trust 2FA enforcement across the entire application ecosystem.',
  },
  'genealogy-saas-platform': {
    headlineSplit: ['GENEALOGY ARCHIVAL', 'SAAS PLATFORM'],
    tagline: 'Multi-tenant genealogy platform combining interactive family trees, historical records, OCR data extraction, intelligent matching, and subscriptions.',
    problem: 'Family history researchers struggle with fragmented archives, incompatible record schemas, and manual transcription bottlenecks when organizing generational lineages.',
    systemSummary: 'Built a collaborative genealogy SaaS integrating automated historical record fetching, OCR document text extraction, and real-time family tree synchronization.',
    roleDescription: 'Lead Backend Developer: Architected the multi-tenant archival schemas, integrated NARA/OpenArch historical APIs, engineered the OCR document extraction pipeline, and implemented collaborative live tree sync.',
    capabilities: [
      { num: '01', title: 'Multi-Tenant Lineage Isolation', desc: 'Workspace-level tenant isolation ensuring absolute privacy for sensitive family genealogical data.' },
      { num: '02', title: 'OCR Record Extraction', desc: 'Automated image-to-text pipeline parsing historical death certificates, census logs, and deeds.' },
      { num: '03', title: 'Intelligent Entity Matching', desc: 'Fuzzy-matching algorithms correlating discovered archives with existing tree nodes.' },
      { num: '04', title: 'Real-Time Collaborative Trees', desc: 'Pusher-powered live editing allowing multiple family members to explore and update records.' },
      { num: '05', title: 'Archival API Connectors', desc: 'Direct integrations with public archives (NARA, OpenArch) for automated source verification.' },
    ],
    architecture: {
      client: 'Interactive Visual Family Tree Canvas + Responsive Record Viewer',
      api: 'Laravel RESTful Archival & Lineage API',
      services: ['OCR Extraction Worker', 'Fuzzy Record Matching Engine', 'GEDCOM Exporter / Importer'],
      data: ['Relational Graph & Lineage MySQL Schema', 'Redis Real-Time State Cache'],
      external: ['NARA Public API', 'OpenArch Archive API', 'Pusher WebSockets Engine'],
    },
    challenge: {
      title: 'Fuzzy Matching & Recursive Graph Traversal on Historical Records',
      body: 'Historical records frequently feature misspelled names, incomplete birth dates, and varying phonetics across decades. Querying deep generational graphs while correlating historical records posed severe performance challenges.',
      approach: 'Implemented Double Metaphone phonetic matching combined with Levenshtein distance scoring inside background queue workers, pre-computing record suggestions asynchronously.',
      decision: 'Employed an adjacency list model with indexed path materialized views in MySQL to execute deep ancestor and descendant queries in single round trips.',
      tradeoff: 'Accepted slight background latency for automated suggestion discovery in exchange for lightning-fast instantaneous tree rendering in the browser.',
    },
    outcome: 'Transformed weeks of manual archive searching into automated background discoveries, enabling seamless cross-family collaboration on historical lineages.',
  },
  zametrix: {
    headlineSplit: ['ZAMETRIX REAL ESTATE', 'DATA INTELLIGENCE'],
    tagline: 'Full-stack property intelligence platform combining market data, investment analysis, location intelligence, property comparison, and business workflows.',
    problem: 'Real estate investment decisions suffer from unstructured market data, lack of reliable location comparison metrics, and unmoderated agent listings lacking verified transaction histories.',
    systemSummary: 'Architected a multi-role intelligence portal with administrative data verification pipelines, location pulse analytics, and integrated CRM lead handling.',
    roleDescription: 'Full-Stack Architect: Engineered the Laravel REST API layer, designed the 4-role Spatie RBAC governance system, developed property pulse comparison algorithms, and built the React TypeScript frontend.',
    capabilities: [
      { num: '01', title: '4-Role Governance Workflow', desc: 'Structured pipeline (Admin, Partner, Agent, Public) enforcing strict data verification.' },
      { num: '02', title: 'Market Pulse & Price Snapshots', desc: 'Analytics engine calculating price trends, infrastructure scoring, and area valuation indexes.' },
      { num: '03', title: 'Property Comparison Engine', desc: 'Side-by-side geospatial and feature comparison across housing societies and phases.' },
      { num: '04', title: 'Lead Routing & CRM', desc: 'Integrated inquiry tracking routing investor leads directly to verified territory partners.' },
      { num: '05', title: 'Automated PDF Dossiers', desc: 'High-fidelity dynamic investment report generation for clients and institutional buyers.' },
    ],
    architecture: {
      client: 'React 19 + TypeScript PWA (TanStack Query, Tailwind CSS, Framer Motion)',
      api: 'Laravel REST API (Repository & Service Pattern, Sanctum Auth)',
      services: ['Market Pulse Aggregator', 'Moderation Pipeline Service', 'DomPDF Report Generator'],
      data: ['MySQL Property & Geospatial Store', 'Redis Query Cache Layer'],
      external: ['Mapping & Geolocation Services', 'SMTP Lead Notification Engine'],
    },
    challenge: {
      title: 'Guaranteeing Data Integrity in Crowdsourced Real Estate Reporting',
      body: 'Ensuring that market pricing submitted by field agents across hundreds of sectors undergoes rigorous moderation before influencing public valuation algorithms.',
      approach: 'Built an event-driven moderation queue where raw submissions are staged in isolated draft states and audited with change-differential tracking prior to publication.',
      decision: 'Designed a unified repository pattern separating transactional updates from optimized analytical read models cached in Redis.',
      tradeoff: 'Enforced mandatory administrative approval for market updates to prioritize high-trust data accuracy over unverified real-time volume.',
    },
    outcome: 'Delivered an enterprise-grade PropTech intelligence portal empowering investors with transparent price trends and structured property verification.',
  },
  'shipment-tracker-&-ims': {
    headlineSplit: ['SHIPMENT TRACKER &', 'INVENTORY SYSTEM'],
    tagline: 'Telecom logistics platform managing shipment lifecycles, item-level inventory, automated email processing, installation workflows, and operational tracking.',
    problem: 'Logistics and engineering teams relied heavily on manual data entry to extract shipment manifests from unstructured supplier emails, leading to delayed records, missing parts, and operational blind spots.',
    systemSummary: 'Engineered an automated data pipeline connecting directly to IMAP mailboxes, parsing unstructured email notifications, and managing item-level inventory through a stateful logistics engine.',
    roleDescription: 'Backend Systems Architect: Engineered the automated IMAP email ingestion parser, designed the 7-stage finite state machine for shipment lifecycles, and built the administrative operations dashboard.',
    capabilities: [
      { num: '01', title: 'IMAP Automated Ingestion', desc: 'Direct mailbox connector fetching and extracting structured parts data from supplier emails.' },
      { num: '02', title: 'State-Machine Lifecycle', desc: '7-stage finite state workflow tracking equipment from transit to installation and van transfers.' },
      { num: '03', title: 'Item-Level Inventory Ledger', desc: 'Granular parts tracking monitoring quantities, serials, missing items, and technician usage.' },
      { num: '04', title: 'Asynchronous Queue Pipelines', desc: 'Background workers handling heavy parsing and extraction without UI latency.' },
      { num: '05', title: 'SSO & Governance Auditing', desc: 'External Single Sign-On integration with full mutation history and anomaly alerts.' },
    ],
    architecture: {
      client: 'Responsive Operational Dashboard (Laravel Blade, Livewire, Tailwind CSS)',
      api: 'Laravel 12 Backend Engine & Operational Controller Layer',
      services: ['IMAP Mailbox Listener & Parser', 'Logistics Finite State Machine', 'Inventory Ledger Worker'],
      data: ['MySQL Relational Schema (Item Ledger, Shipments, Audit Logs)', 'Redis Queue Store'],
      external: ['Enterprise AuthCenter SSO', 'Telecom Vendor Supplier Mailboxes'],
    },
    challenge: {
      title: 'Resilient Data Extraction from Unpredictable Multi-Vendor Email Formats',
      body: 'Carrier and supplier dispatch emails varied significantly in formatting, character encoding, and structure. Missing a single part number or tracking code compromised downstream field technician installations.',
      approach: 'Engineered a resilient heuristic parser with fallback regex extraction strategies, validation schemas, and an automated quarantine queue for unparseable emails requiring manual review.',
      decision: 'Modeled the entire shipment lifecycle around a strict finite state machine, preventing impossible status leaps and guaranteeing transactional consistency on inventory counts.',
      tradeoff: 'Enforced atomic database transactions on item quantity mutations to prioritize zero inventory discrepancy over raw ingestion velocity.',
    },
    outcome: 'Eliminated 100% of manual logistics data entry from incoming emails and established complete end-to-end traceability for critical telecom hardware.',
  },
  'ai-assistant-platform': {
    headlineSplit: ['MULTI-TENANT AI', 'ASSISTANT PLATFORM'],
    tagline: 'Enterprise SaaS platform unifying conversational AI, Retrieval-Augmented Generation (RAG), multimodal processing, and multi-tenant business automation.',
    problem: 'Enterprises struggle to securely ground large language models in proprietary business documents while enforcing strict tenant data isolation, role-based controls, and voice interactions.',
    systemSummary: 'Architected a decoupled microservices architecture uniting a Laravel 12 business API, a high-performance Python/FastAPI RAG engine, and a modern React 19 operational UI.',
    roleDescription: 'Full-Stack Architect & AI Lead: Designed the decoupled microservices infrastructure, built the FastAPI RAG pipeline with Pinecone Vector DB, and implemented tenant workspace isolation with subscription billing.',
    capabilities: [
      { num: '01', title: 'Decoupled Microservices', desc: 'Laravel 12 core business engine paired with high-performance Python/FastAPI AI engine.' },
      { num: '02', title: 'RAG Document Ingestion', desc: 'Chunking, embedding, and vector retrieval grounded in tenant-isolated Pinecone indexes.' },
      { num: '03', title: 'Multimodal Voice Pipelines', desc: 'Real-time speech-to-text (Whisper) and text-to-speech (ElevenLabs) conversational engine.' },
      { num: '04', title: 'Multi-Tenant Workspace RBAC', desc: 'Strict data partitioning, workspace invitations, audit logging, and subscription billing.' },
      { num: '05', title: 'Observability & Monitoring', desc: 'Telemetry tracking token usage, vector query latency, and automated retry policies.' },
    ],
    architecture: {
      client: 'React 19 Dashboard + Embeddable Conversational Widget (Tailwind CSS, Vite)',
      api: 'Laravel 12 Core Business API & FastAPI AI Intelligence Microservice',
      services: ['RAG Vector Pipeline (LangChain)', 'Multimodal Audio Processor', 'Stripe Billing & Quota Manager'],
      data: ['MySQL Tenant & User Relational Store', 'Pinecone Vector Database', 'Redis Context Cache'],
      external: ['OpenAI / Google Gemini LLMs', 'Whisper & ElevenLabs Audio APIs'],
    },
    challenge: {
      title: 'Tenant-Isolated Semantic Retrieval with Sub-500ms Response Latency',
      body: 'Executing semantic search across proprietary documents while strictly preventing cross-tenant data leakage and maintaining low conversational latency for real-time customer widgets.',
      approach: 'Implemented metadata filtering at the vector database query layer, ensuring vector lookups are strictly constrained to the authenticated tenant workspace ID alongside Redis caching for frequent context embeddings.',
      decision: 'Decoupled the synchronous HTTP request from heavy embedding pipelines via background queue workers, providing immediate UI feedback during large document uploads.',
      tradeoff: 'Chose a dedicated Python/FastAPI microservice for AI computation rather than keeping everything in PHP, optimizing for native vector and ML library performance.',
    },
    outcome: 'Enabled secure, enterprise-grade AI automation with isolated business knowledge bases, sub-500ms response latency, and multimodal voice capabilities.',
  },
};

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.slug]);

  // Find adjacent projects for bottom navigation loop
  const currentIndex = projects.findIndex((p: Project) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const caseStudy = caseStudiesData[project.slug] || {
    headlineSplit: [project.title.toUpperCase(), 'CASE STUDY'] as [string, string],
    tagline: project.description || project.niche,
    problem: project.problem || 'Complex enterprise business workflow requiring automated digital tracking.',
    systemSummary: project.overview || 'Engineered a scalable architecture solving operational friction.',
    roleDescription: project.role || 'Backend Systems Architect & Full-Stack Engineer.',
    capabilities: (project.highlights || []).map((h: string, i: number) => ({
      num: String(i + 1).padStart(2, '0'),
      title: h.split(':')[0] || `Capability ${i + 1}`,
      desc: h.split(':')[1] || h,
    })),
    architecture: {
      client: 'Responsive Web Application (TypeScript / React)',
      api: 'RESTful Backend API Engine (Laravel)',
      services: ['Core Business Logic Engine', 'Background Queue Workers'],
      data: ['Relational MySQL Database', 'Redis Cache Layer'],
      external: ['Third-Party Webhook & Service APIs'],
    },
    challenge: {
      title: 'Architectural Scale & Security Isolation',
      body: project.problem || 'Ensuring transactional consistency across large datasets.',
      approach: project.solution || 'Built decoupled service architecture with automated data validation.',
      decision: 'Enforced clean service boundaries with relational data isolation.',
      tradeoff: 'Prioritized robust data integrity and maintainability.',
    },
    outcome: (project as any).keyTakeaway || 'Delivered a resilient, production-ready backend system engineered for long-term scalability.',
  };

  const handleBackToProjects = () => {
    sessionStorage.setItem('nav_target', 'projects');
    window.location.href = '/';
  };

  return (
    <main id="main-content" className="w-full bg-canvas min-h-screen flex flex-col items-center pt-28 sm:pt-36 pb-20 px-5 sm:px-8">
      <div className="w-full max-w-[1140px] flex flex-col items-start gap-16 md:gap-24">
        
        {/* Top Breadcrumb / Back Link */}
        <div className="w-full flex items-center justify-between">
          <button
            onClick={handleBackToProjects}
            className="flex items-center gap-2 text-muted hover:text-white transition-colors group cursor-pointer font-display text-[14px] sm:text-[15px]"
          >
            <ArrowLeft size={18} className="text-orange group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </button>

          <span className="text-[12px] sm:text-[13px] font-mono text-dim tracking-wider uppercase">
            Case Study // {project.slug}
          </span>
        </div>

        {/* 1. PROJECT HERO: Split Typography & Metadata */}
        <div className="w-full flex flex-col items-start gap-6">
          <h1 className="text-[44px] sm:text-[76px] lg:text-[96px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
            {caseStudy.headlineSplit[0]} <br />
            <span className="text-ghost">{caseStudy.headlineSplit[1]}</span>
          </h1>

          <p className="text-[17px] sm:text-[20px] text-muted leading-[145%] font-normal font-display max-w-[760px]">
            {caseStudy.tagline}
          </p>

          {/* Technical Metadata Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-[12px] sm:text-[13px] font-medium text-white/90 bg-white/5 border border-white/10 rounded-lg px-3.5 py-1 font-display tracking-wide"
              >
                {tag}
              </span>
            ))}
            {project.tools?.slice(0, 3).map((tool: string) => (
              <span
                key={tool}
                className="text-[12px] sm:text-[13px] font-medium text-orange/90 bg-orange/10 border border-orange/20 rounded-lg px-3.5 py-1 font-display tracking-wide"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* LARGE HERO SCREENSHOT */}
          <div className="w-full rounded-2xl overflow-hidden bg-white/2 border border-white/10 mt-6 shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover max-h-[640px]"
            />
          </div>
        </div>

        {/* 2. OVERVIEW, PROBLEM & ROLE */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          <div className="link-row p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-3">
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // The Problem
            </span>
            <h3 className="text-[20px] font-semibold text-white font-display">
              Operational Friction
            </h3>
            <p className="text-[14.5px] text-muted leading-[150%] font-display">
              {caseStudy.problem}
            </p>
          </div>

          <div className="link-row p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-3">
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // The System
            </span>
            <h3 className="text-[20px] font-semibold text-white font-display">
              Engineered Solution
            </h3>
            <p className="text-[14.5px] text-muted leading-[150%] font-display">
              {caseStudy.systemSummary}
            </p>
          </div>

          <div className="link-row p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-3">
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // My Role
            </span>
            <h3 className="text-[20px] font-semibold text-white font-display">
              Architecture & Backend
            </h3>
            <p className="text-[14.5px] text-muted leading-[150%] font-display">
              {caseStudy.roleDescription}
            </p>
          </div>
        </section>

        {/* 3. VISUAL INTERLUDE: First High-Resolution Screenshot */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="w-full rounded-2xl overflow-hidden bg-white/2 border border-white/10 shadow-2xl">
            <img
              src={project.screenshots[0]}
              alt={`${project.title} Interface 1`}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* 4. KEY CAPABILITIES (01-05 Architecture Modules) */}
        <section className="w-full flex flex-col items-start gap-8">
          <div>
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // Capabilities
            </span>
            <h2 className="text-[34px] sm:text-[48px] font-bold text-white leading-[110%] font-display mt-2">
              Key System <span className="text-ghost">Modules</span>
            </h2>
          </div>

          <div className="w-full flex flex-col gap-3">
            {caseStudy.capabilities.map((cap) => (
              <div
                key={cap.num}
                className="link-row flex items-start gap-5 rounded-2xl p-5 sm:p-6 bg-white/2 border border-white/7"
              >
                <span className="text-[14px] font-mono font-semibold text-orange bg-orange/10 border border-orange/25 rounded-md px-2.5 py-1 shrink-0 mt-0.5">
                  {cap.num}
                </span>
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-[18px] sm:text-[20px] font-semibold text-white font-display">
                    {cap.title}
                  </h3>
                  <p className="text-[14px] sm:text-[14.5px] text-muted leading-[140%] font-display">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SYSTEM ARCHITECTURE DIAGRAM (Framer Dark System Aesthetics) */}
        <section className="w-full flex flex-col items-start gap-8">
          <div>
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // Architecture
            </span>
            <h2 className="text-[34px] sm:text-[48px] font-bold text-white leading-[110%] font-display mt-2">
              System Topology <span className="text-ghost">& Data Flow</span>
            </h2>
          </div>

          <div className="w-full rounded-2xl bg-white/[0.015] border border-white/10 p-6 sm:p-10 flex flex-col items-center gap-6">
            {/* Top Layer: Client Application */}
            <div className="w-full max-w-[500px] p-4 rounded-xl bg-white/[0.04] border border-white/12 text-center">
              <span className="text-[11px] font-mono text-orange uppercase tracking-wider block">Presentation Layer</span>
              <h4 className="text-[15px] sm:text-[16px] font-semibold text-white font-display mt-1">{caseStudy.architecture.client}</h4>
            </div>

            {/* Coral Arrow Down */}
            <span className="text-orange font-mono text-[18px]">↓</span>

            {/* Middle Layer: API Gateway */}
            <div className="w-full max-w-[500px] p-4 rounded-xl bg-white/[0.06] border border-orange/30 text-center shadow-[0_0_24px_rgba(244,108,56,0.1)]">
              <span className="text-[11px] font-mono text-orange uppercase tracking-wider block">API Gateway & Auth Boundary</span>
              <h4 className="text-[15px] sm:text-[16px] font-semibold text-white font-display mt-1">{caseStudy.architecture.api}</h4>
            </div>

            {/* Coral Arrow Down */}
            <span className="text-orange font-mono text-[18px]">↓</span>

            {/* Domain Services Layer */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {caseStudy.architecture.services.map((srv, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/8 text-center flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Domain Service {idx + 1}</span>
                  <p className="text-[13.5px] font-medium text-white font-display mt-1">{srv}</p>
                </div>
              ))}
            </div>

            {/* Coral Arrow Down */}
            <span className="text-orange font-mono text-[18px]">↓</span>

            {/* Persistence & External Integrations */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                <span className="text-[11px] font-mono text-orange uppercase tracking-wider block">Data & Cache Infrastructure</span>
                <div className="flex flex-col gap-1 mt-2">
                  {caseStudy.architecture.data.map((d, i) => (
                    <p key={i} className="text-[13.5px] text-muted font-display">• {d}</p>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                <span className="text-[11px] font-mono text-orange uppercase tracking-wider block">External Services & Integration</span>
                <div className="flex flex-col gap-1 mt-2">
                  {caseStudy.architecture.external.map((ext, i) => (
                    <p key={i} className="text-[13.5px] text-muted font-display">• {ext}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. VISUAL INTERLUDE: Second High-Resolution Screenshot */}
        {project.screenshots && project.screenshots.length > 1 && (
          <div className="w-full rounded-2xl overflow-hidden bg-white/2 border border-white/10 shadow-2xl">
            <img
              src={project.screenshots[1]}
              alt={`${project.title} Interface 2`}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* 7. ENGINEERING SIGNATURE: Challenge, Approach, Decision, Trade-Off */}
        <section className="w-full flex flex-col items-start gap-8">
          <div>
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // Engineering Focus
            </span>
            <h2 className="text-[34px] sm:text-[48px] font-bold text-white leading-[110%] font-display mt-2">
              Technical Deep-Dive <span className="text-ghost">& Decisions</span>
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="link-row p-6 sm:p-7 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-2.5">
              <span className="text-[12px] font-mono text-orange uppercase tracking-wider">01. The Technical Challenge</span>
              <h4 className="text-[17px] font-semibold text-white font-display">{caseStudy.challenge.title}</h4>
              <p className="text-[14px] text-muted leading-[145%] font-display">{caseStudy.challenge.body}</p>
            </div>

            <div className="link-row p-6 sm:p-7 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-2.5">
              <span className="text-[12px] font-mono text-orange uppercase tracking-wider">02. Engineering Approach</span>
              <h4 className="text-[17px] font-semibold text-white font-display">Systematic Resolution</h4>
              <p className="text-[14px] text-muted leading-[145%] font-display">{caseStudy.challenge.approach}</p>
            </div>

            <div className="link-row p-6 sm:p-7 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-2.5">
              <span className="text-[12px] font-mono text-orange uppercase tracking-wider">03. Key Architectural Decision</span>
              <h4 className="text-[17px] font-semibold text-white font-display">Intentional Design Choice</h4>
              <p className="text-[14px] text-muted leading-[145%] font-display">{caseStudy.challenge.decision}</p>
            </div>

            <div className="link-row p-6 sm:p-7 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-2.5">
              <span className="text-[12px] font-mono text-orange uppercase tracking-wider">04. Intentional Trade-Off</span>
              <h4 className="text-[17px] font-semibold text-white font-display">Prioritization Rationale</h4>
              <p className="text-[14px] text-muted leading-[145%] font-display">{caseStudy.challenge.tradeoff}</p>
            </div>
          </div>
        </section>

        {/* 8. MORE SCREENSHOTS (Gallery Grid if available) */}
        {project.screenshots && project.screenshots.length > 2 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.screenshots.slice(2, 6).map((shot: string, idx: number) => (
              <div key={idx} className="rounded-2xl overflow-hidden bg-white/2 border border-white/10 shadow-xl">
                <img src={shot} alt={`${project.title} gallery ${idx + 1}`} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* 9. OUTCOME & TECHNOLOGY STACK */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-3">
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // The Outcome
            </span>
            <h3 className="text-[22px] font-semibold text-white font-display">
              Business & Operational Value
            </h3>
            <p className="text-[15px] text-muted leading-[150%] font-display">
              {caseStudy.outcome}
            </p>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-3">
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // Technologies Used
            </span>
            <h3 className="text-[22px] font-semibold text-white font-display">
              Stack & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.tools?.map((tool: string) => (
                <span
                  key={tool}
                  className="text-[12px] font-medium text-white/90 bg-white/5 border border-white/10 rounded-md px-2.5 py-1 font-display"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 10. PROJECT NAVIGATION LOOP (Previous / Next Projects) */}
        <div className="w-full border-t border-b border-white/10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <a
            href={`/projects/${prevProject.slug}`}
            className="flex items-center gap-3 text-muted hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowDownLeft size={22} className="text-orange group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform" />
            <div className="flex flex-col items-start">
              <span className="text-[11px] font-mono text-dim uppercase tracking-wider">Previous Project</span>
              <span className="text-[16px] sm:text-[18px] font-semibold text-white font-display group-hover:text-orange transition-colors">
                {prevProject.title}
              </span>
            </div>
          </a>

          <a
            href={`/projects/${nextProject.slug}`}
            className="flex items-center gap-3 text-muted hover:text-white transition-colors group cursor-pointer sm:text-right"
          >
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-mono text-dim uppercase tracking-wider">Next Project</span>
              <span className="text-[16px] sm:text-[18px] font-semibold text-white font-display group-hover:text-orange transition-colors">
                {nextProject.title}
              </span>
            </div>
            <ArrowUpRight size={22} className="text-orange group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* 11. CONTACT CTA AT BOTTOM OF CASE STUDY */}
        <div className="w-full max-w-[696px]">
          <ContactSection />
        </div>

      </div>
    </main>
  );
}
