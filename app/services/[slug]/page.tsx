import { notFound } from "next/navigation"
import { Section } from "@/components/section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const services: Record<string, { title: string; intro: string; bullets: string[] }> = {
  ai: {
    title: "AI Solutions",
    intro: "From data strategy to production‑grade ML—classification, recommendation, forecasting, and generative AI.",
    bullets: [
      "Data pipelines and feature engineering",
      "Model training, evaluation, and monitoring",
      "Responsible AI, privacy, and security",
    ],
  },
  "full-stack": {
    title: "Full‑stack Development",
    intro: "Reliable APIs and modern frontends using React/Next.js and TypeScript.",
    bullets: ["API design and implementation", "SSR/ISR, realtime, and caching", "Observability and performance"],
  },
  apps: {
    title: "Desktop & Mobile Apps",
    intro: "Cross‑platform apps with native feel and accessibility in mind.",
    bullets: ["iOS/Android or cross‑platform", "Electron/Tauri desktop", "CI/CD and release automation"],
  },
  rd: {
    title: "Custom R&D",
    intro: "Turn ideas into prototypes quickly. Validate, iterate, and scale.",
    bullets: ["Rapid PoC builds", "Tech spikes and feasibility studies", "Knowledge transfer & documentation"],
  },
}

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const data = services[params.slug]
  if (!data) return notFound()

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />
      <Section className="mt-10">
        <h1 className="text-3xl font-semibold text-white">{data.title}</h1>
        <p className="mt-2 max-w-prose text-sm text-slate-300">{data.intro}</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {data.bullets.map((b) => (
            <li key={b} className="rounded-lg border border-slate-800/60 bg-slate-950/60 p-4 text-sm text-slate-300">
              {b}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="mt-12">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/05-Services-wfgI2te3OvDJBkJ7w8ciJ8ntyELbmg.png"
          alt="Design reference for service details"
          className="rounded-2xl border border-slate-800/60"
        />
      </Section>
      <SiteFooter />
    </main>
  )
}
