import { projects, type Project } from "@/data/projects";
import { ArrowDownLeft, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo } from "react";
import ContactSection from "./ContactSection";

interface ProjectDetailContentProps {
  project: Project;
}

interface EngineeringCaseStudy {
  headlineSplit: [string, string];
  tagline: string;
  descriptor?: string;
  liveUrl?: string;
  problem: string;
  systemSummary: string;
  roleIntro: string;
  roleBullets: { label: string; text: string }[];
  capabilities: { num: string; title: string; desc: string }[];
  diagram: {
    client: { title: string; sub: string };
    api: { title: string; sub: string };
    services: { title: string; desc: string }[];
    data: { title: string; items: string[] };
    external: { title: string; items: string[] };
  };
  challenge: {
    title: string;
    body: string;
    approach: string;
    decision: string;
    tradeoff: string;
  };
  outcomeParagraphs: string[];
  techCategories: { category: string; items: string[] }[];
}

const caseStudiesData: Record<string, EngineeringCaseStudy> = {
  "sales-&-contact-management-(ccms)": {
    headlineSplit: ["CLIENT CONTACT", "MANAGEMENT SYSTEM"],
    tagline:
      "Enterprise CRM for a hierarchical sales organization, combining territory-scoped access, approval-driven sales pipelines, revenue-target allocation, and quote-to-email workflows.",
    descriptor: "Multi-Tier CRM · Sales Automation · Enterprise Operations",
    liveUrl: "https://solucomp.com/ccms",
    problem:
      "A multi-level sales organization (Rep → Manager → Director → VP → President → CFO → CEO) relied on spreadsheets for client tracking, lacked reliable territory-scoped access to client records, routed leads manually, and had no enforced mechanism for allocating revenue targets through the reporting hierarchy without risk of over-allocation.",
    systemSummary:
      "Engineered a Laravel + React CRM around a recursive reporting hierarchy that drives authorization, territory propagation, and pipeline visibility. Built approval-gated sales workflows, a target-allocation engine with double-spend protection, and a quote → approval → numbered PDF → email lifecycle.",
    roleIntro:
      "Led backend architecture across authorization, territory management, target allocation, integrations, and document workflows.",
    roleBullets: [
      {
        label: "Architecture",
        text: "Designed the relational schema across 117 migrations and structured service boundaries for territory propagation, target allocation, hierarchy, and notifications.",
      },
      {
        label: "Authorization",
        text: "Implemented policy-driven authorization and query-scope isolation around the organizational hierarchy.",
      },
      {
        label: "Integrations",
        text: "Integrated AuthCenter SSO with HMAC-signed user synchronization and queued retries with backoff.",
      },
      {
        label: "Data Processing",
        text: "Engineered the 20K+ row bulk-import path with chunking, pre-fetch caches, normalization, and duplicate resolution.",
      },
    ],
    capabilities: [
      {
        num: "01",
        title: "Territory-Scoped Access",
        desc: "Granular company/state/city grants that aggregate up the reporting hierarchy and revoke from the entire subtree inside one transaction.",
      },
      {
        num: "02",
        title: "Target Allocation Engine",
        desc: "Cascade revenue-target allocation (global → regions → users) with double-spend prevention, downline protection, and consumed-target deletion guards.",
      },
      {
        num: "03",
        title: "Quote → PDF → Email",
        desc: "Two-stage approval, race-free sequential quote numbering under a cache lock, branded Dompdf generation, and ZIP-batched emailing.",
      },
      {
        num: "04",
        title: "Hierarchy-Driven Authorization",
        desc: "Cycle-safe, depth-capped recursive org tree powering query scopes, policies, and per-role pipeline visibility — reorganizations take effect instantly.",
      },
      {
        num: "05",
        title: "SSO & User Synchronization",
        desc: "Token-exchange SSO plus bidirectional HMAC-SHA256 user provisioning with AuthCenter, retried via queued jobs with backoff.",
      },
      {
        num: "06",
        title: "High-Volume Bulk Import",
        desc: "Chunked bulk inserts with pre-fetch caches, phone normalization, US state inference, and a follow-up duplicate-resolution flow.",
      },
    ],
    diagram: {
      client: {
        title: "React SPA Client",
        sub: "MUI · DataGrid · Axios/SWR · Laravel Echo",
      },
      api: {
        title: "Laravel API & Authorization Layer",
        sub: "Sanctum Tokens · Rate Limiting · Policy Gates · Form Requests",
      },
      services: [
        {
          title: "Territory Service",
          desc: "Cascade grant propagation & subtree revocation",
        },
        {
          title: "Target Engine",
          desc: "Double-spend validation & budget tree math",
        },
        {
          title: "Notification Workers",
          desc: "Queued alerts & email dispatch pipelines",
        },
      ],
      data: {
        title: "Database & Queue Infrastructure",
        items: [
          "MySQL Relational Schema (117 Migrations)",
          "Database Cache & Redis Queue Store",
          "Optimized Composite & Foreign Key Indexes",
        ],
      },
      external: {
        title: "External Integrations",
        items: [
          "AuthCenter SSO (HMAC-SHA256 Signed Sync)",
          "Pusher Real-Time WebSockets",
          "Microsoft Graph API (Teams Meetings)",
          "SMTP & Dompdf Document Generation",
        ],
      },
    },
    challenge: {
      title: "Money Flows Down the Chain Without Double-Spending",
      body: "A global revenue target is carved into regional buckets and assigned CEO → CFO → President → VP → …, and every rung must not over-allocate. Naive sums double-count cascading redistributions and let budgets shrink below what has already been distributed onward.",
      approach:
        'Bucket-level validation (global ≥ sum of regions), "direct assignments only" sums keyed on the bucket creator, downline checks on updates, consumed-target deletion guards, and bottom-up cascade deletes — all executed within atomic database transactions.',
      decision:
        "Recorded budget chains as explicit relational data (who gave whom money from which bucket) so cascade math and consumed-target detection are computable instead of inferred from transient state.",
      tradeoff:
        "Prioritized strict financial invariants and transactional consistency over update speed because corrupted allocation data would propagate into downstream reporting.",
    },
    outcomeParagraphs: [
      "Replaced spreadsheet-driven sales operations with a centralized CRM enforcing territory-scoped access, hierarchical approvals, target allocation rules, and quote workflows across the organization.",
      "The system brought client management, pipeline operations, organizational visibility, target planning, and quoting into a single operational platform.",
    ],
    techCategories: [
      {
        category: "Core Application",
        items: ["Laravel", "React", "MySQL", "TypeScript"],
      },
      {
        category: "Authentication & Security",
        items: ["Laravel Sanctum", "RBAC", "HMAC-SHA256", "Policy Gates"],
      },
      {
        category: "Real-Time & Integrations",
        items: ["Pusher WebSockets", "Microsoft Graph API", "SMTP"],
      },
      {
        category: "Data & Document Processing",
        items: ["Laravel Queues", "Dompdf Engine", "20K+ Chunked Bulk Import"],
      },
    ],
  },
  "enterprise-single-sign-on": {
    headlineSplit: ["ENTERPRISE UNIFIED", "SINGLE SIGN-ON"],
    tagline:
      "Centralized identity and access platform enabling secure cross-domain authentication, role provisioning, JWT lifecycle management, and TOTP multi-factor security.",
    descriptor:
      "Identity & Access Management · Zero-Trust Security · OAuth 2.0",
    problem:
      "Managing user identities and credentials across disparate internal and partner applications created severe administrative overhead, delayed employee onboarding, and introduced critical security blind spots.",
    systemSummary:
      "Architected a centralized OAuth 2.0 and JWT identity hub fortified with Google TOTP 2FA, automated domain request workflows, and cross-application session synchronization.",
    roleIntro:
      "Security Architect & Full-Stack Lead: Designed cryptographic token lifecycles, zero-trust access control, and real-time monitoring governance.",
    roleBullets: [
      {
        label: "Security & Tokens",
        text: "Designed asymmetric RS256 JWT lifecycle, token rotation, and instant Redis blacklisting.",
      },
      {
        label: "Multi-Factor Auth",
        text: "Implemented Google Authenticator TOTP with encrypted secret storage and rate-limited recovery.",
      },
      {
        label: "Data Processing",
        text: "Built queue-based Excel infrastructure processing engine with automated validation.",
      },
      {
        label: "Governance UI",
        text: "Built React governance portal with real-time access monitoring and user activity charts.",
      },
    ],
    capabilities: [
      {
        num: "01",
        title: "Centralized Identity Hub",
        desc: "Single-source-of-truth authentication serving independent web applications and services.",
      },
      {
        num: "02",
        title: "Zero-Trust 2FA Security",
        desc: "Google Authenticator TOTP implementation with secure recovery workflows and rate limiting.",
      },
      {
        num: "03",
        title: "Cross-Domain Token Sync",
        desc: "Cryptographically signed JWT sessions with instant revocation and cross-app token validation.",
      },
      {
        num: "04",
        title: "Approval-Based Access",
        desc: "Self-service domain access request pipeline with admin moderation and audit logging.",
      },
      {
        num: "05",
        title: "Bulk Data Processing",
        desc: "Queue-driven Excel ingestion engine processing thousands of site records in the background.",
      },
    ],
    diagram: {
      client: {
        title: "Governance Portal & Auth Widgets",
        sub: "React · Vite · Tailwind CSS · Recharts",
      },
      api: {
        title: "API & Authorization Layer",
        sub: "Laravel 12 · Token Exchange · Scope Verification",
      },
      services: [
        {
          title: "JWT Cryptographic Engine",
          desc: "RS256 asymmetric signing & instant verification",
        },
        {
          title: "TOTP Multi-Factor Service",
          desc: "Google 2FA enforcement & recovery keys",
        },
        {
          title: "Background Sync Workers",
          desc: "Asynchronous cross-app provisioning queues",
        },
      ],
      data: {
        title: "Identity & Session Infrastructure",
        items: [
          "MySQL User & Identity Store",
          "Redis Token Blacklist & Session Store",
          "Audit Logs & Mutation Ledger",
        ],
      },
      external: {
        title: "Connected Enterprise Ecosystem",
        items: [
          "CCMS & JobFinder Partner Applications",
          "SMTP Security Alerts & Notifications",
        ],
      },
    },
    challenge: {
      title:
        "Instant Cross-Domain Token Invalidation in Distributed Applications",
      body: "Stateless JWT tokens cannot be revoked natively until expiry. When an employee is offboarded or a security incident occurs, session access across all connected applications must terminate immediately.",
      approach:
        "Implemented a hybrid token strategy: short-lived access tokens paired with a centralized Redis token blacklist and webhook event dispatching to invalidate client sessions in real time.",
      decision:
        "Adopted standard RS256 asymmetric signing keys so child applications can independently verify tokens while only the central SSO hub holds the private signing key.",
      tradeoff:
        "Prioritized instant revocation safety and auditability over pure offline statelessness by introducing a sub-millisecond Redis check on sensitive operations.",
    },
    outcomeParagraphs: [
      "Unified corporate authentication into a single secure gateway, eliminating duplicate credentials and reducing employee onboarding friction by 80%.",
      "Achieved zero-trust multi-factor security across all connected enterprise platforms with comprehensive audit logging.",
    ],
    techCategories: [
      {
        category: "Core Identity",
        items: ["Laravel", "React", "MySQL", "Redis"],
      },
      {
        category: "Security & Auth",
        items: [
          "OAuth 2.0",
          "JWT (RS256)",
          "Google TOTP 2FA",
          "Token Blacklisting",
        ],
      },
      {
        category: "Infrastructure & Jobs",
        items: ["Laravel Queues", "Recharts Analytics", "SMTP"],
      },
    ],
  },
  "genealogy-saas-platform": {
    headlineSplit: ["GENEALOGY ARCHIVAL", "SAAS PLATFORM"],
    tagline:
      "Multi-tenant genealogy platform combining interactive family trees, historical records, OCR data extraction, intelligent matching, and subscriptions.",
    descriptor: "Multi-Tenant SaaS · Archival Systems · OCR & Fuzzy Matching",
    problem:
      "Family history researchers struggle with fragmented archives, incompatible record schemas, and manual transcription bottlenecks when organizing generational lineages.",
    systemSummary:
      "Built a collaborative genealogy SaaS integrating automated historical record fetching, OCR document text extraction, and real-time family tree synchronization.",
    roleIntro:
      "Lead Backend Developer: Architected multi-tenant archival schemas, OCR extraction pipelines, and live collaborative graph traversal.",
    roleBullets: [
      {
        label: "Archival Schemas",
        text: "Designed recursive generational graph models and GEDCOM import/export data mapping.",
      },
      {
        label: "OCR Pipeline",
        text: "Engineered document text extraction parsing historical certificates and census records.",
      },
      {
        label: "Matching Engine",
        text: "Implemented Double Metaphone phonetic matching and Levenshtein distance algorithms.",
      },
      {
        label: "Real-Time Sync",
        text: "Built Pusher-powered collaborative tree canvas with live node synchronization.",
      },
    ],
    capabilities: [
      {
        num: "01",
        title: "Multi-Tenant Lineage Isolation",
        desc: "Workspace-level tenant isolation ensuring absolute privacy for sensitive family genealogical data.",
      },
      {
        num: "02",
        title: "OCR Record Extraction",
        desc: "Automated image-to-text pipeline parsing historical death certificates, census logs, and deeds.",
      },
      {
        num: "03",
        title: "Intelligent Entity Matching",
        desc: "Fuzzy-matching algorithms correlating discovered archives with existing tree nodes.",
      },
      {
        num: "04",
        title: "Real-Time Collaborative Trees",
        desc: "Pusher-powered live editing allowing multiple family members to explore and update records.",
      },
      {
        num: "05",
        title: "Archival API Connectors",
        desc: "Direct integrations with public archives (NARA, OpenArch) for automated source verification.",
      },
    ],
    diagram: {
      client: {
        title: "Interactive Lineage Canvas",
        sub: "React · Visual Graph Rendering · Live Collaboration",
      },
      api: {
        title: "API & Authorization Layer",
        sub: "Laravel REST APIs · Tenant Scopes · Sanctum Auth",
      },
      services: [
        {
          title: "OCR Processing Worker",
          desc: "Document image extraction & text recognition",
        },
        {
          title: "Entity Matching Engine",
          desc: "Phonetic Double Metaphone & Levenshtein scoring",
        },
        {
          title: "GEDCOM Converter",
          desc: "Standard archival import/export parser",
        },
      ],
      data: {
        title: "Archival & Lineage Store",
        items: [
          "MySQL Recursive Adjacency Graph Schema",
          "Redis Real-Time Session Store",
          "Historical Document Blob Storage",
        ],
      },
      external: {
        title: "External Public Archives",
        items: [
          "NARA Public Archives API",
          "OpenArch Historical Data API",
          "Pusher WebSockets Engine",
        ],
      },
    },
    challenge: {
      title: "Fuzzy Matching & Recursive Graph Traversal on Historical Records",
      body: "Historical records frequently feature misspelled names, incomplete birth dates, and varying phonetics across decades. Querying deep generational graphs while correlating historical records posed severe performance challenges.",
      approach:
        "Implemented Double Metaphone phonetic matching combined with Levenshtein distance scoring inside background queue workers, pre-computing record suggestions asynchronously.",
      decision:
        "Employed an adjacency list model with indexed path materialized views in MySQL to execute deep ancestor and descendant queries in single round trips.",
      tradeoff:
        "Prioritized instantaneous tree rendering in the browser by offloading fuzzy record matching and archive discovery to background queues.",
    },
    outcomeParagraphs: [
      "Transformed weeks of manual archive searching into automated background discoveries, connecting historical documents directly to family lineages.",
      "Provided families with an intuitive, real-time collaborative workspace backed by rigorous tenant privacy controls.",
    ],
    techCategories: [
      {
        category: "Core Platform",
        items: ["Laravel", "React", "MySQL", "Redis"],
      },
      {
        category: "Algorithms & Extraction",
        items: [
          "OCR Engine",
          "Double Metaphone",
          "Levenshtein Scoring",
          "GEDCOM",
        ],
      },
      {
        category: "Integrations",
        items: ["NARA API", "OpenArch API", "Pusher WebSockets"],
      },
    ],
  },
  zametrix: {
    headlineSplit: ["ZAMETRIX REAL ESTATE", "DATA INTELLIGENCE"],
    tagline:
      "Full-stack property intelligence platform combining market data, investment analysis, location intelligence, property comparison, and business workflows.",
    descriptor: "PropTech Intelligence · Market Analytics · Role Governance",
    problem:
      "Real estate investment decisions suffer from unstructured market data, lack of reliable location comparison metrics, and unmoderated agent listings lacking verified transaction histories.",
    systemSummary:
      "Architected a multi-role intelligence portal with administrative data verification pipelines, location pulse analytics, and integrated CRM lead handling.",
    roleIntro:
      "Full-Stack Architect: Engineered the REST API layer, Spatie RBAC governance, market analytics algorithms, and React frontend.",
    roleBullets: [
      {
        label: "API Architecture",
        text: "Built modular Laravel REST APIs adhering to repository and service patterns with Redis caching.",
      },
      {
        label: "Governance RBAC",
        text: "Designed 4-role access hierarchy (Admin, Partner, Agent, Public) for moderation workflows.",
      },
      {
        label: "Analytics Engine",
        text: "Created property pulse comparison tools, infrastructure scoring, and pricing indexes.",
      },
      {
        label: "Document Generation",
        text: "Engineered automated PDF dossier builder for institutional and private investor reports.",
      },
    ],
    capabilities: [
      {
        num: "01",
        title: "4-Role Governance Workflow",
        desc: "Structured pipeline (Admin, Partner, Agent, Public) enforcing strict data verification.",
      },
      {
        num: "02",
        title: "Market Pulse & Price Snapshots",
        desc: "Analytics engine calculating price trends, infrastructure scoring, and area valuation indexes.",
      },
      {
        num: "03",
        title: "Property Comparison Engine",
        desc: "Side-by-side geospatial and feature comparison across housing societies and phases.",
      },
      {
        num: "04",
        title: "Lead Routing & CRM",
        desc: "Integrated inquiry tracking routing investor leads directly to verified territory partners.",
      },
      {
        num: "05",
        title: "Automated PDF Dossiers",
        desc: "High-fidelity dynamic investment report generation for clients and institutional buyers.",
      },
    ],
    diagram: {
      client: {
        title: "React 19 + TypeScript PWA",
        sub: "TanStack Query · Tailwind CSS · Framer Motion",
      },
      api: {
        title: "API & Authorization Layer",
        sub: "Laravel REST API · Repository Pattern · Sanctum & Spatie RBAC",
      },
      services: [
        {
          title: "Market Pulse Engine",
          desc: "Geospatial price aggregation & scoring",
        },
        {
          title: "Moderation Pipeline",
          desc: "Staged draft verification & change tracking",
        },
        {
          title: "PDF Dossier Builder",
          desc: "Dynamic investor report generator",
        },
      ],
      data: {
        title: "Property & Geospatial Store",
        items: [
          "MySQL Property Schema",
          "Redis Analytical Cache Layer",
          "Moderation Audit Ledger",
        ],
      },
      external: {
        title: "External Services",
        items: [
          "Geocoding & Mapping Services",
          "SMTP Lead Notification Dispatch",
        ],
      },
    },
    challenge: {
      title:
        "Guaranteeing Data Integrity in Crowdsourced Real Estate Reporting",
      body: "Ensuring that market pricing submitted by field agents across hundreds of sectors undergoes rigorous moderation before influencing public valuation algorithms.",
      approach:
        "Built an event-driven moderation queue where raw submissions are staged in isolated draft states and audited with change-differential tracking prior to publication.",
      decision:
        "Designed a unified repository pattern separating transactional updates from optimized analytical read models cached in Redis.",
      tradeoff:
        "Prioritized high-trust data verification and pricing accuracy over unmoderated real-time publishing velocity.",
    },
    outcomeParagraphs: [
      "Delivered an enterprise PropTech intelligence platform empowering investors with verified price trends, structured moderation, and location comparison.",
      "Replaced ad-hoc listings with a disciplined, verified market pulse engine backed by automated lead routing.",
    ],
    techCategories: [
      {
        category: "Core Stack",
        items: ["Laravel", "React", "TypeScript", "MySQL", "Redis"],
      },
      {
        category: "Architecture & RBAC",
        items: ["Repository Pattern", "Spatie RBAC", "Sanctum Auth"],
      },
      {
        category: "Tooling & Output",
        items: ["DomPDF Generator", "TanStack Query", "Tailwind CSS"],
      },
    ],
  },
  "shipment-tracker-&-ims": {
    headlineSplit: ["SHIPMENT TRACKER &", "INVENTORY SYSTEM"],
    tagline:
      "Telecom logistics platform managing shipment lifecycles, item-level inventory, automated email processing, installation workflows, and operational tracking.",
    descriptor:
      "Logistics & Inventory · IMAP Email Automation · Finite State Machine",
    problem:
      "Logistics and engineering teams relied heavily on manual data entry to extract shipment manifests from unstructured supplier emails, leading to delayed records, missing parts, and operational blind spots.",
    systemSummary:
      "Engineered an automated data pipeline connecting directly to IMAP mailboxes, parsing unstructured email notifications, and managing item-level inventory through a stateful logistics engine.",
    roleIntro:
      "Backend Systems Architect: Engineered automated IMAP ingestion, 7-stage finite state machines, and operational dashboards.",
    roleBullets: [
      {
        label: "Email Parsing",
        text: "Built IMAP mailbox connector extracting structured equipment manifests from raw supplier emails.",
      },
      {
        label: "State Machine",
        text: "Designed 7-stage finite state lifecycle for field equipment from shipment to van transfers.",
      },
      {
        label: "Inventory Ledger",
        text: "Implemented item-level serial tracking monitoring missing, received, and installed parts.",
      },
      {
        label: "SSO & Auditing",
        text: "Integrated external Single Sign-On and comprehensive mutation audit logs.",
      },
    ],
    capabilities: [
      {
        num: "01",
        title: "IMAP Automated Ingestion",
        desc: "Direct mailbox connector fetching and extracting structured parts data from supplier emails.",
      },
      {
        num: "02",
        title: "State-Machine Lifecycle",
        desc: "7-stage finite state workflow tracking equipment from transit to installation and van transfers.",
      },
      {
        num: "03",
        title: "Item-Level Inventory Ledger",
        desc: "Granular parts tracking monitoring quantities, serials, missing items, and technician usage.",
      },
      {
        num: "04",
        title: "Asynchronous Queue Pipelines",
        desc: "Background workers handling heavy parsing and extraction without UI latency.",
      },
      {
        num: "05",
        title: "SSO & Governance Auditing",
        desc: "External Single Sign-On integration with full mutation history and anomaly alerts.",
      },
    ],
    diagram: {
      client: {
        title: "Operational Logistics Dashboard",
        sub: "Laravel Blade · Livewire · Tailwind CSS",
      },
      api: {
        title: "API & Authorization Layer",
        sub: "Laravel Backend Engine · Controller & Action Pipeline",
      },
      services: [
        {
          title: "IMAP Ingestion Listener",
          desc: "Automated email polling & heuristic parsing",
        },
        {
          title: "Logistics State Machine",
          desc: "7-stage transactional status transition rules",
        },
        {
          title: "Inventory Ledger Engine",
          desc: "Item-level parts arithmetic & transfer records",
        },
      ],
      data: {
        title: "Relational Ledger & Queue Store",
        items: [
          "MySQL Relational Schema (Ledger, Shipments, Audit)",
          "Redis Background Queue Workers",
          "Automated Quarantined Email Logs",
        ],
      },
      external: {
        title: "Enterprise & Vendor Connectors",
        items: [
          "Enterprise AuthCenter SSO",
          "Telecom Supplier Mailboxes (IMAP/TLS)",
          "SMTP Alert Dispatcher",
        ],
      },
    },
    challenge: {
      title:
        "Resilient Data Extraction from Unpredictable Multi-Vendor Email Formats",
      body: "Carrier and supplier dispatch emails varied significantly in formatting, character encoding, and structure. Missing a single part number or tracking code compromised downstream field technician installations.",
      approach:
        "Engineered a resilient heuristic parser with fallback regex extraction strategies, validation schemas, and an automated quarantine queue for unparseable emails requiring manual review.",
      decision:
        "Modeled the entire shipment lifecycle around a strict finite state machine, preventing impossible status leaps and guaranteeing transactional consistency on inventory counts.",
      tradeoff:
        "Enforced atomic database transactions on item quantity mutations to prioritize zero inventory discrepancy over raw ingestion velocity.",
    },
    outcomeParagraphs: [
      "Eliminated 100% of manual logistics data entry from incoming emails and established complete end-to-end traceability for critical telecom hardware.",
      "Provided field engineering teams with real-time inventory visibility, preventing misplaced equipment and installation delays.",
    ],
    techCategories: [
      {
        category: "Core Backend",
        items: ["Laravel", "MySQL", "Livewire", "Blade"],
      },
      {
        category: "Automation & Parsing",
        items: ["Webklex IMAP", "Laravel Queues", "Heuristic Regex Engine"],
      },
      {
        category: "Security & Monitoring",
        items: ["Enterprise SSO", "Laravel Telescope", "Audit Logs"],
      },
    ],
  },
  "ai-assistant-platform": {
    headlineSplit: ["MULTI-TENANT AI", "ASSISTANT PLATFORM"],
    tagline:
      "Enterprise SaaS platform unifying conversational AI, Retrieval-Augmented Generation (RAG), multimodal processing, and multi-tenant business automation.",
    descriptor: "AI Orchestration · Python/FastAPI Microservice · Vector RAG",
    problem:
      "Enterprises struggle to securely ground large language models in proprietary business documents while enforcing strict tenant data isolation, role-based controls, and voice interactions.",
    systemSummary:
      "Architected a decoupled microservices architecture uniting a Laravel business API, a high-performance Python/FastAPI RAG engine, and a modern React operational UI.",
    roleIntro:
      "Full-Stack Architect & AI Lead: Designed decoupled microservices, FastAPI RAG vector pipelines, and tenant workspace security.",
    roleBullets: [
      {
        label: "Microservices",
        text: "Decoupled Laravel business engine from Python/FastAPI AI compute microservice.",
      },
      {
        label: "Vector RAG",
        text: "Built document chunking, embeddings, and Pinecone vector search with tenant isolation.",
      },
      {
        label: "Voice Pipelines",
        text: "Integrated Whisper STT and ElevenLabs/OpenAI TTS for real-time speech interaction.",
      },
      {
        label: "Tenant RBAC",
        text: "Implemented workspace data partitioning, audit logs, and Stripe subscription billing.",
      },
    ],
    capabilities: [
      {
        num: "01",
        title: "Decoupled Microservices",
        desc: "Laravel core business engine paired with high-performance Python/FastAPI AI engine.",
      },
      {
        num: "02",
        title: "RAG Document Ingestion",
        desc: "Chunking, embedding, and vector retrieval grounded in tenant-isolated Pinecone indexes.",
      },
      {
        num: "03",
        title: "Multimodal Voice Pipelines",
        desc: "Real-time speech-to-text (Whisper) and text-to-speech (ElevenLabs) conversational engine.",
      },
      {
        num: "04",
        title: "Multi-Tenant Workspace RBAC",
        desc: "Strict data partitioning, workspace invitations, audit logging, and subscription billing.",
      },
      {
        num: "05",
        title: "Observability & Monitoring",
        desc: "Telemetry tracking token usage, vector query latency, and automated retry policies.",
      },
    ],
    diagram: {
      client: {
        title: "React 19 Operational UI & Chatbot Widget",
        sub: "Tailwind CSS · Vite · Audio Streaming Player",
      },
      api: {
        title: "API & Authorization Layer",
        sub: "Laravel Business API & FastAPI AI Microservice Gateway",
      },
      services: [
        {
          title: "Vector RAG Pipeline",
          desc: "Document chunking, embeddings & Pinecone querying",
        },
        {
          title: "Multimodal Voice Engine",
          desc: "Whisper STT & ElevenLabs TTS streaming",
        },
        {
          title: "Billing & Quotas",
          desc: "Stripe webhook subscriptions & token rate limits",
        },
      ],
      data: {
        title: "Relational & Vector Store",
        items: [
          "MySQL Tenant & User Relational Store",
          "Pinecone Vector Database (Namespace Isolation)",
          "Redis Context & Token Cache",
        ],
      },
      external: {
        title: "AI & Speech Providers",
        items: [
          "OpenAI & Google Gemini LLMs",
          "Whisper & ElevenLabs APIs",
          "Stripe Billing Gateway",
        ],
      },
    },
    challenge: {
      title:
        "Tenant-Isolated Semantic Retrieval with Sub-500ms Response Latency",
      body: "Executing semantic search across proprietary documents while strictly preventing cross-tenant data leakage and maintaining low conversational latency for real-time customer widgets.",
      approach:
        "Implemented metadata filtering at the vector database query layer, ensuring vector lookups are strictly constrained to the authenticated tenant workspace ID alongside Redis caching for frequent context embeddings.",
      decision:
        "Decoupled the synchronous HTTP request from heavy embedding pipelines via background queue workers, providing immediate UI feedback during large document uploads.",
      tradeoff:
        "Chose a dedicated Python/FastAPI microservice for AI computation rather than keeping everything in PHP, optimizing for native vector and ML library performance.",
    },
    outcomeParagraphs: [
      "Enabled secure, enterprise-grade AI automation with isolated business knowledge bases, sub-500ms response latency, and multimodal voice capabilities.",
      "Provided organizations with an auditable platform to ground generative AI in internal documentation safely.",
    ],
    techCategories: [
      {
        category: "AI & Microservices",
        items: ["Python", "FastAPI", "Pinecone Vector DB", "LangChain"],
      },
      {
        category: "Core Business API",
        items: ["Laravel", "React", "MySQL", "Redis"],
      },
      {
        category: "Multimodal & Billing",
        items: ["Whisper STT", "ElevenLabs TTS", "Stripe Billing"],
      },
    ],
  },
};

export default function ProjectDetailContent({
  project,
}: ProjectDetailContentProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.slug]);

  // Find adjacent projects for bottom navigation loop
  const currentIndex = projects.findIndex(
    (p: Project) => p.slug === project.slug,
  );
  const prevProject =
    currentIndex > 0
      ? projects[currentIndex - 1]
      : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : projects[0];

  const caseStudy = useMemo(() => {
    const known = caseStudiesData[project.slug];
    if (known) return known;

    return {
      headlineSplit: [project.title.toUpperCase(), "CASE STUDY"] as [
        string,
        string,
      ],
      tagline: project.description || project.niche,
      descriptor: "Backend Architecture · Custom Systems",
      liveUrl: undefined,
      problem:
        project.problem ||
        "Complex enterprise business workflow requiring automated digital tracking.",
      systemSummary:
        project.overview ||
        "Engineered a scalable architecture solving operational friction.",
      roleIntro:
        "Backend Systems Architect & Full-Stack Engineer: Led end-to-end design and implementation.",
      roleBullets: [
        {
          label: "Architecture",
          text: "Designed database schemas, service boundaries, and transactional logic.",
        },
        {
          label: "Backend APIs",
          text: "Implemented RESTful endpoints secured with policy authorization.",
        },
      ],
      capabilities: (project.highlights || []).map((h: string, i: number) => ({
        num: String(i + 1).padStart(2, "0"),
        title: h.split(":")[0] || `Capability ${i + 1}`,
        desc: h.split(":")[1] || h,
      })),
      diagram: {
        client: {
          title: "Web Application Client",
          sub: "Responsive React / Blade Frontend",
        },
        api: {
          title: "API & Authorization Layer",
          sub: "Laravel REST API Gateway",
        },
        services: [
          {
            title: "Core Business Service",
            desc: "Transactional domain rules",
          },
          { title: "Background Workers", desc: "Queued jobs & notifications" },
        ],
        data: {
          title: "Database & Cache",
          items: ["Relational MySQL Database", "Redis Performance Cache Layer"],
        },
        external: {
          title: "Integrations",
          items: ["Third-Party Webhook & Service APIs"],
        },
      },
      challenge: {
        title: "Architectural Scale & Security Isolation",
        body:
          project.problem ||
          "Ensuring transactional consistency across large datasets.",
        approach:
          project.solution ||
          "Built decoupled service architecture with automated data validation.",
        decision:
          "Enforced clean service boundaries with relational data isolation.",
        tradeoff: "Prioritized robust data integrity and maintainability.",
      },
      outcomeParagraphs: [
        (project as any).keyTakeaway ||
          "Delivered a resilient, production-ready backend system engineered for long-term scalability.",
      ],
      techCategories: [
        {
          category: "Technologies Used",
          items: project.tools || ["Laravel", "MySQL", "React"],
        },
      ],
    };
  }, [project]);

  // Filter out the cover image to avoid rendering the same image twice in the gallery
  const galleryShots = (project.screenshots || []).filter(
    (shot: string) => shot !== project.image,
  );

  const handleBackToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    sessionStorage.removeItem("homepage_scroll");
    sessionStorage.setItem("nav_target", "projects");
    window.location.href = "/#projects";
  };

  return (
    <main
      id="main-content"
      className="w-full bg-canvas min-h-screen flex flex-col items-center pt-28 sm:pt-36 pb-20 px-5 sm:px-8"
    >
      <div className="w-full max-w-[1140px] flex flex-col items-start gap-16 md:gap-24">
        {/* Top Breadcrumb / Back Link */}
        <div className="w-full flex items-center justify-between">
          <a
            href="/#projects"
            onClick={handleBackToProjects}
            className="flex items-center gap-2 text-muted hover:text-white transition-colors group cursor-pointer font-display text-[14px] sm:text-[15px]"
          >
            <ArrowLeft
              size={18}
              className="text-orange group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to Projects</span>
          </a>

          <span className="text-[12px] sm:text-[13px] font-mono text-dim tracking-wider uppercase">
            Case Study · {project.title.split(" (")[0].split(" — ")[0]}
          </span>
        </div>

        {/* 1. PROJECT HERO: Split Typography & Clear Tag Groups */}
        <div className="w-full flex flex-col items-start gap-6">
          <h1 className="text-[44px] sm:text-[76px] lg:text-[96px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
            {caseStudy.headlineSplit[0]} <br />
            <span className="text-white/20">{caseStudy.headlineSplit[1]}</span>
          </h1>

          <p className="text-[17px] sm:text-[20px] text-muted leading-[145%] font-normal font-display max-w-[760px]">
            {caseStudy.tagline}
          </p>

          {/* Unified Engineering & Stack Tags with vertical centering and clear grouping */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {project.tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-[12px] sm:text-[13px] font-medium text-white/90 bg-white/5 border border-white/10 rounded-lg px-3 py-1 font-display tracking-wide"
              >
                {tag}
              </span>
            ))}
            {project.tools && project.tools.length > 0 && (
              <>
                <span className="text-dim text-[13px] px-1.5 inline-flex items-center select-none font-bold">
                  •
                </span>
                {project.tools
                  .filter((tool: string) => !project.tags?.includes(tool))
                  .slice(0, 3)
                  .map((tool: string) => (
                    <span
                      key={tool}
                      className="text-[12px] sm:text-[13px] font-medium text-orange/90 bg-orange/10 border border-orange/20 rounded-lg px-3 py-1 font-display tracking-wide"
                    >
                      {tool.split(" (")[0].split(" +")[0]}
                    </span>
                  ))}
              </>
            )}
          </div>

          {/* LARGE HERO SCREENSHOT */}
          <div className="w-full rounded-2xl overflow-hidden bg-white/2 border border-white/10 mt-6">
            <img
              src={project.image}
              alt={`${project.title} — ${project.niche}`}
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto object-cover max-h-[640px]"
            />
          </div>
        </div>

        {/* 2. OVERVIEW, PROBLEM & SYSTEM (2-Column Grid with Equal Heights) */}
        <section className="w-full flex flex-col gap-6 pt-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="link-row p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-3 h-full">
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

            <div className="link-row p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-3 h-full">
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
          </div>

          {/* DEDICATED FULL-WIDTH ROLE & ARCHITECTURE SHOWCASE */}
          <div className="link-row p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
                // My Role & Engineering Scope
              </span>
              <h3 className="text-[22px] font-semibold text-white font-display">
                Architecture & Backend Implementation
              </h3>
              <p className="text-[14.5px] text-muted leading-[145%] font-display mt-0.5">
                {caseStudy.roleIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mt-2">
              {caseStudy.roleBullets.map((b, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-4.5 rounded-xl bg-white/[0.025] border border-white/6 flex flex-col gap-1"
                >
                  <span className="text-[13px] font-mono text-orange font-semibold uppercase tracking-wider">
                    {b.label}
                  </span>
                  <p className="text-[13.5px] text-muted leading-[145%] font-display">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CAPABILITIES (01-06 Architecture Modules) */}
        <section className="w-full flex flex-col items-start gap-10">
          <div className="flex flex-col items-start">
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // Capabilities
            </span>
            <h2 className="text-[34px] sm:text-[48px] font-bold text-white leading-[115%] font-display mt-2">
              Key System <span className="text-white/20">Modules</span>
            </h2>
          </div>

          <div className="w-full flex flex-col gap-3.5">
            {caseStudy.capabilities.map((cap: any) => (
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

        {/* 4. PRODUCT IN ACTION: Screenshots with distinct view separation */}
        {galleryShots.length > 0 && (
          <section className="w-full flex flex-col items-start gap-10">
            <div className="flex flex-col items-start">
              <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
                // Product in Action
              </span>
              <h2 className="text-[34px] sm:text-[48px] font-bold text-white leading-[115%] font-display mt-2">
                Operational <span className="text-white/20">Interfaces</span>
              </h2>
            </div>

            <div className="w-full flex flex-col gap-12 sm:gap-14">
              <div className="w-full rounded-2xl overflow-hidden bg-white/2 border border-white/10">
                <img
                  src={galleryShots[0]}
                  alt={`${project.title} — interface overview`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              </div>

              {galleryShots.length > 1 && (
                <div className="w-full rounded-2xl overflow-hidden bg-white/2 border border-white/10">
                  <img
                    src={galleryShots[1]}
                    alt={`${project.title} — detailed workflow`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* 5. VISUAL SYSTEM ARCHITECTURE DIAGRAM (Consistent Left-Aligned Header) */}
        <section className="w-full flex flex-col items-start gap-10">
          <div className="flex flex-col items-start">
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // Architecture
            </span>
            <h2 className="text-[34px] sm:text-[48px] font-bold text-white leading-[115%] font-display mt-2">
              System Topology <span className="text-white/20">& Data Flow</span>
            </h2>
          </div>

          <div className="w-full rounded-2xl bg-white/[0.015] border border-white/10 p-6 sm:p-10 flex flex-col items-center gap-5">
            {/* Users Trigger */}
            <span className="text-[11px] font-mono text-dim tracking-widest uppercase">
              Users / External Agents
            </span>
            <span className="text-orange font-mono text-[16px]">▼</span>

            {/* Layer 1: Client App */}
            <div className="w-full max-w-[560px] p-4 sm:p-5 rounded-xl bg-white/[0.04] border border-white/12 text-center">
              <h4 className="text-[16px] font-semibold text-white font-display">
                {caseStudy.diagram.client.title}
              </h4>
              <p className="text-[13px] font-mono text-muted mt-1">
                {caseStudy.diagram.client.sub}
              </p>
            </div>

            {/* Coral Arrow */}
            <span className="text-orange font-mono text-[16px]">▼</span>

            {/* Layer 2: API & Authorization Layer */}
            <div className="w-full max-w-[560px] p-4 sm:p-5 rounded-xl bg-white/[0.06] border border-orange/35 text-center">
              <h4 className="text-[16px] font-semibold text-white font-display">
                {caseStudy.diagram.api.title}
              </h4>
              <p className="text-[13px] font-mono text-orange/90 mt-1">
                {caseStudy.diagram.api.sub}
              </p>
            </div>

            {/* Coral Arrow */}
            <span className="text-orange font-mono text-[16px]">▼</span>

            {/* Layer 3: Domain Services Horizontal Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {caseStudy.diagram.services.map((srv, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/8 text-center flex flex-col justify-center"
                >
                  <h5 className="text-[14px] font-semibold text-white font-display">
                    {srv.title}
                  </h5>
                  <p className="text-[12.5px] text-muted font-display mt-1 leading-[135%]">
                    {srv.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Coral Arrow */}
            <span className="text-orange font-mono text-[16px]">▼</span>

            {/* Layer 4: Infrastructure & Integrations */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/8">
                <h5 className="text-[13.5px] font-semibold text-white font-display uppercase tracking-wider">
                  {caseStudy.diagram.data.title}
                </h5>
                <ul className="flex flex-col gap-1.5 mt-2.5">
                  {caseStudy.diagram.data.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-[13px] text-muted font-display flex items-start gap-2"
                    >
                      <span className="text-orange mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/8">
                <h5 className="text-[13.5px] font-semibold text-white font-display uppercase tracking-wider">
                  {caseStudy.diagram.external.title}
                </h5>
                <ul className="flex flex-col gap-1.5 mt-2.5">
                  {caseStudy.diagram.external.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-[13px] text-muted font-display flex items-start gap-2"
                    >
                      <span className="text-orange mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ENGINEERING SIGNATURE: Technical Deep-Dive & Decisions */}
        <section className="w-full flex flex-col items-start gap-8">
          <div>
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // Engineering Focus
            </span>
            <h2 className="text-[34px] sm:text-[48px] font-bold text-white leading-[110%] font-display mt-2">
              Technical Deep-Dive{" "}
              <span className="text-ghost">& Decisions</span>
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="link-row p-6 sm:p-7 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-2.5">
              <span className="text-[12px] font-mono text-orange uppercase tracking-wider">
                01. The Technical Challenge
              </span>
              <h4 className="text-[17px] font-semibold text-white font-display">
                {caseStudy.challenge.title}
              </h4>
              <p className="text-[14px] text-muted leading-[145%] font-display">
                {caseStudy.challenge.body}
              </p>
            </div>

            <div className="link-row p-6 sm:p-7 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-2.5">
              <span className="text-[12px] font-mono text-orange uppercase tracking-wider">
                02. Engineering Approach
              </span>
              <h4 className="text-[17px] font-semibold text-white font-display">
                Systematic Resolution
              </h4>
              <p className="text-[14px] text-muted leading-[145%] font-display">
                {caseStudy.challenge.approach}
              </p>
            </div>

            <div className="link-row p-6 sm:p-7 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-2.5">
              <span className="text-[12px] font-mono text-orange uppercase tracking-wider">
                03. Key Architectural Decision
              </span>
              <h4 className="text-[17px] font-semibold text-white font-display">
                Intentional Design Choice
              </h4>
              <p className="text-[14px] text-muted leading-[145%] font-display">
                {caseStudy.challenge.decision}
              </p>
            </div>

            <div className="link-row p-6 sm:p-7 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-2.5">
              <span className="text-[12px] font-mono text-orange uppercase tracking-wider">
                04. Intentional Trade-Off
              </span>
              <h4 className="text-[17px] font-semibold text-white font-display">
                Prioritization Rationale
              </h4>
              <p className="text-[14px] text-muted leading-[145%] font-display">
                {caseStudy.challenge.tradeoff}
              </p>
            </div>
          </div>
        </section>

        {/* 7. ADDITIONAL GALLERY: Expanded Application Views */}
        {galleryShots.length > 2 && (
          <section className="w-full flex flex-col items-start gap-8">
            <div className="flex flex-col items-start">
              <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
                // Interface Details
              </span>
              <h2 className="text-[34px] sm:text-[48px] font-bold text-white leading-[115%] font-display mt-2">
                Expanded{" "}
                <span className="text-white/20">Application Views</span>
              </h2>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {galleryShots.slice(2, 6).map((shot: string, idx: number) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden bg-white/2 border border-white/10 p-0"
                >
                  <img
                    src={shot}
                    alt={`${project.title} interface detail ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. OUTCOME & CATEGORIZED TECHNOLOGIES */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // The Outcome
            </span>
            <h3 className="text-[22px] font-semibold text-white font-display">
              Business & Operational Value
            </h3>
            <div className="flex flex-col gap-3">
              {caseStudy.outcomeParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-[14.5px] sm:text-[15px] text-muted leading-[150%] font-display"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/7 flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-widest font-mono text-orange">
              // Technologies Used
            </span>
            <h3 className="text-[22px] font-semibold text-white font-display">
              Categorized Stack
            </h3>
            <div className="flex flex-col gap-3.5">
              {caseStudy.techCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-semibold text-white/80 font-display">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item: string) => (
                      <span
                        key={item}
                        className="text-[11.5px] font-medium text-white/90 bg-white/5 border border-white/10 rounded-md px-2.5 py-0.5 font-display"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. DIRECTIONAL PROJECT NAVIGATION LOOP */}
        <div className="w-full border-t border-b border-white/10 py-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
          <a
            href={`/projects/${prevProject.slug}`}
            className="flex items-center gap-3 text-muted hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowDownLeft
              size={22}
              className="text-orange group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform shrink-0"
            />
            <div className="flex flex-col items-start">
              <span className="text-[11px] font-mono text-dim uppercase tracking-wider">
                ← Previous Project
              </span>
              <span className="text-[16px] sm:text-[18px] font-semibold text-white font-display group-hover:text-orange transition-colors">
                {prevProject.title}
              </span>
            </div>
          </a>

          <a
            href={`/projects/${nextProject.slug}`}
            className="flex items-center justify-end gap-3 text-muted hover:text-white transition-colors group cursor-pointer text-right"
          >
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-mono text-dim uppercase tracking-wider">
                Next Project →
              </span>
              <span className="text-[16px] sm:text-[18px] font-semibold text-white font-display group-hover:text-orange transition-colors">
                {nextProject.title}
              </span>
            </div>
            <ArrowUpRight
              size={22}
              className="text-orange group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0"
            />
          </a>
        </div>

        {/* 10. CONTACT CTA */}
        <div className="w-full">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
