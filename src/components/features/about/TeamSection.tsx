"use client";

import { motion } from "framer-motion";
import { TEAM_MEMBERS } from "@/data/team";

export default function TeamSection() {
  return (
    <section id="team" aria-labelledby="team-heading" className="scroll-mt-32 py-24 lg:py-32 bg-[#F8FAFB] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500 mb-4">Our Team</p>
          <h2 id="team-heading" className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-[#111827] mb-6">
            The Skills Behind Our Work
          </h2>
          <p className="text-lg text-[#6B7280] leading-relaxed">
            Our work brings together software engineering, automation, CRM, security, and
            visual design. These disciplines connect technical decisions with the business
            problems we’re here to solve.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.article
                key={member.codename}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-2xl border border-[#E5E7EB] p-8 hover:border-sky-300 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-6 group-hover:bg-sky-100 transition-colors">
                  <Icon className="w-6 h-6 text-sky-500" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#111827] mb-3">{member.dayJob.replace(/^Senior /, "")}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{member.nightSkill}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
