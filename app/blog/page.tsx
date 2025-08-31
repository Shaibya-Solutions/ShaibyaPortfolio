import ShineCard from "@/components/shine-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const posts = [
  { title: "How AI is Revolutionizing Customer Service", date: "Nov 12, 2024" },
  { title: "The Role of AI in Personalizing Marketing", date: "Nov 02, 2024" },
  { title: "Balancing Innovation with Security", date: "Oct 26, 2024" },
]

export default function BlogPage() {
  return (
    <div className="container-balanced py-16 md:py-24">
      <h1 className="h2">Blog</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <ShineCard>
          <img
            alt="Featured article"
            className="h-56 w-full rounded-lg object-cover"
            src="/ai-dashboard-visualization.png"
          />
          <h3 className="mt-4 font-serif text-xl">How AI is Shaping the Future of E‑Commerce</h3>
          <p className="p mt-2">Strategies that create tangible revenue lift and better customer experiences.</p>
        </ShineCard>

        <div className="lg:col-span-2 grid gap-6">
          {posts.map((p) => (
            <ShineCard key={p.title}>
              <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
                <img
                  alt={p.title}
                  className="h-40 w-full rounded-lg object-cover"
                  src={`/abstract-geometric-shapes.png?height=240&width=360&query=${encodeURIComponent(p.title)}`}
                />
                <div>
                  <div className="text-xs text-muted-foreground">{p.date}</div>
                  <h3 className="mt-1 font-serif text-lg">{p.title}</h3>
                  <p className="p mt-2">Read about practical architectures and patterns that scale.</p>
                </div>
              </div>
            </ShineCard>
          ))}

          <ShineCard>
            <div className="grid gap-4 sm:grid-cols-[2fr_1fr] items-center">
              <div>
                <h3 className="font-serif text-xl">Subscribe for Updates</h3>
                <p className="p mt-1">Actionable insights directly in your inbox.</p>
              </div>
              <form className="flex gap-2">
                <Input placeholder="Email" className="bg-muted/60" />
                <Button className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90">
                  Subscribe
                </Button>
              </form>
            </div>
          </ShineCard>
        </div>
      </div>
    </div>
  )
}
