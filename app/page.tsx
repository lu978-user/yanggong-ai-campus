"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  GraduationCap,
  MapPinned,
  Megaphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AssistantPanel } from "@/components/assistant-panel";
import { CountUp } from "@/components/count-up";
import { InlineAgent } from "@/components/inline-agent";

const stats = [
  { label: "校园地点", value: 28, suffix: "+", accent: "from-blue-500 to-cyan-400" },
  { label: "知识库文档", value: 120, suffix: "+", accent: "from-emerald-500 to-teal-400" },
  { label: "服务模块", value: 8, suffix: "+", accent: "from-violet-500 to-blue-500" },
  { label: "累计问答", value: 5000, suffix: "+", accent: "from-amber-500 to-orange-400" },
  { label: "用户满意度", value: 98, suffix: "%", accent: "from-rose-500 to-pink-400" },
];

const serviceCards = [
  {
    title: "校园导航",
    icon: MapPinned,
    desc: "AI定位校园地点，联动PNG地图热点与外部地图导航。",
    href: "/map",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "校园机会",
    icon: Megaphone,
    desc: "解读招聘、社团、志愿、讲座、比赛和勤工助学通知。",
    href: "/opportunities",
    gradient: "from-cyan-500 to-emerald-500",
  },
  {
    title: "成长规划",
    icon: GraduationCap,
    desc: "覆盖多学院专业，生成学习路线、竞赛证书与升学建议。",
    href: "/growth",
    gradient: "from-indigo-600 to-violet-500",
  },
  {
    title: "学习资源",
    icon: BookOpen,
    desc: "聚合图书、课程、证书、竞赛资料和AI学习计划。",
    href: "/resources",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    title: "安全教育",
    icon: ShieldCheck,
    desc: "防诈骗、消防、宿舍、网络与夜间出行安全知识库。",
    href: "/safety",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "心理关怀",
    icon: Brain,
    desc: "压力、焦虑、情绪、睡眠测试与心理中心求助入口。",
    href: "/care",
    gradient: "from-pink-500 to-violet-500",
  },
];

const platformHighlights = ["Dify Chatflow", "mapId 热点定位", "校园知识库", "高德/百度外部导航"];

const recommendedPath = [
  "查询图书馆位置",
  "获取专业成长规划",
  "解读校园机会通知",
  "查询学生事务流程",
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="grid min-h-screen gap-5 px-4 py-4 sm:px-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <main className="min-w-0 space-y-5">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="premium-card relative overflow-hidden p-6 sm:p-8 lg:p-10"
          >
            <div className="animate-blob-drift absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-cyan-300/25 blur-3xl" />
            <div className="animate-blob-drift absolute left-1/4 top-1/2 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-3xl [animation-delay:1.6s]" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-black text-blue-700 shadow-sm backdrop-blur-xl">
                  <Sparkles className="size-4" />
                  YangGong AI Campus V5
                </div>
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-gradient-brand text-5xl font-black tracking-normal sm:text-7xl"
                >
                  扬工智行
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
                  className="mt-4 text-2xl font-black text-blue-700 sm:text-3xl"
                >
                  AI校园公益服务平台
                </motion.p>
                <p className="mt-3 text-lg font-black text-slate-800">
                  AI驱动的校园导航、成长规划与公益服务平台
                </p>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
                  集校园导航、成长规划、学习资源、校园机会与智能问答于一体，为扬州工业职业技术学院学生提供公益化、智能化、可持续的校园服务。
                </p>
                <div className="mt-6 inline-flex rounded-2xl border border-blue-100 bg-white/78 px-5 py-3 text-sm font-black text-slate-800 shadow-sm">
                  校训：厚德强能 · 笃学创新
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/chat"
                    className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 active:scale-95"
                  >
                    开始体验
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/map"
                    className="group inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/82 px-6 py-3 text-sm font-bold text-blue-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50 active:scale-95"
                  >
                    校园导航
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="relative min-h-[410px] overflow-hidden rounded-[32px] border border-white/90 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-[0_32px_100px_rgba(37,99,235,0.2)]"
              >
                <Image src="/campus-map.png" alt="校园地图预览" fill priority className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/15 to-blue-950/10" />
                <div className="absolute left-5 top-5 flex items-center gap-3 rounded-2xl bg-white/84 px-4 py-3 shadow-sm backdrop-blur-xl">
                  <span className="relative grid size-11 place-items-center overflow-hidden rounded-xl bg-white">
                    <Image src="/logo.png" alt="扬工智行Logo" fill className="object-contain p-1" />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-slate-950">扬州工业职业技术学院</span>
                    <span className="block text-xs font-bold text-slate-500">YANGZHOU POLYTECHNIC INSTITUTE</span>
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-2">
                  {platformHighlights.map((item) => (
                    <div key={item} className="rounded-2xl bg-white/78 p-4 shadow-sm backdrop-blur-xl">
                      <p className="text-xs font-bold text-slate-500">已接入</p>
                      <p className="mt-1 text-sm font-black text-blue-700">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.04, duration: 0.35 }}
                className="premium-card group p-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
              >
                <div className={`mb-4 h-1.5 w-12 rounded-full bg-gradient-to-r ${item.accent}`} />
                <p className="text-3xl font-black text-slate-950">
                  <CountUp value={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">{item.label}</p>
              </motion.div>
            ))}
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black text-blue-600">Campus Service Matrix</p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">六大服务入口</h2>
              </div>
              <Link href="/about" className="hidden text-sm font-black text-blue-700 sm:inline-flex">
                查看项目架构 →
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
              {serviceCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.article
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: index * 0.04, duration: 0.35 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="premium-card group relative overflow-hidden p-5 transition-all duration-300 hover:shadow-2xl"
                  >
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/0 blur-3xl transition-all duration-300 group-hover:bg-cyan-300/25" />
                    <div className={`animate-float-soft relative mb-5 grid size-15 place-items-center rounded-3xl bg-gradient-to-br ${card.gradient} p-4 text-white shadow-lg`}>
                      <Icon className="size-7" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-950">{card.title}</h3>
                    <p className="mt-3 min-h-16 text-sm leading-7 text-slate-600">{card.desc}</p>
                    <span className="mt-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                      智慧校园服务
                    </span>
                    <Link
                      href={card.href}
                      className="group/link mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-95"
                    >
                      进入服务
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
            <div className="premium-card p-6">
              <p className="text-sm font-black text-blue-600">V5 Platform Value</p>
              <h2 className="mt-1 text-3xl font-black text-slate-950">不是聊天机器人，而是校园服务平台</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["校园地点查询", "通知机会解读", "专业成长规划", "安全心理公益支持"].map((item) => (
                  <div key={item} className="rounded-2xl border border-blue-100 bg-blue-50/45 p-4">
                    <p className="font-black text-slate-950">{item}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">由知识库、意图分类与Dify智能体共同支撑。</p>
                  </div>
                ))}
              </div>
            </div>
            <InlineAgent
              title="AI助手入口"
              description="围绕校园导航、学习成长、学生事务、安全教育和心理关怀，直接向扬工智行提问。"
              placeholder="例如：我是大一新生，今天应该先了解哪些校园服务？"
              suggested={["文汇楼（图书馆）在哪", "学生证丢了怎么办", "大一成长规划", "最近压力大怎么办"]}
            />
          </section>

          <section className="premium-card p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black text-blue-600">Recommended Demo Path</p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">推荐体验路径</h2>
              </div>
              <p className="text-sm font-bold text-slate-500">适合比赛现场 3 分钟演示</p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {recommendedPath.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-[24px] border border-blue-100 bg-white/72 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">
                    <CheckCircle2 className="size-3.5" />
                    Step {index + 1}
                  </div>
                  <p className="text-base font-black text-slate-950">{item}</p>
                </motion.div>
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
