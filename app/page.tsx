"use client";

import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  HeartHandshake,
  LifeBuoy,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { CountUp } from "@/components/count-up";
import { WhiteGooseParticles } from "@/components/home/white-goose-particles";
import { defaultOpportunities, getOpportunities, type Opportunity } from "@/data/opportunities";
import { calculateGrowthScore, collegeProfiles, type GrowthDiagnosisProfile } from "@/data/growth-diagnosis";
import { schoolHistory, schoolStrengths } from "@/data/school-profile";

const sampleProfile: GrowthDiagnosisProfile = {
  collegeId: collegeProfiles[0].id,
  major: collegeProfiles[0].majors[0],
  grade: "大二",
  goal: "竞赛提升",
  statuses: ["目标很清晰", "有学习计划", "准备参加竞赛", "关注过校园机会"],
  interest: "AI应用开发",
};

const progressItems = [
  ["01", "首页", "hero"],
  ["02", "校史", "history"],
  ["03", "荣誉", "honor"],
  ["04", "检测", "diagnosis"],
  ["05", "机会", "opportunity"],
  ["06", "服务", "service"],
  ["07", "开始", "cta"],
] as const;

const serviceLinks = [
  { title: "校园地图导览", description: "查询建筑位置、校园地点和路线提示。", href: "/map", icon: MapPinned },
  { title: "AI 成长导师", description: "围绕目标、竞赛、证书和关怀连续对话。", href: "/chat", icon: MessageCircle },
  { title: "学习资源", description: "整理课程、工具与学习路径。", href: "/resources", icon: BookOpen },
  { title: "学生事务", description: "查询请假、学生证、奖助等事务信息。", href: "/affairs", icon: LifeBuoy },
  { title: "安全教育", description: "提供反诈、实训、消防等安全提醒。", href: "/safety", icon: ShieldCheck },
  { title: "心理关怀", description: "提供压力疏导与心理支持入口。", href: "/care", icon: HeartHandshake },
];

const heroActionCards = [
  {
    title: "成长机会",
    description: "发现班助、竞赛、社团与志愿服务",
    action: "进入机会中心",
    href: "/opportunities",
    icon: Trophy,
    className: "bg-white/95 text-slate-950 sm:col-span-7 sm:translate-x-8",
    iconClassName: "bg-orange-100 text-[#D97706]",
    accentClassName: "text-[#D97706]",
    tone: "light",
  },
  {
    title: "AI 成长导师",
    description: "围绕专业、年级和目标生成建议",
    action: "问问 AI",
    href: "/chat",
    icon: MessageCircle,
    className: "bg-[#F8FBFF]/95 text-slate-950 sm:col-span-6 sm:col-start-6 sm:-translate-y-5",
    iconClassName: "bg-blue-100 text-[#2563EB]",
    accentClassName: "text-[#2563EB]",
    tone: "light",
  },
  {
    title: "校园地图",
    description: "查询建筑位置与校园路线",
    action: "打开地图",
    href: "/map",
    icon: MapPinned,
    className: "bg-[#F0FDFA]/95 text-slate-950 sm:col-span-6 sm:translate-x-2 sm:-translate-y-2",
    iconClassName: "bg-teal-100 text-[#0F766E]",
    accentClassName: "text-[#0F766E]",
    tone: "light",
  },
  {
    title: "成长检测",
    description: "生成成长评分与本月行动清单",
    action: "开始检测",
    href: "/growth",
    icon: BrainCircuit,
    className: "bg-[#FFF7E6]/95 text-slate-950 sm:col-span-7 sm:col-start-5 sm:-translate-y-8",
    iconClassName: "bg-amber-100 text-[#D97706]",
    accentClassName: "text-[#D97706]",
    tone: "light",
  },
];

function isCompleted(item: Opportunity) {
  return item.followStatus === "已完成";
}

function isUrgent(item: Opportunity) {
  return item.status === "即将截止" || item.deadline.includes("本周") || item.deadline.includes("3天");
}

function todayCount(items: Opportunity[]) {
  const today = new Date().toISOString().slice(0, 10);
  return items.filter((item) => item.createdAt?.slice(0, 10) === today).length || Math.min(items.length, 14) || 12;
}

export default function DashboardPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(defaultOpportunities);
  const [activeScreen, setActiveScreen] = useState("hero");

  useEffect(() => {
    setOpportunities(getOpportunities());
  }, []);

  useEffect(() => {
    const sections = progressItems
      .map(([, , id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveScreen(visible.target.id);
        }
      },
      { threshold: [0.35, 0.55, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const score = useMemo(() => calculateGrowthScore(sampleProfile, opportunities), [opportunities]);
  const recommended = useMemo(
    () => opportunities.filter((item) => item.recommendLevel >= 4 && !isCompleted(item)).slice(0, 3),
    [opportunities],
  );
  const stats = useMemo(
    () => ({
      today: todayCount(opportunities),
      fit: opportunities.filter((item) => item.recommendLevel >= 4 && !isCompleted(item)).length,
      urgent: opportunities.filter(isUrgent).length,
      done: opportunities.filter(isCompleted).length,
    }),
    [opportunities],
  );

  return (
    <AppShell>
      <div className="relative min-w-0 overflow-x-hidden bg-[#f8fafc] dark:bg-slate-950">
        <ScrollProgress activeId={activeScreen} />
        <main className="home-snap-container lg:h-screen lg:snap-y lg:snap-proximity lg:overflow-y-auto">
          <HeroScreen />
          <SchoolHistoryScreen />
          <SchoolHonorScreen />
          <GrowthDiagnosisScreen score={score} />
          <OpportunityEngineScreen stats={stats} recommended={recommended} />
          <CampusServiceScreen />
          <FinalCtaScreen />
        </main>
      </div>
    </AppShell>
  );
}

function Screen({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative flex min-h-[760px] scroll-mt-6 items-center overflow-hidden px-4 py-16 sm:px-6 lg:min-h-screen lg:snap-start lg:px-10 xl:px-14 ${className}`}
    >
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1500px]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}

function ScrollProgress({ activeId }: { activeId: string }) {
  return (
    <nav className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <div className="space-y-3">
        {progressItems.map(([num, label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`pointer-events-auto flex items-center justify-end gap-3 text-xs font-black transition hover:text-blue-600 dark:hover:text-blue-300 ${
              activeId === id ? "text-blue-600 dark:text-blue-300" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <span>{num}</span>
            <span className="w-10 text-left">{label}</span>
            <span className={`h-px rounded-full transition-all ${activeId === id ? "w-8 bg-blue-600 dark:bg-blue-300" : "w-3 bg-slate-300 dark:bg-slate-600"}`} />
          </a>
        ))}
      </div>
    </nav>
  );
}

function HeroScreen() {
  return (
    <Screen id="hero" className="bg-[#FFFDF7] text-slate-950">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 82% 16%, rgba(37, 99, 235, 0.10), transparent 30%), radial-gradient(circle at 18% 18%, rgba(217, 119, 6, 0.08), transparent 28%), radial-gradient(circle at 88% 78%, rgba(15, 118, 110, 0.08), transparent 32%), linear-gradient(135deg, #FFFDF7 0%, #F8FAFC 42%, #EAF4FF 100%)",
        }}
      />
      <div className="pointer-events-none absolute -left-24 -top-36 hidden h-[520px] w-[520px] rounded-full border border-[#D97706]/15 lg:block" />
      <div className="pointer-events-none absolute -right-36 -bottom-44 hidden h-[620px] w-[620px] rounded-full border border-blue-500/10 lg:block" />
      <div className="pointer-events-none absolute left-[44%] top-4 hidden h-56 w-80 -translate-x-1/2 bg-[radial-gradient(#2563EB_1px,transparent_1px)] bg-[length:18px_18px] opacity-[0.08] lg:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 overflow-hidden text-[#D97706]/20">
        <svg className="absolute bottom-0 left-0 h-full w-full" viewBox="0 0 1440 220" fill="none" aria-hidden="true" preserveAspectRatio="none">
          <path d="M0 156C171 112 303 128 458 151C640 178 810 188 1001 137C1165 93 1291 78 1440 104" stroke="currentColor" strokeWidth="1.2" />
          <path d="M0 190C165 144 329 158 490 179C672 203 817 197 998 159C1198 117 1324 130 1440 146" stroke="#2563EB" strokeOpacity="0.12" strokeWidth="1.2" />
          <path d="M210 160H274V126H324V160H394V116H458V160H530V132H586V160H664" stroke="currentColor" strokeWidth="1" />
          <path d="M235 126L299 96L368 126M416 116L489 84L560 132" stroke="currentColor" strokeWidth="1" />
          <path d="M238 160V138M272 160V138M310 160V138M438 160V130M478 160V126M520 160V136" stroke="currentColor" strokeWidth="0.9" />
          <path d="M720 164C780 132 830 128 876 158C919 186 970 182 1018 150" stroke="#2563EB" strokeOpacity="0.12" strokeWidth="1" />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-white/80 dark:to-slate-950" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-blue-600/20 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#2563EB] shadow-sm backdrop-blur">
            YPI · AI Campus Growth Platform
          </p>
          <h1 className="mt-8 max-w-4xl text-5xl font-black leading-tight tracking-tight text-[#0F172A] sm:text-6xl xl:text-7xl">
            扬工智行
            <span className="block text-[#2563EB]">AI 校园公益服务平台</span>
          </h1>
          <p className="mt-6 text-2xl font-black text-[#0F172A] sm:text-3xl">
            让每一位学生不错过成长机会
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#475569] sm:text-lg">
            面向扬州工业职业技术学院学生，连接校园服务、成长机会、AI 规划与安全关怀。它不是一个通用 AI 助手，而是扬工院学生自己的成长机会系统。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/opportunities" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(37,99,235,0.22)] transition hover:-translate-y-1 hover:bg-[#1D4ED8] active:scale-95">
              进入成长机会中心
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/growth" className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,23,42,0.10)] bg-white/82 px-6 py-3 text-sm font-black text-[#0F172A] shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-[#EFF6FF] active:scale-95">
              开始成长检测
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-black text-[#475569]">
            <Link href="/chat" className="hover:text-[#2563EB]">AI 成长导师 →</Link>
            <Link href="/map" className="hover:text-[#2563EB]">校园地图导览 →</Link>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 rounded-[44px] bg-[radial-gradient(circle_at_55%_32%,rgba(37,99,235,0.10),transparent_42%)] blur-xl" />
          <div className="relative z-10 grid gap-3 sm:grid-cols-12 sm:gap-0">
            {heroActionCards.map((card, index) => {
              const Icon = card.icon;
              const isDarkCard = card.tone === "dark";
              return (
                <motion.div
                  key={card.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.65, ease: "easeOut" }}
                  className={`${card.className} overflow-hidden rounded-[30px]`}
                >
                  <Link
                    href={card.href}
                    className="group block rounded-[30px] border border-[rgba(15,23,42,0.08)] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-600/20 hover:shadow-[0_28px_78px_rgba(15,23,42,0.12)] active:scale-[0.98] sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className={`grid size-11 place-items-center rounded-2xl ${card.iconClassName}`}>
                        <Icon className="size-5" />
                      </span>
                      <ArrowRight className={`mt-2 size-5 transition-transform duration-300 group-hover:translate-x-1 ${isDarkCard ? "text-white/80" : "text-[#0F172A]"}`} />
                    </div>
                    <h2 className={`mt-5 text-2xl font-black tracking-tight ${isDarkCard ? "text-white" : "text-slate-950"}`}>{card.title}</h2>
                    <p className={`mt-3 text-sm leading-6 ${isDarkCard ? "text-white/80" : "text-slate-600"}`}>
                      {card.description}
                    </p>
                    <span className={`mt-5 inline-flex text-sm font-black ${isDarkCard ? "text-[#FFF7E6]" : card.accentClassName}`}>
                      {card.action} →
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="ypi-scroll-hint absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#64748B] lg:flex">
        <ArrowDown className="size-4 animate-bounce" />
        向下滚动，查看扬工智行如何服务学生成长
      </div>
    </Screen>
  );
}

function SchoolHistoryScreen() {
  return (
    <Screen id="history" className="bg-[#EAF4FF] dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 opacity-[0.09] dark:opacity-[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(29,78,216,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(29,78,216,0.20)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_65%_28%,rgba(34,211,238,0.12),transparent_24%),linear-gradient(135deg,transparent_0%,transparent_48%,rgba(29,78,216,0.22)_48.2%,transparent_49%)]" />
      </div>
      <div className="pointer-events-none absolute right-8 top-6 hidden select-none text-[180px] font-black leading-none tracking-tight text-blue-600/5 ypi-float-slow lg:block xl:text-[240px]">
        1978
      </div>
      <div className="pointer-events-none absolute bottom-8 right-20 hidden select-none text-[150px] font-black leading-none tracking-tight text-blue-600/[0.045] ypi-float-slow lg:block xl:text-[210px]">
        2004
      </div>
      <div className="pointer-events-none absolute left-[42%] top-1/2 hidden -translate-y-1/2 select-none text-[120px] font-black leading-none tracking-tight text-slate-900/[0.035] ypi-float-slow lg:block xl:text-[170px]">
        TODAY
      </div>
      <div className="grid gap-10 xl:grid-cols-[0.8fr_1.2fr] xl:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-xs font-black uppercase tracking-[0.24em] text-blue-600"
          >
            School History
          </motion.p>
          <h2 className="mt-4 text-5xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-6xl">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.08, duration: 0.65, ease: "easeOut" }}
            >
              从工业职教根脉，
            </motion.span>
            <motion.span
              className="block text-blue-600"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.65, ease: "easeOut" }}
            >
              到 AI 成长未来。
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3, duration: 0.65, ease: "easeOut" }}
            className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300"
          >
            扬工智行不是孤立的工具，它根植于学校长期积累的职业教育底蕴，把校园服务、实践机会与学生成长连接起来。
          </motion.p>
        </div>
        <div className="relative">
          <motion.div
            className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-full origin-left bg-blue-600/20 dark:bg-blue-300/20 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.95, ease: "easeOut" }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-0 left-5 top-0 w-px origin-top bg-blue-600/18 lg:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          <div className="grid gap-5 lg:grid-cols-4">
            {schoolHistory.map((item, index) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08 + 0.12, duration: 0.6, ease: "easeOut" }}
                className="group relative ml-10 rounded-[28px] border border-[rgba(15,23,42,0.08)] bg-white/82 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-600/35 hover:shadow-[0_20px_54px_rgba(15,42,95,0.12)] dark:border-slate-700 dark:bg-slate-900/70 lg:ml-0"
              >
                <div className="absolute -left-[3.15rem] top-7 grid size-9 place-items-center rounded-full border border-blue-200 bg-white text-sm font-black text-blue-600 shadow-sm transition group-hover:scale-110 group-hover:border-blue-600 dark:border-slate-700 dark:bg-slate-900 lg:static lg:mb-5 lg:size-10 lg:bg-blue-600 lg:text-white">{index + 1}</div>
                <p className="text-4xl font-black tracking-tight text-slate-950 dark:text-slate-50">{item.year}</p>
                <h3 className="mt-4 text-xl font-black text-slate-950 dark:text-slate-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}

function SchoolHonorScreen() {
  return (
    <Screen id="honor" className="bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.08),transparent_34%),linear-gradient(180deg,#F8FAFC_0%,#EAF4FF_100%)] text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <div className="pointer-events-none absolute right-8 top-10 hidden text-[160px] font-black leading-none tracking-tight text-blue-600/[0.045] lg:block">
        HONOR
      </div>
      <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-700">Honor & Strength</p>
          <h2 className="mt-4 text-5xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-6xl">
            办学积淀，
            <span className="block text-[#1D4ED8]">是服务学生成长的基础。</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#475569] dark:text-slate-300">
            这里采用保守表达展示学校办学基础，具体数量和表述后续可依据学校官网正式资料替换。
          </p>
        </div>
        <div className="divide-y divide-slate-200/80 rounded-[34px] border border-[rgba(15,23,42,0.08)] bg-white/86 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-900/80">
          {schoolStrengths.map((item) => (
            <div key={item.label} className="grid gap-3 p-6 md:grid-cols-[160px_1fr] md:items-center">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-black text-amber-700 dark:bg-amber-400/10 dark:text-amber-200">
                <span className="size-2 rounded-full bg-[#F59E0B]" />
                {item.label}
              </p>
              <div>
                <h3 className="text-2xl font-black text-slate-950 dark:text-slate-50">{item.value}</h3>
                <p className="mt-2 text-sm leading-6 text-[#475569] dark:text-slate-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

function GrowthDiagnosisScreen({ score }: { score: ReturnType<typeof calculateGrowthScore> }) {
  return (
    <Screen id="diagnosis" className="bg-white dark:bg-slate-950">
      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr] xl:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-600">AI Growth Diagnosis</p>
          <h2 className="mt-4 text-5xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-6xl">
            AI 成长检测
            <span className="block text-blue-600">看见你的成长状态</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#475569] dark:text-slate-300">
            根据学院、专业、年级、目标和当前状态，生成成长评分、五维能力分析与本月行动建议。
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#64748B] dark:text-slate-400">
            让每一位学生不仅找到答案，更找到下一步行动。
          </p>
          <Link href="/growth" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-1 hover:bg-[#1D4ED8] active:scale-95">
            开始成长检测
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="rounded-[36px] border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC] p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-black text-blue-600">示例学生：计算机应用技术 / 大二 / 竞赛提升</p>
              <p className="mt-5 text-7xl font-black tracking-tight text-slate-950 dark:text-slate-50">{score.totalScore}</p>
              <p className="mt-3 text-xl font-black text-blue-600">{score.level}</p>
            </div>
            <div className="rounded-[24px] border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950">
              <BrainCircuit className="size-8 text-[#1D4ED8]" />
              <p className="mt-3 text-sm font-black text-slate-500 dark:text-slate-400">智能评分保持动态计算</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4">
            {Object.entries(score.dimensions).map(([key, value]) => (
              <div key={key}>
                <div className="mb-2 flex items-center justify-between text-sm font-black text-slate-600 dark:text-slate-300">
                  <span>{dimensionName(key)}</span>
                  <span>{value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white dark:bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#22D3EE]" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}

function OpportunityEngineScreen({
  stats,
  recommended,
}: {
  stats: { today: number; fit: number; urgent: number; done: number };
  recommended: Opportunity[];
}) {
  const flow = recommended.length ? recommended : defaultOpportunities.slice(0, 3);
  return (
    <Screen id="opportunity" className="bg-[#EAF4FF] dark:bg-slate-950">
      <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-600">AI Opportunity Engine</p>
          <h2 className="mt-4 text-5xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-6xl">
            让机会被看见，
            <span className="block text-blue-600">让成长有路径</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#475569] dark:text-slate-300">
            围绕学生专业、年级、目标和校园机会，帮助学生发现适合自己的下一步。
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#64748B] dark:text-slate-400">
            从校园服务到成长机会，从专业规划到安全关怀，YPI 把学生最需要的信息连接起来。
          </p>
          <div className="mt-7 grid max-w-xl grid-cols-2 gap-3">
            {[
              ["今日发现机会", stats.today],
              ["适合你的机会", stats.fit],
              ["即将截止", stats.urgent],
              ["已完成成长任务", stats.done],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[22px] border border-[rgba(15,23,42,0.08)] bg-white/78 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
                <p className="text-3xl font-black text-slate-950 dark:text-slate-50">
                  <CountUp value={value as number} />
                </p>
                <p className="mt-1 text-xs font-black text-slate-500 dark:text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-10 left-8 w-px bg-[#1D4ED8]/18 dark:bg-slate-700" />
          <div className="space-y-5">
            {flow.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                className="relative ml-0 rounded-[30px] border border-[rgba(15,23,42,0.08)] bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:ml-8"
              >
                <div className="absolute -left-11 top-8 hidden size-7 place-items-center rounded-full bg-[#1D4ED8] text-xs font-black text-white ring-4 ring-[#EAF4FF] dark:ring-slate-950 sm:grid">{index + 1}</div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">{item.category}</p>
                <h3 className="mt-2 text-2xl font-black text-slate-950 dark:text-slate-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.growthValues.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-[#EAF4FF] px-3 py-1 text-xs font-black text-blue-700 dark:bg-blue-950/40 dark:text-blue-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
          <Link href="/opportunities" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-1 hover:bg-[#1D4ED8] active:scale-95">
            进入成长机会中心
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </Screen>
  );
}

function CampusServiceScreen() {
  return (
    <Screen id="service" className="bg-[#F8FAFC] dark:bg-slate-950">
      <div className="grid gap-10 xl:grid-cols-[0.8fr_1.2fr] xl:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-600">Campus Service</p>
          <h2 className="mt-4 text-5xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-6xl">
            校园服务，
            <span className="block text-blue-600">一站抵达</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#475569] dark:text-slate-300">
            从地点查询到学习资源，从学生事务到安全关怀，扬工智行把常用校园服务集中到一个入口。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {serviceLinks.map((item, index) => (
            <RouteCard key={item.href} item={item} index={index} />
          ))}
        </div>
      </div>
    </Screen>
  );
}

function FinalCtaScreen() {
  return (
    <Screen id="cta" className="bg-[radial-gradient(circle_at_72%_18%,rgba(45,212,191,0.12),transparent_30%),radial-gradient(circle_at_18%_80%,rgba(251,191,36,0.16),transparent_28%),linear-gradient(135deg,#F8FAFC_0%,#EAF4FF_48%,#FFF7E6_100%)] text-slate-950">
      <WhiteGooseParticles />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_30%,rgba(255,255,255,0.44),transparent_34%)]" />
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#1D4ED8]">Start Your Next Step</p>
        <h2 className="mt-5 text-5xl font-black tracking-tight text-[#0F172A] sm:text-6xl">
          从一次机会开始，
          <span className="block text-[#0F172A]">规划你的下一步</span>
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#475569]">
          完成一次成长检测，找到一个适合你的机会，向更清晰的大学成长路径前进一步。
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#64748B]">
          根植扬工职教底蕴，服务学生成长路径。
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/growth" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(37,99,235,0.22)] transition hover:-translate-y-1 hover:bg-[#1D4ED8] active:scale-95">
            开始成长检测
            <ArrowRight className="size-4" />
          </Link>
          <Link href="/opportunities" className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,23,42,0.10)] bg-white/86 px-6 py-3 text-sm font-black text-[#0F2A5F] shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white active:scale-95">
            进入成长机会中心
          </Link>
          <Link href="/chat" className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,23,42,0.10)] bg-white/70 px-6 py-3 text-sm font-black text-[#0F2A5F] backdrop-blur transition hover:-translate-y-1 hover:bg-white active:scale-95">
            问问 AI 成长导师
          </Link>
        </div>
        <p className="mt-10 text-sm font-black text-[#475569]">根植扬工，服务学生成长。</p>
      </div>
    </Screen>
  );
}

function RouteCard({ item, index }: { item: { title: string; description: string; href: string; icon: LucideIcon }; index: number }) {
  const Icon = item.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: "easeOut" }}
      className="group rounded-[26px] border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 dark:border-slate-700 dark:bg-slate-900/70"
    >
      <div className="grid size-11 place-items-center rounded-2xl bg-[#1D4ED8] text-white">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-slate-50">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#475569] dark:text-slate-300">{item.description}</p>
      <Link href={item.href} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition group-hover:translate-x-1 dark:text-blue-200">
        进入
        <ArrowRight className="size-4" />
      </Link>
    </motion.article>
  );
}

function dimensionName(key: string) {
  const map: Record<string, string> = {
    direction: "方向",
    skill: "技能",
    opportunity: "机会",
    action: "行动",
    wellbeing: "关怀",
  };
  return map[key] ?? key;
}
