"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/count-up";
import { type OpportunityStat } from "@/types/opportunity";
import { SectionHeader } from "./shared";

export function OpportunityStats({ stats }: { stats: OpportunityStat[] }) {
  return (
    <section className="mt-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader eyebrow="Growth Tracker" title="成长机会追踪" desc="用状态把机会推进成行动，让成长过程可见、可管理、可复盘。" />
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="rounded-[24px] bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <p className="text-4xl font-black">
              <CountUp value={stat.value} />
            </p>
            <p className="mt-2 text-sm font-bold text-white/80">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
