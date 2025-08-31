import { Section } from "@/components/section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { JobCard } from "@/components/job-card"

export default function CareersPage() {
  const jobs = [
    { title: "Senior Software Engineer (Full‑stack)", location: "Remote", type: "Full‑time" },
    { title: "Senior ML Engineer", location: "Remote", type: "Full‑time" },
    { title: "Product Designer", location: "Remote", type: "Contract" },
  ]
  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />
      <Section className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-semibold text-white">Join Shaibya Solutions</h1>
          <p className="mt-2 text-sm text-slate-400">
            Help us build responsible AI and elegant software experiences for the world.
          </p>
          <div className="mt-6 space-y-3">
            {jobs.map((j) => (
              <JobCard key={j.title} title={j.title} location={j.location} type={j.type} />
            ))}
          </div>
        </div>

        {/* Replaced image with a benefits panel */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/60 p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent" />
          <div className="relative grid gap-3 sm:grid-cols-2">
            {[
              "Health, dental & vision",
              "Remote‑first flexibility",
              "Learning budget",
              "Parental leave",
              "Home office stipend",
              "Wellness days",
            ].map((b) => (
              <div
                key={b}
                className="rounded-lg border border-slate-800/60 bg-slate-950/60 px-4 py-3 text-sm text-slate-300"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </Section>
      <SiteFooter />
    </main>
  )
}
