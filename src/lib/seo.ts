/**
 * SEO primitives shared across the remaining pages.
 *
 * The keyword landing pages that used to live here are gone: they were
 * near-duplicates of one another, which split ranking authority instead of
 * concentrating it. The homepage now carries every target term in its own
 * markup, and astro.config.mjs redirects the old slugs there.
 */

export const siteUrl = 'https://asimali.online';

/** Breadcrumbs for every landing page. Replaces the hand-rolled arrays. */
export function buildBreadcrumb(slug: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}/${slug}/#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": name,
        "item": `${siteUrl}/${slug}/`
      }
    ]
  };
}
