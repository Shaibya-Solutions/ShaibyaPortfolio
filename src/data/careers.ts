export const CAREERS_EMAIL = "shaibyasolutions@gmail.com";

export const OPEN_ROLES = [
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    team: "Engineering",
    experience: "1–2 years of experience",
    description: "Build and improve web applications, from responsive interfaces to APIs and databases.",
    responsibilities: [
      "Develop frontend features and backend integrations.",
      "Write maintainable code and help troubleshoot issues.",
      "Collaborate on requirements, testing, and delivery.",
    ],
    applicationNote: "Share your CV, GitHub or portfolio, and a project you have worked on.",
  },
  {
    id: "video-editor",
    title: "Video Editor",
    team: "Creative",
    experience: "Portfolio-led applications",
    description: "Turn ideas and footage into clear, engaging videos for brands and digital channels.",
    responsibilities: [
      "Edit short-form videos, reels, and brand content.",
      "Work with pacing, sound, captions, and visual consistency.",
      "Develop edits from briefs and incorporate feedback.",
    ],
    applicationNote: "Share your CV or introduction and a showreel or links to your edits.",
  },
  {
    id: "business-development-sales",
    title: "Business Development & Sales Executive",
    team: "Business",
    experience: "Communication & relationship building",
    description: "Connect with prospective clients, understand their needs, and help turn conversations into project opportunities.",
    responsibilities: [
      "Research prospects and introduce our services.",
      "Coordinate discovery conversations and follow-ups.",
      "Keep lead information and proposal discussions organised.",
    ],
    applicationNote: "Share your CV and a short introduction to your sales or client-facing experience.",
  },
] as const;

export function careersApplicationUrl(role?: string) {
  const subject = role ? `Application: ${role}` : "Career opportunities at Shaibya Solutions";
  const body = `Hello Shaibya Solutions,\n\nI would like to apply${role ? ` for ${role}` : " for an opportunity with your team"}.\n\nName: \nRelevant experience: \nPortfolio / work samples (if applicable): \n\nA little about me:\n\nI will attach my CV before sending.\n`;
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
