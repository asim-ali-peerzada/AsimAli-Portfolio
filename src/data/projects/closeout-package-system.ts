export const closeoutPackageSystem = {
  title: 'Close-Out Package (COP) System',
  badge: 'Production · Enterprise',
  description:
    'Telecom construction management platform automating Verizon-format PDF deliverables, multi-stage photo workflows, GPS verification, and manager approval gates.',
  niche:
    'Telecom Infrastructure Construction & Automated Close-Out Package (COP) Generation',
  image: '/images/cop/cover.png',
  tags: ['Chunked Uploads', 'PDF Pagination', 'Scoped RBAC', 'Workflows'],
  // Full list shown as "Core capabilities" on the case-study header. `tags`
  // above is the short set used on the home-page project card.
  coreCapabilities: [
    'Chunked Uploads',
    'PDF Pagination',
    'Scoped RBAC',
    'Approval Workflows',
  ],
  slug: 'close-out-package-system',
  // Set the real year(s) before publishing, e.g. "2025" or "2025 - 2026".
  // Left blank on purpose: an unverified date on a public CV is worse than none.
  // Repo commit history is a starting point, not the answer - confirm with the user.
  year: "",
  overview:
    'An enterprise telecom construction platform for managing Verizon cell-site close-out documentation from field capture to customer delivery. It brings staged photo collection, GPS verification, manager approvals, document revisions, and automated PDF generation into a single workflow, replacing manual package assembly with a traceable, approval-driven process.',
  problem:
    'Telecom cell-site construction teams manually assembled hundreds of site photos and compliance checklists into client-specific PDFs. Disconnected field capture led to unverified photo locations, inconsistent document revisions, and prolonged approval delays before client submission.',
  solution:
    'Engineered the deterministic pagination engine that replaced browser-driven page breaks, the four-phase resumable media upload protocol, and the relationship-scoped policy layer governing what each role can see across the package lifecycle. Included queue isolation so a burst of PDF renders cannot starve application work.',
  // Short display values for the case-study header. The long-form `role`
  // paragraph stays for the "What I built" section.
  roleTitle: "Backend Engineer",
  platform: "Telecom Field Operations Platform",
  role: 'Full Stack Developer across the domain modules, the headless-Chromium rendering pipeline and the policy layer governing what each role can see. Built the server-side pagination engine that replaced browser reflow, designed the four-phase resumable upload protocol, and wrote the adversarial authorization probe that surfaced six real defects including three cross-role privilege escalations.',
  highlights: [
    'Format-Exact PDF Engine: Algorithmic pagination computing page counts across checklists, category tables, and 2×2 photo grids rendered via headless Chromium.',
    'Sequential Workflow State Machine: Three-stage sequential advancement with draft autosave, rejection rework loops, and multi-table transactional seeding.',
    'Verifiable Photo Pipeline: GPS capture with EXIF rational fallback, server-side HEIC-to-JPEG conversion, client canvas compression, and immutable slot replacement chains.',
    'Approval Readiness Gate: Multi-rule programmatic report validating required site info, photo counts, and checklist responses before allowing final sign-off.',
    'Transactional Email with Idempotency: Brevo API integration via custom notification channels with unique idempotency keys preventing duplicate sends on retries.',
    '4-Tier Queue Topology: Isolated Horizon supervisors dedicating separate resource limits to CPU-heavy PDF generation, fast emails, and background events.',
  ],
  screenshots: [
    '/images/cop-v2/screenshot-rocks (28).webp',
    '/images/cop-v2/screenshot-rocks (12).webp',
    '/images/cop-v2/screenshot-rocks (27).webp',
    '/images/cop-v2/screenshot-rocks (18).webp',
    '/images/cop-v2/screenshot-rocks (22).webp',
    '/images/cop-v2/screenshot-rocks (13).webp',
    '/images/cop-v2/screenshot-rocks (23).webp',
    '/images/cop-v2/screenshot-rocks (25).webp',
    '/images/cop-v2/screenshot-rocks (20).webp',
    '/images/cop-v2/screenshot-rocks (21).webp',
    '/images/cop-v2/screenshot-rocks (15).webp',
    '/images/cop-v2/screenshot-rocks (26).webp',
    '/images/cop-v2/screenshot-rocks (24).webp',
    '/images/cop-v2/screenshot-rocks (19).webp',
    '/images/cop-v2/screenshot-rocks (14).webp',
    '/images/cop-v2/screenshot-rocks (16).webp',
    '/images/cop-v2/screenshot-rocks (17).webp',
  ],
};
