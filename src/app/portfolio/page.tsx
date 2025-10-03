import { Section } from "@/components/shared/section"
import { SiteHeader } from "@/components/layout/header/site-header"
import { SiteFooter } from "@/components/layout/footer/site-footer"

const items = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  title: `Project ${i + 1}`,
  desc: "Short description of the project goes here.",
}))

export default function PortfolioPage() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />
      <Section className="mt-10">
        <h1 className="text-3xl font-semibold text-white">Portfolio</h1>
        <p className="mt-2 text-sm text-slate-400">A showcase of selected work (placeholders).</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.id} className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4">
              <img
                src={"/placeholder.svg?height=200&width=400&query=Portfolio%20card%20image"}
                alt="Project preview"
                className="mb-3 aspect-video w-full rounded-xl object-cover"
              />
              <div className="text-sm font-semibold text-white">{it.title}</div>
              <p className="text-xs text-slate-400">{it.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="mt-12">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/08-Portfolio.png-VZl2k86r7KwhnWSIneRP2VdE7cvM5u.jpeg"
          alt="Reference: Portfolio layout"
          className="rounded-2xl border border-slate-800/60"
        />
      </Section>
      <SiteFooter />
    </main>
  )
}
