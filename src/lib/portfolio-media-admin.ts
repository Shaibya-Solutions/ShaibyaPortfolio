import "server-only";
import ImageKit from "imagekit";
import type { FileObject } from "imagekit/dist/libs/interfaces/FileDetails";
import { isPortfolioMediaUrl, isProjectVideo, PORTFOLIO_MEDIA_FOLDER, type PortfolioMediaAsset } from "@/lib/imagekit";

export function getImageKitAdmin() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  if (!privateKey || !publicKey || !urlEndpoint) throw new Error("ImageKit credentials are missing.");
  return new ImageKit({ privateKey, publicKey, urlEndpoint });
}

export function mapPortfolioAsset(file: FileObject): PortfolioMediaAsset | null {
  if (file.type !== "file" || file.isPrivateFile !== false || !file.filePath.startsWith(PORTFOLIO_MEDIA_FOLDER + "/") ||
      !isPortfolioMediaUrl(file.url)) return null;
  const kind = isProjectVideo(file.url) ? "video" : file.fileType === "image" ? "image" : null;
  return kind ? { id: file.fileId, name: file.name, path: file.filePath, url: file.url, kind } : null;
}
