import PortfolioRndClient from "@/components/pages/portfolio/PortfolioRndClient";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = metadataFor("/portfolio/rnd");

export default function RndPortfolioPage() {
  return <><JsonLd data={pageGraph("/portfolio/rnd", { type: "CollectionPage" })} /><PortfolioRndClient /></>;
}
