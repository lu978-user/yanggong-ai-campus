"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Brain,
  GraduationCap,
  MapPinned,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AssistantPanel } from "@/components/assistant-panel";
import { InlineAgent } from "@/components/inline-agent";

const quickLinks = [
  { label: "校园导航", href: "/map", icon: MapPinned },
  { label: "AI助手", href: "/chat", icon: Bot },
  { label: "成长规划", href: "/growth", icon: GraduationCap },
  { label: "学习资源", href: "/resources", icon: Sparkles },
];

const stats = [
  { label: "校园地点", value: "28+", accent: "from-blue-500 to-sky-400" },
  { label: "知识库文档", value: "120+", accent: "from-teal-500 to-emerald-400" },
  { label: "服务模块", value: "6+", accent: "from-violet-500 to-fuchsia-400" },
  { label: "累计问答", value: "5000+", accent: "from-amber-500 to-orange-400" },
  { label: "用户满意度", value: "98%", accent: "from-rose-500 to-pink-400" },
];

const serviceCards = [
  {
    title: "校园导航",
    icon: MapPinned,
    desc: "静态校园图、AI定位、高德地图辅助导航与热点导览。",
    status: "核心亮点",
    href: "/map",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "成长规划",
    icon: GraduationCap,
    desc: "面向全校专业，生成学习路线、竞赛证书与就业建议。",
    status: "AI规划",
    href: "/growth",
    gradient: "from-violet-600 to-blue-500",
  },
  {
    title: "学习资源",
    icon: Sparkles,
    desc: "聚合图书、课程、竞赛与证书资源，支持个性化推荐。",
    status: "持续扩展",
    href: "/resources",
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    title: "安全教育",
    icon: ShieldCheck,
    desc: "诈骗防范、消防、宿舍、网络与夜间出行安全知识。",
    status: "公益守护",
    href: "/safety",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "心理关怀",
    icon: Brain,
    desc: "压力、焦虑、情绪与睡眠支持，提供温和公益引导。",
    status: "温暖支持",
    href: "/care",
    gradient: "from-pink-500 to-violet-500",
  },
];

const campusNews = [
  ["智慧导览上线", "地图热点、AI问答与高德地图外部导航已联动。"],
  ["成长规划升级", "覆盖信息工程、智能制造、建筑工程、经管与艺术设计方向。"],
  ["公益服务增强", "安全教育与心理关怀模块形成校园支持闭环。"],
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="grid min-h-screen gap-6 px-4 py-5 sm:px-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <main className="min-w-0 space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/72 p-6 shadow-card-light backdrop-blur-2xl sm:p-8 lg:p-12"
          >
            <div className="absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full bg-cyan-300/25 blur-3xl" />
            <div className="absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/78 px-4 py-2 text-sm font-black text-blue-700 shadow-sm backdrop-blur-xl">
                  <Sparkles className="size-4" />
                  智慧校园AI公益服务平台
                </div>
                <h1 className="max-w-4xl text-5xl font-black tracking-normal text-slate-950 sm:text-7xl">
                  你好，我是扬工智行
                </h1>
                <p className="mt-4 text-3xl font-black text-slate-900">
                  你的AI校园成长伙伴
                </p>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
                  面向扬州工业职业技术学院全体学生，提供校园导航、AI问答、成长规划、学习资源、安全教育与心理关怀的一体化公益服务。
                </p>
                <div className="mt-6 inline-flex rounded-2xl border border-blue-100 bg-white/80 px-5 py-3 text-sm font-black text-slate-800 shadow-sm">
                  校训：厚德强能 · 笃学创新
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {quickLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700"
                      >
                        <Icon className="size-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="relative min-h-[360px] overflow-hidden rounded-[32px] border border-white/80 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-card-light"
              >
                <Image src="/campus-map.png" alt="校园背景" fill priority className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/20 to-blue-950/10" />
                <div className="absolute left-5 top-5 flex items-center gap-3 rounded-2xl bg-white/82 px-4 py-3 shadow-sm backdrop-blur-xl">
                  <span className="relative grid size-11 place-items-center overflow-hidden rounded-xl bg-white">
                    <Image src="/logo.png" alt="扬工智行Logo" fill className="object-contain p-1" />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-slate-950">
                      扬州工业职业技术学院
                    </span>
                    <span className="block text-xs font-bold text-slate-500">
                      YANGZHOU POLYTECHNIC INSTITUTE
                    </span>
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                  {["Dify智能体", "mapId定位", "高德地图"].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/78 p-4 shadow-sm backdrop-blur-xl">
                      <p className="text-xs font-bold text-slate-500">已接入</p>
                      <p className="mt-1 text-sm font-black text-blue-700">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="group rounded-[24px] border border-white/70 bg-white/78 p-5 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className={`mb-4 h-1.5 w-12 rounded-full bg-gradient-to-r ${item.accent}`} />
                <p className="text-3xl font-black text-slate-950">{item.value}</p>
                <p className="mt-2 text-sm font-bold text-slate-500">{item.label}</p>
              </motion.div>
            ))}
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black text-blue-600">Five-in-One Service</p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">五位一体服务矩阵</h2>
              </div>
              <Link href="/about" className="hidden text-sm font-black text-blue-700 sm:inline-flex">
                查看项目架构 →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-5">
              {serviceCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.article
                    key={card.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className={`mb-5 grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg`}>
                      <Icon className="size-7" />
                    </div>
                    <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                      {card.status}
                    </div>
                    <h3 className="text-xl font-black text-slate-950">{card.title}</h3>
                    <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600">{card.desc}</p>
                    <Link
                      href={card.href}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      进入服务
                      <ArrowRight className="size-4" />
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
            <div className="rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-xl backdrop-blur-2xl">
              <p className="text-sm font-black text-blue-600">Campus Updates</p>
              <h2 className="mt-1 text-3xl font-black text-slate-950">校园动态与平台进展</h2>
              <div className="mt-5 grid gap-3">
                {campusNews.map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-blue-100 bg-blue-50/45 p-4">
                    <p className="font-black text-slate-950">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <InlineAgent
              title="AI助手入口"
              description="围绕校园导航、学习成长、学生事务、安全教育和心理关怀，直接向扬工智行提问。"
              placeholder="例如：我是大一新生，今天应该先了解哪些校园服务？"
              suggested={["图书馆在哪", "学生证丢了怎么办", "大一成长规划", "最近压力大怎么办"]}
            />
          </section>
        </main>

        <div className="hidden xl:block">
          <AssistantPanel />
        </div>
      </div>
    </AppShell>
  );
}
