import { Section } from "@/components/section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const cases = [
  {
    title: "Optimizing Marketing Campaigns with AI",
    problem: "Inconsistent targeting and rising acquisition costs.",
    solution: "Built a data pipeline and ML propensity model; automated segment activation.",
    impact: "30% higher CTR, 22% lower CAC.",
  },
  {
    title: "Predictive Maintenance for Logistics",
    problem: "Unplanned downtime leading to missed SLAs.",
    solution: "Sensor ingestion with failure prediction models and alerting.",
    impact: "45% reduction in critical incidents.",
  },
]

export default function CaseStudies() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />
      <Section className="mt-10">
        <h1 className="text-3xl font-semibold text-white">Case Studies</h1>
        <div className="mt-6 grid gap-5">
          {cases.map((c) => (
            <article key={c.title} className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-6">
              <h2 className="text-xl font-semibold text-white">{c.title}</h2>
              <div className="mt-3 grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-xs font-semibold text-slate-300">Problem</div>
                  <p className="text-sm text-slate-400">{c.problem}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-300">Solution</div>
                  <p className="text-sm text-slate-400">{c.solution}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-300">Impact</div>
                  <p className="text-sm text-slate-400">{c.impact}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <SiteFooter />
    </main>
  )
}
