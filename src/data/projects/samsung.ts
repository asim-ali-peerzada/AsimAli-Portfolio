/**
 * Samsung Network Migration & Diagrams — internal telecom tooling.
 *
 * Every technical claim here was checked against the source at
 * /mnt/workspace/Surfiq-Tech/samsung before being written. Two figures from the
 * original analysis doc were corrected and are deliberately NOT used:
 * `NetworkRecord` has 48 fillable fields (not "60+") and the port-assignment
 * grid declares 42 columns (not "60+"). The extraction engine is rule-based
 * regex, not ML, and the app is single-tenant with no websockets.
 */
export const samsungMigration = {
  title: 'Samsung Network Migration & Diagrams',
  badge: 'Production · Enterprise',
  description:
    'Internal telecom tooling that extracts structured data from Samsung circuit paths, assigns router and VDU ports, and renders the result as a printable network topology.',
  niche:
    'Telecom infrastructure tooling for 4G to 5G small-cell migration — circuit-path extraction, port assignment, and network diagramming.',
  image: '/images/samsung/samsung-cover.webp',
  tags: ['Regex Extraction', 'Port Auto-Mapping', 'Virtualized Grid', 'Hardware Print Bridge'],
  coreCapabilities: [
    'Regex Extraction',
    'Port Auto-Mapping',
    'Virtualized Grid',
    'Hardware Print Bridge',
  ],
  slug: 'samsung-migration',
  // Set the real year(s) before publishing, e.g. "2025" or "2025 - 2026".
  // Left blank on purpose: an unverified date on a public CV is worse than none.
  // Repo commit history is a starting point, not the answer - confirm with the user.
  year: "",
  overview:
    'An internal production tool for network engineers migrating Samsung small-cell infrastructure from 4G to 5G. Field teams upload a port file as Excel; the system parses the circuit paths it contains, extracts the structured fields engineers would otherwise key in by hand, assigns router and VDU ports, and renders the result as a live topology diagram that can be exported or printed as physical equipment labels.',
  problem:
    'Circuit paths arrive as long, undocumented strings in several inconsistent formats, and migrating a site meant mapping hundreds of them to physical router ports by hand. The mapping was slow, error-prone, and left no record of which fields were derived rather than entered — so a mistake in the spreadsheet was indistinguishable from a deliberate value until it reached the field.',
  solution:
    'A Laravel API with a config-driven, priority-ordered regex extraction engine that scores its own confidence and logs patterns it cannot yet parse, so new variants are added as configuration rather than code. Extracted values cascade into a 48-field network record through three port-mapping services, and every auto-set field records its source, timestamp and user in a JSON column. A virtualized React grid makes the resulting 42-column record set editable in the browser, and the same data renders as a colour-coded topology diagram that exports to PDF and Excel or prints as labels.',
  // Short display values for the case-study header. The long-form `role`
  // paragraph stays for the "What I built" section.
  roleTitle: "Backend & Full-Stack Engineer",
  platform: "5G Network Migration & Hardware Tooling",
  role:
    'Full-Stack Engineer. Built the Laravel extraction pipeline and the three port-mapping services that cascade derived values into a network record, designed the provenance tracking that records where every auto-set field came from, and built the React front end — including the virtualized port-assignment grid and the topology diagram renderer. Also built the print bridge that drives Brother label printers from the browser.',
  highlights: [
    'Circuit Path Extraction Engine: A config-driven regex engine with priority-ordered patterns that scores each extraction for confidence, falls back to a secondary parser for unknown formats, and logs what it could not parse so new variants become configuration instead of a code change.',
    'Cascading Auto-Population with Provenance: Editing one field derives the rest through three mapping services, and every auto-set value records its source, timestamp and the user who triggered it — so derived data is never mistaken for entered data.',
    'Virtualized Port Assignment Grid: A 42-column grid over large record sets, virtualized for scroll performance with inline editing, deferred input state and optimistic saves, plus a column-visibility control so engineers see the fields their task needs.',
    'Port Mapping Intelligence: Radio ports are deduplicated with an explicit removed-value sentinel, and VDU quadrants are assigned cyclically from the gNodeB ID, with circuit-path keywords mapped to their CA, BMC and OAM ports.',
    'Cross-Stack Label Printing: The browser cannot drive a label printer directly, so a small .NET service sits between — authenticating to the Laravel API with a service token, then driving the Brother SDK over COM interop to print equipment labels.',
  ],
  // Read in the order the work happens: open a project, read what extraction
  // produced, correct it on the assignment grid, then render and print.
  screenshots: [
    '/images/samsung/screenshot-rocks (71).webp', // projects dashboard
    '/images/samsung/screenshot-rocks (72).webp', // parsed port records
    '/images/samsung/screenshot-rocks (73).webp', // extracted fields
    '/images/samsung/screenshot-rocks (74).webp', // port assignment grid
    '/images/samsung/screenshot-rocks (75).webp', // live topology
  ],
};
