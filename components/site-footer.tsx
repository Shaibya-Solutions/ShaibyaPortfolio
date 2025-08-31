import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-800/60 bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="mb-3 text-lg font-semibold text-white">Shaibya Solutions</div>
          <p className="text-sm text-slate-400">
            Building intelligent software and AI solutions for forward‑thinking teams.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold text-slate-200">Navigation</div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-white">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="hover:text-white">
                Case Studies
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div id="contact" className="mb-3 text-sm font-semibold text-slate-200">
            Contact
          </div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>hello@shaibya.solutions</li>
            <li>+1 (555) 010-2025</li>
            <li>Remote‑first, Global</li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold text-slate-200">Newsletter</div>
          <form className="flex gap-2">
            <input
              aria-label="Email"
              placeholder="Email"
              className="min-w-0 flex-1 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-500"
            />
            <button className="rounded-md bg-cyan-500 px-4 text-sm font-medium text-slate-950 hover:bg-cyan-400">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-800/60 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Shaibya Solutions. All rights reserved.
      </div>
    </footer>
  )
}
