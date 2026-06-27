"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { OpportunityRadarPanel } from "@/components/home/opportunity-radar-section";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-slate-200/70 bg-[#F8FAFC]/90 px-5 py-12 shadow-[0_26px_90px_rgba(15,23,42,0.06)] dark:border-slate-700/70 dark:bg-slate-950/72 sm:px-8 lg:px-12 lg:py-16">
      <div className="pointer-events-none absolute -right-48 -top-48 h-[620px] w-[620px] rounded-full bg-cyan-200/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-18%] left-[8%] h-[520px] w-[520px] rounded-full bg-blue-200/18 blur-3xl" />

      <div className="relative z-10 grid min-h-[560px] items-center gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(460px,0.72fr)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">YPI · AI Campus Service Platform</p>
          <h1 className="mt-7 text-[clamp(3.8rem,9vw,8.5rem)] font-black leading-[0.92] tracking-[-0.055em] text-slate-950 dark:text-slate-50">
            扬工智行
          </h1>
          <h2 className="mt-5 max-w-4xl text-[clamp(2rem,4.2vw,4.6rem)] font-black leading-[1.06] tracking-[-0.035em] text-slate-950 dark:text-slate-50">
            AI 校园公益服务平台
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            面向扬州工业职业技术学院学生，提供校园导航、成长机会、AI 成长规划、学习支持与安全关怀服务。
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/opportunities"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-[0_18px_46px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-blue-700 active:scale-95 dark:bg-white dark:text-slate-950"
            >
              进入成长机会中心
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/growth"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/78 px-7 py-4 text-sm font-black text-slate-950 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-700 active:scale-95 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
            >
              开始 AI 成长规划
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-6 text-sm font-black text-slate-500 dark:text-slate-400">
            让每一位学生不错过成长机会
          </p>
        </motion.div>

        <div className="w-full xl:justify-self-end">
          <OpportunityRadarPanel variant="hero" />
        </div>
      </div>
    </section>
  );
}
