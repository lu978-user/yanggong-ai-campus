"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AssistantPanel } from "@/components/assistant-panel";

const cards = [
  {
    title: "校园导航",
    icon: "📍",
    desc: ["查询校园建筑位置", "地图导览", "校园环境介绍"],
    button: "进入导航",
    href: "/map",
  },
  {
    title: "图书馆助手",
    icon: "📚",
    desc: ["图书借阅", "资源检索", "学习空间查询"],
    button: "开始查询",
    href: "/chat",
  },
  {
    title: "食堂助手",
    icon: "🍜",
    desc: ["食堂信息", "就餐推荐", "校园生活服务"],
    button: "查看服务",
    href: "/life",
  },
  {
    title: "成长规划",
    icon: "🎓",
    desc: ["专业规划", "竞赛推荐", "证书规划"],
    button: "开始规划",
    href: "/growth",
  },
  {
    title: "反诈宣传",
    icon: "🛡",
    desc: ["识别诈骗", "案例分析", "防范建议"],
    button: "学习防范",
    href: "/safety",
  },
  {
    title: "心理关怀",
    icon: "💗",
    desc: ["压力调节", "情绪管理", "心理健康"],
    button: "获取建议",
    href: "/care",
  },
];

const stats = [
  ["校园导航", "mapId热点定位"],
  ["学习成长", "规划诊断"],
  ["安全教育", "反诈知识"],
  ["心理关怀", "公益支持"],
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="grid min-h-screen gap-6 px-5 py-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <main className="min-w-0">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-card-light backdrop-blur-2xl lg:p-8"
          >
            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-400/12 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_430px]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                  <span>✨</span>
                  AI校园公益服务平台
                </div>
                <h1 className="text-4xl font-black tracking-normal text-slate-950 sm:text-5xl">
                  你好，我是扬工智行
                </h1>
                <p className="mt-3 text-2xl font-black text-slate-900">
                  你的AI校园成长伙伴
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                  我可以为你提供专业的校园服务、学习成长规划、校园导航与公益服务建议。
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/map"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:bg-blue-700"
                  >
                    进入校园导览
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/growth"
                    className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                  >
                    开始成长规划
                  </Link>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="relative h-[280px] overflow-hidden rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-card-light"
              >
                <Image src="/campus-map.png" alt="校园建筑图" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent" />
                <div className="absolute bottom-5 left-5 rounded-2xl bg-white/82 px-4 py-3 shadow-sm backdrop-blur-xl">
                  <p className="text-sm font-black text-blue-700">扬州工业职业技术学院</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Yangzhou Polytechnic Institute
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {stats.map(([label, value], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[20px] border border-white/70 bg-white/76 p-5 shadow-sm backdrop-blur-xl"
              >
                <div className="mb-3 flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="size-4" />
                  <span className="text-xs font-black">已接入</span>
                </div>
                <p className="text-xl font-black text-slate-950">{label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-500">{value}</p>
              </motion.div>
            ))}
          </section>

          <section className="mt-6">
            <div className="mb-4">
              <p className="text-sm font-black text-blue-600">功能入口</p>
              <h2 className="mt-1 text-3xl font-black text-slate-950">五位一体校园服务</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {cards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group rounded-[20px] border border-white/70 bg-white/82 p-5 shadow-card-light backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-glow"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-3xl shadow-sm">
                      {card.icon}
                    </span>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                      AI服务
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-950">{card.title}</h3>
                  <ul className="mt-3 space-y-1 text-sm leading-7 text-slate-600">
                    {card.desc.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                  <Link
                    href={card.href}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    {card.button}
                    <ArrowRight className="size-4" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>
        </main>

        <div className="hidden xl:block">
          <AssistantPanel />
        </div>
      </div>
    </AppShell>
  );
}
