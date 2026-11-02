# SEO implementation and operations

## Exact code files

Read these executable files before the keyword recommendations:

| Purpose | File |
| --- | --- |
| Root Server Component and title template | `src/app/layout.tsx` |
| Typed, reusable metadata and canonical builder | `src/lib/seo/metadata.ts` |
| Unique titles, descriptions, sitemap dates and priorities for all 21 URLs | `src/data/seo/pages.ts` |
| Service `generateMetadata()` and `generateStaticParams()` | `src/app/services/[slug]/page.tsx` |
| Four existing service definitions | `src/data/seo/services.ts` |
| Native Next.js sitemap entry point | `src/app/sitemap.ts` |
| Sitemap builder: core, services and published articles | `src/lib/seo/sitemap.ts` |
| Native Next.js robots entry point | `src/app/robots.ts` |
| Verified public business information | `src/config/site.ts` |
| Organization, ProfessionalService, Service, FAQ, breadcrumb and article schemas | `src/lib/seo/schema.ts` |
| Server-rendered JSON-LD and safe serializer | `src/components/seo/JsonLd.tsx`, `src/lib/seo/serialize.ts` |
| Shared visible FAQ data | `src/data/seo/faqs.ts` |
| Future CMS/article adapter, currently no published articles | `src/data/seo/articles.ts` |
| Full future resource route template | `docs/seo/templates/resource-page.tsx.example` |
| Real 1200 × 630 social image | `public/images/seo/shaibya-social.png` |
| Social-image generator | `scripts/generate-seo-image.mjs` |
| Executable SEO checks | `tests/seo.test.ts` |

Existing page components, animations, palette and Proxima Nova styling are retained. The unused Google font build imports were removed because global CSS already overrides both font variables with Proxima Nova. The Contact hero now renders on the server as well as the client so its existing H1 is available to crawlers. Its design is unchanged. Contact information now shows the confirmed Nagpur location, hours and Google Maps link instead of unverified office locations.

## What changed

- Every existing URL has its own metadata. The root uses `%s | Shaibya Solutions`; the homepage uses an absolute branded title because Next.js handles the root segment's template differently. Descriptions are 155–160 characters, including spaces. Google can still rewrite titles and snippets and truncate them by pixel width.
- Canonical, Open Graph URL and sitemap share the owner-confirmed primary origin, `https://www.shaibyasolutions.com`. The homepage canonical may be serialized without the terminal slash; both represent the same root URL.
- All social cards use a real, publicly served 1200 × 630 PNG. The Organization logo references the real square logo asset rather than the nonexistent `/logo.png`.
- Four existing service URLs are pre-rendered through one typed dynamic route. Unknown service slugs return 404. Service components retain their previous structure and styling.
- Native `sitemap.ts` emits the 21 existing canonical pages. It joins the real service catalog and published article adapter, validates article slugs/dates, and rejects duplicates. Sitemap timestamps are actual recorded content-update dates, not the current request time.
- Native `robots.ts` permits public content and rendering assets, excludes private route prefixes and advertises the canonical sitemap. Robots exclusions are crawler preferences, not access control: future private routes still require authentication.
- Business JSON-LD appears in the initial HTML on every page. Each page adds its own WebPage, Service, FAQ or collection graph and breadcrumbs referencing the same Organization and WebSite IDs.
- FAQ markup uses the actual visible FAQ data. Repeated general FAQs are marked up on the homepage only; the six industry pages use their distinct visible FAQs. No invisible SEO questions or invented review/rating data are emitted.

## Business facts and verification

| Field | Confirmed value |
| --- | --- |
| Name | Shaibya Solutions |
| Phone / WhatsApp | +91 7498341146 |
| Email | shaibyasolutions@gmail.com |
| Address | Ramdaspeth, Nagpur, Maharashtra 440012, India |
| Hours | Every day, 00:00–23:59 (24-hour availability) |
| Google Business Profile | https://share.google/1MoPcjfD7EBA3eXP9 |
| Public LinkedIn | https://www.linkedin.com/company/108785057/ |
| Instagram | https://www.instagram.com/deepoffduty/ |

The supplied LinkedIn admin URL is converted to its public company URL. The environment cannot resolve the Google share link to a map pin. With the owner's agreement, exact coordinates are omitted; a city-centre coordinate would misrepresent the office. Add verified latitude/longitude to `verifiedBusinessDetails.geo` when available. GitHub and X/Twitter `sameAs` links are intentionally omitted until the official accounts are confirmed; the typed configuration has fields for both. No street number, price range, staffing claims or certifications are invented.

## Build, development and deployment

```sh
npm ci
npm run typecheck
npm run seo:check
npm run build
npm run seo:export-check
npm run dev -- --hostname 0.0.0.0 --port 3000
```

The repository uses Next.js 15.2.6 and production static export (`out/`). Development leaves export mode off so unknown dynamic-service slugs return normal 404 responses instead of Next.js's missing-export-parameter error. The dev script uses Webpack: the installed Turbopack version mishandled the `force-static` configuration on native sitemap/robots metadata routes. Production compilation uses the normal Next.js build.

`npm run seo:image` regenerates the checked-in social PNG. It is not required on every build. No SEO API keys are required. Set `GOOGLE_SITE_VERIFICATION` to the Search Console HTML verification token if using that verification method; otherwise DNS verification needs no code.

For a preview/staging export, set `SEO_ALLOW_INDEXING=false` **before building**. This emits `noindex` page metadata, a disallow-all robots file and an empty sitemap. Keep production indexing enabled and rebuild to apply changes. An already-blocked preview URL may need crawler access temporarily for Google to observe `noindex`; robots exclusions do not guarantee deindexing.

Production builds now validate TypeScript: the former `ignoreBuildErrors` override was removed after fixing all 17 baseline diagnostics. `npm run typecheck` also runs the complete repository check independently. Lint validation is still skipped by the existing configuration; no lint-pass claim is made. The fixes and validation results are recorded in `validation.md`.

The static host must serve clean URLs (`/about` → `/about.html`, `/services/software-solutions` → its exported HTML), serve `/robots.txt` as plain text and `/sitemap.xml` as XML, and return HTTP 404 for unknown URLs using `404.html`. Do not configure a universal HTTP-200 SPA fallback. Redirect HTTP and alternate hostnames to one HTTPS canonical host at the hosting layer. `next.config.js` redirects are unavailable with static export. The owner confirmed `www.shaibyasolutions.com` as the primary host. Configure permanent redirects from the non-www host and any former domains to this host.

## Publishing services and resources

For a real new service, add its original content/component, metadata record and service definition; extend `ServiceContent` to render it. The dynamic route and sitemap then pick it up. Preserve existing URLs unless there is a deliberate migration and a hosting-level 301 redirect.

No on-site blog currently exists. Planned keyword topics are **not** published, linked or inserted into the sitemap. To launch resources:

1. Create useful original articles with a clear byline, publication date, genuine updated date, 155–160 character description, optional 1200 × 630 share image and nonempty content sections.
2. Connect `getPublishedArticles()` to the CMS or a reviewed local data source. Return only published documents whose real route is ready; draft, scheduled and empty documents must be filtered out. The `PublishedArticle` contract uses `routeReady: true` to make this explicit.
3. Install the complete resource route from `templates/resource-page.tsx.example` as `src/app/resources/[slug]/page.tsx` together with that content. This uses `generateMetadata()`, static params, article Open Graph fields and BlogPosting JSON-LD. The template renders plain text safely; use a trusted renderer if adapting to rich text.
4. Add a useful resource index and contextual links. Update tests to include the real published inventory, rebuild the static export and verify every new sitemap URL returns HTTP 200.

With static export, publishing CMS content requires a deployment rebuild. Do not advertise nonexistent blog routes or use ISR-only assumptions.

## Local SEO and on-page checklist

### Google Business Profile

- Use the same business name, Ramdaspeth address, 440012 postcode, phone and confirmed hours in GBP, Contact and schema. Add a unit/building number only after confirmation. If this is a service-area business without a customer-facing office, follow GBP address-visibility rules rather than inventing a storefront.
- Set the primary category to the most accurate available software business category and list only real services. Use Nagpur as the primary local market and describe remote India/international delivery without creating fictitious offices.
- Set the GBP website destination to the canonical homepage. An optional tracking destination is `https://www.shaibyasolutions.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`; the page canonical stays query-free. Keep the Contact page's working Maps link.
- Add genuine business photos, current services and project updates, and request honest customer reviews without incentives. Do not add aggregate ratings to your own business schema to seek self-serving review stars.
- Verify the domain in Search Console, submit `/sitemap.xml`, inspect the homepage and software service, and monitor local queries, actual enquiries and GBP calls. Report performance from real data rather than assumed rankings.

### Heading hierarchy and content

- Use one descriptive H1 for the page's core purpose. Preserve the current visual style; future copy revisions can express “Custom Software & Business Automation” naturally rather than repeating location keywords in every heading.
- Use H2s for business problems, services, process, evidence, FAQs and the enquiry section. Use H3s for related capabilities, project examples or individual items within an H2. Choose heading levels for structure, not visual size; keep existing Tailwind classes when changing a tag.
- Service copy should explain the buyer's workflow, integrations, deliverables, discovery process and next action. Add local relevance where true: Nagpur contact details and actual local work. Publish outcomes, client names, industries and testimonials only where substantiated and permitted.
- Do not add hidden keyword paragraphs, duplicate city landing pages, invented experience or guaranteed savings. New landing pages require genuinely distinct offerings and useful original content.

### Images and performance

- Use `next/image` with descriptive alt text for meaningful imagery, explicit width/height or a stable `fill` container, and an appropriate `sizes` value. Decorative imagery uses `alt=""`; do not stuff keywords into image text.
- Example for a two-column case-study image: `sizes="(max-width: 768px) 100vw, 50vw"`. Hero imagery should request only the necessary resolution; use priority only for a real above-the-fold LCP image, lazy-load the rest, and reserve image dimensions to prevent layout shift.
- The current static export uses `images.unoptimized: true`, so `next/image` does **not** provide the runtime Next.js image optimizer. Supply compressed WebP/AVIF assets or an approved image CDN/custom loader with correctly generated variants. Do not assume adding `sizes` alone creates responsive variants with this setting.
- Audit on mobile with PageSpeed Insights/Search Console field data: target LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at the 75th percentile. Keep WebGL optional with fallbacks and defer heavy scenes below the fold. These are targets, not measured claims from this implementation.

### Internal links

- Link each industry page to the software/automation service using a descriptive, relevant anchor, and link that service to genuine industry examples in the existing portfolio. Link case studies back to the service that delivered them and to Contact.
- When original resource articles launch, connect each article to one relevant service and supporting case study; link useful articles from the corresponding service's FAQ/process section. Include an HTML resource index so sitemap discovery is not the only route.
- A future Nagpur location page should link to custom software, automation and verified local case studies. Services can link back to its real contact/location details. Avoid competing pages targeting the exact same intent.
- Retain normal `<a>`/Next `<Link>` navigation, descriptive anchor text, working section IDs and an obvious enquiry route. Avoid clickable `div` navigation or placeholder `href="#"` links.

### Structured data expectations

ProfessionalService is a LocalBusiness subtype; the graph includes the verified address, phone, Maps URL and daily hours. The absent geo field is intentional pending the exact pin. Service schema describes real offerings without fake pricing. Breadcrumbs use real existing parent destinations, not a nonexistent `/services` index.

FAQPage markup can help describe content, but Google currently limits FAQ rich results to well-known authoritative government/health sites. This B2B site should not expect FAQ rich snippets from adding schema. Valid structured data, sitemap priority and keyword use do not guarantee rankings or rich results. Check deployed pages in Google's Rich Results Test and Schema.org Validator; Search Console indexing checks require the actual public deployment.

References: [Next.js Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [Sitemaps](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [Robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots), [Google LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Google FAQ guidance](https://developers.google.com/search/docs/appearance/structured-data/faqpage), [GBP representation](https://support.google.com/business/answer/3038177).

## Validation

`npm run seo:check` verifies the metadata registry, canonical safety, real-route sitemap coverage, service slugs, confirmed NAP/hours, FAQ parity, JSON-LD escaping, crawler policy and actual social-image dimensions. Production-export and browser checks are reported in `validation.md`.
