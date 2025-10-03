import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { ServiceCard } from "@/components/ui/service-card";
import { FaBrain, FaCubes, FaMobileAlt, FaFlask } from "react-icons/fa";

export default function ServicesPage() {
  return (
    <main className='bg-slate-950 text-slate-100'>
      <SiteHeader />
      <Section className='mt-10'>
        <h1 className='text-3xl font-semibold text-white'>Services</h1>
        <p className='mt-2 text-sm text-slate-400'>
          A modern catalog inspired by the reference designs.
        </p>
        <div className='mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          <ServiceCard
            href='/services/ai'
            title='AI Solutions'
            desc='ML, analytics, and automation.'
            icon={<FaBrain />}
          />
          <ServiceCard
            href='/services/full-stack'
            title='Full‑stack Development'
            desc='APIs, web apps, and integrations.'
            icon={<FaCubes />}
          />
          <ServiceCard
            href='/services/apps'
            title='Desktop & Mobile Apps'
            desc='Cross‑platform performance.'
            icon={<FaMobileAlt />}
          />
          <ServiceCard
            href='/services/rd'
            title='Custom R&D'
            desc='Rapid prototyping & PoCs.'
            icon={<FaFlask />}
          />
        </div>
      </Section>

      <Section className='mt-12'>
        <div className='relative overflow-hidden rounded-2xl border border-slate-800/60 p-6 text-center'>
          <div className='pointer-events-none absolute -inset-10 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 blur-2xl' />
          <h2 className='font-heading text-2xl text-white'>
            See Shaibya in Action
          </h2>
          <p className='mx-auto mt-2 max-w-2xl text-sm text-slate-300'>
            Predictive operations, automated workflows, and robust platforms
            that scale with your growth.
          </p>
          <div className='mx-auto mt-6 grid max-w-3xl grid-cols-3 gap-3'>
            {[
              { k: "50×", v: "Faster PoC" },
              { k: "3M", v: "Users Served" },
              { k: "99.9%", v: "Uptime" },
            ].map((s) => (
              <div
                key={s.k}
                className='rounded-xl border border-slate-800/60 bg-slate-950/60 px-4 py-3'
              >
                <div className='font-heading text-lg text-white'>{s.k}</div>
                <div className='text-xs text-slate-300'>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <SiteFooter />
    </main>
  );
}
