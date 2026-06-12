"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  highlight?: string // Key metric or phrase to highlight
}

export interface AnimatedTestimonialsProps {
  title?: string
  subtitle?: string
  badgeText?: string
  testimonials?: Testimonial[]
  autoRotateInterval?: number
  trustedCompanies?: string[]
  trustedCompaniesTitle?: string
  className?: string
}

export function AnimatedTestimonials({
  title = "Loved by the community",
  subtitle = "Don't just take our word for it.",
  badgeText = "Trusted by developers",
  testimonials = [],
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = "Trusted by developers from companies worldwide",
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0, scale: 0.92 }),
  }

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return
    timerRef.current = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, autoRotateInterval)
  }, [autoRotateInterval, testimonials.length])

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  useEffect(() => {
    if (isInView) startTimer()
    return () => stopTimer()
  }, [isInView, startTimer, stopTimer])

  const navigate = useCallback((dir: number) => {
    stopTimer()
    setDirection(dir)
    setActiveIndex((prev) => {
      const next = prev + dir
      if (next < 0) return testimonials.length - 1
      if (next >= testimonials.length) return 0
      return next
    })
    startTimer()
  }, [startTimer, stopTimer, testimonials.length])

  const goTo = useCallback((idx: number) => {
    stopTimer()
    setDirection(idx > activeIndex ? 1 : -1)
    setActiveIndex(idx)
    startTimer()
  }, [activeIndex, startTimer, stopTimer])

  if (testimonials.length === 0) return null

  const current = testimonials[activeIndex]

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`relative py-28 overflow-hidden ${className || ""}`}
      style={{ background: "linear-gradient(180deg, #EEF2F7 0%, #E4EBF3 50%, #EEF2F7 100%)" }}
    >
      {/* Decorative floating shapes */}
      <div className="absolute top-16 left-[8%] w-72 h-72 rounded-full bg-sky-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-64 h-64 rounded-full bg-indigo-200/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-100/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-12 w-full md:grid-cols-2 lg:gap-20"
        >
          {/* ─── Left: Heading + Nav ─── */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-6">
              {badgeText && (
                <motion.div
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-sky-100 to-indigo-100 text-sky-700 ring-1 ring-sky-200/50"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 text-sky-500" />
                  <span>{badgeText}</span>
                </motion.div>
              )}

              <h2
                className="text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-tight text-gray-900 leading-[1.1]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {title}
              </h2>

              <p className="max-w-md text-gray-500 md:text-lg leading-relaxed">{subtitle}</p>

              {/* Highlight metric from current testimonial */}
              {current.highlight && (
                <motion.div
                  key={`highlight-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur border border-sky-100 shadow-sm"
                >
                  <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                    {current.highlight}
                  </span>
                </motion.div>
              )}

              {/* ─── Progress bar indicators ─── */}
              <div className="flex items-center gap-2 pt-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                    style={{ width: i === activeIndex ? 40 : 10, background: i === activeIndex ? "transparent" : "#CBD5E1" }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  >
                    {i === activeIndex && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: "linear-gradient(90deg, #0ea5e9, #6366f1)" }}
                        initial={{ scaleX: 0, transformOrigin: "left" }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: autoRotateInterval / 1000, ease: "linear" }}
                        key={`progress-${activeIndex}-${Date.now()}`}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* ─── Navigation Buttons ─── */}
              <div className="flex items-center gap-3 pt-2">
                <motion.button
                  onClick={() => navigate(-1)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-sky-600 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/50 transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                  onClick={() => navigate(1)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </motion.button>
                <span className="ml-3 text-sm font-mono text-gray-400">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ─── Right: Testimonial Card ─── */}
          <motion.div variants={itemVariants} className="relative min-h-[380px] md:min-h-[440px]">
            {/* Decorative accent shapes */}
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-2xl bg-gradient-to-br from-sky-200/40 to-indigo-200/40 -z-10" />
            <div className="absolute -top-4 -right-4 h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-200/40 to-sky-200/40 -z-10" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200/80 shadow-xl shadow-gray-200/30 rounded-2xl p-8 lg:p-10 h-full flex flex-col relative overflow-hidden">
                  {/* Subtle gradient accent in card */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-50 to-transparent rounded-bl-full pointer-events-none" />

                  {/* Stars */}
                  <div className="mb-5 flex gap-1 relative z-10">
                    {Array(current.rating).fill(0).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -30 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                      >
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6 flex-1">
                    <Quote className="absolute -top-1 -left-1 h-10 w-10 text-sky-100 rotate-180" />
                    <p className="relative z-10 text-[17px] lg:text-lg font-medium leading-[1.75] text-gray-700">
                      &ldquo;{current.content}&rdquo;
                    </p>
                  </div>

                  <Separator className="my-4 bg-gray-100" />

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-13 w-13 border-2 border-sky-100 shadow-sm">
                      <AvatarImage src={current.avatar} alt={current.name} />
                      <AvatarFallback className="bg-gradient-to-br from-sky-100 to-indigo-100 text-sky-700 font-bold text-lg">
                        {current.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-gray-900 text-[15px]">{current.name}</h3>
                      <p className="text-sm text-gray-500">
                        {current.role}{current.company ? `, ${current.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Logo cloud */}
        {trustedCompanies.length > 0 && (
          <motion.div variants={itemVariants} initial="hidden" animate={controls} className="mt-24 text-center">
            <h3 className="text-sm font-medium text-gray-400 mb-8">{trustedCompaniesTitle}</h3>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {trustedCompanies.map((company) => (
                <div key={company} className="text-2xl font-semibold text-gray-300">{company}</div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
