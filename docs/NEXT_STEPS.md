# Next Steps — C26 Aquatics

Generated 2026-06-19, after the site scaffold landed. Work top-to-bottom; nothing here is blocked by a future step unless explicitly noted.

---

## 1. Spot-check locally

```sh
npm run dev          # http://localhost:4321
```

Walk every route:

- [ ] `/` — hero, program split, coaches teaser, testimonials, service area, FAQ teaser, final CTA
- [ ] `/team` — training group tabs (Bronze / Silver / Gold / Platinum), team FAQs, CTA
- [ ] `/swim-lessons` — lesson tabs (Infant / Child / Youth / Teen-Adult / Private), lesson FAQs, CTA
- [ ] `/coaches` — 3 coach cards
- [ ] `/about` — story, pillars, service area section, testimonials, CTA
- [ ] `/faq` — full grouped FAQ
- [ ] `/404` — type a bogus URL after `npm run preview`

Resize the browser to ~700px to verify the mobile nav drawer, the FAQ accordion, and the tab UI all behave.

---

## 2. Fill in placeholder data

All of these live in single, predictable files. Search for `TODO` to find every one.

### `src/data/site.ts`

- [ ] `contact.email` — real address (currently `info@c26aquatics.com` placeholder)
- [ ] `contact.phone` and `contact.phoneDisplay`
- [ ] `address.streetAddress` (if a physical pool/office address should appear in schema)
- [ ] `social.instagram`, `social.facebook` (and add any others — Twitter/X, TikTok, YouTube)
- [ ] `booking.team` — the real external URL for team tryouts / interest form
- [ ] `booking.lessons` — the real external URL for lesson scheduling
- [ ] `ga4MeasurementId` — replace `G-XXXXXXXXXX`. **The consent banner stays silent until this is a real ID** — no GA tracking fires.

### Coach content

- [ ] `src/content/coaches/ruth.md` — confirm Ruth's full name and role; rewrite bio
- [ ] `src/content/coaches/placeholder-coach-3.md` — replace entirely (rename the file too) or delete if there are only two coaches
- [ ] Drop real headshot JPGs at `public/coaches/<slug>.jpg` (paths already referenced in coach frontmatter)

### About page story

- [ ] `src/pages/about.astro` — search for `TODO: replace with real story` and rewrite the founder-style placeholder paragraphs

### FAQ content

- [ ] `src/content/faqs/*.md` — review every answer. Anything tagged `surfaces: ['home', ...]` shows up on the home page **and** becomes a Google rich-snippet candidate, so keep those tight and accurate.

---

## 3. Push to GitHub and connect Netlify

```sh
git push -u origin main
```

In Netlify:

1. **Add new site → Import from GitHub** → pick `timothyfranzke/c26aquatics`.
2. Build settings should auto-detect from `netlify.toml` (build = `npm run build`, publish = `dist`, Node 20). Don't override.
3. First deploy will land at a `*.netlify.app` URL. Verify it builds.
4. **Add custom domain** → `c26aquatics.com` (and `www.c26aquatics.com` redirecting to apex, or vice versa — pick one as canonical). Netlify provisions an SSL cert automatically.
5. Update DNS at your registrar to point to Netlify's nameservers (or set the A/ALIAS + CNAME records Netlify shows you).

Once DNS resolves, every push to `main` deploys to production; PR branches get preview URLs at `deploy-preview-N--<sitename>.netlify.app`.

---

## 4. Pre-launch SEO checklist

Run these once the site is live at the real domain.

- [ ] **Google Search Console** — add the property, verify ownership (Netlify DNS makes this one click), submit `https://c26aquatics.com/sitemap-index.xml`.
- [ ] **Bing Webmaster Tools** — same idea. Cheap to do, occasionally drives traffic.
- [ ] **Rich Results Test** — paste each URL into [search.google.com/test/rich-results](https://search.google.com/test/rich-results). Confirm:
  - `/` shows `SportsOrganization` + `FAQPage`
  - `/team` shows `SportsTeam` + `FAQPage`
  - `/swim-lessons` shows `Service` + `FAQPage`
  - `/coaches` shows `ItemList` of `Person`
  - `/about` shows `AboutPage`
  - `/faq` shows the full `FAQPage` (13 questions)
- [ ] **Schema validator** — paste each URL into [validator.schema.org](https://validator.schema.org). No errors expected.
- [ ] **Lighthouse** — run on `/`, `/team`, `/swim-lessons` in an incognito browser. Target ≥ 95 for all four scores. If anything dips, common culprits are: large hero image (compress), missing image dimensions, font CLS.
- [ ] **`llms.txt`** — fetch `https://c26aquatics.com/llms.txt`; confirm it's served as text and the URLs are current.
- [ ] **`robots.txt`** — confirm reachable and the sitemap line is correct.
- [ ] **Open Graph preview** — paste the homepage URL into [opengraph.dev](https://www.opengraph.dev) or LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) to verify the OG card renders correctly.

---

## 5. Pre-launch QA

- [ ] All booking CTAs land on the right external page (team CTA → tryouts; lessons CTA → lesson signup).
- [ ] All `mailto:` and `tel:` links open the right thing on a real phone.
- [ ] Social links go to the right profiles.
- [ ] The consent banner shows on first visit, hides after Accept, never reappears.
- [ ] After Accept, confirm GA4 is firing in the Realtime report (only once a real measurement ID is in place).
- [ ] FAQ accordion: open every question, verify the answer matches what's in the JSON-LD (browser DevTools → Elements → search "FAQPage").
- [ ] Mobile menu: open, close via the X, close via backdrop tap, close via Esc, confirm body scroll is locked while open.
- [ ] Resize from 320px to 1600px — no horizontal scroll, no broken layouts.
- [ ] Try keyboard-only nav: Tab through, hit every link, every FAQ `<details>`, every tab in TrackTabs.
- [ ] Run [WAVE](https://wave.webaim.org/) on each page. Fix any contrast or label issues it flags.

---

## 6. Post-launch (week 1)

- [ ] Watch Search Console for crawl errors — fix anything that appears.
- [ ] Confirm GA4 is recording sessions and the booking CTAs are tracked as outbound clicks (GA4 auto-tracks outbound by default).
- [ ] If the site is meant to rank locally, claim/refresh the **Google Business Profile** and link it to the site. Match the `PostalAddress` in `src/data/site.ts` exactly.

---

## 7. Optional follow-ups (not blockers)

### Add Decap CMS for non-developer editing

Path planned for in the design. When ready:

1. Add `public/admin/index.html` with the Decap loader and `public/admin/config.yml` mapping `src/content/coaches/`, `training-groups/`, `lesson-tracks/`, `faqs/`, `testimonials/` as folder collections (fields mirror the Zod schemas in `src/content/config.ts`).
2. Enable Netlify Identity + GitHub OAuth so editors authenticate.
3. Editors then edit at `c26aquatics.com/admin` — saves become Git commits, which trigger Netlify deploys.

### Swap the inline sitemap back to `@astrojs/sitemap`

The pinned `@astrojs/sitemap` 3.7.3 doesn't support Astro 4.16's hook contract, so `astro.config.mjs` currently uses a small inline integration. When you next bump Astro or `@astrojs/sitemap`, test removing the inline one and using `sitemap({ changefreq: 'monthly', priority: 0.7 })` directly.

### Lighthouse CI on PRs

Drop a workflow at `.github/workflows/lighthouse.yml` that runs Lighthouse against PR preview deploys. Catches perf regressions before merge. Skip unless / until you start seeing regressions.

### Image hygiene

Replace the placeholder coach headshots with real, optimized images:

- Source: ~1200×1200 square, JPG, 80% quality, ≤200 KB each.
- Drop at `public/coaches/<slug>.jpg`.
- The site already serves them with explicit width/height to avoid CLS.

If hero / about / story photography lands, route those through `astro:assets` (`import heroImage from '@assets/hero.jpg'` then `<Image src={heroImage} … />`) so Astro generates the optimized WebP/AVIF variants automatically.

---

## 8. If something breaks

- **Build fails** → first `rm -rf node_modules .astro dist && npm install && npm run build`. Most build issues clear with a clean install.
- **Content schema error** → the message points at the offending file. Either fix the frontmatter or update the Zod schema in `src/content/config.ts`.
- **Sitemap not regenerating** → it's emitted by the `c26-inline-sitemap` integration in `astro.config.mjs`. Check the build log for the `[c26-inline-sitemap]` line.
- **GA4 not firing** → confirm `ga4MeasurementId` in `src/data/site.ts` isn't the placeholder, confirm the user clicked Accept, confirm `localStorage['c26-consent'] === 'granted'`.
