import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { site } from "../src/config/site";
import { pageSeo, type PublicPath } from "../src/data/seo/pages";
import { services, getService } from "../src/data/seo/services";
import { getPublishedArticles } from "../src/data/seo/articles";
import { generalFaqs } from "../src/data/seo/faqs";
import { absoluteUrl, createPageMetadata, metadataFor, rootMetadata } from "../src/lib/seo/metadata";
import { businessGraph, pageGraph } from "../src/lib/seo/schema";
import { serializeJsonLd } from "../src/lib/seo/serialize";
import { buildSitemap } from "../src/lib/seo/sitemap";
import robots from "../src/app/robots";

test("all public routes have unique, branded metadata and 155–160 character descriptions", () => {
  const titles = new Set<string>();
  for (const path of Object.keys(pageSeo) as PublicPath[]) {
    const seo = pageSeo[path];
    assert.ok(seo.description.length >= 155 && seo.description.length <= 160, `${path}: ${seo.description.length}`);
    assert.ok(!seo.title.includes(site.name), path);
    assert.ok(!titles.has(seo.title), path);
    titles.add(seo.title);
    const metadata = metadataFor(path);
    assert.equal(metadata.alternates?.canonical, absoluteUrl(path));
    assert.equal(metadata.openGraph?.url, absoluteUrl(path));
    assert.equal(metadata.openGraph?.title, `${seo.title} | ${site.name}`);
    assert.equal(metadata.twitter?.title, metadata.openGraph?.title);
  }
  assert.deepEqual(rootMetadata.title, { default: `${pageSeo["/"].title} | ${site.name}`, template: `%s | ${site.name}` });
});

test("canonical builder rejects fragments, queries and external URL injection", () => {
  for (const path of ["//evil.example", "/\\evil.example", "/test?preview=1", "/test#anchor"] as const) assert.throws(() => absoluteUrl(path));
  assert.equal(new URL(absoluteUrl("/contact")).origin, site.url);
});

test("sitemap contains every real route exactly once and no unpublished resource routes", async () => {
  const sitemap = await buildSitemap();
  assert.equal(sitemap.length, Object.keys(pageSeo).length);
  assert.equal(new Set(sitemap.map((entry) => entry.url)).size, sitemap.length);
  for (const entry of sitemap) {
    const path = new URL(entry.url).pathname as PublicPath;
    assert.ok(path in pageSeo);
    assert.equal(entry.lastModified, pageSeo[path].modifiedAt);
    assert.ok(entry.priority !== undefined && entry.priority >= 0 && entry.priority <= 1);
    assert.ok(entry.changeFrequency);
  }
  assert.deepEqual(await getPublishedArticles(), []);
});

test("dynamic service routes only expose the four existing services", () => {
  assert.equal(services.length, 4);
  for (const service of services) {
    assert.equal(getService(service.slug), service);
    assert.ok(service.path in pageSeo);
    const graph = pageGraph(service.path, { service });
    const schema = graph["@graph"].find((entity) => entity["@type"] === "Service");
    assert.equal(schema?.provider["@id"], `${site.url}/#organization`);
    assert.equal(schema?.url, absoluteUrl(service.path));
  }
  assert.equal(getService("made-up-service"), undefined);
});

test("organization and local business use confirmed NAP, hours and public profiles", () => {
  const graph = businessGraph()["@graph"];
  const organization = graph.find((entity) => entity["@type"] === "Organization");
  const business = graph.find((entity) => entity["@type"] === "ProfessionalService");
  assert.ok(organization && business);
  assert.equal(business.telephone, "+917498341146");
  assert.deepEqual(business.address, organization.address);
  assert.equal(business.address.postalCode, "440012");
  assert.equal(business.address.streetAddress, "Ramdaspeth");
  assert.equal(business.geo, undefined);
  assert.equal(business.hasMap, site.googleBusinessProfile);
  assert.equal(business.openingHoursSpecification[0].dayOfWeek.length, 7);
  assert.equal(business.openingHoursSpecification[0].opens, "00:00");
  assert.equal(business.openingHoursSpecification[0].closes, "23:59");
  assert.deepEqual(organization.sameAs, [site.social.linkedin, site.social.instagram]);
  assert.ok(!JSON.stringify(graph).includes("/admin/"));
  assert.ok(!JSON.stringify(graph).includes("/logo.png"));
});

test("FAQ markup matches the questions and answers rendered on the page", () => {
  const faq = pageGraph("/", { faqs: generalFaqs })["@graph"].find((entity) => entity["@type"] === "FAQPage");
  assert.deepEqual(faq?.mainEntity.map((item) => ({ q: item.name, a: item.acceptedAnswer.text })), generalFaqs);
});

test("JSON-LD serialization prevents script termination and round-trips content", () => {
  const graph = pageGraph("/");
  const page = graph["@graph"].find((entity) => entity["@type"] === "WebPage");
  assert.ok(page && "description" in page);
  page.description = "</script><script>alert(1)</script>\u2028\u2029";
  const serialized = serializeJsonLd(graph);
  assert.ok(!serialized.includes("<"));
  assert.ok(!serialized.includes("\u2028"));
  assert.deepEqual(JSON.parse(serialized), graph);
});

test("robots allows assets, excludes private areas and advertises canonical sitemap", () => {
  const result = robots();
  assert.equal(result.sitemap, `${site.url}/sitemap.xml`);
  assert.ok(!Array.isArray(result.rules));
  const rules = result.rules as Exclude<typeof result.rules, unknown[]>;
  assert.equal(rules.allow, "/");
  assert.ok(rules.disallow?.includes("/admin"));
  assert.ok(rules.disallow?.includes("/api"));
  assert.ok(!JSON.stringify(rules).includes("_next"));
  const metadata = createPageMetadata({ path: "/contact", title: "Contact", description: "Contact us", noIndex: true });
  assert.equal(metadata.robots !== null && typeof metadata.robots === "object" && metadata.robots.index, false);
});

test("the advertised social image exists and has 1200 × 630 PNG dimensions", () => {
  const png = readFileSync(new URL(`../public${site.socialImage}`, import.meta.url));
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});
