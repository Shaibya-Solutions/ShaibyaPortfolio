"use client";

import { useEffect, useState } from "react";
import { Film, RefreshCw, Search } from "lucide-react";
import { loadPortfolioMedia } from "@/app/admin/actions";
import { getProjectMediaPoster, type PortfolioMediaAsset } from "@/lib/imagekit";

export default function ImageKitLibrary({
  onChoose,
  selected = [],
}: {
  onChoose?: (asset: PortfolioMediaAsset) => void;
  selected?: string[];
}) {
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [result, setResult] = useState<Awaited<ReturnType<typeof loadPortfolioMedia>>>();
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const data = await loadPortfolioMedia(query, offset);
        if (!cancelled) setResult(data);
      } catch {
        if (!cancelled) setResult({ error: "Unable to load the ImageKit library.", items: [], next: null });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, query ? 250 : 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, offset, revision]);

  function pageTo(next: number) {
    setLoading(true);
    setOffset(next);
  }

  const card = "group relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-slate-700 bg-slate-950 text-left focus-visible:outline-2 focus-visible:outline-sky-400";
  return (
    <div className="space-y-3" aria-busy={loading}>
      <div className="flex gap-2">
      <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3">
        <Search size={16} className="text-slate-400" aria-hidden />
        <input
          type="search"
          value={query}
          aria-label="Search ImageKit files"
          placeholder="Search ImageKit files"
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none"
          onKeyDown={(event) => {
            if (event.key === "Enter") event.preventDefault();
          }}
          onChange={(event) => {
            setLoading(true);
            setQuery(event.target.value);
            setOffset(0);
          }}
        />
      </label>
        <button type="button" aria-label="Refresh ImageKit files" title="Refresh ImageKit files" disabled={loading}
          className="grid min-w-10 place-items-center rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 disabled:opacity-50"
          onClick={() => { setLoading(true); setRevision((value) => value + 1); }}><RefreshCw size={16} aria-hidden /></button>
      </div>
      {loading ? <p role="status" className="py-4 text-sm text-slate-400">Loading ImageKit files…</p>
        : result?.error ? (
          <div className="flex items-center gap-3 text-sm text-rose-300" role="status">
            {result.error}
            <button type="button" className="underline" onClick={() => { setLoading(true); setRevision((value) => value + 1); }}>
              Retry
            </button>
          </div>
        ) : result?.items.length ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {result.items.map((asset) => {
              const isSelected = selected.includes(asset.url);
              const content = <>
                <img src={getProjectMediaPoster(asset.url, 300)} alt="" loading="lazy" className="aspect-video w-full object-cover" />
                {asset.kind === "video" && (
                  <span className="absolute top-1.5 right-1.5 rounded bg-slate-950/85 p-1 text-white" aria-label="Video">
                    <Film size={14} />
                  </span>
                )}
                <span className="w-full truncate px-2 py-2 text-xs text-slate-200" title={asset.path}>{asset.name}</span>
              </>;
              return onChoose ? (
                <button
                  key={asset.id}
                  type="button"
                  aria-label={`Choose ${asset.name}`}
                  aria-pressed={isSelected}
                  onClick={() => onChoose(asset)}
                  className={`${card} hover:border-sky-400 ${isSelected ? "ring-2 ring-inset ring-sky-400" : ""}`}
                >{content}</button>
              ) : (
                <a key={asset.id} href={asset.url} target="_blank" rel="noopener noreferrer" className={`${card} hover:border-sky-400`}>
                  {content}
                </a>
              );
            })}
          </div>
        ) : <p role="status" className="py-4 text-sm text-slate-400">No public images or videos match this page.</p>}
      {(offset > 0 || result?.next != null) && (
        <div className="flex gap-2">
          <button type="button" disabled={loading || offset <= 0} onClick={() => pageTo(Math.max(0, offset - 30))}
            className="rounded border border-slate-700 px-3 py-2 text-xs text-slate-200 disabled:opacity-40">Previous</button>
          <button type="button" disabled={loading || result?.next == null} onClick={() => result?.next != null && pageTo(result.next)}
            className="rounded border border-slate-700 px-3 py-2 text-xs text-slate-200 disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}
