# SEO validation — 2 November 2026

The [3 November UI audit](../ui-audit-2026-11-03.md) records the subsequent service showcase, marketing animation, social imagery and full-site responsive checks.

Validated locally on branch `add-on-branch`. No public deployment, Search Console submission or GBP edit was performed.

| Check | Result |
| --- | --- |
| `npm run seo:check` | 9 tests pass: metadata, canonical input safety, sitemap inventory, service routes, NAP/hours/profiles, visible FAQ parity, JSON-LD safety, robots and image dimensions |
| `npm run build` | Production static export succeeds; all existing pages, the four service slugs, sitemap, robots and 404 are emitted |
| `npm run seo:export-check` | 22 tests pass against actual exported HTML: all 21 public pages plus sitemap/robots/404 |
| HTML contents | Every public page has one server-rendered H1, exactly one brand suffix in its title, its unique 155–160 character description, canonical, matching OG URL/title/description, Twitter large-image card and valid JSON-LD |
| Crawler endpoints | `/robots.txt` and `/sitemap.xml` return HTTP 200 in the development server |
| Unknown service | `/services/not-a-real-service` returns HTTP 404 after development export-mode correction; production has a noindex 404 document |
| Browser rendering | Chromium at 1440 × 900 and 390 × 844: homepage, Contact, software service, 3D service and Privacy render with one H1, Proxima Nova, expected schema and no horizontal overflow |
| Browser errors | No uncaught browser exceptions across those ten page/viewport combinations |
| Contact facts | Verified postcode appears in the rendered contact content; existing layout and CTA styling retained |
| Social image | Actual PNG is 1200 × 630, visually inspected; referenced logo asset is 1254 × 1254 |
| Staging switch | Fresh-process check with `SEO_ALLOW_INDEXING=false` confirms noindex metadata, disallow-all robots and empty sitemap |
| `git diff --check` | Passes |
| `npm run typecheck` / `npx tsc --noEmit` | Passes across the entire repository with zero errors after resolving all 17 baseline diagnostics |
| Type-fix runtime checks | Chromium at 1440 × 900 and 390 × 844: gallery slides, arrows, dots and final scroll position work; globe and legacy Lenis animation frames are cancelled on unmount; no browser errors |

All 17 previously recorded TypeScript errors have been fixed:

| File | Diagnostics | Resolution |
| --- | --- | --- |
| `src/components/globe.tsx` | 1 | Replace COBE's removed `onRender` option with the installed v2 `update()` API; cancel the rotation frame before destroying the globe and retain stable default colours |
| `src/components/pages/community/CommunityClient.tsx` | 4 | Give icon components their actual size/className props and type the animation variants with Framer Motion's `Variants` |
| `src/components/pages/cybersecurity/CyberHeroSection.tsx` | 1 | Initialise the React 19 ref explicitly and type it with `GlobeMethods` |
| `src/components/shared/SmoothScrollProvider.tsx` | 1 | Use the installed `lenis` package and its `autoRaf` lifecycle instead of the missing legacy package and unmanaged animation loop |
| `src/components/ui/animated-testimonials.tsx` | 3 | Use the library's `Variants` type to preserve easing literals |
| `src/components/ui/gallery4.tsx` | 5 | Replace nonexistent named carousel exports with the installed Embla hook; retain card styling, arrows, dots and keyboard navigation; refresh navigation state after resize and use actual scroll positions for dots |
| `src/components/ui/nav-header.tsx` | 2 | Type dropdown icon props and reuse `NavItem`'s dropdown definition in the tab component |

`package.json` now exposes `npm run typecheck`, and `next.config.js` no longer allows TypeScript errors during production builds. The existing lint bypass remains: the repository's legacy `next lint` script is not a working lint setup for the installed Next.js version, so no lint-pass claim is made.

Public host checks and the Google share-link redirect are blocked by the cloud proxy (HTTP CONNECT 403). Exact office coordinates remain omitted by agreement. The owner confirmed `https://www.shaibyasolutions.com` as the primary domain; canonical URLs, sitemap, schemas and share images now use it. Public GitHub and X/Twitter accounts are unconfirmed and omitted. No live ranking, search-volume, Core Web Vitals, Rich Results Test or indexing result is claimed.

Future resource routes are not deployed. The sitemap adapter supports published resource records, and a complete route template is supplied; it must be installed with actual original content before those URLs are published or included in the sitemap. Static hosting must preserve clean URLs and real 404 status codes.

Reusable cloud `install_script` and `start_skill` were saved as a configuration draft. Review and save the environment settings, then publish the environment to retain that configuration for future tasks. Saving the draft does not publish the site or prove fresh-task restoration.
