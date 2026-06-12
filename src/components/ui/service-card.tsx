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
      className="group rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-md"
    >
      <div className="mb-4 text-2xl text-amber-500">{icon}</div>
      <h3 className="mb-1 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500">{desc}</p>
      <div className="mt-4 text-sm font-medium text-amber-600 group-hover:text-amber-700">Learn more →</div>
    </Link>
  )
}
