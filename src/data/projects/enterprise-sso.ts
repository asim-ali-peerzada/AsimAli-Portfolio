// Screenshots are ordered as a walkthrough of the product, not by capture
// date: what a user sees first, then the admin control plane, then the access
// approval workflow, then the application registry, then the per-user
// provisioning settings that sit underneath all of it.

export const enterpriseSso = {
  title: 'Enterprise Unified SSO',
  badge: 'Production · Enterprise',
  description:
    'Centralized identity platform connecting multiple applications through secure authentication, access provisioning, and cross-application access control.',
  niche:
    'Centralized identity platform enabling secure cross-application access, role provisioning, JWT authentication, and TOTP-based multi-factor security.',
  image: '/images/sso/sso-cover.webp',
  tags: ['Single Sign-On', 'JWT Auth', 'TOTP 2FA', 'User Sync'],
  coreCapabilities: [
    'Single Sign-On',
    'JWT Auth',
    'TOTP 2FA',
    'User Sync',
  ],
  slug: 'enterprise-single-sign-on',
  services: [
    'Identity & Access Management (IAM)',
    'Enterprise Security Architecture',
    'Third-Party API Synchronization',
    'Data Integration & Background Processing',
  ],
  industry: ['Cybersecurity', 'Enterprise IT'],
  timeFrame: '10 Weeks',
  // Set the real year(s) before publishing, e.g. "2025" or "2025 - 2026".
  // Left blank on purpose: an unverified date on a public CV is worse than none.
  // Repo commit history is a starting point, not the answer - confirm with the user.
  year: "",
  overview:
    'A centralized Identity and Access Management (IAM) platform built to unify authentication and user provisioning across seven internal telecom and operations applications. It implements a custom OAuth 2.0 authorization server with PKCE (S256), RS256-signed JWTs, TOTP two-factor authentication, approval-gated domain access requests, and HMAC-signed cross-application user sync.',
  problem:
    'Managing user access across multiple internal and external applications creates severe administrative bottlenecks. Manual approval workflows lead to inconsistent onboarding/offboarding, weak security enforcement, and fragmented infrastructure data, increasing both operational overhead and security vulnerabilities.',
  solution:
    'Architected a centralized identity and access platform that eliminates manual access handling. The system provides secure, 2FA-fortified login and enforces strict role-based access control (RBAC). It introduces automated, approval-based access workflows, allowing administrators to seamlessly provision, synchronize, and monitor user access across connected external systems (such as CCMS, JobFinder, and Samsung) from a single administrative dashboard.',
  // Short display values for the case-study header. The long-form `role`
  // paragraph stays for the "What I built" section.
  roleTitle: "Backend Engineer",
  platform: "Centralized IAM & OAuth 2.0 Platform",
  role: 'Full-Stack Developer & Security Architect. Architected the core REST API infrastructure in Laravel and built the React frontend. Responsible for designing the JWT authentication flows, developing the external API synchronization logic, and implementing the queued background jobs for bulk data processing and automated email notifications.',
  highlights: [
    'Centralized Cross-Domain Sync: Engineered robust external system integrations that automatically synchronize user statuses, activations, and permissions across multiple connected enterprise applications.',
    'Enterprise Security Protocols: Implemented strict JWT-based session handling fortified with Google Authenticator 2FA, reCAPTCHA, failed-login lockouts, and token blacklisting for absolute system security.',
    'Approval-Based Access Pipelines: Developed automated request workflows enabling users to request domain-specific access, which admins can securely review, approve, or reject via the central dashboard.',
    'Bulk Infrastructure Data Processing: Built a high-performance background processing engine using Laravel Queues to handle bulk Excel uploads, allowing admins to seamlessly import, filter, and monitor site access data.',
    'Admin Governance & Analytics: Delivered a comprehensive React-based control panel utilizing Recharts and Material UI to provide real-time analytics, user activity tracking, and cross-domain access monitoring.',
  ],
  keyTakeaway:
    'A well-designed SSO system is the cornerstone of enterprise security. Centralizing identity with JWT and TOTP ensures both seamless user experience and robust protection against unauthorized access.',
  tools: [
    'Laravel (PHP) & REST APIs',
    'React (Vite, Tailwind CSS, Material UI)',
    'JWT Authentication & Google 2FA',
    'Queue & Job-based Processing',
    'Recharts (Analytics) & SMTP',
  ],
  screenshots: [
    '/images/sso-v2/screenshot-rocks (29).webp',
    '/images/sso-v2/screenshot-rocks (30).webp',
    '/images/sso-v2/screenshot-rocks (31).webp',
    '/images/sso-v2/screenshot-rocks (32).webp',
    '/images/sso-v2/screenshot-rocks (33).webp',
  ],
};
