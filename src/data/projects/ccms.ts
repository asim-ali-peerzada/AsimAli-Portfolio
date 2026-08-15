export const ccms = {
  title: 'CCMS (Client Contact Management System)',
  description:
    'Multi-tenant enterprise CRM centralizing sales pipelines, customer operations, real-time collaboration, reporting, and role-based access.',
  niche: 'Multi-Tier CRM & Sales Automation Pipeline',
  image: '/images/ccms/3-2.webp',
  tags: ['Laravel', 'Multi-Tenant', 'RBAC', 'Real-Time'],
  slug: 'sales-&-contact-management-(ccms)',
  services: [
    'Enterprise CRM Development',
    'Multi-Tier Data Architecture',
    'Sales Automation & Lead Routing',
    'API Engineering & Analytics',
  ],
  industry: ['Enterprise SaaS', 'CRM & Sales'],
  timeFrame: '12 Weeks',
  overview:
    'A comprehensive, hierarchical enterprise CRM engineered to manage the complete client lifecycle, automate geographically-based lead routing, and track complex sales pipelines from initial negotiation to finalized revenue across a multi-tier organization.',
  problem:
    'The organization was struggling with fragmented client data, untracked sales pipelines, and manual lead distribution. They required a centralized system that could enforce strict data visibility based on both corporate hierarchy and geographic territories, while providing executives with real-time analytics on sales targets and pending revenue.',
  solution:
    'Engineered a robust Laravel-based CRM that automates the entire sales lifecycle. The system routes leads dynamically based on state-mapping, digitizes the quote-to-order pipeline, and implements hierarchical dashboards. This allows Sales Representatives to manage their specific regional contacts, while giving Directors, VPs, and the CEO real-time aggregated insights into quarterly sales valuations and team performance.',
  role: 'Lead Backend Architect. Responsible for designing the complex relational database to handle multi-level reporting hierarchies (CEO down to Sales Reps). Architected the RESTful API layer in Laravel 11, implemented the automated state-based lead assignment logic, and built the aggregation endpoints that power the executive sales dashboards.',
  highlights: [
    "State-Based Lead Routing Automation: Engineered a backend logic engine that automatically evaluates a new lead's geographic state and instantly routes them to the correct regional Sales Manager and Representative.",
    'Pipeline & Revenue Tracking: Built a structured sales workflow where representatives log negotiated deals (pipelines) that require managerial approval before being converted into confirmed "Generated Sales" for revenue tracking.',
    'Hierarchical Data Visibility: Designed a cascading access model (Admin to VP to Director to Manager to Sales Rep) where users only see client data, analytics, and achievements relevant to their specific reporting structure and assigned states.',
    'Target & Performance Analytics: Developed a dynamic metrics aggregation system that feeds dashboards with Quarterly Generated Sales valuations, Weekly Pipeline Summaries, and assigned vs. achieved revenue targets.',
    'Automated Quote-to-Order Generation: Implemented a streamlined quote builder with predefined fields that handles managerial approvals and automatically generates and links official PDF orders to client profiles.',
  ],
  keyTakeaway:
    'Building a CRM for a large organization requires absolute trust in authorization. By designing an explicit multi-tenant RBAC engine close to database layers, CCMS ensures data isolation and security while enabling seamless collaboration.',
  tools: [
    'PHP (Laravel 11)',
    'React.js',
    'MySQL',
    'Laravel Sanctum',
    'Pusher',
    'Microsoft Graph API',
  ],
  screenshots: [
    '/images/ccms/dash.webp',
    '/images/ccms/pipeline.webp',
    '/images/ccms/sales_quote.webp',
    '/images/ccms/client_contact.webp',
    '/images/ccms/companies_client.webp',
    '/images/ccms/action_items.webp',
    '/images/ccms/follow_up.webp',
    '/images/ccms/communication_logs.webp',
    '/images/ccms/chat.webp',
    '/images/ccms/permission_settings.webp',
    '/images/ccms/reporting_hirachy.webp',
    '/images/ccms/notif_del.webp',
    '/images/ccms/system_settings.webp',
  ],
};
