import PortfolioRndClient from "@/components/pages/portfolio/PortfolioRndClient";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import { getProjects } from "@/lib/supabase/portfolio";

export const metadata = metadataFor("/portfolio/rnd");

export default async function RNDPortfolioPage() {
  const dynamicRnd = await getProjects("rnd");
  return (
    <>
      <JsonLd data={pageGraph("/portfolio/rnd", { type: "CollectionPage" })} />
      <PortfolioRndClient projects={dynamicRnd} />
    </>
  );
}
