import PortfolioSolutionsClient from "@/components/pages/portfolio/PortfolioSolutionsClient";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = metadataFor("/portfolio/solutions");

export default function SolutionsPortfolioPage() {
  return <><JsonLd data={pageGraph("/portfolio/solutions", { type: "CollectionPage" })} /><PortfolioSolutionsClient /></>;
}
