import type { SchemaDocument } from "@/lib/seo/schema";
import { serializeJsonLd } from "@/lib/seo/serialize";

// Server Component: structured data is present in the initial HTML response.
export default function JsonLd({ data, id }: { data: SchemaDocument; id?: string }) {
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
