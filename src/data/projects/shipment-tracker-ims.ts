import cover from '@/assets/images/ims/16shots_so.png';
import shot1 from '@/assets/images/ims/562shots_so.png';
import shot2 from '@/assets/images/ims/821shots_so.png';
import shot3 from '@/assets/images/ims/833shots_so.png';
import shot4 from '@/assets/images/ims/875shots_so.png';
import shot5 from '@/assets/images/ims/897shots_so.png';

export const shipmentTrackerIms = {
  title: 'Shipment Tracker & IMS',
  description:
    'Telecom logistics platform managing shipment lifecycles, inventory, automated email processing, installation workflows, and operational tracking.',
  niche:
    'Enterprise-grade inventory and shipment management platform bridging unstructured email notifications with a structured operational web dashboard.',
  image: cover,
  tags: ['IMAP', 'Workflow Automation', 'Queues', 'Inventory'],
  slug: 'shipment-tracker-&-ims',
  services: [
    'Workflow Automation & ETL',
    'Backend Systems Architecture',
    'Logistics & Inventory Management',
    'Third-Party API & IMAP Integration',
  ],
  industry: ['Telecom', 'Logistics'],
  timeFrame: '14 Weeks',
  overview:
    'An automated, enterprise-grade inventory and shipment management platform designed to bridge unstructured email notifications with a structured operational web dashboard. The system enforces strict business rules, item-level tracking, and automated lifecycle management for engineering-order logistics.',
  problem:
    'Logistics and engineering teams were heavily reliant on manual data entry to process shipment updates arriving via email. This fragmented communication led to slow, error-prone record-keeping, creating severe operational blind spots in tracking shipment lifecycles, identifying missing parts, and managing field technician assignments.',
  solution:
    'Architected an automated data pipeline that connects directly to an IMAP mailbox to fetch, parse, and classify incoming unstructured email notifications into structured shipment records. The system utilizes background queue processing for reliable data extraction and enforces a multi-step business workflow, allowing administrative teams to track item-level quantities, flag missing equipment, and monitor technician transfers through a centralized, SSO-secured dashboard.',
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
  screenshots: [
    cover,
    shot1,
    shot2,
    shot3,
    shot4,
    shot5,
  ],
};
