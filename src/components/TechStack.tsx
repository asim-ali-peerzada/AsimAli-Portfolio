/**
 * Skills are stored as arrays rather than a dot-separated string so each one
 * renders as its own chip. A run of "PHP · Laravel · OOP" reads as a single
 * undifferentiated line; separated chips make each skill individually legible
 * and scannable.
 *
 * Every pill here is present in at least one shipped repository. Generic
 * baseline terms (HTML, CSS, OOP, SOLID) are deliberately excluded — they are
 * assumed for a backend role and dilute the list.
 */
const skillGroups = [
  {
    category: 'Back-End',
    skills: [
      'PHP',
      'Laravel',
      'Python',
      'FastAPI',
      'REST APIs',
      'Eloquent ORM',
      'Queues & Horizon',
      'Modular Monoliths',
    ],
  },
  {
    category: 'Database & Performance',
    skills: [
      'MySQL',
      'Redis',
      'Pinecone Vector DB',
      'Query Optimization',
      'Chunked Batch Processing',
      'N+1 Remediation',
    ],
  },
  {
    category: 'Security & Access Control',
    skills: [
      'OAuth 2.0 / SSO',
      'PKCE (S256)',
      'JWT (RS256)',
      'TOTP 2FA',
      'HMAC-SHA256',
      'RBAC & Graph ABAC',
      'Gates & Policies',
    ],
  },
  {
    category: 'AI & Integrations',
    skills: [
      'RAG Pipelines',
      'Google Gemini API',
      'Tesseract OCR',
      'WhatsApp Cloud API',
      'Microsoft Graph API',
      'Stripe & PayPal',
      'IMAP Parsing',
      'Pusher / WebSockets',
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      'Git & GitHub',
      'GitHub Actions (CI/CD)',
      'PHPUnit / Pest',
      'Laravel Telescope',
      'Headless Chromium (Browsershot)',
      'Linux',
      'Postman',
    ],
  },
  {
    category: 'Front-End',
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Inertia.js',
      'Laravel Blade',
      'Tailwind CSS',
      'Bootstrap',
    ],
  },
];

const TechStack = () => {
  return (
    <section
      id="tech-stack"
      className="w-full flex flex-col items-start pt-22.5 lg:pt-30 pb-10"
    >
      <h2 className="text-[34px] xs:text-[38px] sm:text-[64px] lg:text-[84px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
        TECHNOLOGY <br />
        <span className="text-ghost">STACK</span>
      </h2>

      {/* Squared-off container — rounded-lg reads as a panel without the
          pill-like softness of rounded-2xl. */}
      <div className="w-full flex flex-col mt-8 sm:mt-12 rounded-lg border border-white/10 bg-white/3 divide-y divide-white/[0.07]">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="flex flex-col lg:flex-row lg:gap-6 px-4 sm:px-5 py-4 sm:py-4.5 min-w-0"
          >
            <h3 className="text-[14px] font-semibold text-orange leading-[120%] font-display shrink-0 sm:w-47.5 lg:w-42">
              {group.category}
            </h3>

            <ul className="flex flex-wrap gap-1.5 mt-2.5 lg:mt-0 min-w-0">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="max-w-full rounded-md border border-white/10 bg-white/5 px-2 py-0.75 text-[12px] sm:text-[12.5px] font-medium leading-[130%] text-white/85 font-display"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;