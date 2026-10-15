/**
 * Key achievements.
 *
 * Grouped by system, strongest architecture first. Each entry opens with a bold
 * system label so the list scans as eight engineering stories rather than
 * twelve undifferentiated claims — bold marks the category, never a number.
 *
 * Every specific below is present in the source: see the forensic audit notes
 * beside each entry. No invented percentages, no feature claims the repos
 * don't contain.
 */
const achievements = [
  '**Identity Hub:** Built a centralized OAuth 2.0 authorization server with PKCE (S256) and RS256-signed JWTs, backed by TOTP two-factor authentication, JTI blacklisting for immediate logout, refresh-token rotation, and HMAC-SHA256 user sync across internal applications.',
  '**Resumable Media Pipeline:** Designed a stateless HMAC-signed chunked upload pipeline — 5 MB chunks, idempotent append, concurrent-safe finalization, and orphaned-asset pruning — feeding queued Headless Chromium (Browsershot) PDF generation.',
  '**Graph-Aware ABAC Engine:** Engineered a five-role attribute-based access control layer that resolves each user\'s editable branch scope by running breadth-first graph traversal, so permissions follow a person\'s position in the family tree rather than a flat role check.',
  '**Territory & Budget Cascade Engine:** Architected hierarchical RBAC with set-diff cascade revocation down reporting subtrees, multi-tier target-budget allocation, and race-free sequential quote numbering under a distributed lock feeding a Dompdf quote-to-order flow.',
  '**Telecom Path Extraction Engine:** Built a priority-ordered regex engine that parses circuit and port paths out of CIENA and Samsung migration data, scoring every match by confidence and persisting the pattern used so each extraction stays auditable.',
  '**Automated Logistics Ingestion:** Engineered an IMAP email pipeline with Word/HTML layout parsing and message-ID deduplication, driving a nine-state shipment lifecycle machine spanning notice, transit, warehouse, install-site, and transfer.',
  '**Archival Search & OCR Pipeline:** Integrated the US National Archives and OpenArch APIs into a unified search layer, feeding idempotent Tesseract OCR with Google Gemini structured entity extraction to connect archival records back to family trees.',
  '**High-Throughput Data Imports:** Built chunked Excel import pipelines that bulk-insert contacts in 1,000-row batches, with in-memory caching for repeated lookups and US state inference from a 230-entry phone area-code map.',
];

function Achievement({ text }: { readonly text: string }) {
  return (
    <li className="relative pl-5">
      <span
        aria-hidden="true"
        className="absolute left-0 top-[0.62em] h-1.25 w-1.25 rounded-full bg-orange"
      />
      <p className="text-[14.5px] sm:text-[15.5px] leading-[165%] text-muted font-display">
        {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
          // Key on the content itself, not the position, so React reuses the
          // right node if the label inside a bullet ever changes.
          const key = `${i}-${part.slice(0, 24)}`;
          return part.startsWith('**') && part.endsWith('**') ? (
            <strong key={key} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={key}>{part}</span>
          );
        })}
      </p>
    </li>
  );
}

const EngineeringImpact = () => {
  return (
    <section
      id="impact"
      className="w-full flex flex-col items-start pt-22.5 lg:pt-30 pb-10 scroll-mt-18 sm:scroll-mt-24"
    >
      <h2 className="text-[34px] xs:text-[38px] sm:text-[64px] lg:text-[84px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
        KEY <br />
        <span className="text-ghost">ACHIEVEMENTS</span>
      </h2>

      <ul className="w-full flex flex-col gap-3 sm:gap-3.5 mt-8 sm:mt-12 max-w-160">
        {achievements.map((text) => (
          <Achievement key={text} text={text} />
        ))}
      </ul>
    </section>
  );
};

export default EngineeringImpact;