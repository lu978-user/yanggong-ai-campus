"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  ClipboardList,
  GraduationCap,
  HeartHandshake,
  MapPinned,
  Megaphone,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AssistantPanel } from "@/components/assistant-panel";
import { CountUp } from "@/components/count-up";
import { InlineAgent } from "@/components/inline-agent";
import { ParticleBackground } from "@/components/particle-background";

const opportunityCards = [
  {
    title: "班主任助理招募",
    type: "校园岗位",
    deadline: "还剩3天",
    audience: "大一 / 大二 / 有学生干部经历",
    stars: "★★★★★",
  },
  {
    title: "蓝桥杯竞赛报名",
    type: "技能竞赛",
    deadline: "还剩15天",
    audience: "计算机类专业",
    stars: "★★★★★",
  },
  {
    title: "青年志愿者招募",
    type: "志愿服务",
    deadline: "长期有效",
    audience: "全体学生",
    stars: "★★★★☆",
  },
  {
    title: "社团纳新活动",
    type: "校园活动",
    deadline: "本周内",
    audience: "兴趣拓展型学生",
    stars: "★★★★☆",
  },
];

const opportunityStats = [
  ["今日机会", 12],
  ["正在报名", 8],
  ["竞赛项目", 5],
  ["校园活动", 18],
  ["成长规划", 5241],
  ["服务学生", 1276],
];

const serviceCards = [
  {
    title: "成长机会中心",
    icon: Megaphone,
    desc: "聚合班助招募、社团活动、志愿服务、竞赛报名和就业实习机会。",
    href: "/opportunities",
    gradient: "from-cyan-500 to-emerald-500",
    tag: "主推模块",
  },
  {
    title: "成长规划",
    icon: GraduationCap,
    desc: "根据专业、年级和目标生成学习路线、竞赛证书与升学就业建议。",
    href: "/growth",
    gradient: "from-indigo-600 to-violet-500",
    tag: "AI成长报告",
  },
  {
    title: "学习资源",
    icon: BookOpen,
    desc: "整合图书、课程、证书、竞赛资料和AI学习计划。",
    href: "/resources",
    gradient: "from-sky-500 to-blue-600",
    tag: "资源推荐",
  },
  {
    title: "校园导航",
    icon: MapPinned,
    desc: "保留校园PNG主地图，支持热点定位、搜索、高德与百度地图辅助导航。",
    href: "/map",
    gradient: "from-blue-600 to-cyan-500",
    tag: "基础服务",
  },
  {
    title: "AI成长导师",
    icon: Brain,
    desc: "围绕成长规划、机会推荐、学习资源与心理关怀提供连续对话。",
    href: "/chat",
    gradient: "from-violet-600 to-blue-500",
    tag: "智能问答",
  },
  {
    title: "学生事务",
    icon: ClipboardList,
    desc: "提供学生证、流程办理、材料准备等事务指引。",
    href: "/affairs",
    gradient: "from-slate-700 to-blue-500",
    tag: "办事指引",
  },
  {
    title: "安全教育",
    icon: ShieldCheck,
    desc: "覆盖防诈骗、消防安全、宿舍安全、网络安全与夜间出行。",
    href: "/safety",
    gradient: "from-orange-500 to-red-500",
    tag: "公益守护",
  },
  {
    title: "心理关怀",
    icon: HeartHandshake,
    desc: "提供压力调节、情绪管理、睡眠测试和心理中心求助入口。",
    href: "/care",
    gradient: "from-pink-500 to-violet-500",
    tag: "温暖陪伴",
  },
];

const growthLoop = [
  { title: "成长规划", desc: "明确专业方向和阶段目标", icon: GraduationCap },
  { title: "机会发现", desc: "自动发现校园岗位、竞赛和活动", icon: Megaphone },
  { title: "参与实践", desc: "把通知转化为可执行行动", icon: BriefcaseBusiness },
  { title: "能力提升", desc: "沉淀组织、沟通、技术与项目能力", icon: Sparkles },
  { title: "就业升学", desc: "形成简历经历与升学竞争力", icon: Route },
];

export default function DashboardPage() {
  const router = useRouter();
  const [goal, setGoal] = useState("");

  function startPlanning() {
    const query = goal.trim();
    const target = query
      ? `/opportunities?goal=${encodeURIComponent(query)}`
      : "/opportunities";
    router.push(target);
  }

  return (
    <AppShell>
      <div className="grid min-h-screen gap-5 px-4 py-4 sm:px-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <main className="min-w-0 space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="premium-card relative min-h-[680px] overflow-hidden p-6 sm:p-8 lg:p-10"
          >
            <ParticleBackground className="z-0 opacity-75" />
            <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-cyan-300/25 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative z-10 grid min-h-[600px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-black text-blue-700 shadow-sm backdrop-blur-xl">
                  <Sparkles className="size-4" />
                  AI Opportunity Engine
                </div>
                <h1 className="text-gradient-brand text-5xl font-black tracking-normal sm:text-7xl">
                  AI发现你的成长机会
                </h1>
                <p className="mt-5 text-2xl font-black text-blue-700 sm:text-3xl">
                  不错过每一个属于你的机会
                </p>
                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                  扬工智行通过AI整合校园活动、竞赛报名、班助招募、社团活动、学习资源与关怀服务，帮助学生发现机会、规划成长、获得支持。
                </p>

                <div className="mt-7 rounded-[28px] border border-white/80 bg-white/82 p-3 shadow-xl backdrop-blur-2xl">
                  <div className="flex flex-col gap-3 md:flex-row">
                    <input
                      value={goal}
                      onChange={(event) => setGoal(event.target.value)}
                      placeholder="输入你的专业、年级或目标，例如：我是计算机应用技术专业大一，想参加竞赛"
                      className="min-h-14 flex-1 rounded-[22px] border border-blue-100 bg-blue-50/55 px-5 text-sm font-bold text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
                    />
                    <button
                      type="button"
                      onClick={startPlanning}
                      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[22px] bg-gradient-to-r from-blue-600 to-cyan-500 px-6 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 active:scale-95"
                    >
                      开始规划
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/opportunities"
                    className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 active:scale-95"
                  >
                    让AI帮我发现机会
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/map"
                    className="group inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/82 px-6 py-3 text-sm font-bold text-blue-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50 active:scale-95"
                  >
                    查看校园地图
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-[34px] border border-white/90 bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-5 shadow-[0_34px_110px_rgba(37,99,235,0.22)]"
              >
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />
                <div className="relative flex items-center gap-3">
                  <span className="relative grid size-14 place-items-center overflow-hidden rounded-2xl bg-white shadow-sm">
                    <Image src="/logo.png" alt="扬工智行Logo" fill priority className="object-contain p-2" />
                  </span>
                  <div>
                    <p className="text-2xl font-black tracking-tight text-slate-950">YPI</p>
                    <p className="text-sm font-black text-slate-700">扬工智行</p>
                    <p className="text-xs font-bold text-blue-600">AI-Powered Student Growth Platform</p>
                  </div>
                </div>

                <div className="relative mt-6 grid gap-3">
                  {opportunityCards.slice(0, 3).map((item) => (
                    <div key={item.title} className="rounded-[24px] border border-blue-100 bg-white/78 p-4 shadow-sm backdrop-blur-xl">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{item.type}</span>
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">{item.deadline}</span>
                      </div>
                      <p className="mt-3 text-lg font-black text-slate-950">{item.title}</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">{item.audience}</p>
                      <p className="mt-2 text-sm font-black text-amber-500">{item.stars}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          <section className="premium-card p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black text-blue-600">Today Opportunities</p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">今日机会推荐</h2>
              </div>
              <Link href="/opportunities" className="text-sm font-black text-blue-700">
                查看全部机会 →
              </Link>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
              {opportunityCards.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group rounded-[26px] border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50/72 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-200 hover:shadow-2xl dark:border-slate-700 dark:from-slate-900 dark:to-slate-800"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">{item.type}</span>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">{item.deadline}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">适合：{item.audience}</p>
                  <p className="mt-3 text-base font-black text-amber-500">{item.stars}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link href="/opportunities" className="rounded-full bg-blue-600 px-4 py-2 text-xs font-black text-white shadow-sm active:scale-95">
                      AI解读
                    </Link>
                    <button type="button" className="rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black text-blue-700 hover:bg-blue-50 active:scale-95">
                      收藏机会
                    </button>
                    <Link href="/opportunities" className="rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black text-slate-600 hover:bg-blue-50 active:scale-95">
                      查看详情
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-6 text-white shadow-glow">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black text-white/75">Opportunity Data Center</p>
                <h2 className="mt-1 text-3xl font-black">成长机会数据中心</h2>
              </div>
              <p className="text-sm font-bold text-white/75">实时感知机会动态，辅助学生行动决策</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3 2xl:grid-cols-6">
              {opportunityStats.map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-[24px] border border-white/24 bg-white/16 p-5 shadow-xl backdrop-blur-xl"
                >
                  <p className="text-4xl font-black">
                    <CountUp value={Number(value)} />
                  </p>
                  <p className="mt-2 text-sm font-bold text-white/78">{label}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="premium-card p-6">
            <p className="text-sm font-black text-blue-600">Growth Loop Model</p>
            <h2 className="mt-1 text-3xl font-black text-slate-950">从发现机会到能力成长</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
              扬工智行不只是回答问题，而是帮助学生形成从目标设定、机会发现、实践参与到能力提升的成长闭环。
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-5">
              {growthLoop.map((item, index) => {
                const Icon = item.icon;
                return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative rounded-[24px] border border-blue-100 bg-white/72 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-glow">
                    <Icon className="size-5" />
                  </div>
                  <p className="text-base font-black text-slate-950">{item.title}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{item.desc}</p>
                  {index < growthLoop.length - 1 && (
                    <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl font-black text-blue-400 md:block">
                      →
                    </span>
                  )}
                </motion.div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black text-blue-600">Campus Service Matrix</p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">八大服务入口</h2>
              </div>
              <Link href="/about" className="hidden text-sm font-black text-blue-700 sm:inline-flex">
                查看项目架构 →
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
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
                    <span className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                      {card.tag}
                    </span>
                    <h3 className="text-2xl font-black text-slate-950">{card.title}</h3>
                    <p className="mt-3 min-h-16 text-sm leading-7 text-slate-600">{card.desc}</p>
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
              <p className="text-sm font-black text-blue-600">AI Driven Care Platform</p>
              <h2 className="mt-1 text-3xl font-black text-slate-950">
                AI驱动的大学生成长机会与关怀服务平台
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["成长机会发现", "通知智能解读", "学习资源推荐", "安全心理关怀"].map((item) => (
                  <div key={item} className="rounded-2xl border border-blue-100 bg-blue-50/45 p-4">
                    <p className="font-black text-slate-950">{item}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      围绕成长、机会、陪伴构建，让校园信息从“能查询”升级为“能理解、能指导”。
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <InlineAgent
              title="AI成长导师入口"
              description="围绕成长规划、竞赛证书、成长机会、学习资源与心理关怀，获取更有陪伴感的建议。"
              placeholder="例如：我是大一新生，如何规划成长并参加成长机会？"
              suggested={["大一成长规划", "蓝桥杯怎么准备", "最近有哪些机会", "最近压力大怎么办"]}
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
