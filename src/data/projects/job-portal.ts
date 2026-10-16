export const jobPortal = {
  title: 'Job Portal — Recruitment & Onboarding',
  badge: 'Enterprise · Laravel',
  description:
    'Enterprise recruitment platform covering job publishing, candidate applications, document-heavy onboarding and employee administration — with SSO identity sync and a live analytics dashboard.',
  niche: 'Recruitment & HR · Document Onboarding · SSO Identity Sync',
  image: '/images/job-portal/861_1x_shots_so.png',
  tags: ['SSO Sync', 'Document Onboarding', 'Application Pipeline', 'Geo Analytics'],
  // Full list shown as "Core capabilities" on the case-study header. `tags`
  // above is the short set used on the home-page project card.
  coreCapabilities: [
    'SSO Sync',
    'Document Onboarding',
    'Application Pipeline',
    'Geo Analytics',
  ],
  slug: 'job-portal',
  // Set the real year(s) before publishing, e.g. "2025" or "2025 - 2026".
  // Left blank on purpose: an unverified date on a public CV is worse than none.
  // Repo commit history is a starting point, not the answer - confirm with the user.
  year: "",
  overview:
    'An enterprise recruitment platform covering the full hiring pipeline: job posting and publishing, candidate applications with resume handling, document-heavy employee onboarding, and the administration of the people and records behind it. Identity runs through an external AuthCenter with signed, bidirectional user sync, and the admin dashboard turns tracked activity into visit, conversion and geography reporting.',
  problem:
    'A recruitment operation has two audiences — candidates who need to find and apply for a role, and a back office that has to publish jobs, review applicants and collect a document-heavy set of certifications, policies and forms before someone can start. Spread across a job board, an inbox and a folder of PDFs, there is no single record of where a candidate stands or which new hire is cleared to work.',
  solution:
    'The system is a Laravel monolith with Blade and Tailwind on the front and an external AuthCenter for identity. Applications move through a six-state pipeline with queued notifications; documents, certifications and policy acknowledgments are tracked per user and per job with an audit trail; and an onboarding percentage computes completion from the documents actually assigned and acknowledged. A scheduled command closes expired postings, and the dashboard derives its charts from session-deduplicated visits resolved through cached geolocation.',
  // Short display values for the case-study header. The long-form `role`
  // paragraph stays for the "What I built" section.
  roleTitle: "Full-Stack Developer",
  platform: "Recruitment & Onboarding Platform",
  role:
    'Full-Stack Developer across the recruitment domain modules, the document-and-onboarding pipeline, the AuthCenter integration and the analytics behind the admin dashboard — from the job-posting lifecycle through application review to onboarding completion, including the signed user-sync APIs and the tracking layer that turns visits into operating numbers.',
  highlights: [
    'AuthCenter SSO with HMAC-Signed Sync: External identity-provider sign-in plus Google social login, with a signed back-channel where AuthCenter POSTs user lifecycle events to an HMAC-verified endpoint and status changes return through a queued job.',
    'Document, Certification & Policy Pipeline: Single and batch document uploads assigned per user and per job, approval and rejection states, certification expiry tracking, and policy acknowledgments audited with IP and user-agent.',
    'Onboarding Progress Engine: A computed onboarding percentage — assignments, uploads and acknowledgments weighted into one number — driving both the hire-facing progress bar and the administrator dashboard.',
    'Applicant Pipeline with Queued Notifications: Six-state application workflow with resume handling, skill tagging, duplicate and expired-job blocking, and queued admin/candidate email notifications.',
    'Analytics with Cached Geolocation: Session-deduplicated visit tracking and cached IP geolocation powering conversion rates, geographic applicant mapping and monthly job-activity charts.',
    'Job Lifecycle & Cover-Photo Compression: Draft-to-publish posting workflow with duplication and starring, scheduled expiry close-out, and GD-based cover-photo compression targeting a fixed file-size budget.',
  ],
  // Ordered as a walkthrough of the lifecycle: the candidate's path from search
  // to onboarding first, then the recruiter console, then the analytics built
  // on top of the tracked activity.
  screenshots: [
    '/images/job-portal/screenshot-rocks (86).webp', // candidate job board
    '/images/job-portal/screenshot-rocks (87).webp', // job detail
    '/images/job-portal/screenshot-rocks (88).webp', // candidate dashboard — applied jobs
    '/images/job-portal/screenshot-rocks (89).webp', // my documents / onboarding
    '/images/job-portal/screenshot-rocks (90).webp', // admin dashboard
    '/images/job-portal/screenshot-rocks (91).webp', // manage jobs
    '/images/job-portal/screenshot-rocks (92).webp', // document library
    '/images/job-portal/screenshot-rocks (93).webp', // job portal analytics
  ],
};
