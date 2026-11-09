import fs from "fs";
import path from "path";
import ImageKit from "imagekit";

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/xefp2tbdp";

if (!privateKey || !publicKey) {
  console.error("Missing IMAGEKIT_PRIVATE_KEY or NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY in environment variables.");
  process.exit(1);
}

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

function getFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, baseDir));
    } else {
      results.push({
        fullPath,
        relPath: path.relative(baseDir, fullPath).replace(/\\/g, "/"),
        fileName: file,
      });
    }
  }
  return results;
}

async function uploadAll() {
  const bundleDir = path.resolve(process.cwd(), "imagekit-bundle");
  if (!fs.existsSync(bundleDir)) {
    console.error("Bundle dir does not exist:", bundleDir);
    return;
  }

  const files = getFiles(bundleDir);
  console.log(`Starting upload of ${files.length} assets to ImageKit...`);

  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const fileBuffer = fs.readFileSync(file.fullPath);
    const folderPath = "/shaibya-portfolio/" + (path.dirname(file.relPath) === "." ? "" : path.dirname(file.relPath));

    try {
      const res = await imagekit.upload({
        file: fileBuffer,
        fileName: file.fileName,
        folder: folderPath,
        useUniqueFileName: false,
        overwriteFile: true,
      });
      successCount++;
      console.log(`[${successCount}/${files.length}] Uploaded: ${file.relPath} -> ${res.url}`);
    } catch (err) {
      errorCount++;
      console.error(`Error uploading ${file.relPath}:`, err.message || err);
    }
  }

  console.log(`\nUpload complete: ${successCount} succeeded, ${errorCount} failed.`);
}

uploadAll();
