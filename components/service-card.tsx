import Link from "next/link"
import type { ReactNode } from "react"

export function ServiceCard({
  href,
  title,
  desc,
  icon,
}: {
  href: string
  title: string
  desc: string
  icon: ReactNode
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-800/60 bg-gradient-to-b from-slate-950 to-slate-950/60 p-6 transition hover:border-cyan-600/40"
    >
      <div className="mb-4 text-2xl text-cyan-400">{icon}</div>
      <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
      <div className="mt-4 text-sm font-medium text-cyan-300 group-hover:text-cyan-200">Learn more →</div>
    </Link>
  )
}
