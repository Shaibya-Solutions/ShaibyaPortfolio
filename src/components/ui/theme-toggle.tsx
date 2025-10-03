"use client"
import { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

export function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("theme-dark")
    const isDark = stored ? stored === "true" : true
    setDark(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    localStorage.setItem("theme-dark", String(next))
    document.documentElement.classList.toggle("dark", next)
  }

  return (
    <button
      onClick={toggle}
      className="rounded-full border border-slate-800/60 bg-slate-950/60 p-2 text-slate-300 hover:text-white"
      aria-label="Toggle theme"
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  )
}
