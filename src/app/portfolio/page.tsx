import PortfolioClient from "@/components/pages/portfolio/PortfolioClient";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = metadataFor("/portfolio");

export default function PortfolioPage() {
  return <><JsonLd data={pageGraph("/portfolio", { type: "CollectionPage" })} /><PortfolioClient /></>;
}
