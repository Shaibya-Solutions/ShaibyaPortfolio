import type { ReactNode } from "react"

export function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-5 shadow-[0_0_0_1px_rgba(8,145,178,0.05)_inset] transition hover:border-cyan-600/40">
      <div className="mb-3 text-cyan-400">{icon}</div>
      <h3 className="mb-1 text-base font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
    </div>
  )
}
