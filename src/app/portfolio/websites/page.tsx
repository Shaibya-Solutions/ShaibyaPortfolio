import PortfolioWebsitesClient from "@/components/pages/portfolio/PortfolioWebsitesClient";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import { getProjects } from "@/lib/supabase/portfolio";

export const metadata = metadataFor("/portfolio/websites");

export default async function WebsitesPortfolioPage() {
  const dynamicWebsites = await getProjects("website");
  return (
    <>
      <JsonLd data={pageGraph("/portfolio/websites", { type: "CollectionPage" })} />
      <PortfolioWebsitesClient projects={dynamicWebsites} />
    </>
  );
}
