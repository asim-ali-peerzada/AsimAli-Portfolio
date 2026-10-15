/**
 * Per-project case study copy for the project detail pages.
 *
 * Each entry is the authored narrative for one project. The page layout reads
 * from here first and falls back to the shared fields on the project itself,
 * so a project without an entry still renders in the same structure rather
 * than falling back to a different layout.
 */
export interface GalleryItem {
  src: string;
  caption: string;
}

export interface ShowcaseGroup {
  label: string;
  /** Indices into `gallery`, in display order. */
  items: number[];
}

export interface EngineeringCaseStudy {
  headlineSplit: [string, string];
  tagline: string;
  descriptor?: string;
  liveUrl?: string;
  problem: string;
  systemSummary: string;
  roleIntro: string;
  roleBullets: { label: string; text: string }[];
  capabilities: { num: string; title: string; desc: string; icon?: string }[];
  /**
   * Opt-in to the richer case-study presentation: capability cards, a grouped
   * screenshot showcase with window chrome, and monospace tag pills. Projects
   * without it keep the plain list + stacked gallery.
   */
  layout?: 'default' | 'showcase';
  /** Screenshots with captions, mirroring the order of `project.screenshots`. */
  gallery?: GalleryItem[];
  /** Groups shown as pill tabs above the showcase. */
  showcaseGroups?: ShowcaseGroup[];
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
  "close-out-package-system": {
    headlineSplit: ["CLOSE-OUT PACKAGE", "MANAGEMENT SYSTEM"],
    tagline:
      "An enterprise field-operations platform for telecom construction. Field technicians capture site evidence on their phones; supervisors review and approve it; the system assembles photos, checklists and site metadata into a signed, branded PDF and releases it to the customer through a governed email outbox. Scope-of-work reports, change orders, customer review rounds and crew tracking sit around that core.",
    descriptor: "Telecom Construction · Document Automation · Access Control",
    problem:
      "A finished cell site has to be turned into a standardised client deliverable, and the evidence for it is scattered across photos, checklists, issue threads and email. Manual assembly meant document inconsistencies, unbounded approval time, and no reliable way to know a package was actually complete before it reached an engineer. Two failure modes dominated. Rendering: a large package runs to 300 photos, a single Chromium render is a memory and timeout problem, and page breaks were whatever the browser\u2019s reflow decided \u2014 so the output could not be reasoned about, tested or split. Capture: technicians upload over cellular, and a monolithic multipart POST cannot survive a tunnel, a signal drop or a mid-batch page navigation.",
    systemSummary:
      "A domain-oriented Laravel monolith with React and Inertia on the front, external AuthCenter for identity, and queued processing behind every slow path. Rendering runs behind a driver abstraction: Browsershot against a local Chromium, or a remote Browserless host, with image transport chosen by reachability \u2014 signed 30-minute URLs when the renderer can reach the host, inline base64 when it cannot, deduplicated by content hash so identical bytes are fetched once. PDF work is pinned to its own queue supervisor capped at two processes and a 512 MB ceiling, so a burst of renders cannot starve the application. Every photo is normalised to a 1200px JPEG at quality 80 with a downscale that never upscales, and any image that cannot be decoded falls back to the original file rather than failing a customer-facing document.",
    roleIntro:
      "Full Stack Developer: worked across the domain modules, the rendering pipeline and the policy layer that governs what each role can see.",
    roleBullets: [
      {
        label: "Scalable close-out PDF generation",
        text: "Reworked the PDF generation strategy to handle substantially larger close-out packages, raising tested capacity to 300+ images per package \u2014 roughly 6\u00d7 the previous 45\u201350 image baseline \u2014 with no hard photo cap by design. Optimised image processing and replaced browser-driven page breaks with server-side page budgeting in PHP: an 880px content box, four photos and twelve site details per page, thirty picture categories per page, and checklist row heights tiered by label length, so the renderer knows exactly what page N contains before Chromium starts. Reasoning through that budget exposed a real data-integrity bug \u2014 the page-count column was an unsignedTinyInteger, so a package beyond roughly 1,000 photos silently overflowed past 255 pages. Rendering is isolated on a supervisor capped at two processes and 512 MB, every photo is normalised to a 1200px JPEG that never upscales, and a decode failure degrades to the original file rather than failing a customer deliverable.",
      },
      {
        label: "Reliable bulk media uploads",
        text: "Field batches run to hundreds of photos over cellular, and a single monolithic request cannot survive a tunnel, a signal drop or a mid-batch page navigation. Rather than assume a library covered the failure modes, I built the four-phase protocol: initiate, chunk, finalize, abort. Authentication is a stateless HMAC-SHA256 token, so no session row can strand an upload half-authenticated; duplicate chunk indices are idempotent; out-of-order arrival is tolerated by construction through zero-padded filenames where lexicographic order equals numeric order; concurrent finalization is row-locked; and a full disk returns 507 rather than a stack trace. Failed processing deliberately keeps its chunks so the retry can succeed.",
      },
      {
        label: "Customer-approved change orders",
        text: "Managers propose scope changes, but a customer should not have to create an account to approve one. Change orders are delivered to explicitly listed recipients through a signed token route, so the customer can review and decide without signing in. Decision tokens are minted at delivery time and never stored, so a leaked link cannot be replayed against a decision that has already been recorded.",
      },
      {
        label: "Template-driven packages",
        text: "Document structure is configuration, not code. Templates define per-stage sections, picture categories carrying a required count and a required flag, and checklist items that may request an explanation or permit N/A. That structure is instantiated per project, and when a template changes underneath an in-progress draft a drift service reconciles it \u2014 raising a conflict only where a picture bucket has shrunk below what has already been uploaded, and otherwise syncing new categories and checklist items into the live package.",
      },
      {
        label: "Project-scoped authorization",
        text: "Four roles see the same objects at different lifecycle stages, so authorization was a design problem rather than a CRUD one: each ability resolves role, relationship scope and workflow state together. An open customer feedback round is the customer's private draft \u2014 staff see nothing at all, not even image counts, so nobody can watch a customer compose a review. I then wrote a 48-case adversarial probe from the domain rules before reading my own implementation; it surfaced six real defects, three of them cross-tenant holes where one customer could withdraw another's message.",
      },
      {
        label: "Reliable customer communication",
        text: "A duplicate close-out document damages a client relationship permanently, so delivery is guarded four independent ways rather than one: atomic conditional status transitions, delayed jobs that snapshot the schedule they were dispatched with, an attachment policy re-evaluated at delivery so a link scheduled for next week is freshly signed instead of expiring in the queue, and idempotency keys sized to fit the column exactly. Email templates are configurable per type, and a suppressed send is retained as an audit record rather than silently dropped.",
      },
    ],
    capabilities: [
      {
        num: "01",
        title: "Three-stage field operations",
        icon: "Layers",
        desc: "Pre-Construction, Construction and Post-Completion workflows driving telecom site documentation from first capture to sign-off.",
      },
      {
        num: "02",
        title: "Field media and library management",
        icon: "Images",
        desc: "Capture, organise, review, replace and reuse project photos and their metadata, with GPS/EXIF validation and configurable per-category limits.",
      },
      {
        num: "03",
        title: "Template builder",
        icon: "LayoutTemplate",
        desc: "Configure close-out templates, their picture categories and reusable category presets, and the documentation requirements that decide how field submissions become a deliverable.",
      },
      {
        num: "04",
        title: "Automated close-out packages",
        icon: "FileCheck2",
        desc: "Branded Verizon-format PDF packages generated from submitted field documentation, with revision management and approval controls.",
      },
      {
        num: "05",
        title: "Change-order management",
        icon: "FileDiff",
        desc: "Create and submit change orders, request customer approval, and collect the decision through a signed link.",
      },
      {
        num: "06",
        title: "Technician location tracking",
        icon: "MapPin",
        desc: "Field-technician location visibility for operational coordination, with idle detection and stale-ping pruning.",
      },
      {
        num: "07",
        title: "Customer email management",
        icon: "Mail",
        desc: "Authorised managers and administrators send customer email manually, manage per-type templates, and track delivery activity through an audit log.",
      },
      {
        num: "08",
        title: "Customer review portal",
        icon: "MessagesSquare",
        desc: "Customer-facing access to package documentation, review workflows and threaded feedback, granted per project.",
      },
      {
        num: "09",
        title: "SOW and project administration",
        icon: "FolderTree",
        desc: "Statements of Work with annotated images, market-scoped projects, dashboards, and role-based access across the portfolio.",
      },
    ],
    layout: "showcase",
    gallery: [
      {
        src: "/images/cop-v2/screenshot-rocks (28).webp",
        caption:
          "Portfolio health at a glance — in-progress, fully approved and needing review counts, plus the project-health gauge, past-due markers and an attention queue. Counters are aggregated server-side rather than issued as one query per tile.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (12).webp",
        caption:
          "Every site across the portfolio with status, progress, close-out package count and assigned crew, filterable by status, market, package stage and sort order.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (27).webp",
        caption:
          "A close-out template is configuration, not code: per-stage sections, picture categories with required counts, and checklist items that may request an explanation or permit N/A. Field teams assemble against this structure instead of a fixed document.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (18).webp",
        caption:
          "Customer and engineer hierarchy, per-role media quotas, outbound email configuration and market management — the controls that scope the whole platform.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (22).webp",
        caption:
          "All close-out packages generated for one site, each an independent revision that can be opened, submitted or deleted without touching the others.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (13).webp",
        caption:
          "The centre of the product: stage timeline, document collections, site photo, site information, and an attention queue surfacing unresolved construction issues.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (23).webp",
        caption:
          "Phase completion across pre-construction, construction and post-completion, alongside the revision ledger recording every approval, discard and draft for audit.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (25).webp",
        caption:
          "Post-completion site photography with per-image annotations, captured under the phase that produced it.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (20).webp",
        caption:
          "Statements of work moving through draft, awaiting-review, published and archived, with revision counts on each.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (21).webp",
        caption:
          "Drawing boxes, arrows and labels directly over a site photograph so the note points at the hardware it refers to rather than describing it in prose.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (15).webp",
        caption:
          "Reusable field media with per-item processing and tagging state, quota tracking and duplicate suppression.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (26).webp",
        caption:
          "Construction issues logged by type with assignee, target date and resolution state, each carrying an internal or customer-facing visibility flag.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (24).webp",
        caption:
          "Section-level comment threads against a package, each moving through pending, acknowledged and resolved, with attachments.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (19).webp",
        caption:
          "The customer-facing view, granted per project: package status, their own review queue and project progress without exposing internal notes.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (14).webp",
        caption:
          "Change orders grouped by job with line items, billed versus absorbed totals, and draft / sent / approved state recorded against a sent-at timestamp.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (16).webp",
        caption:
          "Delivery as a governed queue rather than a side effect: send now, schedule, cancel, resend and retry, with suppressed sends retained as audit rows.",
      },
      {
        src: "/images/cop-v2/screenshot-rocks (17).webp",
        caption:
          "Assigned crew with elapsed timers plotted against the site, and technician contact details for operational coordination.",
      },
    ],
    // Index 0 is deliberately absent: it is already the hero image above, so
    // listing it here would render the same screenshot twice.
    showcaseGroups: [
      { label: "Platform", items: [1, 2, 3] },
      { label: "Close-out packages", items: [4, 5, 6, 7] },
      { label: "Scope of work", items: [8, 9, 10] },
      { label: "Collaboration", items: [11, 12, 13] },
      { label: "Commercial & delivery", items: [14, 15, 16] },
    ],
    diagram: {
      client: {
        title: "React 18 SPA (Inertia.js v2)",
        sub: "Tailwind CSS \u00b7 In-App Camera \u00b7 Axios Upload Client",
      },
      api: {
        title: "Laravel 12 Modular Monolith",
        sub: "Domain-Oriented Modules \u00b7 Action & DTO Architecture \u00b7 Policy Gates",
      },
      services: [
        {
          title: "Deterministic PDF Engine",
          desc: "Server-side pixel-budget pagination & dual-driver Chromium rendering",
        },
        {
          title: "Resumable Media Pipeline",
          desc: "HMAC-token chunked upload, quota enforcement & async conversion",
        },
        {
          title: "Authorization & Sync",
          desc: "Role, relationship scope and lifecycle policies with consequence-split SSO",
        },
      ],
      data: {
        title: "Persistence & Storage",
        items: [
          "Relational Database (107 Migrations)",
          "Redis Queue, Cache & Session Store",
          "Private Storage Disk for Versioned Deliverable PDFs",
        ],
      },
      external: {
        title: "Third-Party & Integrations",
        items: [
          "AuthCenter SSO (HMAC-SHA256 Outbound, Rollback-Safe)",
          "Transactional Email API (Idempotency-Keyed Sends)",
          "Headless Chromium / Browserless Bridge",
        ],
      },
    },
    challenge: {
      title: "Rendering a 300-photo close-out package deterministically under a customer-facing deadline",
      body: "The deliverable is a physical document with fixed page geometry \u2014 dynamic Page X of Y numbering, a fixed four-photo grid grouped by construction stage, and table boundaries that cannot drift. At 300 photos a single Chromium render is a memory and timeout problem, and because page breaks belonged to CSS reflow, the output could not be tested or split.",
      approach:
        "Removed the browser from pagination decisions: fixed-layout page boxes with an 880px pixel budget, four photos per page, twelve site details per page, thirty picture categories per page, and checklist row heights tiered by label length (66/48/32px). Total page count is computed before Chromium is invoked, and rendering is isolated on a dedicated supervisor capped at 2 processes and 512 MB.",
      decision:
        "Put rendering behind a driver abstraction so the same pipeline runs against local Chromium or a remote Browserless host, and let the renderer choose image transport by reachability \u2014 signed short-lived URLs, or inline base64 when the host is unreachable \u2014 instead of assuming the renderer can always fetch a file path.",
      tradeoff:
        "Accepted asynchronous rendering with client-side polling over synchronous HTTP generation, keeping web-server responsiveness during large compilations. Every image failure degrades to the original file rather than failing a customer-facing document.",
    },
    outcomeParagraphs: [
      "Page layout became deterministic and unit-testable without launching a browser, and the silent 255-page truncation on large packages is fixed.",
      "Uploads survive interrupted cellular transfers and page navigation, with duplicate chunks, incomplete uploads and storage exhaustion each handled explicitly rather than surfacing as a stack trace.",
      "Authorization was validated against an independent spec derived from domain rules rather than against itself, and the cross-tenant defects it found were fixed at the point of the withdrawal action.",
      "Customer-facing delivery is guarded against duplicate sends by four independent mechanisms, and scheduled emails receive a freshly signed link at send time instead of one that expires while queued.",
    ],
    techCategories: [
      {
        category: "Backend",
        items: ["PHP 8.2", "Laravel 12", "Horizon", "Redis"],
      },
      {
        category: "Frontend",
        items: ["React 18", "Inertia.js v2", "Tailwind CSS"],
      },
      {
        category: "Documents & media",
        items: ["Browsershot", "Headless Chromium", "Browserless", "Intervention Image"],
      },
      {
        category: "Reliability & security",
        items: ["HMAC-SHA256 tokens", "Queue isolation", "External AuthCenter SSO"],
      },
      {
        category: "Testing",
        items: ["Pest", "Feature tests", "Adversarial authorization probe"],
      },
    ],
  },
  "ccms": {
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
      "Collaborative genealogy platform combining interactive family trees, historical records, OCR data extraction, intelligent matching, and subscriptions.",
    descriptor: "Collaborative Graph · Archival Systems · OCR & Fuzzy Matching",
    problem:
      "Family history researchers struggle with fragmented archives, incompatible record schemas, and manual transcription bottlenecks when organizing generational lineages.",
    systemSummary:
      "Built a collaborative genealogy SaaS integrating automated historical record fetching, OCR document text extraction, and real-time family tree synchronization.",
    roleIntro:
      "Lead Backend Developer: Architected collaborative family-graph and archival schemas, OCR extraction pipelines, and live collaborative graph traversal.",
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
        title: "Graph-Aware ABAC & Branch Isolation",
        desc: "Five-tier attribute-based access control that resolves each user's editable branch scope by breadth-first traversal of the family graph.",
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
  "shipment-tracker": {
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
    headlineSplit: ["OMNICHANNEL AI", "ASSISTANT PLATFORM"],
    tagline:
      "Enterprise SaaS platform unifying conversational AI, Retrieval-Augmented Generation (RAG), multimodal processing, and omnichannel business automation.",
    descriptor: "AI Orchestration · Python/FastAPI Microservice · Vector RAG",
    problem:
      "Enterprises struggle to securely ground large language models in proprietary business documents while enforcing strict workspace data isolation, role-based controls, and voice interactions.",
    systemSummary:
      "Architected a decoupled microservices architecture uniting a Laravel business API, a high-performance Python/FastAPI RAG engine, and a modern React operational UI.",
    roleIntro:
      "Full-Stack Architect & AI Lead: Designed decoupled microservices, FastAPI RAG vector pipelines, and workspace-scoped access control.",
    roleBullets: [
      {
        label: "Microservices",
        text: "Decoupled Laravel business engine from Python/FastAPI AI compute microservice.",
      },
      {
        label: "Vector RAG",
        text: "Built document chunking, embeddings, and Pinecone vector search scoped per business workspace.",
      },
      {
        label: "Voice Pipelines",
        text: "Integrated Whisper STT and ElevenLabs/OpenAI TTS for real-time speech interaction.",
      },
      {
        label: "Workspace RBAC",
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
        desc: "Chunking, embedding, and vector retrieval grounded in workspace-scoped Pinecone indexes.",
      },
      {
        num: "03",
        title: "Multimodal Voice Pipelines",
        desc: "Real-time speech-to-text (Whisper) and text-to-speech (ElevenLabs) conversational engine.",
      },
      {
        num: "04",
        title: "Workspace-Scoped RBAC & Webhook Routing",
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

export { caseStudiesData };
