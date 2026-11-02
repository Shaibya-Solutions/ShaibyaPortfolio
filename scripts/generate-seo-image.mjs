import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Static PNG works with the site's static export and with social crawlers.
const destination = new URL("../public/images/seo/", import.meta.url);
await mkdir(destination, { recursive: true });
const background = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg"><stop stop-color="#071424"/><stop offset="1" stop-color="#102d45"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1110" cy="110" r="300" fill="#0ea5e9" opacity=".12"/>
  <circle cx="1160" cy="510" r="210" fill="none" stroke="#38bdf8" stroke-width="2" opacity=".3"/>
  <rect x="70" y="70" width="66" height="6" rx="3" fill="#0ea5e9"/>
  <text x="70" y="126" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#7dd3fc">SHAIBYA SOLUTIONS</text>
  <text x="70" y="255" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="white">Software that moves</text>
  <text x="70" y="332" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="white">your business forward.</text>
  <text x="73" y="411" font-family="Arial, sans-serif" font-size="28" fill="#cbd5e1">Custom software · CRM &amp; ERP · Business automation</text>
  <rect x="70" y="487" width="1060" height="1" fill="#31516c"/>
  <text x="73" y="551" font-family="Arial, sans-serif" font-size="24" fill="#7dd3fc">Nagpur, India</text>
  <text x="1130" y="551" text-anchor="end" font-family="Arial, sans-serif" font-size="24" fill="#cbd5e1">www.shaibyasolutions.com</text>
</svg>`);
await sharp(background).png().toFile(fileURLToPath(new URL("shaibya-social.png", destination)));
console.log("Generated public/images/seo/shaibya-social.png (1200 × 630).");
