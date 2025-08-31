import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={cn("mx-auto w-full max-w-6xl px-4 py-8", className)}>{children}</section>
}
