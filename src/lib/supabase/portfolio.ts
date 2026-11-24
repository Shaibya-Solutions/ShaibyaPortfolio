import { supabase } from "./client";
import { allProjects, type Project, type ProjectType } from "@/data/projects";
import { testimonials as defaultTestimonials } from "@/data/index";
import { TEAM_MEMBERS, type CrewMember } from "@/data/team";
import { OPEN_ROLES } from "@/data/careers";
import { generalFaqs } from "@/data/seo/faqs";
import { getImageUrl, getProjectMediaUrl } from "@/lib/imagekit";

// ─── IN-MEMORY TTL CACHE ───
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const memoryCache = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCached<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  memoryCache.set(key, { data, timestamp: Date.now() });
}

export function invalidateCache(prefix?: string): void {
  if (!prefix) {
    memoryCache.clear();
    return;
  }
  for (const key of memoryCache.keys()) {
    if (key.startsWith(prefix)) {
      memoryCache.delete(key);
    }
  }
}

export function clearPortfolioCache(): void {
  memoryCache.clear();
}

/**
 * Bounds remote Supabase latency so navigation never stalls.
 */
async function withTimeout<T>(promiseLike: PromiseLike<T>, ms = 2500): Promise<T> {
  return Promise.race([
    Promise.resolve(promiseLike),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Supabase query timeout after ${ms}ms`)), ms)
    ),
  ]);
}

// ─── HELPER: MAP DB PROJECT ROW TO TYPE ───
export function mapDbProject(row: any, resolveImages = true): Project {
  const imageUrl = resolveImages ? getProjectMediaUrl : (value?: string | null) => value || "";
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    type: row.type as ProjectType,
    industry: row.industry,
    client: row.client,
    clientLogo: row.client_logo ? imageUrl(row.client_logo) : undefined,
    liveUrl: row.live_url || undefined,
    year: row.year,
    problem: row.problem,
    solution: row.solution,
    keyFeatures: Array.isArray(row.key_features) ? row.key_features : [],
    techStack: Array.isArray(row.tech_stack) ? row.tech_stack : [],
    stats: Array.isArray(row.stats) ? row.stats : [],
    thumbnail: imageUrl(row.thumbnail),
    thumbnailAlt: row.thumbnail_alt || row.name,
    imageCaption: row.image_caption || undefined,
    screenshots: Array.isArray(row.screenshots) ? row.screenshots.map((s: string) => imageUrl(s)) : [],
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
  const cacheKey = `projects_${type || "all"}`;
  const cached = getCached<Project[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    let query = supabase.from("projects").select("*").order("sort_order", { ascending: true });
    if (type) {
      query = query.eq("type", type);
    }
    const res = (await withTimeout(query, 2500)) as any;
    const { data, error } = res || {};
    if (!error && data) {
      const mapped = data.map((row: any) => mapDbProject(row));
      setCached(cacheKey, mapped);
      return mapped;
    }
  } catch (err) {
    console.warn("Supabase getProjects fallback to static data:", err);
  }

  // Fallback to static data with ImageKit resolution
  const fallback = type ? allProjects.filter((p) => p.type === type) : allProjects;
  const result = fallback.map((p) => ({
    ...p,
    thumbnail: getProjectMediaUrl(p.thumbnail),
    screenshots: p.screenshots?.map(getProjectMediaUrl),
    clientLogo: p.clientLogo ? getImageUrl(p.clientLogo) : undefined,
  }));
  setCached(cacheKey, result);
  return result;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const cacheKey = `project_slug_${slug}`;
  const cached = getCached<Project | undefined>(cacheKey);
  if (cached !== null && cached !== undefined) {
    return cached;
  }

  try {
    const res = (await withTimeout(
      supabase.from("projects").select("*").eq("slug", slug).single(),
      2500
    )) as any;
    const { data, error } = res || {};
    if (!error && data) {
      const mapped = mapDbProject(data);
      setCached(cacheKey, mapped);
      return mapped;
    }
  } catch (err) {
    console.warn("Supabase getProjectBySlug fallback to static data:", err);
  }

  const p = allProjects.find((proj) => proj.slug === slug);
  if (!p) {
    return undefined;
  }
  const result: Project = {
    ...p,
    thumbnail: getProjectMediaUrl(p.thumbnail),
    screenshots: p.screenshots?.map(getProjectMediaUrl),
    clientLogo: p.clientLogo ? getImageUrl(p.clientLogo) : undefined,
  };
  setCached(cacheKey, result);
  return result;
}

// ─── TESTIMONIALS ───
export async function getTestimonials() {
  const cacheKey = "testimonials";
  const cached = getCached<any[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const res = (await withTimeout(
      supabase.from("testimonials").select("*").order("sort_order", { ascending: true }),
      2500
    )) as any;
    const { data, error } = res || {};
    if (!error && data && data.length > 0) {
      const mapped = data.map((t: any) => ({
        id: t.id,
        title: t.title,
        rating: t.rating,
        text: t.text,
        author: t.author,
        role: t.role,
      }));
      setCached(cacheKey, mapped);
      return mapped;
    }
  } catch (err) {
    console.warn("Supabase getTestimonials fallback to static data:", err);
  }
  setCached(cacheKey, defaultTestimonials);
  return defaultTestimonials;
}

// ─── TEAM MEMBERS ───
export async function getTeamMembers(): Promise<CrewMember[]> {
  const cacheKey = "team_members";
  const cached = getCached<CrewMember[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const res = (await withTimeout(
      supabase.from("team_members").select("*").order("sort_order", { ascending: true }),
      2500
    )) as any;
    const { data, error } = res || {};
    if (!error && data && data.length > 0) {
      const mapped = data.map((m: any, idx: number) => {
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
      setCached(cacheKey, mapped);
      return mapped;
    }
  } catch (err) {
    console.warn("Supabase getTeamMembers fallback to static data:", err);
  }
  setCached(cacheKey, TEAM_MEMBERS);
  return TEAM_MEMBERS;
}

// ─── CAREERS ROLES ───
export async function getCareersRoles() {
  const cacheKey = "careers_roles";
  const cached = getCached<any[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const res = (await withTimeout(
      supabase
        .from("careers_roles")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
      2500
    )) as any;
    const { data, error } = res || {};
    if (!error && data && data.length > 0) {
      const mapped = data.map((r: any) => ({
        id: r.role_id,
        title: r.title,
        team: r.team,
        experience: r.experience,
        description: r.description,
        responsibilities: r.responsibilities || [],
        applicationNote: r.application_note,
      }));
      setCached(cacheKey, mapped);
      return mapped;
    }
  } catch (err) {
    console.warn("Supabase getCareersRoles fallback to static data:", err);
  }
  setCached(cacheKey, OPEN_ROLES);
  return OPEN_ROLES;
}

// ─── FAQS ───
export async function getFaqs() {
  const cacheKey = "faqs";
  const cached = getCached<any[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const res = (await withTimeout(
      supabase.from("faqs").select("*").order("sort_order", { ascending: true }),
      2500
    )) as any;
    const { data, error } = res || {};
    if (!error && data && data.length > 0) {
      const mapped = data.map((f: any) => ({
        id: f.id,
          q: f.question,
          a: f.answer,
      }));
      setCached(cacheKey, mapped);
      return mapped;
    }
  } catch (err) {
    console.warn("Supabase getFaqs fallback to static data:", err);
  }
  setCached(cacheKey, generalFaqs);
  return generalFaqs;
}
