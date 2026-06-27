"use client";

import { motion } from "framer-motion";
import { growthJourney } from "@/components/home/home-data";

export function GrowthJourneySection() {
  return (
    <section className="ypi-section">
      <div className="mx-auto max-w-6xl">
        <p className="ypi-kicker">Growth Journey</p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
          <h2 className="text-[clamp(3rem,7vw,7.5rem)] font-black uppercase leading-[0.92] tracking-[-0.06em] text-slate-950 dark:text-slate-50">
            FROM OPPORTUNITY
            <br />
            TO GROWTH
          </h2>
          <p className="max-w-xl text-3xl font-black leading-tight tracking-[-0.03em] text-slate-950 dark:text-slate-100">
            从发现机会到完成成长
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-slate-200 dark:bg-slate-700 md:block lg:left-0 lg:top-7 lg:h-px lg:w-full" />
        <div className="grid gap-8 lg:grid-cols-5">
          {growthJourney.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.06 }}
              className="relative pl-20 lg:pl-0"
            >
              <span className="absolute left-0 top-0 z-10 grid size-14 shrink-0 place-items-center rounded-full border border-slate-200 bg-[#F8FAFC] text-sm font-black text-slate-950 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 lg:relative lg:left-auto">
                  {String(index + 1).padStart(2, "0")}
                </span>
              <h3 className="mt-1 text-xl font-black tracking-tight text-slate-950 dark:text-slate-100 lg:mt-8">{item.title}</h3>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
