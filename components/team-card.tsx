export function TeamCard({
  name,
  title,
  imgAlt,
  imgSrc,
}: {
  name: string
  title: string
  imgAlt: string
  imgSrc: string
}) {
  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-3">
      <img src={imgSrc || "/placeholder.svg"} alt={imgAlt} className="aspect-[4/3] w-full rounded-xl object-cover" />
      <div className="pt-3">
        <div className="text-sm font-semibold text-white">{name}</div>
        <div className="text-xs text-slate-400">{title}</div>
      </div>
    </div>
  )
}
