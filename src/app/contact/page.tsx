import ContactClient from "@/components/pages/contact/ContactClient";
import { generalFaqs } from "@/data/seo/faqs";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = metadataFor("/contact");

export default function ContactPage() {
  return <><JsonLd data={pageGraph("/contact", { type: "ContactPage" })} /><ContactClient faqs={[...generalFaqs]} /></>;
}
