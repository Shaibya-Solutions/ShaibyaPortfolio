import { Section } from "@/components/section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TeamCard } from "@/components/team-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const team = [
  { name: "Aarav Singh", title: "CTO", img: "/cto-portrait.png" },
  { name: "Maya Patel", title: "Lead Data Scientist", img: "/data-scientist.png" },
  { name: "Ishaan Verma", title: "Principal Engineer", img: "/engineer.png" },
  { name: "Sara Khan", title: "UX Lead", img: "/designer-workspace.png" },
  { name: "Leo Zhang", title: "PM", img: "/project-management-overview.png" },
  { name: "Emma Davis", title: "ML Engineer", img: "/ml-engineer.png" },
  { name: "Noah Lee", title: "Full‑stack Dev", img: "/developer-workspace.png" },
  { name: "Aisha Roy", title: "QA Lead", img: "/qa-lead.png" },
]

export default function TeamPage() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />
      <Section className="mt-10">
        <h1 className="text-3xl font-semibold text-white">Team</h1>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <TeamCard key={m.name} name={m.name} title={m.title} imgAlt={`${m.name} portrait`} imgSrc={m.img} />
          ))}
        </div>
      </Section>

      <Section className="mt-12 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-white">Get to Know Our AI Expertise</h2>
          <Accordion type="single" collapsible className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-2">
            <AccordionItem value="a1">
              <AccordionTrigger>How can AI benefit my business?</AccordionTrigger>
              <AccordionContent>
                We focus on measurable outcomes: efficiency, revenue, and customer experience.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="a2">
              <AccordionTrigger>What is your approach to implementation?</AccordionTrigger>
              <AccordionContent>
                Discovery, pilot, production—with observability and governance built in.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="a3">
              <AccordionTrigger>What’s the typical timeline?</AccordionTrigger>
              <AccordionContent>PoC in weeks, production in phases depending on scope and compliance.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Replaced reference image with a stylized gradient panel */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/60 p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent" />
          <div className="relative grid gap-4">
            <div className="rounded-lg border border-slate-800/60 bg-slate-950/60 p-4">
              <div className="text-xs text-slate-300">Culture</div>
              <div className="font-heading">Collaborative, inclusive, outcome‑driven</div>
            </div>
            <div className="rounded-lg border border-slate-800/60 bg-slate-950/60 p-4">
              <div className="text-xs text-slate-300">Principles</div>
              <div className="font-heading">Pragmatism, accessibility, craftsmanship</div>
            </div>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </main>
  )
}
