import SnyppitClient from "@/components/pages/snyppit/SnyppitClient";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = metadataFor("/snyppit");

export default function SnyppitPage() {
  return <><JsonLd data={pageGraph("/snyppit", { type: "WebPage" })} /><SnyppitClient /></>;
}
