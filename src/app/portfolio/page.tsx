import PortfolioClient from "@/components/pages/portfolio/PortfolioClient";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import { getProjects } from "@/lib/supabase/portfolio";

export const metadata = metadataFor("/portfolio");

export default async function PortfolioPage() {
  const dynamicProjects = await getProjects();
  return (
    <>
      <JsonLd data={pageGraph("/portfolio", { type: "CollectionPage" })} />
      <PortfolioClient initialProjects={dynamicProjects} />
    </>
  );
}
