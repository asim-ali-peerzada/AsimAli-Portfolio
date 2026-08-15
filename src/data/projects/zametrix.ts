import cover from '@/assets/images/zametrix/15shots_so.png';
import shot1 from '@/assets/images/zametrix/30shots_so.png';
import shot2 from '@/assets/images/zametrix/317shots_so.png';
import shot3 from '@/assets/images/zametrix/375shots_so.png';
import shot4 from '@/assets/images/zametrix/422shots_so.png';
import shot5 from '@/assets/images/zametrix/460shots_so.png';
import shot6 from '@/assets/images/zametrix/503shots_so.png';
import shot7 from '@/assets/images/zametrix/610shots_so.png';
import shot8 from '@/assets/images/zametrix/806shots_so.png';

export const zametrix = {
  title: 'Zametrix — Real Estate Intelligence',
  description:
    'Property intelligence platform combining market data, investment analysis, location intelligence, property comparison, and business workflows.',
  niche:
    'Full-stack property intelligence platform for real estate market analysis and investor decision support.',
  image: '/images/zametrix/zm-cover.webp',
  tags: ['Data Intelligence', 'Analytics', 'Geospatial', 'APIs'],
  slug: 'zametrix',
  services: [
    'Enterprise SaaS Development',
    'Full-Stack Architecture',
    'Data Aggregation & Analytics',
    'Workflow Automation & CRM Integration',
  ],
  industry: ['Real Estate', 'PropTech'],
  timeFrame: '12 Weeks',
  overview:
    'A comprehensive, full-stack property intelligence platform engineered to digitize real estate market analysis and investor decision support. The system unifies a public-facing intelligence portal with secure, role-based operational dashboards for field agents, territory partners, and administrative moderators.',
  problem:
    'The real estate industry suffers from fragmented, inconsistent, and unstructured property data. Investors lack reliable location-based intelligence, field agents rely on manual reporting, and administrative teams struggle with weak visibility and inefficient moderation workflows for verifying market updates.',
  solution:
    'Architected a centralized, multi-role intelligence platform that standardizes property data collection and moderation. The system allows authenticated agents and partners to submit structured market updates and price pulses, which are then routed through an administrative verification workflow. Once approved, this data feeds into a public analytics portal where users can compare locations, explore property trends, and generate insights, all supported by a built-in CRM for lead handling.',
  role: 'Full-Stack Architect & Developer. Designed and integrated the backend REST APIs in Laravel, architected the role-based access control and administrative moderation workflows, and built the frontend user experience using React and TypeScript. Responsible for the end-to-end implementation of the property intelligence reporting systems, partner onboarding modules, and analytics-driven dashboards.',
  highlights: [
    'Multi-Role Data Workflows: Engineered a complex role-based architecture (Admin, Partner, Agent, Public) using Spatie, ensuring strict access control over data submission, moderation, and territory management.',
    'Intelligence Reporting & Moderation: Developed a structured reporting pipeline where field agents submit market updates that are queued for admin review, ensuring only verified intelligence reaches the public portal.',
    'Market Pulse & Comparison Engine: Integrated analytics-driven features that allow users to generate investment snapshots, analyze community pulses, and visually compare infrastructure and pricing across different societies and phases.',
    'Integrated CRM & Lead Routing: Built a dedicated lead management module to handle investment queries, track lead statuses, manage assignment workflows, and maintain a detailed history of client interactions.',
    'Modern Full-Stack Experience: Delivered a highly responsive, PWA-supported frontend using React, TypeScript, and TanStack Query, backed by a scalable Laravel REST API utilizing repository/service patterns and Redis caching for optimal performance.',
  ],
  keyTakeaway:
    'Property intelligence requires a structured data pipeline where field-collected market data goes through rigorous moderation before reaching investors. Combining RBAC with automated workflows ensures data quality at scale.',
  tools: [
    'Laravel (PHP) & MySQL',
    'React (TypeScript, Vite)',
    'Tailwind CSS & Framer Motion',
    'Laravel Sanctum & Spatie (RBAC)',
    'Redis (Caching)',
    'DomPDF (Report Generation)',
  ],
  screenshots: [
    cover,
    shot1,
    shot2,
    shot3,
    shot4,
    shot5,
    shot6,
    shot7,
    shot8,
  ],
};
