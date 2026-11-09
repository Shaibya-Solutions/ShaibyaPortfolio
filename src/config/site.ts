export type BusinessDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

interface VerifiedBusinessDetails {
  geo?: { latitude: number; longitude: number };
  github?: `https://github.com/${string}`;
  twitter?: `https://x.com/${string}` | `https://twitter.com/${string}`;
}

// Populate only with owner-confirmed details. Nagpur's city centre is not an office pin.
export const verifiedBusinessDetails: VerifiedBusinessDetails = {};

export const site = {
  name: "Shaibya Solutions",
  url: "https://www.shaibyasolutions.com",
  language: "en-IN",
  locale: "en_IN",
  telephone: "+917498341146",
  email: "shaibyasolutions@gmail.com",
  logo: "/shaibya-logo-nav.webp",
  socialImage: "/images/seo/shaibya-social.png",
  address: {
    streetAddress: "Ramdaspeth",
    addressLocality: "Nagpur",
    addressRegion: "Maharashtra",
    postalCode: "440012",
    addressCountry: "IN",
  },
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as readonly BusinessDay[],
    opens: "00:00",
    closes: "23:59",
  },
  googleBusinessProfile: "https://share.google/1MoPcjfD7EBA3eXP9",
  social: {
    linkedin: "https://www.linkedin.com/company/108785057/",
    instagram: "https://www.instagram.com/deepoffduty/",
  },
} as const;

export const allowIndexing = process.env.SEO_ALLOW_INDEXING !== "false";
