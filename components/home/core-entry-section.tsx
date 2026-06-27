"use client";

import Link from "next/link";
import { ArrowRight, Brain, GraduationCap, MapPinned, Megaphone } from "lucide-react";

const coreEntries = [
  {
    title: "成长机会",
    desc: "发现班助招募、竞赛报名、志愿活动与实践机会。",
    href: "/opportunities",
    icon: Megaphone,
  },
  {
    title: "AI 成长导师",
    desc: "围绕专业、目标、证书、竞赛与关怀连续对话。",
    href: "/chat",
    icon: Brain,
  },
  {
    title: "校园地图",
    desc: "查询校园地点，联动地图热点与外部导航。",
    href: "/map",
    icon: MapPinned,
  },
  {
    title: "成长规划",
    desc: "根据专业、年级和目标生成成长建议。",
    href: "/growth",
    icon: GraduationCap,
  },
];

export function CoreEntrySection() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {coreEntries.map((entry) => {
        const Icon = entry.icon;
        return (
          <Link
            key={entry.href}
            href={entry.href}
            className="group relative z-10 rounded-[28px] border border-slate-200/70 bg-white/76 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)] active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900/70"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-slate-950">
                <Icon className="size-6" />
              </span>
              <ArrowRight className="size-4 text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
            </div>
            <h3 className="text-xl font-black text-slate-950 dark:text-slate-100">{entry.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{entry.desc}</p>
          </Link>
        );
      })}
    </section>
  );
}
