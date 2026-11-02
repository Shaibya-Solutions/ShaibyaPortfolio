import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";
import { pageSeo, type PublicPath } from "../src/data/seo/pages";
import { absoluteUrl } from "../src/lib/seo/metadata";
import { site } from "../src/config/site";

// Read the actual production export, including Next.js metadata resolution.
// Run npm run build first; source-level checks cannot catch title-template mistakes.
function decode(value: string): string {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
function attributes(tag: string): Record<string, string> {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
}

for (const path of Object.keys(pageSeo) as PublicPath[]) {
  test(`production HTML: ${path}`, () => {
    const filename = path === "/" ? "out/index.html" : `out${path}.html`;
    assert.ok(existsSync(filename), `Missing export: ${filename}; run npm run build first.`);
    const html = readFileSync(filename, "utf8");
    const meta = Object.fromEntries([...html.matchAll(/<meta\s[^>]+>/g)].map(([tag]) => {
      const attrs = attributes(tag);
      return [attrs.name ?? attrs.property, attrs.content];
    }));
    const canonical = [...html.matchAll(/<link\s[^>]+>/g)].map(([tag]) => attributes(tag)).find((attrs) => attrs.rel === "canonical")?.href;
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    assert.equal(title, `${pageSeo[path].title} | ${site.name}`);
    assert.equal(meta.description, pageSeo[path].description);
    assert.ok(canonical);
    assert.equal(new URL(canonical).href, absoluteUrl(path));
    assert.equal(meta["og:url"], canonical);
    assert.equal(meta["og:title"], title);
    assert.equal(meta["og:description"], meta.description);
    assert.equal(meta["og:type"], "website");
    assert.equal(meta["og:image"], absoluteUrl(site.socialImage));
    assert.equal(meta["twitter:card"], "summary_large_image");
    assert.equal(meta["twitter:title"], title);
    assert.equal(meta["twitter:description"], meta.description);
    const withoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.equal([...withoutScripts.matchAll(/<h1\b/g)].length, 1, "One H1 must exist in initial HTML.");
    const graphs = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
      .filter(([, attrs]) => attributes(attrs).type === "application/ld+json")
      .flatMap(([, , content]) => JSON.parse(content)["@graph"] as { "@id": string; "@type": string }[]);
    assert.equal(graphs.filter((entity) => entity["@type"] === "Organization").length, 1);
    assert.equal(graphs.filter((entity) => entity["@type"] === "ProfessionalService").length, 1);
    assert.equal(new Set(graphs.map((entity) => entity["@id"])).size, graphs.length);
    if (path.startsWith("/services/")) assert.ok(graphs.some((entity) => entity["@type"] === "Service"));
    if (path === "/" || path.startsWith("/industry/")) assert.ok(graphs.some((entity) => entity["@type"] === "FAQPage"));
  });
}

test("production sitemap and robots are exported correctly", () => {
  const xml = readFileSync("out/sitemap.xml", "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  assert.deepEqual(urls, (Object.keys(pageSeo) as PublicPath[]).map(absoluteUrl).sort());
  const robots = readFileSync("out/robots.txt", "utf8");
  assert.ok(robots.includes(`Sitemap: ${site.url}/sitemap.xml`));
  assert.ok(robots.includes("Disallow: /admin"));
  assert.ok(!robots.includes("_next"));
  const notFound = readFileSync("out/404.html", "utf8");
  assert.match(notFound, /<meta name="robots" content="noindex"/);
});
