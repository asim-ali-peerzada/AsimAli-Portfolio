# asimali.online

Personal portfolio of Asim Ali — backend developer working mainly in PHP and Laravel.

**Live:** <https://asimali.online>

Built with [Astro](https://astro.build) with React islands and Tailwind CSS, deployed to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Structure

- `src/pages` — routes (static pages plus one dynamic `[slug]` route for project case studies)
- `src/data` — project and case-study content
- `public` — static assets and root-served files (favicon, robots.txt, resume PDF, …)

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
