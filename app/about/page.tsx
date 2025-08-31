import { Section } from "@/components/section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AboutPage() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />
      <Section className="mt-10">
        <h1 className="text-3xl font-semibold text-white">About Shaibya Solutions</h1>
        <p className="mt-3 max-w-prose text-slate-300">
          We are a technology company focused on AI, full‑stack development, and multi‑platform apps. Our mission is to
          craft intelligent software that’s reliable, accessible, and delightful.
        </p>
      </Section>

      <Section className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-white">Who we are</h2>
          <p className="mt-2 text-sm text-slate-400">
            A senior team of engineers and designers delivering end‑to‑end solutions: discovery to deployment.
          </p>
          <h3 className="mt-6 text-lg font-semibold text-white">Our mission</h3>
          <p className="text-sm text-slate-400">
            Accelerate innovation with practical AI and solid software craftsmanship.
          </p>
          <h3 className="mt-6 text-lg font-semibold text-white">Our vision</h3>
          <p className="text-sm text-slate-400">
            Empower teams to build the future with trustworthy, human‑centered technology.
          </p>
          <h3 className="mt-6 text-lg font-semibold text-white">Why choose us</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-400">
            <li>Outcome‑driven delivery</li>
            <li>Transparent communication</li>
            <li>Accessible, inclusive design</li>
          </ul>
        </div>

        {/* Replaced image with an animated-style graphic panel */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/60">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent" />
          <div className="relative grid gap-4 p-6">
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-4">
              <div className="text-xs text-slate-300">Approach</div>
              <div className="font-heading">Discovery → Design → Delivery</div>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-4">
              <div className="text-xs text-slate-300">Why Us</div>
              <div className="font-heading">Senior execution, measurable outcomes</div>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-4">
              <div className="text-xs text-slate-300">Vision</div>
              <div className="font-heading">Human‑centered, AI‑powered</div>
            </div>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </main>
  )
}
