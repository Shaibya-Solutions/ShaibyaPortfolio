import "server-only";
import ImageKit from "imagekit";
import { MAX_PROJECT_IMAGE_BYTES } from "@/lib/imagekit";

const extensions = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function matchesImageType(file: Buffer, mimeType: string) {
  switch (mimeType) {
    case "image/jpeg":
      return file.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]));
    case "image/png":
      return file.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    case "image/webp":
      return file.toString("ascii", 0, 4) === "RIFF" && file.toString("ascii", 8, 12) === "WEBP";
    default:
      return false;
  }
}

export async function prepareProjectImages(slug: string, formData: FormData) {
  const readFiles = (name: string) => formData.getAll(name).filter(
    (value): value is File => typeof value !== "string" && value.size > 0,
  );
  const thumbnail = readFiles("thumbnail");
  const screenshots = readFiles("screenshots");
  const files = [...thumbnail, ...screenshots];
  if (!files.length) return null;
  if (thumbnail.length > 1 || screenshots.length > 8 ||
      files.reduce((total, file) => total + file.size, 0) > MAX_PROJECT_IMAGE_BYTES) {
    throw new Error("Choose one thumbnail and up to eight screenshots, totaling at most 3.75 MB.");
  }

  const images = await Promise.all(files.map(async (file) => {
    const extension = extensions.get(file.type);
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!extension || !matchesImageType(buffer, file.type)) {
      throw new Error("Upload valid JPEG, PNG, or WebP images.");
    }
    return { extension, buffer };
  }));

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  if (!privateKey || !publicKey || !urlEndpoint) throw new Error("ImageKit credentials are missing.");

  const imageKit = new ImageKit({ privateKey, publicKey, urlEndpoint });
  const uploaded: { fileId: string; url: string }[] = [];
  const discard = async () => {
    const results = await Promise.allSettled(uploaded.map(({ fileId }) => imageKit.deleteFile(fileId)));
    if (results.some(({ status }) => status === "rejected")) {
      console.error("Could not remove some uploads from a failed portfolio save.");
    }
  };

  try {
    for (const [index, { extension, buffer }] of images.entries()) {
      const label = thumbnail.length && index === 0 ? "thumbnail" : `screenshot-${index + 1}`;
      const { fileId, url } = await imageKit.upload({
        file: buffer,
        fileName: `${label}.${extension}`,
        folder: `/shaibya-portfolio/projects/${slug}`,
        useUniqueFileName: true,
      });
      uploaded.push({ fileId, url });
    }
  } catch {
    await discard();
    throw new Error("ImageKit upload failed. Try again or check the ImageKit key's upload permissions.");
  }

  return {
    thumbnail: thumbnail.length ? uploaded[0].url : undefined,
    screenshots: uploaded.slice(thumbnail.length).map(({ url }) => url),
    discard,
  };
}
