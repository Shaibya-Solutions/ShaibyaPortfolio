export function JobCard({
  title,
  location,
  type,
}: {
  title: string
  location: string
  type: string
}) {
  return (
    <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="text-xs text-slate-400">
            {location} · {type}
          </div>
        </div>
        <a
          href="#"
          className="rounded-full bg-cyan-500 px-3 py-1.5 text-xs font-medium text-slate-950 hover:bg-cyan-400"
        >
          Apply
        </a>
      </div>
    </div>
  )
}
