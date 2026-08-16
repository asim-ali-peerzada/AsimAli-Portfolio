export const closeoutPackageSystem = {
  title: 'Close-Out Package (COP) System',
  description:
    'Telecom construction management platform automating Verizon-format PDF deliverables, multi-stage photo workflows, GPS verification, and manager approval gates.',
  niche:
    'Telecom Infrastructure Construction & Automated Close-Out Package (COP) Generation',
  image: '/images/cop/388shots_so.png',
  tags: ['Browsershot PDF', 'Workflow Automation', 'GPS / EXIF', 'Horizon Queues'],
  slug: 'close-out-package-system',
  services: [
    'Modular Monolith Architecture',
    'Automated PDF Document Engine',
    'Multi-Stage Sequential Workflows',
    'SSO Identity & User Synchronization',
  ],
  industry: ['Telecom Infrastructure', 'Construction Management'],
  timeFrame: '16 Weeks',
  overview:
    'A modular monolith platform engineered for telecom infrastructure construction. The system replaces manual close-out package assembly with a strictly governed field-capture workflow, rule-based manager approvals, and automated headless-Chromium PDF generation matching Verizon deliverable standards.',
  problem:
    'Telecom cell-site construction teams manually assembled hundreds of site photos and compliance checklists into client-specific PDFs. Disconnected field capture led to unverified photo locations, inconsistent document revisions, and prolonged approval delays before client submission.',
  solution:
    'Architected a 13-domain modular monolith combining a 3-stage sequential field capture engine (Pre-Construction → Construction → Post-Completion) with GPS/EXIF verification, an automated approval readiness gate, and an isolated Browsershot queue supervisor that renders format-exact Close-Out Package PDFs with revision ledgers.',
  role: 'Full-Stack Software Architect & Lead Backend Engineer. Designed the 13-domain modular monolith from scratch, established the action/DTO architecture, built the Browsershot PDF layout engine, integrated bidirectional HMAC SSO synchronization, and implemented 455 automated test cases with PHPStan level-max type safety.',
  highlights: [
    'Format-Exact PDF Engine: Algorithmic pagination computing page counts across checklists, category tables, and 2×2 photo grids rendered via headless Chromium.',
    'Sequential Workflow State Machine: Three-stage sequential advancement with draft autosave, rejection rework loops, and multi-table transactional seeding.',
    'Verifiable Photo Pipeline: GPS capture with EXIF rational fallback, server-side HEIC-to-JPEG conversion, client canvas compression, and immutable slot replacement chains.',
    'Approval Readiness Gate: Multi-rule programmatic report validating required site info, photo counts, and checklist responses before allowing final sign-off.',
    'Transactional Email with Idempotency: Brevo API integration via custom notification channels with unique idempotency keys preventing duplicate sends on retries.',
    '4-Tier Queue Topology: Isolated Horizon supervisors dedicating separate resource limits to CPU-heavy PDF generation, fast emails, and background events.',
  ],
  keyTakeaway:
    'Critical enterprise deliverables require strict architectural boundaries. Isolating CPU-intensive Chromium PDF rendering into dedicated queue tiers while enforcing sequential workflow state machines ensures predictable system performance and zero data corruption.',
  tools: [
    'Laravel 12 (PHP 8.2)',
    'React 18 (Inertia.js v2)',
    'Headless Chromium (Browsershot)',
    'Redis & Laravel Horizon',
    'MySQL 8',
    'Tailwind CSS',
    'AuthCenter SSO (HMAC-SHA256)',
    'Brevo Transactional Email',
  ],
  screenshots: [
    '/images/cop/388shots_so.png',
    '/images/cop/230shots_so.png',
    '/images/cop/316shots_so (1).png',
    '/images/cop/386shots_so.png',
    '/images/cop/833shots_so.png',
    '/images/cop/871shots_so.png',
  ],
};
