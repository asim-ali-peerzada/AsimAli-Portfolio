import { aiCustomerSupport as rawAiCustomerSupport } from './ai-customer-support';
import { ccms as rawCcms } from './ccms';
import { closeoutPackageSystem as rawCloseoutPackageSystem } from './closeout-package-system';
import { enterpriseSso as rawEnterpriseSso } from './enterprise-sso';
import { genealogy as rawGenealogy } from './genealogy';
import { jobPortal as rawJobPortal } from './job-portal';
import { samsungMigration as rawSamsungMigration } from './samsung';
import { shipmentTrackerIms as rawShipmentTrackerIms } from './shipment-tracker-ims';
import { zametrix as rawZametrix } from './zametrix';

/**
 * The authored shape of one project. Declared explicitly rather than inferred
 * from the data: `normalizeProject` has to accept the raw objects (where `image`
 * may still be an imported asset rather than a path), so inference would widen
 * every field to `any` and leak that through to every consumer.
 */
export interface Project {
  title: string;
  slug: string;
  badge?: string;
  description: string;
  niche: string;
  /** Always a resolved public path — `normalizeProject` rewrites imported assets. */
  image: string;
  tags?: string[];
  coreCapabilities?: string[];
  /** Blank hides the slot on the card. */
  year?: string;
  overview?: string;
  problem?: string;
  solution?: string;
  roleTitle?: string;
  platform?: string;
  role?: string;
  highlights?: string[];
  screenshots?: string[];
}

function resolveImage(img: unknown): string {
  if (typeof img === 'string') return img;
  if (img && typeof img === 'object' && 'src' in img) return (img as { src: string }).src;
  return String(img);
}

function normalizeProject(p: Record<string, unknown>): Project {
  const normalized = { ...p } as unknown as Project;
  if (normalized.image) normalized.image = resolveImage(normalized.image);
  if (normalized.screenshots && Array.isArray(normalized.screenshots)) {
    normalized.screenshots = normalized.screenshots.map((s) => resolveImage(s));
  }
  return normalized;
}

const aiCustomerSupport = normalizeProject(rawAiCustomerSupport);
const ccms = normalizeProject(rawCcms);
const closeoutPackageSystem = normalizeProject(rawCloseoutPackageSystem);
const enterpriseSso = normalizeProject(rawEnterpriseSso);
const genealogy = normalizeProject(rawGenealogy);
const jobPortal = normalizeProject(rawJobPortal);
const samsungMigration = normalizeProject(rawSamsungMigration);
const shipmentTrackerIms = normalizeProject(rawShipmentTrackerIms);
const zametrix = normalizeProject(rawZametrix);

export const projects: Project[] = [
  closeoutPackageSystem,
  enterpriseSso,
  ccms,
  jobPortal,
  genealogy,
  aiCustomerSupport,
  zametrix,
  shipmentTrackerIms,
  samsungMigration,
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
