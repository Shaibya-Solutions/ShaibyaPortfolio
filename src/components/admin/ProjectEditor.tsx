"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { saveProject } from "@/app/admin/actions";
import type { Project, ProjectType } from "@/data/projects";
import { getProjectMediaPoster, getProjectMediaUrl, getProjectVideoSource, isPortfolioMediaUrl, isProjectVideo, MAX_PROJECT_IMAGE_BYTES, type PortfolioMediaAsset } from "@/lib/imagekit";
import ImageKitLibrary from "./ImageKitLibrary";

const fileTypes = "image/jpeg,image/png,image/webp,video/mp4,video/webm";
const field = "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white";
const label = "grid min-w-0 gap-1.5 text-xs font-medium text-slate-300";
const secondary = "inline-flex min-h-10 cursor-pointer items-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-200 hover:bg-slate-800 focus-within:outline-2 focus-within:outline-sky-400";

function DraftPreview({ url, file, alt }: { url?: string; file?: File; alt: string }) {
  const [localUrl, setLocalUrl] = useState("");
  useEffect(() => {
    if (!file) return;
    const source = URL.createObjectURL(file);
    setLocalUrl(source);
    return () => URL.revokeObjectURL(source);
  }, [file]);
  const source = file ? localUrl : getProjectMediaUrl(url);
  if (!source) return null;

  const video = file ? file.type.startsWith("video/") : isProjectVideo(source);
  return video ? (
    <video src={getProjectVideoSource(source)} controls playsInline preload={file ? "metadata" : "none"} aria-label={alt}
      poster={isPortfolioMediaUrl(source) ? getProjectMediaPoster(source, 480) : undefined} className="aspect-video w-full bg-slate-950 object-contain" />
  ) : (
    <img src={source} alt={alt} className="aspect-video w-full bg-slate-950 object-contain" />
  );
}

export default function ProjectEditor({ project, onCancel, onSaved }: {
  project: Project | null;
  onCancel: () => void;
  onSaved: (name: string) => void;
}) {
  const [cover, setCover] = useState(project?.thumbnail ?? "");
  const [gallery, setGallery] = useState(project?.screenshots ?? []);
  const [coverFile, setCoverFile] = useState<File>();
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [mediaIds, setMediaIds] = useState<Record<string, string>>({});
  const [picker, setPicker] = useState<"cover" | "gallery" | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const editor = useRef<HTMLFormElement>(null);
  const galleryLimit = Math.max(8, project?.screenshots?.length ?? 0);
  const galleryCount = gallery.length + galleryFiles.length;

  useEffect(() => {
    editor.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, []);

  function choose(asset: PortfolioMediaAsset) {
    setMediaIds((ids) => ({ ...ids, [asset.url]: asset.id }));
    if (picker === "cover") {
      setCover(asset.url);
      setCoverFile(undefined);
      setPicker(null);
    } else if (gallery.includes(asset.url)) {
      setGallery((items) => items.filter((url) => url !== asset.url));
    } else if (galleryCount < galleryLimit) {
      setGallery((items) => [...items, asset.url]);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const value = (name: string) => String(values.get(name) ?? "").trim();
    const name = value("name");
    const slug = value("slug") || name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const media = new FormData();
    if (coverFile) media.append("thumbnail", coverFile);
    for (const file of galleryFiles) media.append("screenshots", file);
    const bytes = (coverFile?.size ?? 0) + galleryFiles.reduce((total, file) => total + file.size, 0);
    if (bytes > MAX_PROJECT_IMAGE_BYTES) {
      setError("Uploads can total up to 3.75 MB per save. For larger files, upload in ImageKit and select them from the library.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const result = await saveProject({
        ...project,
        slug, name,
        type: value("type") as ProjectType,
        tagline: value("tagline"),
        thumbnail: cover,
        screenshots: gallery,
        featured: values.get("featured") === "on",
        client: value("client"),
        industry: value("industry"),
        year: value("year"),
        liveUrl: value("liveUrl"),
        problem: value("problem"),
        solution: value("solution"),
      }, project?.slug ?? null, media, mediaIds);
      if (result.error) setError(result.error);
      else onSaved(name);
    } catch {
      setError("Could not save the project. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form ref={editor} aria-label="Project editor" onSubmit={submit}
      className="scroll-mt-24 rounded-xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold !text-white">{project ? "Edit project" : "New project"}</h3>
        <button type="button" onClick={onCancel} disabled={saving} className={secondary}>Cancel</button>
      </div>
      <fieldset disabled={saving} className="min-w-0 space-y-5">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <label className={label}>Project name<input name="name" defaultValue={project?.name} required className={field} /></label>
          <label className={label}>Category
            <select name="type" defaultValue={project?.type ?? "solution"} className={field}>
              <option value="website">Website</option><option value="solution">Solution</option><option value="rnd">R&amp;D / MVP</option>
            </select>
          </label>
          <label className={`${label} sm:col-span-2`}>Tagline<input name="tagline" defaultValue={project?.tagline} className={field} /></label>
        </div>

        <section className="rounded-xl border border-slate-800 bg-slate-950/45 p-3 sm:p-4" aria-label="Project showcase">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Cover</p>
              <div className="overflow-hidden rounded-lg border border-slate-700">
                {cover || coverFile
                  ? <DraftPreview url={cover} file={coverFile} alt="Project cover preview" />
                  : <div className="grid aspect-video place-items-center bg-slate-950 text-xs text-slate-400">Choose an image or video</div>}
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={secondary} onClick={() => setPicker("cover")}>Choose cover</button>
                <label className={secondary}>Upload cover
                  <input type="file" accept={fileTypes} className="sr-only" onChange={(event) => {
                    setCoverFile(event.currentTarget.files?.[0]);
                    event.currentTarget.value = "";
                  }} />
                </label>
                {coverFile && <button type="button" className={secondary} onClick={() => setCoverFile(undefined)}>Undo upload</button>}
              </div>
            </div>
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">Gallery</p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className={secondary} onClick={() => setPicker("gallery")}>Add from ImageKit</button>
                  <label className={secondary}>Upload gallery files
                    <input type="file" multiple accept={fileTypes} className="sr-only" onChange={(event) => {
                      const files = Array.from(event.currentTarget.files ?? []);
                      setGalleryFiles((current) => [...current, ...files].slice(0, galleryLimit - gallery.length));
                      event.currentTarget.value = "";
                    }} />
                  </label>
                </div>
              </div>
              {galleryCount ? (
                <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                  {gallery.map((url, index) => (
                    <div key={`${url}-${index}`} className="min-w-0 overflow-hidden rounded-lg border border-slate-700">
                      <DraftPreview url={url} alt={`Gallery preview ${index + 1}`} />
                      <button type="button" onClick={() => setGallery((items) => items.filter((_, item) => item !== index))}
                        className="w-full px-2 py-1.5 text-xs text-slate-300 hover:text-white">Remove item {index + 1}</button>
                    </div>
                  ))}
                  {galleryFiles.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="min-w-0 overflow-hidden rounded-lg border border-slate-700">
                      <DraftPreview file={file} alt={file.name} />
                      <button type="button" onClick={() => setGalleryFiles((files) => files.filter((_, item) => item !== index))}
                        className="w-full truncate px-2 py-1.5 text-xs text-slate-300 hover:text-white" title={file.name}>Remove {file.name}</button>
                    </div>
                  ))}
                </div>
              ) : <p className="py-3 text-xs text-slate-400">Add screenshots or demo videos.</p>}
            </div>
          </div>
          {picker && (
            <div className="mt-4 space-y-3 border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">{picker === "cover" ? "Choose an ImageKit cover" : `Choose gallery media (${galleryCount}/${galleryLimit})`}</p>
                <button type="button" onClick={() => setPicker(null)} className={secondary}>Done</button>
              </div>
              <ImageKitLibrary onChoose={choose} selected={picker === "cover" ? [cover] : gallery} />
            </div>
          )}
          <p className="mt-3 text-xs text-slate-400">Uploads can total 3.75 MB per save. For larger videos, upload in ImageKit and select them here.</p>
        </section>

        <details className="rounded-lg border border-slate-800 px-3 py-2">
          <summary className="cursor-pointer py-1 text-sm text-slate-200">Project details</summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className={label}>Client<input name="client" defaultValue={project?.client} className={field} /></label>
            <label className={label}>Industry<input name="industry" defaultValue={project?.industry} className={field} /></label>
            <label className={label}>Year<input name="year" defaultValue={project?.year} className={field} /></label>
            <label className={label}>Live website<input name="liveUrl" defaultValue={project?.liveUrl} className={field} type="url" /></label>
            <label className={label}>Problem<textarea name="problem" defaultValue={project?.problem} className={field} rows={3} /></label>
            <label className={label}>Solution<textarea name="solution" defaultValue={project?.solution} className={field} rows={3} /></label>
            <label className={label}>Slug<input name="slug" defaultValue={project?.slug} placeholder="Generated from project name" className={field} /></label>
          </div>
        </details>
        {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-200">
            <input name="featured" type="checkbox" defaultChecked={project?.featured} className="size-4 accent-sky-500" />
            Feature on homepage
          </label>
          <button type="submit" className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500">
            {saving ? "Saving…" : "Save project"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
