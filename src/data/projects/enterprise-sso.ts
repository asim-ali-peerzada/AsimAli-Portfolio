import cover from '@/assets/images/sso/sso-cover.png';
import shot1 from '@/assets/images/sso/sso-shot-1.png';
import shot2 from '@/assets/images/sso/sso-shot-2.png';
import shot3 from '@/assets/images/sso/sso-shot-3.png';
import shot4 from '@/assets/images/sso/sso-shot-4.png';

export const enterpriseSso = {
  title: 'Unified SSO',
  niche:
    'Centralized identity platform enabling secure cross-application access, role provisioning, JWT authentication, and TOTP-based multi-factor security.',
  image: cover,
  tags: ['Security', 'JWT', 'SSO'],
  slug: 'enterprise-single-sign-on',
  services: [
    'Identity & Access Management (IAM)',
    'Enterprise Security Architecture',
    'Third-Party API Synchronization',
    'Data Integration & Background Processing',
  ],
  industry: ['Cybersecurity', 'Enterprise IT'],
  timeFrame: '10 Weeks',
  overview:
    'An enterprise-grade Single Sign-On (SSO) and access management ecosystem designed to centralize user authentication, automate access approval workflows, and synchronize user provisioning across multiple distinct enterprise domains and applications.',
  problem:
    'Managing user access across multiple internal and external applications creates severe administrative bottlenecks. Manual approval workflows lead to inconsistent onboarding/offboarding, weak security enforcement, and fragmented infrastructure data, increasing both operational overhead and security vulnerabilities.',
  solution:
    'Architected a centralized identity and access platform that eliminates manual access handling. The system provides secure, 2FA-fortified login and enforces strict role-based access control (RBAC). It introduces automated, approval-based access workflows, allowing administrators to seamlessly provision, synchronize, and monitor user access across connected external systems (such as CCMS, JobFinder, and Samsung) from a single administrative dashboard.',
  role: 'Full-Stack Developer & Security Architect. Architected the core REST API infrastructure in Laravel 12 and built the React frontend. Responsible for designing the JWT authentication flows, developing the external API synchronization logic, and implementing the queued background jobs for bulk data processing and automated email notifications.',
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
    'Laravel 12 (PHP 8.2) & REST APIs',
    'React (Vite, Tailwind CSS, Material UI)',
    'JWT Authentication & Google 2FA',
    'Queue & Job-based Processing',
    'Recharts (Analytics) & SMTP',
  ],
  screenshots: [cover, shot1, shot2, shot3, shot4],
};
