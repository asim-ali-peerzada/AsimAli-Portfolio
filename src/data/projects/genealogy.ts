
export const genealogy = {
  title: 'Genealogy SaaS Platform',
  badge: 'Production · SaaS',
  description:
    'Collaborative genealogy platform combining interactive family trees, historical records, OCR data extraction, intelligent matching, and subscriptions.',
  niche: 'Collaborative Family History & Archival Platform',
  image: '/images/ft/ft-platform-overview.webp',
  tags: ['Graph ABAC', 'BFS Family Search', 'OCR', 'Record Matching'],
  coreCapabilities: [
    'Graph ABAC',
    'BFS Family Search',
    'OCR',
    'Record Matching',
  ],
  slug: 'genealogy-saas-platform',
  services: ['Enterprise SaaS Development', 'API Integrations', 'OCR Processing'],
  industry: ['Family History', 'Archival'],
  timeFrame: '10 Weeks',
  // Set the real year(s) before publishing, e.g. "2025" or "2025 - 2026".
  // Left blank on purpose: an unverified date on a public CV is worse than none.
  // Repo commit history is a starting point, not the answer - confirm with the user.
  year: "",
  overview:
    'A collaborative genealogy and historical-archival SaaS platform that connects interactive family trees with national archive records. It combines breadth-first (BFS) graph-scoped access control, unified multi-archive search (NARA and OpenArch), Tesseract OCR with Gemini AI entity extraction, and weighted person-matching workflows with Stripe and PayPal subscription billing.',
  problem:
    'Family history research is fragmented across disconnected archives, proprietary formats, and manual record-matching processes. Researchers struggle to connect disparate historical records into coherent family narratives.',
  solution:
    'Built a scalable genealogy platform with NARA and OpenArch API integrations for automated historical record discovery. Implemented OCR-based document extraction and intelligent record-matching algorithms to connect family trees across distributed data sources.',
  // Short display values for the case-study header. The long-form `role`
  // paragraph stays for the "What I built" section.
  roleTitle: "Backend Engineer",
  platform: "Collaborative Genealogy & Archival SaaS",
  role: 'Lead Backend Developer - Architected the API layer, integrated external archival APIs, built the OCR processing pipeline, and designed the family-scoped access model.',
  highlights: [
    'NARA & OpenArch API integration for automated historical record discovery',
    'OCR-based document extraction and text recognition pipeline',
    'Intelligent record-matching algorithm for cross-source family tree connections',
    'Tiered family-scoped access control, gating tree visibility and edit rights per family role',
    'Collaborative tree editing with real-time sync across family members',
  ],
  keyTakeaway:
    'Historical record processing at scale requires robust OCR pipelines and intelligent fuzzy-matching algorithms. Combining API integrations with automated extraction transforms weeks of manual research into seconds of computation.',
  tools: ['Laravel', 'MySQL', 'OCR Engine', 'Redis', 'Pusher'],
  // Read from the images themselves, in the order the product is used:
  // arrive, empty tree, populated tree, explore it, trace people, prove them,
  // ingest more, attach memories, share it.
  screenshots: [
    '/images/ft-v2/screenshot-rocks (53).webp', // public landing
    '/images/ft-v2/screenshot-rocks (54).webp', // empty state
    '/images/ft-v2/screenshot-rocks (56).webp', // dashboard
    '/images/ft-v2/screenshot-rocks (62).webp', // family tree graph
    '/images/ft-v2/screenshot-rocks (55).webp', // life journey
    '/images/ft-v2/screenshot-rocks (57).webp', // search results
    '/images/ft-v2/screenshot-rocks (58).webp', // match detail
    '/images/ft-v2/screenshot-rocks (60).webp', // import gedcom
    '/images/ft-v2/screenshot-rocks (59).webp', // family album
    '/images/ft-v2/screenshot-rocks (61).webp', // collaborator management
  ],
};
