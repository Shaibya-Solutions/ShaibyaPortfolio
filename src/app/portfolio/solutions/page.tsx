import PortfolioSolutionsClient from "@/components/pages/portfolio/PortfolioSolutionsClient";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import { getProjects } from "@/lib/supabase/portfolio";

export const metadata = metadataFor("/portfolio/solutions");

export default async function SolutionsPortfolioPage() {
  const dynamicSolutions = await getProjects("solution");
  return (
    <>
      <JsonLd data={pageGraph("/portfolio/solutions", { type: "CollectionPage" })} />
      <PortfolioSolutionsClient projects={dynamicSolutions} />
    </>
  );
}
