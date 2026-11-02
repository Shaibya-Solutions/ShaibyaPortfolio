import CommunityClient from "@/components/pages/community/CommunityClient";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = metadataFor("/community");

export default function CommunityPage() {
  return <><JsonLd data={pageGraph("/community", { type: "CollectionPage" })} /><CommunityClient /></>;
}
