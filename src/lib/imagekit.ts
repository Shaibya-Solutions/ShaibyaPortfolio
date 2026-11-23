/**
 * ImageKit CDN Helper and Asset Resolver
 * Supports auto-format (f-auto), quality optimization, and seamless local fallback.
 */

import assetsRegistry from "@/config/imagekit-assets.json";

const IMAGEKIT_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/xefp2tbdp";
const FOLDER_PREFIX = assetsRegistry.folderPrefix || "/shaibya-portfolio";
export const MAX_PROJECT_IMAGE_BYTES = 3.75 * 1024 * 1024;

export function getImageKitAssetUrl(path: string) {
  const encoded = path.replace(/\\/g, "/").replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/");
  return `${IMAGEKIT_ENDPOINT.replace(/\/+$/, "")}/${encoded}`;
}

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number; // 1-100
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
  crop?: "maintain_ratio" | "force" | "at_least" | "at_max";
}

/**
 * Resolves an asset path to its optimized ImageKit CDN URL or local fallback.
 * @param pathOrKey Asset path (e.g. "/images/solutions/coal.png", "solutions/coal.png", or external URL)
 * @param options Optional image transformations
 */
export function getImageUrl(pathOrKey?: string | null, options?: ImageTransformOptions): string {
  const path = pathOrKey?.trim();
  if (!path) return "";

  // Return external URLs or data URIs unchanged
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }

  // Clean relative path
  let cleanPath = path.replace(/\\/g, "/");
  if (cleanPath.startsWith("/images/")) {
    cleanPath = cleanPath.substring("/images/".length);
  } else if (cleanPath.startsWith("/")) {
    cleanPath = cleanPath.substring(1);
  }

  // Build transform string
  const trParams: string[] = [];
  if (options?.width) trParams.push(`w-${options.width}`);
  if (options?.height) trParams.push(`h-${options.height}`);
  if (options?.quality) trParams.push(`q-${options.quality}`);
  trParams.push(options?.format ? `f-${options.format}` : "f-auto");

  const trQuery = trParams.length > 0 ? `?tr=${trParams.join(",")}` : "";

  // If ImageKit is explicitly enabled via env, construct the CDN URL
  if (process.env.NEXT_PUBLIC_USE_IMAGEKIT === "true" && IMAGEKIT_ENDPOINT) {
    const folder = FOLDER_PREFIX.replace(/^\/+|\/+$/g, "");
    return `${getImageKitAssetUrl(`${folder}/${cleanPath}`)}${trQuery}`;
  }

  // Same-origin local serving: zero 3rd-party cookies (HotJar/ImageKit), zero external DNS lookup
  return `/images/${cleanPath}`;
}

export default getImageUrl;
