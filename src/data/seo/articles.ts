export interface PublishedArticle {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt: string;
  image?: `/${string}`;
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
  /** Set only after the real article route and its original content are live. */
  routeReady: true;
}

// No on-site blog currently exists. Do not index planned topics or external Medium URLs.
// A CMS adapter can return published, route-ready articles using this same interface.
export async function getPublishedArticles(): Promise<readonly PublishedArticle[]> {
  return [];
}

export async function getPublishedArticle(slug: string): Promise<PublishedArticle | undefined> {
  return (await getPublishedArticles()).find((article) => article.routeReady && article.slug === slug);
}
