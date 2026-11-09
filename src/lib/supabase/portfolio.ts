import { supabase, supabaseAdmin } from "./client";
import { allProjects, type Project, type ProjectType } from "@/data/projects";
import { testimonials as defaultTestimonials } from "@/data/index";
import { TEAM_MEMBERS, type CrewMember } from "@/data/team";
import { OPEN_ROLES } from "@/data/careers";
import { generalFaqs } from "@/data/seo/faqs";
import { getImageUrl } from "@/lib/imagekit";

// ─── HELPER: MAP DB PROJECT ROW TO TYPE ───
function mapDbProject(row: any): Project {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    type: row.type as ProjectType,
    industry: row.industry,
    client: row.client,
    clientLogo: row.client_logo ? getImageUrl(row.client_logo) : undefined,
    liveUrl: row.live_url || undefined,
    year: row.year,
    problem: row.problem,
    solution: row.solution,
    keyFeatures: Array.isArray(row.key_features) ? row.key_features : [],
    techStack: Array.isArray(row.tech_stack) ? row.tech_stack : [],
    stats: Array.isArray(row.stats) ? row.stats : [],
    thumbnail: getImageUrl(row.thumbnail),
    thumbnailAlt: row.thumbnail_alt || row.name,
    imageCaption: row.image_caption || undefined,
    screenshots: Array.isArray(row.screenshots) ? row.screenshots.map((s: string) => getImageUrl(s)) : [],
    brandColor: row.brand_color || undefined,
    testimonial: row.testimonial || undefined,
    servicesDelivered: Array.isArray(row.services_delivered) ? row.services_delivered : [],
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: Boolean(row.featured),
    confidential: Boolean(row.confidential),
    status: row.status || "Production",
    collaborator: row.collaborator || undefined,
  };
}

// ─── PROJECTS ───
export async function getProjects(type?: ProjectType): Promise<Project[]> {
  try {
    let query = supabase.from("projects").select("*").order("sort_order", { ascending: true });
    if (type) {
      query = query.eq("type", type);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data.map(mapDbProject);
    }
  } catch (err) {
    console.warn("Supabase getProjects fallback to static data:", err);
  }

  // Fallback to static data with ImageKit resolution
  const fallback = type ? allProjects.filter((p) => p.type === type) : allProjects;
  return fallback.map((p) => ({
    ...p,
    thumbnail: getImageUrl(p.thumbnail),
    screenshots: p.screenshots?.map((s) => getImageUrl(s)),
    clientLogo: p.clientLogo ? getImageUrl(p.clientLogo) : undefined,
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single();
    if (!error && data) {
      return mapDbProject(data);
    }
  } catch (err) {
    console.warn("Supabase getProjectBySlug fallback to static data:", err);
  }

  const p = allProjects.find((proj) => proj.slug === slug);
  if (!p) return undefined;
  return {
    ...p,
    thumbnail: getImageUrl(p.thumbnail),
    screenshots: p.screenshots?.map((s) => getImageUrl(s)),
    clientLogo: p.clientLogo ? getImageUrl(p.clientLogo) : undefined,
  };
}

// ─── TESTIMONIALS ───
export async function getTestimonials() {
  try {
    const { data, error } = await supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) {
      return data.map((t: any) => ({
        id: t.id,
        title: t.title,
        rating: t.rating,
        text: t.text,
        author: t.author,
        role: t.role,
      }));
    }
  } catch (err) {
    console.warn("Supabase getTestimonials fallback to static data:", err);
  }
  return defaultTestimonials;
}

// ─── TEAM MEMBERS ───
export async function getTeamMembers(): Promise<CrewMember[]> {
  try {
    const { data, error } = await supabase.from("team_members").select("*").order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) {
      return data.map((m: any, idx: number) => {
        const defaultMatch = TEAM_MEMBERS[idx] || TEAM_MEMBERS[0];
        return {
          codename: m.codename,
          dayJob: m.day_job,
          nightSkill: m.night_skill,
          location: m.location,
          hoverQuote: m.hover_quote,
          icon: defaultMatch.icon,
          color: m.color,
          image: m.image ? getImageUrl(m.image) : defaultMatch.image,
          handle: m.handle,
          url: m.url,
        };
      });
    }
  } catch (err) {
    console.warn("Supabase getTeamMembers fallback to static data:", err);
  }
  return TEAM_MEMBERS;
}

// ─── CAREERS ROLES ───
export async function getCareersRoles() {
  try {
    const { data, error } = await supabase
      .from("careers_roles")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) {
      return data.map((r: any) => ({
        id: r.role_id,
        title: r.title,
        team: r.team,
        experience: r.experience,
        description: r.description,
        responsibilities: r.responsibilities || [],
        applicationNote: r.application_note,
      }));
    }
  } catch (err) {
    console.warn("Supabase getCareersRoles fallback to static data:", err);
  }
  return OPEN_ROLES;
}

// ─── FAQS ───
export async function getFaqs() {
  try {
    const { data, error } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) {
      return data.map((f: any) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
      }));
    }
  } catch (err) {
    console.warn("Supabase getFaqs fallback to static data:", err);
  }
  return generalFaqs;
}

// ─── ADMIN MUTATIONS ───
export async function upsertProject(project: Partial<Project> & { slug: string }) {
  const payload = {
    slug: project.slug,
    name: project.name,
    tagline: project.tagline,
    type: project.type,
    industry: project.industry,
    client: project.client,
    client_logo: project.clientLogo,
    live_url: project.liveUrl,
    year: project.year,
    problem: project.problem,
    solution: project.solution,
    key_features: project.keyFeatures,
    tech_stack: project.techStack,
    stats: project.stats,
    thumbnail: project.thumbnail,
    thumbnail_alt: project.thumbnailAlt,
    image_caption: project.imageCaption,
    screenshots: project.screenshots,
    brand_color: project.brandColor,
    testimonial: project.testimonial,
    services_delivered: project.servicesDelivered,
    tags: project.tags,
    featured: project.featured,
    confidential: project.confidential,
    status: project.status,
    collaborator: project.collaborator,
    updated_at: new Date().toISOString(),
  };

  return supabaseAdmin.from("projects").upsert(payload, { onConflict: "slug" });
}

export async function deleteProject(slug: string) {
  return supabaseAdmin.from("projects").delete().eq("slug", slug);
}

export async function upsertTestimonial(testimonial: { id?: string; title: string; rating: number; text: string; author: string; role: string }) {
  return supabaseAdmin.from("testimonials").upsert(testimonial);
}

export async function deleteTestimonial(id: string) {
  return supabaseAdmin.from("testimonials").delete().eq("id", id);
}

export async function upsertCareerRole(role: { id?: string; role_id: string; title: string; team: string; experience: string; description: string; responsibilities: string[]; application_note: string; is_active?: boolean }) {
  return supabaseAdmin.from("careers_roles").upsert(role, { onConflict: "role_id" });
}

export async function deleteCareerRole(roleId: string) {
  return supabaseAdmin.from("careers_roles").delete().eq("role_id", roleId);
}

export async function upsertFaq(faq: { id?: string; question: string; answer: string; category?: string }) {
  return supabaseAdmin.from("faqs").upsert(faq);
}

export async function deleteFaq(id: string) {
  return supabaseAdmin.from("faqs").delete().eq("id", id);
}
