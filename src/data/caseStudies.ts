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
  /**
   * Captions parallel to `project.screenshots`, by index. The image paths
   * already live on the project; restating them here only created a second
   * place to keep in sync.
   */
  captions?: string[];
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
        text: "Reworked PDF generation for 300+ image packages — ~6× the previous 45–50 baseline, no hard photo cap. Replaced browser-driven page breaks with server-side budgeting in PHP: an 880px content box, four photos and twelve site details per page, thirty picture categories per page, checklist rows tiered by label length — so the renderer knows what page N holds before Chromium starts. That budget exposed a real integrity bug: page count was an unsignedTinyInteger, so a 1,000-photo package silently overflowed past 255 pages. Rendering is isolated on a supervisor capped at 2 processes and 512 MB, photos normalise to a 1200px JPEG that never upscales, and a decode failure falls back to the original file rather than failing a customer deliverable.",
      },
      {
        label: "Reliable bulk media uploads",
        text: "Field batches run to hundreds of photos over cellular, and one monolithic request can’t survive a tunnel, a signal drop or a mid-batch navigation. So I built the four-phase protocol — initiate, chunk, finalize, abort — rather than assume a library covered those failure modes. Authentication is a stateless HMAC-SHA256 token (no session row can half-authenticate an upload). Duplicate chunks are idempotent, out-of-order arrival is tolerated through zero-padded filenames, finalization is row-locked, and a full disk returns 507 rather than a stack trace. Failed processing keeps its chunks so the retry can succeed.",
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
        text: "Four roles see the same objects at different lifecycle stages, so authorization was a design problem rather than a CRUD one: each ability resolves role, relationship scope and workflow state together. An open customer feedback round is the customer's private draft \u2014 staff see nothing at all, not even image counts, so nobody can watch a customer compose a review. I then wrote a 48-case adversarial probe from the domain rules before reading my own implementation; it surfaced six real defects, three of them cross-project / cross-customer scope holes where one customer could withdraw another's message.",
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
    captions: [
      "Portfolio health at a glance — in-progress, fully approved and needing review counts, plus the project-health gauge, past-due markers and an attention queue. Counters are aggregated server-side rather than issued as one query per tile.",
      "Every site across the portfolio with status, progress, close-out package count and assigned crew, filterable by status, market, package stage and sort order.",
      "A close-out template is configuration, not code: per-stage sections, picture categories with required counts, and checklist items that may request an explanation or permit N/A. Field teams assemble against this structure instead of a fixed document.",
      "Customer and engineer hierarchy, per-role media quotas, outbound email configuration and market management — the controls that scope the whole platform.",
      "All close-out packages generated for one site, each an independent revision that can be opened, submitted or deleted without touching the others.",
      "The centre of the product: stage timeline, document collections, site photo, site information, and an attention queue surfacing unresolved construction issues.",
      "Phase completion across pre-construction, construction and post-completion, alongside the revision ledger recording every approval, discard and draft for audit.",
      "Post-completion site photography with per-image annotations, captured under the phase that produced it.",
      "Statements of work moving through draft, awaiting-review, published and archived, with revision counts on each.",
      "Drawing boxes, arrows and labels directly over a site photograph so the note points at the hardware it refers to rather than describing it in prose.",
      "Reusable field media with per-item processing and tagging state, quota tracking and duplicate suppression.",
      "Construction issues logged by type with assignee, target date and resolution state, each carrying an internal or customer-facing visibility flag.",
      "Section-level comment threads against a package, each moving through pending, acknowledged and resolved, with attachments.",
      "The customer-facing view, granted per project: package status, their own review queue and project progress without exposing internal notes.",
      "Change orders grouped by job with line items, billed versus absorbed totals, and draft / sent / approved state recorded against a sent-at timestamp.",
      "Delivery as a governed queue rather than a side effect: send now, schedule, cancel, resend and retry, with suppressed sends retained as audit rows.",
      "Assigned crew with elapsed timers plotted against the site, and technician contact details for operational coordination.",
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
      sub: "Vite 7 \u00b7 Tailwind CSS \u00b7 Axios Chunked Upload Client",
    },
    api: {
      title: "Laravel 12 Modular Monolith",
      sub: "22 Domain Modules \u00b7 26 Policies \u00b7 Action & DTO Architecture",
    },
    services: [
      {
        title: "Deterministic PDF Engine",
        desc: "Two Chromium drivers behind one renderer, with chunked pagination and server-side merging",
      },
      {
        title: "Resumable Media Pipeline",
        desc: "Stateless HMAC-SHA256 upload tokens, 5 MB chunks, quota enforcement and async conversion",
      },
      {
        title: "Authorization & User Sync",
        desc: "26 domain policies plus an AuthCenter user sync signed with HMAC-SHA256",
      },
    ],
    data: {
      title: "Persistence & Storage",
      items: [
        "Relational Database (107 Migrations)",
        "Redis-Backed Queue (77 Queued Jobs)",
        "Private Disk for Versioned Package PDFs",
      ],
    },
    external: {
      title: "Third-Party & Integrations",
      items: [
        "Samsung AuthCenter SSO (HMAC-SHA256 Signed User Sync)",
        "Queue-Backed Transactional Email",
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
        label: "Hierarchical RBAC & Set-Diff Territory Propagation",
        text: "Engineered TerritoryPropagationService and TerritoryAccessService across a 7-tier sales hierarchy (Profile::getDescendantIds BFS traversal with cycle protection) — granting company, state, and city access down reporting subtrees and executing transactional set-diff cascade revocations when a manager's territory changes.",
      },
      {
        label: "Cascade Budget & Revenue Target Engine",
        text: "Built CompanyTargetService and UserTargetService to allocate global and regional revenue buckets down the org chart without double-counting redistributions, enforcing consumed-budget deletion guards, bottom-up subtree cascade deletes, and TargetObserver audit trails.",
      },
      {
        label: "Race-Free Quote-to-Order & PDF Pipeline",
        text: "Designed a two-stage manager approval workflow (PipelinePolicy, SalesQuotePolicy) that converts multi-line sales quotes into orders, acquires a Cache::lock atomic mutex for year-aware sequential quote numbering, renders Dompdf A4 documents, and emails ZIP-batched attachments (>5 PDFs) via DB-configured SMTP.",
      },
      {
        label: "20K+ Row Bulk Import & Quarantine Pipeline",
        text: "Built CompanyContactController::importRecords using FastExcel with 1,000-row chunked inserts and in-memory company/contact pre-fetch caches to eliminate per-row N+1 queries — normalizing US phones, inferring missing states from a 200+ area-code map, and quarantining incomplete rows behind a global Eloquent scope.",
      }
    ],
    capabilities: [
      {
        num: "01",
        title: "Territory-Scoped Access",
        icon: "MapPin",
        desc: "Granular company/state/city grants that aggregate up the reporting hierarchy and revoke from the entire subtree inside one transaction.",
      },
      {
        num: "02",
        title: "Target Allocation Engine",
        icon: "Layers",
        desc: "Cascade revenue-target allocation (global → regions → users) with double-spend prevention, downline protection, and consumed-target deletion guards.",
      },
      {
        num: "03",
        title: "Quote → PDF → Email",
        icon: "FileCheck2",
        desc: "Two-stage approval, race-free sequential quote numbering under a cache lock, branded Dompdf generation, and ZIP-batched emailing.",
      },
      {
        num: "04",
        title: "Hierarchy-Driven Authorization",
        icon: "FolderTree",
        desc: "Cycle-safe, depth-capped recursive org tree powering query scopes, policies, and per-role pipeline visibility — reorganizations take effect instantly.",
      },
      {
        num: "05",
        title: "SSO & User Synchronization",
        icon: "ShieldCheck",
        desc: "Token-exchange SSO plus bidirectional HMAC-SHA256 user provisioning with AuthCenter, retried via queued jobs with backoff.",
      },
      {
        num: "06",
        title: "High-Volume Bulk Import",
        icon: "Images",
        desc: "Chunked bulk inserts with pre-fetch caches, phone normalization, US state inference, and a follow-up duplicate-resolution flow.",
      },
    ],
    layout: "showcase",
    captions: [
      "The landing view is the pipeline, not a menu: quoted pipeline amount, approval count and non-response count sit side by side, with quarterly velocity and a yearly sales trend underneath.",
      "Every quote starts here - a register of TR numbers, project names, ISO PO references and submission state, with create and import on the same screen.",
      "Each quotation is allocated across owners and tracked through its pipeline status, so a stalled deal is visible on the row instead of inferred later.",
      "Generated Sales is scoped by sales person and department over a date range, with each row carrying its own approved-on date - so what counted as closed is per-row evidence, not an assumption.",
      "Opportunity value, quoted pipeline volume and approval state, with sales compared across periods and a monthly pipeline summary below.",
      "Targets are allocated per user with quota, total target, achieved and who created it - the allocation engine exposed as a table you can audit.",
      "Allocation cascades down a hierarchy - corporate to sales manager to each rep - and the diagram shows what each level hands down before anything is committed.",
      "The same structure rendered as the org itself, which is what authorization reads: a user's reach is the subtree they sit in.",
      "User's Profile is a directory of people, not accounts: each row carries the role, the client companies joined and the companies they are permitted to see. Access is a per-user property you can read at a glance.",
      "Territory Rules are the mechanism behind that scoping. A rule is a three-level path - Company, then States, then Cities - so a rep's reach is declared as data, editable per user, instead of being implied by their role.",
      "Contacts carry their main territory and territory manager on the row, so ownership is never guessed from a name.",
      "Contact import maps each column of the uploaded file to a database field before a single row is written, and the irreversible-action confirmation makes the operator check the mapping rather than trust it. This is the step that stops a bad spreadsheet from becoming bad data.",
      "Companies are onboarded by invitation, with New Request, In Process, Rejected and Invitation Sent as separate queues - a rejected company is a state you can see, not a silence.",
      "The company list carries messaging inline, so a conversation about an account stays attached to it.",
      "Follow-ups split into Upcoming and Past with the customer's type, full name, email and phone on each row - the reminder and the record are the same screen.",
      "Calls, SMS, Teams and WhatsApp are logged per contact with the delivery outcome - Call Connected, SMS Delivered, Teams Replied.",
      "Action items carry title, description, assignee and status, with a board and a done view over the same records.",
      "One rep's profile: consumption goal, assigned manager, territory and their history - goal and performance on the same screen.",
      "The activity log records what each user did, which module, the query issued, the IP and the device - an audit trail you can read rather than reconstruct.",
    ],
    showcaseGroups: [
      { label: "Pipeline & quotes", items: [1, 2, 3, 4] },
      { label: "Targets & hierarchy", items: [5, 6, 7] },
      { label: "Territory & accounts", items: [9, 8, 10, 11, 12, 13] },
      { label: "Follow-up & communication", items: [14, 15, 16] },
      { label: "Users & access", items: [18, 17] },
    ],
    diagram: {
    client: {
      title: "React 18 SPA (TypeScript)",
      sub: "Vite \u00b7 Tailwind CSS \u00b7 Material UI \u00b7 Recharts",
    },
    api: {
      title: "Laravel 11 REST API",
      sub: "Resource Controllers \u00b7 5 Policies \u00b7 Sanctum Tokens",
    },
    services: [
      {
        title: "Territory Propagation",
        desc: "Grants aggregate up the reporting hierarchy and revoke across the subtree in one transaction",
      },
      {
        title: "Race-Free Quote Numbering",
        desc: "Sequential quote numbers issued under a cache lock so two requests cannot collide",
      },
      {
        title: "Chunked Contact Import",
        desc: "1,000-row chunks with phone normalisation, US state inference and duplicate resolution",
      },
    ],
    data: {
      title: "Persistence & Storage",
      items: [
        "Relational Database (117 Migrations)",
        "Database-Backed Queue (7 Queued Jobs)",
        "Database Cache & Session Store",
      ],
    },
    external: {
      title: "Third-Party & Integrations",
      items: [
        "AuthCenter SSO (Token-Exchange Provisioning)",
        "Transactional Email API",
        "Pusher Real-Time Updates",
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
        label: "Custom OAuth 2.0 + PKCE & RS256 JWT Engine",
        text: "Built a protocol-level authorization server (OAuth2Controller, JwtService) without third-party OAuth server packages — implementing 10-minute cache-held authorization codes with PKCE (S256) verification, asymmetric RS256 JWT signing, SHA-256 hashed refresh token rotation, and instant logout via a MySQL JTI blacklist (CheckJwtBlacklist).",
      },
      {
        label: "TOTP Two-Factor Auth & Account Hardening",
        text: "Implemented Google Authenticator 2FA (TwoFactorAuthService) with QR SVG provisioning, encrypted secret storage, system-wide 2FA enforcement toggles, progressive failed-attempt lockouts (AuthAttemptService, locked_until), and signed-URL email verification.",
      },
      {
        label: "Cross-App Provisioning & Approval Workflows",
        text: "Designed AccessRequestController and AccessAdminController to gate per-domain membership across 7 internal applications — automatically granting parent/sub-domain permissions on approval, propagating HMAC-SHA256 signed user updates (PropagateUserUpdateToDomains), and tracking two-way activation webhooks (external_active_status).",
      },
      {
        label: "Memory-Bounded Telecom Site Excel Ingestion",
        text: "Engineered ProcessSiteExcelJob and ProcessHubExcelJob to ingest 200-column telecom site spreadsheets — pre-converting Excel to CSV with frozen formulas, staging rows in batches, upserting on site_name with per-row error capture, and driving adaptive frontend polling via observer-invalidated cache keys.",
      }
    ],
    capabilities: [
      {
        num: "01",
        title: "Centralized Identity Hub",
        icon: "Layers",
        desc: "Single-source-of-truth authentication serving independent web applications and services.",
      },
      {
        num: "02",
        title: "Zero-Trust 2FA Security",
        icon: "ShieldCheck",
        desc: "Google Authenticator TOTP implementation with secure recovery workflows and rate limiting.",
      },
      {
        num: "03",
        title: "Cross-Domain Token Sync",
        icon: "FolderTree",
        desc: "Cryptographically signed JWT sessions with instant revocation and cross-app token validation.",
      },
      {
        num: "04",
        title: "Approval-Based Access",
        icon: "FileCheck2",
        desc: "Self-service domain access request pipeline with admin moderation and audit logging.",
      },
      {
        num: "05",
        title: "Bulk Data Processing",
        icon: "Images",
        desc: "Queue-driven Excel ingestion engine processing thousands of site records in the background.",
      },
          {
        num: "06",
        title: 'Rate Limiting & Brute-Force Lockouts',
        icon: 'ShieldCheck',
        desc: 'Progressive failed-attempt lockouts, 2FA enforcement toggles, and signed-URL email verification gate token issuance and account access.',
      },
],
    layout: "showcase",
    captions: [
      "The entry point: choose one of the connected enterprise applications and the hub tells you whether you already have access or need to request it.",
      "The control plane — registered users, inactive admins, active applications, live session count and a recent-activity feed in one view.",
      "Pending access requests with the recipient admin, the requested scope, and approve or deny on the row; a partially granted request stays restricted rather than being widened silently.",
      "The application registry: every connected application with its detail view, its own entry point, and per-application configuration.",
      "Where the access model actually lives — two-factor authentication as a system-wide control, and a per-user, per-application Grant or Revoke decision.",
    ],
    showcaseGroups: [
      { label: "Access requests", items: [2] },
      { label: "Applications & settings", items: [3, 4] },
      { label: "Analytics", items: [1] },
    ],
    diagram: {
    client: {
      title: "React 18 Admin Portal",
      sub: "Vite 7 \u00b7 Tailwind CSS \u00b7 Material UI",
    },
    api: {
      title: "Laravel 12 Auth Service",
      sub: "OAuth 2.0 Authorization Server \u00b7 RS256 Signing",
    },
    services: [
      {
        title: "OAuth 2.0 + PKCE",
        desc: "Authorization code flow with mandatory S256 challenge on every public client",
      },
      {
        title: "Token Lifecycle",
        desc: "RS256-signed access tokens with a refresh flow and a revoked-JWT denylist keyed by JTI",
      },
      {
        title: "Cross-Domain Sync",
        desc: "Internal endpoints authenticated by HMAC-SHA256 for bidirectional user provisioning",
      },
    ],
    data: {
      title: "Persistence & Storage",
      items: [
        "Relational Database (43 Migrations)",
        "Revoked-JWT Denylist (RS256 JTI)",
        "Database-Backed Queue (12 Queued Jobs)",
      ],
    },
    external: {
      title: "Third-Party & Integrations",
      items: [
        "TOTP / Google Authenticator (2FA)",
        "Transactional Email API",
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
        label: "BFS Graph-Aware ABAC Authorization",
        text: "Engineered a pure-function permission evaluator (FamilyAccessMatrix) backed by breadth-first graph traversal (GraphContextService) — resolving 5 collaborator roles against a user's exact ancestor/descendant/spouse position in the family tree to compute scoped branch edit rights without per-node DB queries.",
      },
      {
        label: "Multi-Archive Search & Idempotent OCR Pipeline",
        text: "Built UnifiedSearchService to query local records, the US National Archives (NaraClient), and OpenArchClient in parallel — feeding retrieved documents into an idempotent OcrOrchestrationService (Tesseract OCR + Google Gemini AiExtractionService) that extracts structured person/relationship entities with page-level deduplication.",
      },
      {
        label: "Multi-Signal Identity Matching & GEDCOM Engine",
        text: "Implemented MatchingService and SimilarityEngine using weighted statistical scoring across normalized names, dates, locations, and gender to power a claim-and-approve profile linking workflow, paired with queued GEDCOM import/export (GedcomImportService) and fingerprint-based duplicate detection.",
      },
      {
        label: "Gateway-Agnostic Billing & Real-Time Chat Service",
        text: "Designed a PaymentGatewayInterface abstraction unifying Stripe (Laravel Cashier) and PayPal subscription lifecycles, storage quotas, and webhook synchronization, alongside a dedicated Pusher-backed chat-service handling 1-on-1/group messaging and support tickets via an internal API proxy.",
      }
    ],
    capabilities: [
      {
        num: "01",
        title: "Graph-Aware ABAC & Branch Isolation",
        icon: "FolderTree",
        desc: "Five-tier attribute-based access control that resolves each user's editable branch scope by breadth-first traversal of the family graph.",
      },
      {
        num: "02",
        title: "OCR Record Extraction",
        icon: "FileDiff",
        desc: "Automated image-to-text pipeline parsing historical death certificates, census logs, and deeds.",
      },
      {
        num: "03",
        title: "Intelligent Entity Matching",
        icon: "Layers",
        desc: "Fuzzy-matching algorithms correlating discovered archives with existing tree nodes.",
      },
      {
        num: "04",
        title: "Real-Time Collaborative Trees",
        icon: "MessagesSquare",
        desc: "Pusher-powered live editing allowing multiple family members to explore and update records.",
      },
      {
        num: "05",
        title: "Archival API Connectors",
        icon: "LayoutTemplate",
        desc: "Direct integrations with public archives (NARA, OpenArch) for automated source verification.",
      },
          {
        num: "06",
        title: 'GEDCOM Import & Export Pipelines',
        icon: 'FolderTree',
        desc: 'Queued GEDCOM ingestion and export with fingerprint-based duplicate detection and claim-and-approve profile linking.',
      },
],
    layout: "showcase",
    captions: [
      "The public entry point: one promise, one search box, and the two ways in - start your own tree, or find an existing one to connect to.",
      "A new account has no tree yet, so the empty state says exactly that and offers the upload path instead of rendering a blank canvas.",
      "Once populated, the dashboard carries the scale - total families, people tracked, birthdays today - then surfaces the lineages with the least coverage and the lost-lineage search that fills them.",
      "The tree renders from the graph itself: parent and child links drawn as connectors, every node typed, and the whole subtree navigable rather than paginated.",
      "Life Journey turns recorded places into a route - destination count and date range across the top, the chronology down the side, and each entry pinned on the map.",
      "Matching returns ranked candidates, not a verdict: records found, repositories searched, the birth window they fall in, and a stated match quality you are free to disagree with.",
      "Accepting a candidate keeps its provenance - archive, archive organisation, record ID - and the scanned pages stay one click away, so a claim is never just a name sitting in a tree.",
      "GEDCOM import and export in the standard 5.5.1 format, so records move in and out and this platform is not the only way to read them.",
      "The album is scoped to a family tree and metered against a vault quota, with photos, video and documents as first-class members alongside the people.",
      "Access is four declared tiers - Viewer through Super User - defined by what each may add and how far up the generations they may edit, with the trees they can see selected at invite time.",
    ],
    showcaseGroups: [
      { label: "From sign-up to a populated tree", items: [1, 2, 3] },
      { label: "Finding people and proving them", items: [4, 5, 6] },
      { label: "Memories, import & shared access", items: [7, 8, 9] },
    ],
    diagram: {
    client: {
      title: "React 19 SPA (TypeScript)",
      sub: "Vite \u00b7 Tailwind CSS \u00b7 Interactive Lineage Canvas",
    },
    api: {
      title: "Laravel 12 REST API",
      sub: "Branch-Scoped Authorization \u00b7 8 Policies",
    },
    services: [
      {
        title: "Graph-Aware Access Matrix",
        desc: "Five roles evaluated against the branch a caller sits in, not a flat role table",
      },
      {
        title: "Lineage Traversal",
        desc: "Breadth-first graph context so ancestors and descendants resolve from one traversal",
      },
      {
        title: "Record Extraction",
        desc: "OCR pipelines over scanned pages, surfaced with their source and confidence",
      },
    ],
    data: {
      title: "Persistence & Storage",
      items: [
        "Relational Database (135 Migrations)",
        "Branch-Scoped Record Store",
        "Database-Backed Queue (21 Queued Jobs)",
      ],
    },
    external: {
      title: "Third-Party & Integrations",
      items: [
        "Archival Record APIs (NARA / OpenArch)",
        "Object Storage for Scans & Media",
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
        label: "17-Table Multi-Snapshot Aggregation Engine",
        text: "Built ReportSubmissionService and LocationIntelligenceService to ingest field-agent block surveys across 17 normalized snapshot tables — computing mode-based statistical aggregates for market velocity, demand, supply, and rental yield across property categories.",
      },
      {
        label: "Weighted Decision-Intelligence & Comparison Scoring",
        text: "Engineered ComparisonIntelligenceService to evaluate up to 4 locations side-by-side — combining infrastructure matrices, amenity weights, and price trends into a 0–100 composite investment score with confidence ratings and human-readable recommendation signals.",
      },
      {
        label: "4-Role Moderation & OTP Partner Governance",
        text: "Implemented role-gated workflows across Admin, Partner, Field Agent, and Public tiers — featuring email OTP verification and admin approval gates for territory partners, client-side draft auto-sync for field surveys, and PulseModerationController verification queues.",
      },
      {
        label: "Tag-Aware Cache Invalidation & Investor Dossiers",
        text: "Built SupportCache with event-driven cache busting across location/block mutations (automatically adapting between tagged caching and key-based database fallbacks) and engineered an automated Dompdf investor dossier generator for property comparisons.",
      }
    ],
    capabilities: [
      {
        num: "01",
        title: "4-Role Governance Workflow",
        icon: "ShieldCheck",
        desc: "Structured pipeline (Admin, Partner, Agent, Public) enforcing strict data verification.",
      },
      {
        num: "02",
        title: "Market Pulse & Price Snapshots",
        icon: "Layers",
        desc: "Analytics engine calculating price trends, infrastructure scoring, and area valuation indexes.",
      },
      {
        num: "03",
        title: "Property Comparison Engine",
        icon: "FileDiff",
        desc: "Side-by-side geospatial and feature comparison across housing societies and phases.",
      },
      {
        num: "04",
        title: "Lead Routing & CRM",
        icon: "MessagesSquare",
        desc: "Integrated inquiry tracking routing investor leads directly to verified territory partners.",
      },
      {
        num: "05",
        title: "Automated PDF Dossiers",
        icon: "FileCheck2",
        desc: "High-fidelity dynamic investment report generation for clients and institutional buyers.",
      },
          {
        num: "06",
        title: 'Excel Portfolio Bulk Import',
        icon: 'LayoutTemplate',
        desc: 'Bulk import of whole society portfolios from Excel or CSV, with verification queues and moderation before downstream reads.',
      },
],
    layout: "showcase",
    captions: [
      "The field agent's home view: location context, market pulse and the infrastructure audit for the property currently in view, gathered into one report instead of scattered across screens.",
      "Compare Properties puts two societies side by side - block, price, possession and infrastructure metrics in the same column order, so a difference is a column and not a judgement call.",
      "Report Audit is what an agent submits: market pulse values, society intelligence, nearby landmarks, developer and legal profile, and property financials, all keyed to the agent's verified identity.",
      "Intelligence Reports is the review surface - every submitted report with its location, status and author, and the option to generate an insight for a sheet.",
      "The Moderation Control Center is where unverified data stops: each item sits in a confirmed, approved, rejected or pending state, and nothing downstream reads it until it leaves the queue.",
      "Society Management, with bulk import from Excel or CSV for onboarding a whole portfolio without hand-entering it.",
      "Builders & Developers ties properties back to the developer, so the comparison engine can reason about a builder rather than an address.",
      "Lead/Command Center moves an investment enquiry through new, contacted and warm, so routing is a state change rather than a spreadsheet.",
      "User Management separates roles and keeps invitation state visible per row.",
    ],
    showcaseGroups: [
      { label: "Market intelligence", items: [1, 2] },
    ],
    diagram: {
    client: {
      title: "React SPA (TypeScript)",
      sub: "Vite \u00b7 Tailwind CSS \u00b7 TanStack Query",
    },
    api: {
      title: "Laravel REST API",
      sub: "Sanctum Tokens \u00b7 Spatie Role-Based Access",
    },
    services: [
      {
        title: "Moderation Workflow",
        desc: "Submitted market updates queue for review and are promoted only once approved",
      },
      {
        title: "Comparison Engine",
        desc: "Side-by-side property comparison across societies, phases and infrastructure metrics",
      },
      {
        title: "Lead & CRM Module",
        desc: "Investment enquiries routed through tracked statuses with interaction history",
      },
    ],
    data: {
      title: "Persistence & Storage",
      items: [
        "Relational Database (MySQL)",
        "Admin Verification Queue",
        "Portfolio Finance Records",
      ],
    },
    external: {
      title: "Third-Party & Integrations",
      items: [
        "PDF Report Generation (DomPDF)",
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
        label: "Unattended IMAP Ingestion & Dual Layout Parsers",
        text: "Built FetchVerizonEmailsJob (cache-locked 1-minute polling, message_id deduplication, raw .eml archival) and two resilient parsers — VerizonEmailParser (MIME boundary decoding, 30+ header and 15+ line-item column aliases) and WordHtmlParser (encoding normalization and junk-row filtering).",
      },
      {
        label: "Guarded Lifecycle State Machine & Conflict Resolution",
        text: "Designed a rank-ordered shipment lifecycle (Notice Received → In Transit → Received by GC → Missing Parts / At Warehouse → Installed / Transferred / Inside Company Van) enforced by ShipmentObserver and Form Requests, with locked_for_automation guards so background IMAP syncs never clobber manual user overrides.",
      },
      {
        label: "Out-of-Sequence Orphan, Split & Ledger Reconciliation",
        text: "Handled real-world telecom logistics edge cases in EmailAutomationService — creating flagged orphan stubs when shipment notices arrive before Engineering Orders (EOs), splitting records on new tracking numbers, and tracking 10 per-line quantity buckets (requested, shipped, received, installed, missing, transferred).",
      },
      {
        label: "Session-Safe SSE Real-Time Notifications & Media Gallery",
        text: "Built a Server-Sent Events (EventSource) notification stream in AdminNotificationController that explicitly releases PHP session locks before streaming (preventing FPM worker deadlocks), paired with a cursor-paginated proof-media gallery and encrypted runtime IMAP configuration.",
      }
    ],
    capabilities: [
      {
        num: "01",
        title: "IMAP Automated Ingestion",
        icon: "Mail",
        desc: "Direct mailbox connector fetching and extracting structured parts data from supplier emails.",
      },
      {
        num: "02",
        title: "State-Machine Lifecycle",
        icon: "Layers",
        desc: "7-stage finite state workflow tracking equipment from transit to installation and van transfers.",
      },
      {
        num: "03",
        title: "Item-Level Inventory Ledger",
        icon: "FileCheck2",
        desc: "Granular parts tracking monitoring quantities, serials, missing items, and technician usage.",
      },
      {
        num: "04",
        title: "Asynchronous Queue Pipelines",
        icon: "LayoutTemplate",
        desc: "Background workers handling heavy parsing and extraction without UI latency.",
      },
      {
        num: "05",
        title: "SSO & Governance Auditing",
        icon: "ShieldCheck",
        desc: "External Single Sign-On integration with full mutation history and anomaly alerts.",
      },
          {
        num: "06",
        title: 'Proof Media Gallery & Cursor Pagination',
        icon: 'Images',
        desc: 'Cursor-paginated proof-media gallery attached to shipment events, with FIFO thumbnail delivery and encrypted runtime IMAP configuration.',
      },
],
    layout: "showcase",
    captions: [
      "The control room answers the four questions that matter at a glance - total shipments, on route, needing attention, overdue - then lists what is active underneath. The snapshot refreshes, so the counters are never stale.",
      "A shipment resolves to an EO number with its routing legs, terms and the product it carries. Received quantity sits beside expected quantity and is correctable, and the correction is recorded rather than the row rewritten.",
      "The accessory drawer holds the full record - shipment type, shipment and delivery numbers, delivery location, installation date - above a line-item table of expected against received quantity.",
      "Evidence attaches to the shipment itself: media, images, documents and voice clips drop into the same drawer, so a disputed delivery has its paperwork sitting next to it.",
      "Inbound documents arrive as a Word or HTML export from the source system. Progress is visible and cancellable, and the file is optionally attached to a record with a reminder date.",
      "Every automated email is logged with delivered, delayed, opened and unopened counts, filterable by message, channel, sender and type, and exportable - a send that quietly failed cannot hide behind an inbox.",
      "SMTP credentials and the inbound email webhook are configured together, with a test send, so the ingestion path is proven before it is trusted.",
      "Users are managed as technicians, with per-row actions - user profile, reset password, export, delete - each behind its own confirmation.",
    ],
    showcaseGroups: [
      { label: "The shipment record", items: [1, 2, 3] },
      { label: "Getting data in", items: [4, 5, 6] },
      { label: "Access", items: [7] },
    ],
    diagram: {
    client: {
      title: "Operational Dashboard",
      sub: "Blade + Livewire \u00b7 Tailwind CSS \u00b7 Vite",
    },
    api: {
      title: "Laravel 12 REST + Mail Ingest",
      sub: "IMAP Polling \u00b7 Lifecycle State Machine",
    },
    services: [
      {
        title: "IMAP Ingestion",
        desc: "A mailbox poller classifies inbound notifications into typed shipment events",
      },
      {
        title: "Lifecycle State Machine",
        desc: "Nine explicit shipment states with guarded transitions between them",
      },
      {
        title: "Item-Level Ledger",
        desc: "Expected versus received quantity tracked per line, not per shipment",
      },
    ],
    data: {
      title: "Persistence & Storage",
      items: [
        "Relational Database (23 Migrations)",
        "Database-Backed Queue (2 Queued Jobs)",
        "Per-Line Quantity Ledger",
      ],
    },
    external: {
      title: "Third-Party & Integrations",
      items: [
        "IMAP Mailbox (Webklex)",
        "SMTP Relay for Status Notifications",
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
        label: "Hybrid Laravel + FastAPI Compute Architecture",
        text: "Separated operational workspace management, authentication, and webhook routing from AI compute by pairing a React 19 dashboard and administrative API with an asynchronous Python/FastAPI intelligence service.",
      },
      {
        label: "Workspace-Scoped Vector RAG Pipeline",
        text: "Built an end-to-end document ingestion pipeline that parses uploaded knowledge-base files, splits text into overlapping semantic chunks, generates vector embeddings, and executes metadata-filtered similarity queries against Pinecone scoped per workspace.",
      },
      {
        label: "Low-Latency Voice AI Pipeline (STT → RAG → TTS)",
        text: "Engineered a voice interaction pipeline chaining OpenAI Whisper speech-to-text transcription, context-injected LLM response generation grounded in retrieved vector chunks, and streaming text-to-speech synthesis for automated voice support.",
      },
      {
        label: "Omnichannel Webhook Routing & Guardrails",
        text: "Integrated Meta WhatsApp Cloud API, Instagram, and Facebook Messenger webhooks with signature verification, conversation-state tracking, confidence thresholds for human-agent handoff, and per-workspace usage metering.",
      }
    ],
    capabilities: [
      {
        num: "01",
        title: "Decoupled Microservices",
        icon: "Layers",
        desc: "Laravel core business engine paired with high-performance Python/FastAPI AI engine.",
      },
      {
        num: "02",
        title: "RAG Document Ingestion",
        icon: "LayoutTemplate",
        desc: "Chunking, embedding, and vector retrieval grounded in workspace-scoped Pinecone indexes.",
      },
      {
        num: "03",
        title: "Multimodal Voice Pipelines",
        icon: "MessagesSquare",
        desc: "Real-time speech-to-text (Whisper) and text-to-speech (ElevenLabs) conversational engine.",
      },
      {
        num: "04",
        title: "Workspace-Scoped RBAC & Webhook Routing",
        icon: "ShieldCheck",
        desc: "Strict data partitioning, workspace invitations, audit logging, and subscription billing.",
      },
      {
        num: "05",
        title: "Observability & Monitoring",
        icon: "FileDiff",
        desc: "Telemetry tracking token usage, vector query latency, and automated retry policies.",
      },
          {
        num: "06",
        title: 'Subscription Billing & Webhook State Sync',
        icon: 'MessagesSquare',
        desc: 'Per-workspace usage metering, subscription lifecycle handling, and inbound omnichannel webhook state tracking.',
      },
],
    layout: "showcase",
    captions: [
      "The public entry point states the product in one line - reduce workload, capture leads, run it on WhatsApp autopilot - then qualifies the claim: it answers questions instantly, captures leads automatically, and hands complex conversations to a person when they matter.",
      "The operator's view opens on the numbers that decide whether the automation is working: revenue attributed, conversation ability, funnel health out of five, and average response time, over a usage timeline you can bound by day, week, month or all time.",
      "The Brain is the retrieval layer. Uploaded documents are listed with their size and indexing state, so a file that has not been embedded yet is visible as such rather than silently answering from nothing.",
      "Documents is where the source material is managed - file, size, type, indexing status and chunk count per row - with storage usage shown against the plan limit and a downloadable usage report.",
      "Three channels, three independent connect states. Here WhatsApp Business is unconnected while Instagram Direct and Facebook Messenger are connected, which is the point: reach is assembled per channel rather than assumed.",
      "The inbox is where the pipeline becomes visible. A real conversation runs alongside the persona list and the contact profile, so what the assistant answered, and to whom, is readable without leaving the thread.",
      "Two-factor authentication, password changes and active sessions are managed from one place, with a single control to sign every device out.",
    ],
    showcaseGroups: [
      { label: "Knowledge & performance", items: [1, 2, 3] },
      { label: "Channels & conversations", items: [4, 5] },
      { label: "Workspace access", items: [6] },
    ],
    diagram: {
    client: {
      title: "React 19 Operations UI",
      sub: "Vite 7 \u00b7 TanStack Query \u00b7 Chat Workspace",
    },
    api: {
      title: "Laravel 12 Control Plane",
      sub: "Workspace-Scoped RBAC \u00b7 Webhook Routing",
    },
    services: [
      {
        title: "Retrieval Pipeline",
        desc: "Documents chunked and embedded, then queried with workspace-scoped metadata filters",
      },
      {
        title: "Inference Service",
        desc: "A Python FastAPI service handles the model work so the control plane stays in PHP",
      },
      {
        title: "Voice Pipeline",
        desc: "Speech-to-text in, retrieval and generation, speech-to-text out",
      },
    ],
    data: {
      title: "Persistence & Storage",
      items: [
        "Relational Database (Laravel Control Plane)",
        "Pinecone Vector Store (Namespace Isolation)",
        "Python FastAPI Inference Service",
      ],
    },
    external: {
      title: "Third-Party & Integrations",
      items: [
        "WhatsApp Business Cloud API",
        "Instagram & Facebook Messenger Webhooks",
        "Whisper STT \u00b7 OpenAI \u00b7 ElevenLabs TTS",
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
  "samsung-migration": {
    headlineSplit: ["SAMSUNG NETWORK", "MIGRATION & DIAGRAMS"],
    tagline:
      "Circuit paths in, a printable network topology out — and a record of which fields were derived rather than typed.",
    descriptor: "Telecom Infrastructure · Data Extraction · Performance",
    problem:
      "Circuit paths arrive as long, undocumented strings in several inconsistent formats, and migrating a site meant mapping hundreds of them to physical router ports by hand. The mapping was slow, error-prone, and left no record of which fields were derived rather than entered — so a mistake in the spreadsheet was indistinguishable from a deliberate value until it reached the field.",
    systemSummary:
      "A Laravel 12 API behind a React 19 front end. Uploaded port files are parsed asynchronously with a config-driven, priority-ordered regex engine that scores its own confidence and logs formats it cannot yet handle, so new variants are added as configuration rather than code. Extracted values cascade into a 48-field network record through three port-mapping services, each auto-set field recording its source, timestamp and user. A virtualized grid keeps the 42-column record set editable, and the same data renders as a colour-coded topology that exports to PDF and Excel or prints as physical labels.",
    roleIntro:
      "Full-Stack Engineer. Built the extraction pipeline and the port-mapping services that cascade derived values into a network record, designed the provenance tracking that records where every auto-set field came from, and built the React front end — the virtualized assignment grid and the topology renderer. Also built the print bridge that drives label printers from the browser.",
    roleBullets: [
      {
        label: "Extraction engine",
        text: "Config-driven regex patterns with priority ordering and confidence scoring, a fallback parser for unknown formats, and logging of anything unmatched so the pattern set grows from real data.",
      },
      {
        label: "Derived-field provenance",
        text: "Every value set by a rule records its source, timestamp and the user who triggered it, so automation is auditable rather than invisible.",
      },
      {
        label: "Front-end performance",
        text: "A 48-field, 42-column grid virtualized for scroll performance, with inline editing, deferred input state and optimistic saves.",
      },
      {
        label: "Hardware bridge",
        text: "A .NET service sitting between the browser and the printer SDK, authenticated to the API with a service token.",
      },
    ],
    capabilities: [
      {
        num: "01",
        title: "Circuit Path Extraction Engine",
        icon: "Layers",
        desc: "Priority-ordered, config-driven patterns that score each extraction for confidence, fall back to a secondary parser for unknown formats, and log what they could not parse so new variants are configuration rather than code.",
      },
      {
        num: "02",
        title: "Cascading Auto-Population",
        icon: "FolderTree",
        desc: "Editing one field derives the related ones through three mapping services, with each auto-set value recorded alongside its source, timestamp and user in a provenance column.",
      },
      {
        num: "03",
        title: "Virtualized Assignment Grid",
        icon: "FileDiff",
        desc: "A 42-column grid over large record sets, virtualized for scroll performance with inline editing, deferred input state and optimistic saves.",
      },
      {
        num: "04",
        title: "Port Mapping Intelligence",
        icon: "FileCheck2",
        desc: "Radio ports are deduplicated against an explicit removed-value sentinel, VDU quadrants assigned cyclically from the gNodeB ID, and circuit-path keywords mapped to their CA, BMC and OAM ports.",
      },
      {
        num: "05",
        title: "Cross-Stack Label Printing",
        icon: "LayoutTemplate",
        desc: "Browsers cannot drive a printer SDK directly, so a small .NET service sits between, authenticating to the API with a service token and driving the Brother SDK over COM interop.",
      },
          {
        num: "06",
        title: 'Label Printing & Deployment Provisioning',
        icon: 'FileCheck2',
        desc: 'JWT-secured .NET service bridging the browser to the Brother b-PAC SDK, with token refresh and deployment-state tracking for batch printing.',
      },
],
    layout: "showcase",
    captions: [
      "Projects are the unit of work, and the status column is honest — incomplete until the uploaded file has been parsed. Each project carries its own port files with size and timestamp.",
      "The parsed circuit path is the raw material: one row per port, with the full string, the access type and the equipment it terminates on. This is the messy text that has to become structured data.",
      "Scrolling across the same records shows what extraction produced — sector counts, small cell name, and the gNodeB and VDU node IDs pulled out of that path string, each scored for confidence at parse time.",
      "Port Assignment is a 42-column grid over 39 records, virtualized so editing stays responsive, with a Propagate First Row action that pushes one row's values across the rest.",
      "The diagram is the deliverable: the router chassis with its backhaul ports and colour-coded VDU quadrants laid out by the port assignment, exportable to PDF and Excel, and printable as physical labels from the browser.",
    ],
    showcaseGroups: [
      { label: "Extract: parsed records", items: [1, 2] },
      { label: "Map and visualize", items: [3, 4] },
    ],
    diagram: {
    client: {
      title: "React 19 SPA (Vite)",
      sub: "MUI 7 \u00b7 TanStack Table \u00b7 React Virtual",
    },
    api: {
      title: "Laravel 12 REST API",
      sub: "Queue Worker \u00b7 Sanctum Tokens \u00b7 AuthCenter SSO",
    },
    services: [
      {
        title: "Extraction Engine",
        desc: "Config-driven regex with priority ordering, confidence scoring and unknown-pattern logging",
      },
      {
        title: "Port Mapping",
        desc: "Three services derive radio ports and VDU quadrants from the extracted circuit data",
      },
      {
        title: "Print Bridge",
        desc: "A .NET service drives the label-printer SDK over COM interop on the app's behalf",
      },
    ],
    data: {
      title: "Persistence & Storage",
      items: [
        "Relational Database (21 Migrations)",
        "48-Field Network Record",
        "Auto-Population Provenance JSON",
      ],
    },
    external: {
      title: "Third-Party & Integrations",
      items: [
        "Samsung AuthCenter SSO (Code-Exchange Flow)",
        "Brother b-PAC SDK via .NET Print Bridge",
      ],
    },
    },
    challenge: {
      title: "",
      body: "",
      approach: "",
      decision: "",
      tradeoff: "",
    },
    outcomeParagraphs: [
      "The hard part of migrating telecom infrastructure was never storing the data — it was deriving it correctly and being able to prove, per field, whether a human or a rule produced it. Building the provenance trail alongside the automation is what makes the output safe to hand to a field crew.",
    ],
    techCategories: [],
  },
};

export { caseStudiesData };
