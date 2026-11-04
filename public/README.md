# SitePulse fix bundle for https://vetguard.io

Generated 2026-11-04. Score at audit time: 79/100.

## Deploy (fastest wins first)
1. **robots.txt** — upload to site root. Merged with your existing file (other rules kept). Diff it against the live file before deploying.
2. **Redirects** — apply the file matching your host from `redirects/` (0 rule(s)).
3. **sitemap.xml** and **llms.txt** — upload to site root. The sitemap covers only the 21 pages crawled; for large sites generate it from your CMS instead.
4. **JSON-LD** — add from `jsonld/inject.html`. FAQPage/Product/Article are drafts: remove or correct anything not literally true on the page.
5. **IndexNow key file** — upload `338b8a232a904317e7aa237295fae91f.txt` to site root, then use "Ping IndexNow" in the Automation tab.
6. **Content** — publish improved pages from `content/bluff-rewrites.md` and write pages for the gap queries below.
7. Click **Verify live** in the Automation tab to confirm each fix is actually reachable.

## Checklist
### Fix
- nothing flagged
### Build
- [ ] **Publish content for “common vetguard mistakes to avoid”** (medium) — awareness stage gap (similarity 0.224)
- [ ] **Publish content for “vetguard comparison for small teams”** (medium) — consideration stage gap (similarity 0.235)
### Structure
- [ ] **Apply BLUFF rewrites** (medium) — 6 sections ready in Content Rewriter
- [ ] **Inject JSON-LD** (high) — 10% of pages currently have structured data
