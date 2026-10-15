export const ccms = {
  title: 'CCMS — Enterprise Sales & CRM',
  badge: 'Production · Enterprise',
  description:
    'Production enterprise sales & client CRM with territory-based data isolation, manager-approved pipelines, cascade revenue targets, and quote-to-PDF workflows.',
  niche: 'Enterprise Sales & Client CRM',
  image: '/images/ccms/3-2.webp',
  // Capability tags — what this system does. Tech stack lives in `tools` below.
  // Keep 4-5 and short enough to render on a single line.
  tags: ['Territory RBAC', 'Approvals', 'Cascade Targets', 'Quote to PDF'],
  coreCapabilities: [
    'Territory RBAC',
    'Approvals',
    'Cascade Targets',
    'Quote to PDF',
  ],
  // (4 tags, single line — see Projects.tsx)
  slug: 'ccms',
  services: [
    'Enterprise CRM Development',
    'Role-Based Data Isolation',
    'Pipeline & Approval Workflows',
    'Quote-to-Order Automation',
  ],
  industry: ['CRM & Sales', 'Enterprise Operations'],
  timeFrame: '12 Weeks',
  // Set the real year(s) before publishing, e.g. "2025" or "2025 - 2026".
  // Left blank on purpose: an unverified date on a public CV is worse than none.
  // Repo commit history is a starting point, not the answer - confirm with the user.
  year: "",
  overview:
    'A production enterprise CRM for a hierarchical sales organization (Sales Rep → Manager → Director → VP → President → CFO → CEO), unifying client companies/accounts/contacts, territory-based data isolation, manager-approved sales pipelines, cascade revenue-target planning, and a quote-to-order document lifecycle with PDF generation and email — all synced with a company-wide SSO directory.',
  problem:
    'The organization tracked client records in manual spreadsheets, had no mechanism to isolate data by sales territory, routed leads by hand, and planned revenue targets without any enforcement that a manager could not over-allocate or double-spend budget down the reporting chain.',
  solution:
    'Engineered a Laravel + React (MUI) CRM where nearly every permission derives from the reporting hierarchy. Granular company/state/city territory grants propagate down the org and revoke in cascade; pipeline deals move through a manager-approved workflow; revenue targets cascade from global buckets with double-spend prevention; and quotes flow through approval to branded, sequentially-numbered PDFs emailed to clients.',
  // Short display values for the case-study header. The long-form `role`
  // paragraph stays for the "What I built" section.
  roleTitle: "Backend Engineer",
  platform: "Enterprise B2B Sales & CRM Platform",
  role:    'Lead Backend Architect. Designed the Laravel relational schema and service layer (territory propagation, target allocation, hierarchy, notifications), built the policy-gated authorization and query-scope isolation, integrated AuthCenter SSO with HMAC-signed bidirectional user sync, and engineered the Dompdf quote pipeline and bulk-import path for 20K+ rows.',
  highlights: [
    'Territory Access Control with Cascade Revocation: Granular company/state/city grants that aggregate up the reporting hierarchy and revoke from every subordinate inside one transaction when removed — preventing data leakage at any level.',
    'Hierarchy-First Authorization: A cycle-safe, depth-capped recursive reporting tree powering query scopes, policies, and per-role pipeline visibility, so reorganizations take effect instantly and safely.',
    'Pipeline Approval Workflow: Deal tracking through pending → submitted → approved/rejected, gated by a policy that resolves the creator\u2019s current direct manager at runtime.',
    'Target & Budget Allocation Engine: Revenue targets cascade from global buckets down the org chain with double-spend prevention, downline protection, and bottom-up cascade deletes.',
    'Quote → PDF → Email Lifecycle: Two-stage approvals, race-free sequential quote numbers under a cache lock, Dompdf PDF generation, and ZIP-batched emailing.',
  ],
  keyTakeaway:
    'Enterprise data isolation lives or dies at the query layer. Recording territory grants and budget chains as data — not flags — makes hierarchy-aware visibility and cascade math correct, auditable, and safe to change.',
  tools: [
    'PHP (Laravel)',
    'React + MUI',
    'MySQL',
    'Laravel Sanctum',
    'Pusher Realtime',
    'Dompdf (PDF)',
    'Microsoft Graph (Teams)',
    'AuthCenter SSO',
  ],
  // Ordered as a walkthrough, not by capture filename: the pipeline the
  // business runs on first, then the target and hierarchy engine underneath it,
  // then territory and accounts, then the people-facing queues, then access.
  screenshots: [
    '/images/ccms-v2/screenshot-rocks (44).webp', // dashboard
    '/images/ccms-v2/screenshot-rocks (51).webp', // sales quote register
    '/images/ccms-v2/screenshot-rocks (47).webp', // quote pipeline allocation
    '/images/ccms-v2/screenshot-rocks (48).webp', // generated sales report
    '/images/ccms-v2/screenshot-rocks (45).webp', // dashboard, opportunity view
    '/images/ccms-v2/screenshot-rocks (49).webp', // target allocations by user
    '/images/ccms-v2/screenshot-rocks (50).webp', // target distribution hierarchy
    '/images/ccms-v2/screenshot-rocks (35).webp', // org hierarchy chart
    '/images/ccms-v2/screenshot-rocks (34).webp', // smart profiles
    '/images/ccms-v2/screenshot-rocks (39).webp', // sales rep drawer
    '/images/ccms-v2/screenshot-rocks (36).webp', // contacts
    '/images/ccms-v2/screenshot-rocks (37).webp', // contact import field mapping
    '/images/ccms-v2/screenshot-rocks (42).webp', // company invitations
    '/images/ccms-v2/screenshot-rocks (43).webp', // companies + messages
    '/images/ccms-v2/screenshot-rocks (46).webp', // follow-up queues
    '/images/ccms-v2/screenshot-rocks (41).webp', // communication logs
    '/images/ccms-v2/screenshot-rocks (52).webp', // action items
    '/images/ccms-v2/screenshot-rocks (38).webp', // sales user profile
    '/images/ccms-v2/screenshot-rocks (40).webp', // user activity log
  ],
};
