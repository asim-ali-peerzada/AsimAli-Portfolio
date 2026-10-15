# Action Plan — asimali.online

**Date:** 2026-10-13
**Goal:** Rank for `laravel developer`, `laravel software developer`, `laravel software developer portfolio`, `PHP developer`, `software engineer`, `backend engineer`, `enterprise SaaS`

---

## Reality check first

You rank for `laravel backend developer portfolio` and not `laravel developer` — **that's not a bug, it's competition tier.**

- `laravel backend developer portfolio` → low competition, few exact-match pages. Your title matches the string verbatim. You win.
- `laravel developer` / `laravel software developer` → head terms fought by Behance, Dribbble, Dev.to, Medium, career directories, LinkedIn. Sites with 100–1000+ backlinks and 5–10 year domain histories.

**No tag tuning beats 500 backlinks.** What actually moves head terms:

1. **More indexable pages** — 8 → 30+. This is the biggest lever by far.
2. **Topical authority** — Google must see your domain *owns* Laravel, not that one page mentions it.
3. **Off-site authority** — GitHub, LinkedIn, directories, guest posts.

**Realistic expectation:** the service pages below put you in contention for long-tail (`hire laravel developer`, `laravel developer portfolio`, `laravel api developer`). Head term `laravel developer` is a 6–12 month play that needs both (1) and (3).

---

## P0 — Done now (this session)

### ✅ 1. H1 rewritten with target keyword
- **Was:** `BACKEND ENGINEER`
- **Now:** `LARAVEL SOFTWARE DEVELOPER` + role subtitle
- **Why:** strongest single on-page relevance signal now matches target queries

### ✅ 2. Title tag retargeted (77 → 57 chars)
- **Was:** `Asim Ali — Laravel Backend Developer & Enterprise SaaS Engineer | Portfolio`
- **Now:** `Asim Ali — Laravel Developer & PHP Backend Engineer`
- **Why:** under 60 chars (no SERP truncation), covers `laravel developer` + `php backend engineer`, still hits the query you already ranked for

### ✅ 3. Service/skill pages created
The core fix. New pages, each targeting one query cluster:

| URL | Targets |
|---|---|
| `/laravel-developer` | `laravel developer`, `laravel software developer portfolio`, `laravel developer portfolio` |
| `/php-developer` | `php developer`, `php laravel developer` |
| `/backend-engineer` | `backend engineer`, `software engineer` |
| `/enterprise-saas` | `enterprise saas developer`, `enterprise software` |

Each has: unique title/meta, canonical, `Service` JSON-LD, breadcrumbs, FAQ section, and internal links back to projects + the home page.

### ✅ 4. About page created (`/about`)
E-E-A-T: bio, expertise detail, work history, sameAs links, `Person` + `ProfilePage` schema. Supports all `about`/`who is` query variants.

### ✅ 5. Contact page created (`/contact`)
Captures `contact`, `hire`, `email`, `freelance` long-tail. `ContactPage` schema.

### ✅ 6. Homepage expanded 473 → 745 words
Rewrote the hero H1/subheading, portrait bio, and footer to lead with Laravel and PHP. Keyword density now: laravel 16, backend 13, saas 10, php 8, developer 8, engineer 7.

**Still the largest remaining gap.** 745 words is below the 1200–2000 a competitive head term needs. This is why the next step (blog posts, P1 item 9) matters more than further on-page tuning — each post adds topical depth the homepage alone cannot carry.

### ✅ 7. Sitemap `lastmod` added
All URLs now carry `<lastmod>`. Free recrawl-priority signal.

---

## P1 — Next 2 weeks

### 8. Fix project slug special characters
`/projects/sales-&-contact-management-(ccms)/` → `/projects/ccms/`
`/projects/shipment-tracker-&-ims/` → `/projects/shipment-tracker/`

Add 301 redirects from old slugs. Raw `&`, `(`, `)` break social sharing and look unprofessional in SERPs.

### 9. Write 5 blog posts
Each targets a long-tail query, links internally to service pages. Suggested:
- `How I Structure a Laravel Application for Long-Term Maintenance`
- `Laravel Multi-Tenancy: Approaches and When to Use Each`
- `Fixing N+1 Queries in Laravel: A Practical Guide`
- `Queue-Based Background Jobs in Laravel at Scale`
- `What 3 Years Building Enterprise SaaS Taught Me About PHP`

### 10. Add FAQ schema
**Note:** FAQPage rich results are restricted to government/healthcare sites — do **not** add FAQPage schema. Keep FAQs as visible HTML content only (already done).

---

## P2 — Next 30 days

### 11. Off-site authority (the real head-term unlock)
Your GitHub has **0 followers and 9 public repos**. That's the weakest link for E-E-A-T on a developer query.

- GitHub profile README + repo descriptions with Laravel/PHP keywords (bio already optimized — verified)
- LinkedIn headline: "Laravel Backend Engineer" not "Software Engineer"
- Submit to dev directories: Dev.to, Hashnode, Laravel News community
- Guest post on Laravel blogs
- Add `sameAs` links from your portfolio to all of these

### 12. Target the third-party profiles that DO rank
Behance and the others beating you are page-1 for a reason. Get on them:
- **Behance** — upload project case studies
- **Dribbble** — project shots
- **GitHub Pages** — keep a public copy for extra domain relevance
- **LinkedIn Featured section** — link to your portfolio

### 13. Backlinks
Portfolio links from dev blogs, Laravel community spaces, Pakistan tech directories.

---

## P3 — Ongoing

- Submit sitemap in Google Search Console + Bing Webmaster Tools
- Monitor Search Console "Queries" — this is your ground truth for which keywords move
- Add `BreadcrumbList` to all service pages (done)
- Re-run `/seo audit https://asimali.online` monthly
- Retry PageSpeed for Core Web Vitals (API was rate-limited this session)

---

## What to actually search to verify progress

Don't check `laravel developer` — check the long-tail that the new pages target:

- `laravel developer portfolio` ← highest chance of movement
- `hire laravel developer`
- `php developer portfolio`
- `laravel api developer`
- `enterprise saas developer`
- `asim ali laravel`

Expect movement in 2–6 weeks. Head terms in 6–12 months, and only with P2 executed.