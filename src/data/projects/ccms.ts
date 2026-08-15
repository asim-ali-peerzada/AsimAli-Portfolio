export const ccms = {
  title: 'CCMS (Client Contact Management System)',
  description:
    'Production enterprise sales & client CRM with territory-based data isolation, manager-approved pipelines, cascade revenue targets, and quote-to-PDF workflows.',
  niche: 'Enterprise Sales & Client CRM',
  image: '/images/ccms/3-2.webp',
  tags: ['Territory RBAC', 'Approval Pipelines', 'Cascade Targets', 'Real-Time'],
  slug: 'sales-&-contact-management-(ccms)',
  services: [
    'Enterprise CRM Development',
    'Role-Based Data Isolation',
    'Pipeline & Approval Workflows',
    'Quote-to-Order Automation',
  ],
  industry: ['CRM & Sales', 'Enterprise Operations'],
  timeFrame: '12 Weeks',
  overview:
    'A production enterprise CRM for a hierarchical sales organization (Sales Rep → Manager → Director → VP → President → CFO → CEO), unifying client companies/accounts/contacts, territory-based data isolation, manager-approved sales pipelines, cascade revenue-target planning, and a quote-to-order document lifecycle with PDF generation and email — all synced with a company-wide SSO directory.',
  problem:
    'The organization tracked client records in manual spreadsheets, had no mechanism to isolate data by sales territory, routed leads by hand, and planned revenue targets without any enforcement that a manager could not over-allocate or double-spend budget down the reporting chain.',
  solution:
    'Engineered a Laravel + React (MUI) CRM where nearly every permission derives from the reporting hierarchy. Granular company/state/city territory grants propagate down the org and revoke in cascade; pipeline deals move through a manager-approved workflow; revenue targets cascade from global buckets with double-spend prevention; and quotes flow through approval to branded, sequentially-numbered PDFs emailed to clients.',
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
