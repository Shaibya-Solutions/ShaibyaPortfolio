import ShineCard from "@/components/shine-card"

const cases = [
  { title: "Optimizing Marketing Campaigns in E‑Commerce", tag: "Retail" },
  { title: "20% Better Patient Outcomes in Healthcare", tag: "Healthcare" },
  { title: "Utilities Management with Predictive AI", tag: "Technology" },
  { title: "35% Boost in Engagement in EdTech", tag: "Technology" },
  { title: "30% Conversion Boost for Trendy Goods", tag: "Retail" },
  { title: "Operational Efficiency at Scale", tag: "Risk Management" },
]

export default function CasesPage() {
  return (
    <div className="container-balanced py-16 md:py-24">
      <h1 className="h2">Our Cases</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => (
          <ShineCard key={i}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <img
                alt={c.title}
                className="h-full w-full object-cover"
                src={`/abstract-geometric-shapes.png?height=480&width=720&query=${encodeURIComponent(c.title)}`}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h3 className="font-serif text-lg">{c.title}</h3>
              <span className="rounded-full border border-[hsl(var(--primary))]/30 px-3 py-1 text-xs text-muted-foreground">
                {c.tag}
              </span>
            </div>
          </ShineCard>
        ))}
      </div>
    </div>
  )
}
