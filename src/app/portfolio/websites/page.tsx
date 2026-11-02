import PortfolioWebsitesClient from "@/components/pages/portfolio/PortfolioWebsitesClient";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = metadataFor("/portfolio/websites");

export default function WebsitesPortfolioPage() {
  return <><JsonLd data={pageGraph("/portfolio/websites", { type: "CollectionPage" })} /><PortfolioWebsitesClient /></>;
}
