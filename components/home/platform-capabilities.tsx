"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { platformCapabilities } from "@/components/home/home-data";

export function PlatformCapabilities() {
  return (
    <section className="ypi-section">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="ypi-kicker">Platform Capabilities</p>
          <h2 className="ypi-section-title mt-4">平台能力</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-300">
          功能入口下沉到页面后半部分，服务于成长机会发现、规划与关怀主线。
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {platformCapabilities.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.04 }}
              className="ypi-soft-card group p-6 shadow-none"
            >
              <div className="mb-7 flex items-center justify-between gap-4">
                <span className="grid size-13 place-items-center rounded-[22px] border border-slate-200 bg-white text-blue-700 shadow-sm transition-all duration-500 group-hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-950">
                  <Icon className="size-6" />
                </span>
                <ArrowRight className="size-4 text-slate-300 transition-all duration-500 group-hover:translate-x-1 group-hover:text-blue-600" />
              </div>
              <h3 className="text-xl font-black tracking-tight text-slate-950 dark:text-slate-100">{card.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600 dark:text-slate-300">{card.desc}</p>
              <Link
                href={card.href}
                className="mt-6 inline-flex rounded-full border border-slate-200 px-4 py-2 text-xs font-black text-slate-700 transition-all duration-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-95 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                进入
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
