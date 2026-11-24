"use server";

import { revalidatePath } from "next/cache";
import { clearAdminSession, createAdminSession, hasAdminSession } from "@/lib/admin-session";
import { prepareProjectImages } from "@/lib/project-image-upload";
import { getImageKitAdmin, mapPortfolioAsset } from "@/lib/portfolio-media-admin";
import { PORTFOLIO_MEDIA_FOLDER } from "@/lib/imagekit";
import { getPortfolioAdmin } from "@/lib/supabase/admin";
import { mapDbProject } from "@/lib/supabase/portfolio";
import type { Project } from "@/data/projects";

const signInRequired = "Sign in to the portfolio admin first.";

export async function signIn(password: string) {
  try {
    return { error: await createAdminSession(password) };
  } catch {
    return { error: "Unable to sign in right now." };
  }
}

export async function signOut() {
  await clearAdminSession();
}

export async function loadPortfolioAdmin() {
  if (!(await hasAdminSession())) return { error: signInRequired, data: null };

  try {
    const database = getPortfolioAdmin();
    const [projects, testimonials, careers, team, faqs] = await Promise.all([
      database.from("projects").select("*").order("sort_order").order("slug"),
      database.from("testimonials").select("id,title,rating,text,author,role").order("sort_order"),
      database.from("careers_roles").select("*").order("sort_order"),
      database.from("team_members").select("day_job,night_skill,hover_quote,location,color").order("sort_order"),
      database.from("faqs").select("id,question,answer").order("sort_order"),
    ]);
    if (projects.error || testimonials.error || careers.error || team.error || faqs.error) {
      console.error("Portfolio admin read failed", [projects, testimonials, careers, team, faqs].map(({ error }) => error?.code));
      return { error: "Unable to read the portfolio database.", data: null };
    }
    return {
      error: null,
      data: {
        projects: projects.data.map((row) => mapDbProject(row, false)),
        testimonials: testimonials.data,
        careers: careers.data,
        team: team.data,
        faqs: faqs.data,
      },
    };
  } catch {
    return { error: "Unable to connect to the portfolio database.", data: null };
  }
}

const portfolioPages = ["/", "/portfolio", "/portfolio/websites", "/portfolio/solutions", "/portfolio/rnd", "/services/software-solutions"];
const projectTypes = new Set(["website", "solution", "rnd"]);

export async function loadPortfolioMedia(query = "", skip = 0) {
  if (!(await hasAdminSession())) return { error: signInRequired, items: [], next: null };
  const limit = 30;
  const offset = Number.isSafeInteger(skip) && skip >= 0 ? skip : 0;
  const name = String(query).trim().slice(0, 80);
  const escaped = name.replace(/["\\]/g, "\\$&");
  const searchQuery = `path : "${PORTFOLIO_MEDIA_FOLDER}/" AND type = "file"` +
    (escaped ? ` AND name : "${escaped}"` : "");

  try {
    const files = await getImageKitAdmin().listFiles({ searchQuery, limit, skip: offset, sort: "DESC_CREATED" });
    const items = files.flatMap((file) => {
      const asset = file.type === "file" ? mapPortfolioAsset(file) : null;
      return asset ? [asset] : [];
    });
    return { error: null, items, next: files.length === limit ? offset + limit : null };
  } catch {
    return { error: "Unable to load the ImageKit library.", items: [], next: null };
  }
}

async function mutate(
  failure: string,
  paths: string[],
  operation: (database: ReturnType<typeof getPortfolioAdmin>) => PromiseLike<{ error: { code: string } | null }>,
) {
  if (!(await hasAdminSession())) return { error: signInRequired };
  try {
    const { error } = await operation(getPortfolioAdmin());
    if (error) {
      console.error(failure, error.code);
      return { error: error.code === "23505" ? "That identifier is already in use." : failure };
    }
  } catch (error) {
    console.error(failure, error instanceof Error ? error.name : "Unknown error");
    return { error: failure };
  }
  for (const path of paths) revalidatePath(path);
  return { error: null };
}

export async function saveProject(
  project: Partial<Project>,
  originalSlug: string | null,
  media: FormData,
  mediaIds: Record<string, string> = {},
) {
  if (!(await hasAdminSession())) return { error: signInRequired };

  const slug = project?.slug?.trim();
  const name = project?.name?.trim();
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 100 ||
      !name || !project.type || !projectTypes.has(project.type)) {
    return { error: "Enter a name, a valid type, and a slug with lowercase letters, numbers, and hyphens." };
  }
  const thumbnailFile = media.get("thumbnail");
  if (!project.thumbnail?.trim() && !(thumbnailFile instanceof File && thumbnailFile.size)) {
    return { error: "Choose or upload a cover from ImageKit." };
  }

  let database: ReturnType<typeof getPortfolioAdmin>;
  let uploads: Awaited<ReturnType<typeof prepareProjectImages>>;
  try {
    database = getPortfolioAdmin();
    const gallery = project.screenshots ?? [];
    const retained = new Set<string>();
    let galleryLimit = 8;
    if (originalSlug) {
      const { data: previous, error } = await database.from("projects").select("thumbnail,screenshots").eq("slug", originalSlug).single();
      if (error || !previous) return { error: "This project is unavailable. Refresh the list and try again." };
      const previousGallery = Array.isArray(previous.screenshots) ? previous.screenshots : [];
      galleryLimit = Math.max(galleryLimit, previousGallery.length);
      for (const url of [previous.thumbnail, ...previousGallery]) retained.add(url);
    }
    const newUrls = [...new Set([project.thumbnail, ...gallery])].filter(
      (url): url is string => typeof url === "string" && url.length > 0 && !retained.has(url),
    );
    const incomingCount = media.getAll("screenshots").filter((file) => file instanceof File && file.size > 0).length;
    if (gallery.length + incomingCount > galleryLimit || newUrls.length > 9) {
      return { error: "Choose up to eight gallery items." };
    }
    if (newUrls.length) {
      const imageKit = getImageKitAdmin();
      const verified = await Promise.all(newUrls.map(async (url) => {
        const id = mediaIds[url];
        if (typeof id !== "string" || !/^[a-f\d]{24}$/i.test(id)) return false;
        const asset = mapPortfolioAsset(await imageKit.getFileDetails(id));
        return asset?.url === url;
      }));
      if (verified.includes(false)) return { error: "Choose public media from the portfolio’s ImageKit library." };
    }
    uploads = await prepareProjectImages(slug, media);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Image upload failed." };
  }

  const payload = {
    slug,
    name,
    tagline: project.tagline ?? "",
    type: project.type,
    industry: project.industry ?? "",
    client: project.client ?? "",
    client_logo: project.clientLogo,
    live_url: project.liveUrl,
    year: project.year ?? "",
    problem: project.problem ?? "",
    solution: project.solution ?? "",
    key_features: project.keyFeatures,
    tech_stack: project.techStack,
    stats: project.stats,
    thumbnail: uploads?.thumbnail ?? project.thumbnail?.trim(),
    thumbnail_alt: project.thumbnailAlt,
    image_caption: project.imageCaption,
    screenshots: [...(project.screenshots ?? []), ...(uploads?.screenshots ?? [])],
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
  try {
    const table = database.from("projects");
    const query = originalSlug ? table.update(payload).eq("slug", originalSlug) : table.insert(payload);
    const { error } = await query.select("slug").single();
    if (error) {
      // A transport error can leave a successfully written project referencing these images.
      if (error.code) await uploads?.discard();
      console.error("Unable to save the project", error.code);
      return { error: error.code === "23505" ? "That project slug is already in use." : "Unable to save the project." };
    }
  } catch {
    return { error: "Unable to save the project. Refresh the list to check whether the change was saved." };
  }
  for (const path of portfolioPages) revalidatePath(path);
  return { error: null };
}

export async function deleteProject(slug: string) {
  return mutate("Unable to delete the project.", portfolioPages,
    (database) => database.from("projects").delete().eq("slug", slug));
}

export async function upsertTestimonial(testimonial: {
  id?: string; title: string; rating: number; text: string; author: string; role: string;
}) {
  const { id, title, rating, text, author, role } = testimonial;
  return mutate("Unable to save the testimonial.", ["/"],
    (database) => database.from("testimonials").upsert({ id, title, rating, text, author, role }));
}

export async function upsertCareerRole(career: {
  id?: string; role_id: string; title: string; team: string; experience: string;
  description: string; responsibilities: string[]; application_note: string; is_active?: boolean;
}) {
  const { id, role_id, title, team, experience, description, responsibilities, application_note, is_active } = career;
  const payload = { role_id, title, team, experience, description, responsibilities, application_note, is_active };
  return mutate("Unable to save the career role.", ["/careers"], (database) => {
    const table = database.from("careers_roles");
    return id ? table.update(payload).eq("id", id) : table.insert(payload);
  });
}

export async function deleteCareerRole(id: string) {
  return mutate("Unable to delete the career role.", ["/careers"],
    (database) => database.from("careers_roles").delete().eq("id", id));
}

export async function upsertFaq(faq: { id?: string; question: string; answer: string }) {
  const { id, question, answer } = faq;
  return mutate("Unable to save the FAQ.", ["/"],
    (database) => database.from("faqs").upsert({ id, question, answer }));
}
