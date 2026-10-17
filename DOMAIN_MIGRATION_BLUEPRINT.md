# SYSTEM BLUEPRINT & STRICT GUARDRAILS: MIGRATION TO `.is-a.dev`

## 1. PROJECT CONTEXT & MOTIVE
- **Owner:** Asim Ali Peerzada
- **Hosting Platform:** GitHub Pages (`asim-ali-peerzada.github.io`)
- **Previous State:** The portfolio was hosted on the custom domain `asimali.online` (purchased via GoDaddy in 2025).
- **The Problem:** The 1-year term expired, and renewal fee jumped to ~15,000 PKR/year. `asimali.online` is now offline/expired.
- **The Solution & Motive:** We are migrating the portfolio permanently to a 100% free developer subdomain (`asimali.is-a.dev`) via the `is-a-dev/register` GitHub repository, pointing directly to GitHub Pages (`asim-ali-peerzada.github.io`).
- **Why Strict Guardrails Exist:** The `is-a-dev/register` maintainers strictly review PRs for valid JSON schemas, proper formatting, and non-broken PR templates. Every rule below must be followed so the PR passes automated CI checks (`CI / Tests`).

---

## 2. PHASE 1: PORTFOLIO SOURCE CODE CLEANUP (LOCAL REPO)
Human reviewers at `is-a.dev` manually visit the preview/live URL to verify that the site is a complete, working software development portfolio.

### Completed Tasks:
1. **Search and Replace Dead Domain References:**
   - Updated all references from `asimali.online` to `asimali.is-a.dev` across `astro.config.mjs`, `public/CNAME`, `public/robots.txt`, `public/llms.txt`, `README.md`, `src/lib/seo.ts`, `src/layouts/Layout.astro`, blog, and project routes.
2. **Local CNAME Configuration:**
   - `public/CNAME` contains exactly: `asimali.is-a.dev`.
3. **Build & Completeness:**
   - Verified clean build (`npm run build`) with valid sitemap (`dist/sitemap-0.xml`) and 0 errors.
4. **Deploy:**
   - Pushed to `main` on `asim-ali-peerzada/AsimAli-Portfolio` to trigger `.github/workflows/deploy.yml`.

---

## 3. PHASE 2: `is-a-dev/register` RECORD SPECIFICATION
Because this is hosted on GitHub Pages, **no TXT verification file (`_vercel`) is required**. Only a single domain file is needed.

### File: `domains/asimali.json`
```json
{
  "owner": {
    "username": "asim-ali-peerzada",
    "email": "asimalipeerzada@gmail.com"
  },
  "records": {
    "CNAME": "asim-ali-peerzada.github.io"
  }
}
```

### Critical JSON & Filename Guardrails:
- **NO Extra Keys:** Keep only `"owner"` and `"records"`. Do NOT add `"domain"`, `"description"`, `"repo"`, or `"proxied"`.
- **NO Protocols or Trailing Slashes in CNAME:**
  - ❌ WRONG: `"CNAME": "https://asim-ali-peerzada.github.io/"` or `"CNAME": "asim-ali-peerzada.github.io."`
  - ✅ RIGHT: `"CNAME": "asim-ali-peerzada.github.io"`
- **Filename Rules:**
  - Placed strictly inside `domains/` folder.
  - 100% lowercase alphanumeric (`domains/asimali.json`).
  - Must NOT include `.is-a.dev` in the filename (never `domains/asimali.is-a.dev.json`).
- **Formatting:**
  - Valid JSON, 2-space indentation, no trailing commas, single trailing newline.
- **Git Commit Hygiene in is-a-dev/register fork:**
  - Only `domains/asimali.json` in git diff.
  - Clean commit message: `Register asimali.is-a.dev`
  - No `Co-Authored-By` trailer.

---

## 4. PHASE 3: PULL REQUEST TEMPLATE GUARDRAILS
The `is-a-dev-bot` runs an automated regex parser on the Pull Request description.

### Rules for the PR Body:
- **Keep all HTML comment markers (`<!-- ... -->`).** Write between the comment markers.
- **Strict Checkbox Syntax:** Mark every checkbox with `- [x]` (lowercase x, no spaces inside brackets).
- **Website Preview Requirement:** `https://asim-ali-peerzada.github.io`
- **Website Purpose:** `Personal software engineering portfolio website.`
- **No AI Watermarks:** Do not include AI attribution tags or robotic PR summaries.