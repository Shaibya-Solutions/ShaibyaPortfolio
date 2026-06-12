"use client"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

export default function ShineCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl border border-border/60 bg-gradient-to-b from-white/5 to-white/0 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute -inset-1 rounded-xl blur-xl bg-[hsla(182,100%,50%,0.06)]" />
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  )
}
