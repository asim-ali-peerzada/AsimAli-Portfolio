import { aiCustomerSupport as rawAiCustomerSupport } from './ai-customer-support';
import { ccms as rawCcms } from './ccms';
import { enterpriseSso as rawEnterpriseSso } from './enterprise-sso';
import { genealogy as rawGenealogy } from './genealogy';
import { shipmentTrackerIms as rawShipmentTrackerIms } from './shipment-tracker-ims';
import { zametrix as rawZametrix } from './zametrix';

function resolveImage(img: unknown): string {
  if (typeof img === 'string') return img;
  if (img && typeof img === 'object' && 'src' in img) return (img as { src: string }).src;
  return String(img);
}

function normalizeProject(p: any): any {
  const normalized = { ...p };
  if (normalized.image) normalized.image = resolveImage(normalized.image);
  if (normalized.screenshots && Array.isArray(normalized.screenshots)) {
    normalized.screenshots = normalized.screenshots.map((s: any) => resolveImage(s));
  }
  return normalized;
}

const aiCustomerSupport = normalizeProject(rawAiCustomerSupport as any) as any;
const ccms = normalizeProject(rawCcms as any) as any;
const enterpriseSso = normalizeProject(rawEnterpriseSso as any) as any;
const genealogy = normalizeProject(rawGenealogy as any) as any;
const shipmentTrackerIms = normalizeProject(rawShipmentTrackerIms as any) as any;
const zametrix = normalizeProject(rawZametrix as any) as any;

const projects = [genealogy, ccms, aiCustomerSupport, zametrix, enterpriseSso, shipmentTrackerIms];

export function getProjectBySlug(slug: string) {
  return projects.find((p: any) => p.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((p: any) => p.slug);
}

export { aiCustomerSupport, ccms, enterpriseSso, genealogy, shipmentTrackerIms, zametrix };
