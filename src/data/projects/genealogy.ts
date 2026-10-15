import cover from '@/assets/images/ft/195shots_so.png';
import shot1 from '@/assets/images/ft/257shots_so.png';
import shot2 from '@/assets/images/ft/308shots_so.png';
import shot3 from '@/assets/images/ft/335shots_so_1.png';
import shot4 from '@/assets/images/ft/352shots_so_2.png';
import shot5 from '@/assets/images/ft/644shots_so.png';
import shot6 from '@/assets/images/ft/884shots_so.png';
import shot7 from '@/assets/images/ft/921shots_so.png';

export const genealogy = {
  title: 'Genealogy SaaS Platform',
  badge: 'Production · SaaS',
  description:
    'Collaborative genealogy platform combining interactive family trees, historical records, OCR data extraction, intelligent matching, and subscriptions.',
  niche: 'Collaborative Family History & Archival Platform',
  image: '/images/ft/ft-platform-overview.webp',
  tags: ['Graph ABAC', 'BFS Family Search', 'OCR', 'Record Matching'],
  slug: 'genealogy-saas-platform',
  services: ['Enterprise SaaS Development', 'API Integrations', 'OCR Processing'],
  industry: ['Family History', 'Archival'],
  timeFrame: '10 Weeks',
  // Set the real year(s) before publishing, e.g. "2025" or "2025 - 2026".
  // Left blank on purpose: an unverified date on a public CV is worse than none.
  // Repo commit history is a starting point, not the answer - confirm with the user.
  year: "",
  overview:
    'A collaborative platform preserving family history through intelligent record matching, OCR processing, and collaborative family trees.',
  problem:
    'Family history research is fragmented across disconnected archives, proprietary formats, and manual record-matching processes. Researchers struggle to connect disparate historical records into coherent family narratives.',
  solution:
    'Built a scalable genealogy platform with NARA and OpenArch API integrations for automated historical record discovery. Implemented OCR-based document extraction and intelligent record-matching algorithms to connect family trees across distributed data sources.',
  // Short display values for the case-study header. The long-form `role`
  // paragraph stays for the "What I built" section.
  roleTitle: "Lead Backend Developer",
  platform: "SaaS Web App",
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
  screenshots: [
    cover,
    shot1,
    shot2,
    shot3,
    shot4,
    shot5,
    shot6,
    shot7,
  ],
};
