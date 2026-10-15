import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  FileDiff,
  FolderTree,
  Images,
  LayoutTemplate,
  Layers,
  Mail,
  MapPin,
  MessagesSquare,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { Project } from '@/data/projects';
import {
  caseStudiesData,
  type EngineeringCaseStudy,
  type GalleryItem,
} from '@/data/caseStudies';

/**
 * Capability icon lookup. Keyed by each capability's `icon` field. An unknown
 * or missing key simply renders no badge, so adding a capability can never
 * break the page.
 */
const CAPABILITY_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
> = {
  Layers,
  Images,
  LayoutTemplate,
  FileCheck2,
  FileDiff,
  MapPin,
  Mail,
  MessagesSquare,
  FolderTree,
  ShieldCheck,
};

/**
 * Editorial case-study layout for a project detail page.
 *
 * Structure follows a fixed narrative: title, role/platform/year metadata,
 * hero image, then a repeated "heading — rule — prose" block for what the
 * system is, what was built, the problem, and the approach, each paired with a
 * supporting screenshot.
 *
 * The heading-and-rule pair is the signature element: the heading sits on one
 * line with a rule that fills the remaining width, so sections read as entries
 * in a ledger rather than stacked cards.
 */

/**
 * Section heading. The rule sits on its own row below the label rather than
 * sharing the line, so the question reads as a heading first and the divider
 * reads as a separator between blocks.
 */
function SectionHeading({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.12em] text-orange font-display">
        {children}
      </h2>
      <span aria-hidden="true" className="h-px w-full bg-white/15" />
    </div>
  );
}

function MetaItem({ label, value }: { readonly label: string; readonly value?: string }) {
  if (!value) return null;
  return (
    <div className="flex-1 basis-47.5 min-w-0">
      <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-widest text-orange font-display">
        {label}
      </p>
      <p className="mt-1.5 text-[14px] sm:text-[15px] leading-[135%] text-white/90 font-display">
        {value}
      </p>
    </div>
  );
}

/** Merge the bespoke narrative with shared project fields. */
function buildCaseStudy(project: Project): EngineeringCaseStudy {
  const known = caseStudiesData[project.slug];

  if (known) {
    return {
      ...known,
      // Shared project data wins for anything it has richer coverage of.
      problem: project.problem || known.problem,
      systemSummary: project.solution || known.systemSummary,
    };
  }

  // Projects without authored copy still render in the same structure.
  return {
    headlineSplit: [project.title.toUpperCase(), 'CASE STUDY'],
    tagline: project.description || project.niche,
    descriptor: project.niche,
    problem: project.problem || '',
    systemSummary: project.solution || project.overview || '',
    roleIntro: project.role || '',
    roleBullets: [],
    capabilities: (project.highlights || []).map((h, i) => ({
      num: String(i + 1).padStart(2, '0'),
      title: h.split(':')[0]?.trim() || `Capability ${i + 1}`,
      desc: h.includes(':') ? h.split(':').slice(1).join(':').trim() : h,
    })),
    diagram: null as never,
    challenge: {
      title: '',
      body: '',
      approach: '',
      decision: '',
      tradeoff: '',
    },
    outcomeParagraphs: project.keyTakeaway ? [project.keyTakeaway] : [],
    techCategories: [],
  };
}

/** Strip a "Lead: rest" prefix so it can be bolded inside the bullet. */
function splitLead(text: string): [string, string] {
  const idx = text.indexOf(':');
  if (idx === -1) return ['', text];
  const lead = text.slice(0, idx).replace(/\.$/, '');
  const rest = text.slice(idx + 1).trim();
  return [lead, rest];
}

function Lead({ text }: { readonly text: string }) {
  const [lead, rest] = splitLead(text);
  if (!lead) return <>{rest}</>;
  return (
    <>
      <strong className="font-semibold text-white">{lead}.</strong> {rest}
    </>
  );
}

/**
 * Full-screen screenshot viewer.
 *
 * The showcase screenshots are dense admin tables; at inline width a lot of the
 * interface is unreadable. Clicking a frame opens it at viewport scale with the
 * surrounding UI dimmed behind it. Navigation stays within the active group,
 * and Escape closes, so the reader never loses their place in the narrative.
 */
function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  readonly items: GalleryItem[];
  readonly index: number;
  readonly onClose: () => void;
  readonly onNavigate: (nextIndex: number) => void;
}) {
  const count = items.length;
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Native <dialog> + showModal() supplies the top layer, the background
  // inertness, focus containment and Escape-to-close that a hand-rolled
  // role="dialog" overlay has to re-implement — and usually gets wrong.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (dlg && !dlg.open) dlg.showModal();
  }, []);

  // Escape is handled natively, so the dialog closes itself without React
  // knowing. Mirror that back — otherwise the parent still thinks it is open,
  // the page stays scroll-locked, and the next open() is a no-op on an
  // element that is already closed.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const sync = () => onClose();
    dlg.addEventListener('close', sync);
    return () => dlg.removeEventListener('close', sync);
  }, [onClose]);

  // Arrow keys page through the gallery; Escape is handled natively.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNavigate((index + 1) % count);
      else if (e.key === 'ArrowLeft') onNavigate((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, count, onNavigate]);

  // Freeze the page behind the overlay so scroll doesn't leak through.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const item = items[index];
  const step = (delta: number) => onNavigate((index + delta + count) % count);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Screenshot ${index + 1} of ${count}`}
      className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none flex flex-col border-0 bg-black/90 p-0 text-white backdrop-blur-sm"
    >
      {/* Click-to-dismiss sits on a real button rather than on the <dialog>
          itself, so it carries native semantics and keyboard activation. It is
          transparent, sits behind the content, and is removed from the tab
          order because Escape and the labelled close button already provide
          the accessible way out. */}
      <button
        type="button"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full cursor-zoom-out"
      />

      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-mono text-[12px] text-white/60">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-2 sm:px-10 sm:pb-4">
        <img
          src={item.src}
          alt={item.caption || 'Screenshot'}
          decoding="async"
          className="max-h-full w-auto max-w-full object-contain"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </>
        )}
      </div>

      {item.caption && (
        <p className="mx-auto max-w-180 px-4 pb-6 text-center text-[13px] leading-[160%] text-white/70 font-display">
          {item.caption}
        </p>
      )}
    </dialog>
  );
}

/**
 * Grouped screenshot showcase.
 *
 * A flat stack of full-bleed screenshots loses the reader by the third frame:
 * every view looks like another dense table. Grouping them into pill tabs gives
 * each set a name; the caption and a per-image counter anchor each view, and
 * clicking a frame opens it full-bleed for the detail a dense table needs.
 */
function Showcase({
  gallery,
  groups,
  title,
}: {
  readonly gallery: GalleryItem[];
  readonly groups: { label: string; items: number[] }[];
  readonly title: string;
}) {
  // Drop groups whose indices no longer resolve, and append anything ungrouped
  // so a new screenshot is never silently invisible.
  const valid = groups
    .map((g) => ({ ...g, items: g.items.filter((n) => gallery[n]) }))
    .filter((g) => g.items.length > 0);
  const grouped = new Set(valid.flatMap((g) => g.items));
  // gallery[0] is already rendered as the hero above the showcase, so it is
  // excluded here — otherwise it would appear twice and manufacture an empty
  // "More" tab.
  const rest = gallery
    .map((_, i) => i)
    .filter((i) => i !== 0 && !grouped.has(i));
  if (rest.length) valid.push({ label: 'More', items: rest });

  const [active, setActive] = useState(0);
  const group = valid[Math.min(active, valid.length - 1)];
  // Local index into the active group; drives the lightbox when set.
  const [zoom, setZoom] = useState<number | null>(null);

  return (
    <section className="mt-14 flex flex-col gap-4">
      <SectionHeading>Inside the product</SectionHeading>

      {valid.length > 1 && (
        <div role="tablist" aria-label="Screenshot groups" className="flex flex-wrap gap-2">
          {valid.map((g, i) => (
            <button
              key={g.label}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors font-display ${
                i === active
                  ? 'border-orange/50 bg-orange/10 text-white'
                  : 'border-white/10 bg-white/3 text-muted hover:border-white/25 hover:text-white'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {group.items.map((n, i) => {
          const item = gallery[n];
          return (
            <figure key={item.src} className="flex flex-col gap-2.5">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setZoom(i)}
                  aria-label={`Open screenshot ${i + 1} of ${group.items.length} full size`}
                  className="block w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-white/2 transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/60"
                >
                  <img
                    src={item.src}
                    alt={`${title} — ${item.caption}`}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto"
                  />
                </button>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white/80 backdrop-blur"
                >
                  {i + 1} / {group.items.length}
                </span>
              </div>
              <figcaption className="max-w-180 text-[13.5px] leading-[165%] text-muted font-display">
                {item.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {zoom !== null && (
        <Lightbox
          items={group.items.map((n) => gallery[n])}
          index={zoom}
          onClose={() => setZoom(null)}
          onNavigate={setZoom}
        />
      )}
    </section>
  );
}

/**
 * Image block.
 *
 * Height is intrinsic (`h-auto`), so the whole screenshot is visible. An
 * earlier version capped the height and used `object-cover`, which cropped the
 * captures down to a centre slice and hid most of the interface.
 */
function Figure({
  src,
  alt,
  priority = false,
  className = '',
}: {
  readonly src: string;
  readonly alt: string;
  readonly priority?: boolean;
  readonly className?: string;
}) {
  if (!src) return null;
  return (
    <figure
      className={`w-full overflow-hidden rounded-xl border border-white/10 bg-white/2 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className="w-full h-auto"
      />
    </figure>
  );
}

export default function ProjectCaseStudy({ project }: { readonly project: Project }) {
  const cs = buildCaseStudy(project);
  const shortTitle = project.title.split(' (')[0].split(' — ')[0];

  // Six screenshots: the opening image plus one after each of the middle
  // sections. Projects with fewer simply render fewer.
  const shots = (project.screenshots || []).slice(0, 17);

  // Showcase is opt-in per project so the rollout can be judged on one page
  // before it is applied to the rest.
  const isShowcase = cs.layout === 'showcase';
  // Captions are authored per screenshot; fall back to the raw screenshot list
  // so a project that opts in without writing captions still renders.
  const gallery: GalleryItem[] = (cs.gallery?.length ? cs.gallery : shots).map((g: any) =>
    typeof g === 'string' ? { src: g, caption: '' } : g
  );

  // "What I built" — engineering contributions only. Deliberately capped at a
  // handful: a reader should get the three or four decisions that characterise
  // the work, not an inventory. Capability/scope detail lives in its own section
  // below so this list stays scannable for a hiring manager.
  const built: { lead: string; text: string }[] = [];
  const seen = new Set<string>();
  for (const b of cs.roleBullets || []) {
    const key = b.label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    built.push({ lead: b.label, text: b.text });
  }
  if (built.length === 0) {
    for (const h of project.highlights || []) {
      built.push({ lead: '', text: h });
    }
  }

  // Three header columns: a short role title (not the long-form paragraph), the
  // platform the system ships as, and the capability tags that describe what it
  // actually does. Tech-stack names live in the "What I built" and case-study
  // body, so they are deliberately not repeated here.
  // Three narrow metadata columns. Capabilities are handled separately below
  // as a full-width chip row: six of them joined on one line wrap into an
  // unreadable block inside a 190px column.
  const meta = [
    { label: 'Role', value: project.roleTitle },
    { label: 'Platform', value: project.platform },
    { label: 'Year', value: project.year },
  ].filter((m) => m.value);

  // `coreCapabilities` is the authored list for the case-study header. Projects
  // that don't define one fall back to the shorter `tags` used on the home card.
  const capabilities: string[] = project.coreCapabilities || project.tags || [];

  const displayTitle =
    cs.headlineSplit.filter(Boolean).join(' ') || project.title.toUpperCase();

  return (
    <div className="w-full flex flex-col">
      {/* Title block — label sits directly above the title, both left-aligned */}
      <header className="w-full">
        <p className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.12em] text-orange font-display">
          Case Study
        </p>

        {/* Display title. `project.title` often carries a parenthetical expansion
            ("CCMS (Client Contact Management System)") which wraps to two
            ragged lines; the authored headline reads as one clean block, which
            is what the reference does. Falls back to the project title when no
            authored headline exists. */}
        <h1 className="mt-3 text-[40px] sm:text-[62px] lg:text-[76px] font-bold text-white leading-[100%] tracking-[-0.02em] font-display">
          {displayTitle}
        </h1>
      </header>

      {/* Metadata — equal columns between two rules. No standfirst here: the project
         description belongs in "What is <project>?" further down. */}
      <div className="w-full mt-8 py-6 border-y border-white/10 flex flex-wrap gap-x-6 gap-y-6">
        {meta.map((m) => (
          <MetaItem key={m.label} label={m.label} value={m.value} />
        ))}
        {capabilities.length > 0 && (
          <div className="basis-full flex flex-col">
            <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-widest text-orange font-display">
              Core capabilities
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {capabilities.map((c) => (
                <li
                  key={c}
                  className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 leading-tight text-[12px] ${
                    isShowcase ? 'font-mono text-[#94A3B8]' : 'font-display text-white/90 text-[13px]'
                  }`}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Opening image.

          `project.image` is the cover art and belongs to the home-page project
          list — it is a composed thumbnail, not a view of the product. This
          page uses real application screenshots instead, so the first one
          carries priority as the LCP element. */}
      <Figure
        src={shots[0]}
        alt={`${shortTitle} — application interface`}
        priority
        className="mt-10"
      />

      {/* What is it */}
      {cs.tagline && (
        <section className="mt-14 flex flex-col gap-4">
          <SectionHeading>What is {shortTitle}?</SectionHeading>
          <p className="max-w-180 text-[15.5px] sm:text-[16.5px] leading-[170%] text-white/85 font-display">
            {project.overview || cs.systemSummary}
          </p>
        </section>
      )}

      {/* What I built */}
      {built.length > 0 && (
        <section className="mt-14 flex flex-col gap-4">
          <SectionHeading>What I built</SectionHeading>
          <ul className="flex flex-col gap-3 max-w-180">
            {built.map((b) => (
              <li
                key={b.lead || b.text.slice(0, 32)}
                className="relative pl-5 text-[15px] sm:text-[16px] leading-[165%] text-white/80 font-display"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.62em] h-1.25 w-1.25 rounded-full bg-orange"
                />
                {b.lead ? (
                  <>
                    <strong className="font-semibold text-white">{b.lead}.</strong>{' '}
                    {b.text}
                  </>
                ) : (
                  <Lead text={b.text} />
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* System scope — kept separate so it never inflates "What I built".
          Opt-in projects render it as cards so a ten-item list stays scannable. */}
      {(cs.capabilities || []).length > 0 && (
        <section className="mt-14 flex flex-col gap-5">
          <SectionHeading>System scope</SectionHeading>
          {isShowcase ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cs.capabilities.map((c) => {
                const Icon = c.icon ? CAPABILITY_ICONS[c.icon] : undefined;
                return (
                  <li
                    key={c.title}
                    className="flex flex-col gap-2.5 rounded-xl border border-white/10 bg-white/3 p-4 transition-colors hover:border-white/20 hover:bg-white/5"
                  >
                    {Icon && (
                      <span className="inline-flex size-9 items-center justify-center rounded-lg bg-orange/10 text-orange">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                    )}
                    <strong className="text-[14.5px] font-semibold leading-snug text-white font-display">
                      {c.title}
                    </strong>
                    <span className="text-[13.5px] leading-[160%] text-muted font-display">
                      {c.desc}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="flex flex-col gap-3.5 max-w-180">
              {cs.capabilities.map((c) => (
                <li key={c.title} className="text-[15px] sm:text-[16px] leading-[165%] text-white/80 font-display">
                  <strong className="font-semibold text-white">{c.title}.</strong> {c.desc}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Screenshots. Showcase projects group their views into pill tabs and
          frame each in window chrome with a caption, so the gallery reads as a
          set of explained views rather than a wall of tables. */}
      {isShowcase && gallery.length > 0 ? (
        <Showcase gallery={gallery} groups={cs.showcaseGroups || []} title={shortTitle} />
      ) : (
        shots.slice(1).map((src, i) => (
          <Figure
            key={src}
            src={src}
            alt={`${shortTitle} \u2014 screenshot ${i + 2}`}
            className="mt-12"
          />
        ))
      )}

      {/* Live link */}
      {cs.liveUrl && (
        <a
          href={cs.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex w-fit items-center gap-2 rounded-lg bg-orange px-5 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 font-display"
        >
          View live system
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </a>
      )}
    </div>
  );
}