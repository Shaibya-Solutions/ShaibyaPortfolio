import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/seo/services";
import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import ServiceContent from "@/components/pages/services/ServiceContent";
import { getProjects } from "@/lib/supabase/portfolio";

type ServicePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) notFound();
  return metadataFor(service.path);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const projects = service.slug === "software-solutions" ? await getProjects() : undefined;
  return (
    <>
      <JsonLd data={pageGraph(service.path, { service })} />
      <ServiceContent slug={service.slug} projects={projects} />
    </>
  );
}
