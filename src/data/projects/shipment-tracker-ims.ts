
export const shipmentTrackerIms = {
  title: 'Shipment Tracker & IMS',
  badge: 'Production · Enterprise',
  description:
    'Telecom logistics platform managing shipment lifecycles, inventory, automated email processing, installation workflows, and operational tracking.',
  niche:
    'Enterprise-grade inventory and shipment management platform bridging unstructured email notifications with a structured operational web dashboard.',
  image: '/images/ims/ims-cover.webp',
  tags: ['IMAP Parsing', 'Queue Jobs', 'Item Tracking', 'Lifecycle States'],
  coreCapabilities: [
    'IMAP Parsing',
    'Queue Jobs',
    'Item Tracking',
    'Lifecycle States',
  ],
  slug: 'shipment-tracker',
  services: [
    'Workflow Automation & ETL',
    'Backend Systems Architecture',
    'Logistics & Inventory Management',
    'Third-Party API & IMAP Integration',
  ],
  industry: ['Telecom', 'Logistics'],
  timeFrame: '14 Weeks',
  // Set the real year(s) before publishing, e.g. "2025" or "2025 - 2026".
  // Left blank on purpose: an unverified date on a public CV is worse than none.
  // Repo commit history is a starting point, not the answer - confirm with the user.
  year: "",
  overview:
    'A telecom supply-chain and logistics platform that replaces manual engineering-order (EO) tracking with unattended IMAP email ingestion and a live operational dashboard. It automatically polls, classifies, and parses vendor EO and shipment emails into structured line items—enforcing a guarded nine-state lifecycle from notice receipt and warehouse verification through field installation and equipment transfers.',
  problem:
    'Logistics and engineering teams were heavily reliant on manual data entry to process shipment updates arriving via email. This fragmented communication led to slow, error-prone record-keeping, creating severe operational blind spots in tracking shipment lifecycles, identifying missing parts, and managing field technician assignments.',
  solution:
    'Architected an automated data pipeline that connects directly to an IMAP mailbox to fetch, parse, and classify incoming unstructured email notifications into structured shipment records. The system utilizes background queue processing for reliable data extraction and enforces a multi-step business workflow, allowing administrative teams to track item-level quantities, flag missing equipment, and monitor technician transfers through a centralized, SSO-secured dashboard.',
  // Short display values for the case-study header. The long-form `role`
  // paragraph stays for the "What I built" section.
  roleTitle: "Backend Engineer",
  platform: "Telecom Supply-Chain & Logistics Platform",
  role: 'Backend Systems Architect & Full-Stack Engineer. Designed and developed the core automation workflows, specifically focusing on the IMAP email processing and data extraction engines. Architected the relational database schema to support complex shipment lifecycles and item-level inventory math, integrated the external SSO authentication, and built the administrative monitoring dashboards using Laravel, Blade, and Livewire.',
  highlights: [
    'Automated Email Ingestion Engine: Engineered a robust IMAP integration utilizing custom parsing logic to extract structured shipment and engineering-order details directly from raw email content.',
    'Asynchronous Background Processing: Implemented Laravel Queues to reliably handle heavy email fetching, classification, and data extraction processes without impacting front-end dashboard performance.',
    'Granular Item-Level Tracking: Built a highly detailed inventory ledger tracking individual part numbers, actively monitoring item quantities across statuses such as shipped, received, missing, installed, and transferred.',
    'Dynamic Logistics Workflow: Developed a state-machine-like workflow tracking the real-world lifecycle of a shipment (e.g., In Transit, Received by GC, Inside Company Van, Installed, Transferred).',
    'Admin Governance & SSO: Integrated seamless Single Sign-On (SSO) via an external AuthCenter, fortified with role-based access controls and an automated notification system for tracking failure alerts and configuration changes.',
  ],
  keyTakeaway:
    'Automating logistics workflows from unstructured email ingestion to structured inventory tracking eliminates manual bottlenecks and provides the real-time visibility needed to maintain operational integrity at scale.',
  tools: [
    'Laravel (PHP) & MySQL',
    'Webklex IMAP (Email Parsing)',
    'Laravel Queues & Telescope',
    'Blade, Livewire, Tailwind CSS, Vite',
    'External SSO Integration',
  ],
  // Ordered as the operation actually runs: watch the board, open one shipment,
  // attach its evidence, take the source documents in, then the automation and
  // access surfaces that feed it.
  screenshots: [
    '/images/ims-v2/screenshot-rocks (64).webp', // shipments control room
    '/images/ims-v2/screenshot-rocks (67).webp', // shipment detail
    '/images/ims-v2/screenshot-rocks (65).webp', // shipment accessory
    '/images/ims-v2/screenshot-rocks (66).webp', // media upload
    '/images/ims-v2/screenshot-rocks (63).webp', // upload documents
    '/images/ims-v2/screenshot-rocks (68).webp', // email automation logs
    '/images/ims-v2/screenshot-rocks (69).webp', // system settings
    '/images/ims-v2/screenshot-rocks (70).webp', // technicians
  ],
};
