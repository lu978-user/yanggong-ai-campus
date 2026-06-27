"use client";

import { motion } from "framer-motion";

const historyNodes = [
  {
    year: "1978",
    title: "扬州化工学校创办",
    desc: "工业与化工职业教育基因由此生长。",
  },
  {
    year: "1981",
    title: "扬州建筑工程学校创办",
    desc: "工程建设与技术技能教育进一步发展。",
  },
  {
    year: "2003",
    title: "两校合并筹建",
    desc: "职业教育资源开始整合。",
  },
  {
    year: "2004",
    title: "扬州工业职业技术学院正式组建",
    desc: "开启高等职业教育新阶段。",
  },
  {
    year: "TODAY",
    title: "YPI 扬工智行",
    desc: "以 AI 连接校园机会、学生目标和成长路径。",
  },
];

export function HistoryTimelineSection() {
  return (
    <section className="ypi-section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-600/18 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-end">
          <div>
            <p className="ypi-kicker">YPI History</p>
            <h2 className="mt-5 text-[clamp(3rem,7vw,7.2rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-slate-950 dark:text-slate-50">
              从工业根脉
              <br />
              到智能成长
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 lg:pb-3">
            扬工院的发展历程，见证了职业教育从产业技能培养走向数字化、智能化育人的过程。
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-5 top-0 h-full w-px bg-blue-600/18 lg:left-0 lg:top-9 lg:h-px lg:w-full" />
          <div className="grid gap-9 lg:grid-cols-5 lg:gap-5">
            {historyNodes.map((node, index) => (
              <motion.article
                key={node.year}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.08 }}
                className="relative pl-16 lg:pl-0"
              >
                <span className="absolute left-0 top-3 z-10 grid size-10 place-items-center rounded-full border border-blue-600/18 bg-[#F8FAFC] dark:bg-slate-950 lg:relative lg:top-0">
                  <span className="size-2.5 rounded-full bg-blue-600" />
                </span>
                <p className="mt-0 text-[clamp(2.8rem,5vw,5.5rem)] font-black leading-none tracking-[-0.055em] text-blue-700 lg:mt-10">
                  {node.year}
                </p>
                <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                  {node.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {node.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <p className="mt-16 max-w-3xl border-l border-blue-600/24 pl-5 text-2xl font-black leading-snug tracking-[-0.03em] text-slate-950 dark:text-slate-100">
          历史不是被陈列的过去，而是继续生长的能力。
        </p>
      </div>
    </section>
  );
}
