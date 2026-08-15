import { aiCustomerSupport } from './ai-customer-support';
import { ccms } from './ccms';
import { enterpriseSso } from './enterprise-sso';
import { genealogy } from './genealogy';
import { shipmentTrackerIms } from './shipment-tracker-ims';
import { zametrix } from './zametrix';

export const projects = [
  ccms,
  enterpriseSso,
  genealogy,
  zametrix,
  shipmentTrackerIms,
  aiCustomerSupport,
] as const;

export type Project = (typeof projects)[number];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
