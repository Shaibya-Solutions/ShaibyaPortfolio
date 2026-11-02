import AboutClient from "@/components/pages/about/AboutClient";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = metadataFor("/about");

export default function AboutPage() {
  return <><JsonLd data={pageGraph("/about", { type: "AboutPage" })} /><AboutClient /></>;
}
