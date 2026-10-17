// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://asim-ali-peerzada.github.io',
  base: '/AsimAli-Portfolio',
  output: 'static',
  // Legacy project slugs contained raw "&" "(" ")" which break sharing and
  // look unprofessional in SERPs. Pages now live at clean slugs; these keys
  // keep the old URLs working. In a static build Astro emits meta-refresh
  // redirect pages (a true 301 needs a redirecting host — e.g. a _redirects
  // file on Netlify or a redirect block on Vercel).
  redirects: {
    '/projects/sales-&-contact-management-(ccms)': '/projects/ccms',
    '/projects/shipment-tracker-&-ims': '/projects/shipment-tracker',
    // Near-identical keyword landing pages acted as doorway pages: they split
    // ranking authority across five URLs for the same intent. The homepage
    // now carries every target term in its own markup, so these fold into it
    // rather than disappearing — the old URLs keep resolving.
    '/laravel-developer': '/',
    '/php-developer': '/',
    '/backend-engineer': '/',
    '/enterprise-saas': '/',
    // The bio duplicated the homepage (Hero, Experience, Tech Stack, portrait
    // card) and drifted out of sync with the current positioning.
    '/about': '/',
    // A 128-word page with no form, whose only real job was putting "hire a
    // laravel developer" in an <h1>. The homepage already carries the full
    // contact form, so this folds into it.
    '/contact': '/',
  },
  image: {
    domains: ['asimali.is-a.dev'],
  },
  integrations: [
    sitemap({
      // lastmod lets Google prioritise recrawls of recently changed pages.
      // Without it every URL is treated as equally stale.
      serialize(item) {
        item.lastmod = item.lastmod ?? new Date().toISOString();
        return item;
      }
    }),
    react()
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
