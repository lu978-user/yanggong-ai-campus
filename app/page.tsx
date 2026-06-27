"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  HeartHandshake,
  LifeBuoy,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { CountUp } from "@/components/count-up";
import { defaultOpportunities, getOpportunities, type Opportunity } from "@/data/opportunities";
import { calculateGrowthScore, collegeProfiles, type GrowthDiagnosisProfile } from "@/data/growth-diagnosis";

const coreServices = [
  {
    title: "成长机会中心",
    description: "发现班助招募、竞赛报名、志愿服务和社团活动，并持续跟进状态。",
    href: "/opportunities",
    icon: Trophy,
  },
  {
    title: "AI 成长导师",
    description: "围绕专业、年级和目标连续对话，获得规划、竞赛、证书和关怀建议。",
    href: "/chat",
    icon: MessageCircle,
  },
  {
    title: "校园地图导览",
    description: "用校园 PNG 地图联动 AI 问答，快速定位文汇楼、体育馆、双镜湖等地点。",
    href: "/map",
    icon: MapPinned,
  },
  {
    title: "成长规划",
    description: "通过成长检测生成评分、推荐机会和本月行动清单。",
    href: "/growth",
    icon: BrainCircuit,
  },
];

const supportServices = [
  { title: "学习资源", description: "整理课程、工具与学习路径。", href: "/resources", icon: BookOpen },
  { title: "学生事务", description: "查询请假、学生证、奖助等事务信息。", href: "/affairs", icon: LifeBuoy },
  { title: "安全教育", description: "提供反诈、实训、消防等安全提醒。", href: "/safety", icon: ShieldCheck },
  { title: "心理关怀", description: "提供压力疏导与心理支持入口。", href: "/care", icon: HeartHandshake },
];

const orbitSignals = [
  { title: "成长机会", desc: "发现适合你的校园机会", icon: Trophy, className: "left-2 top-10" },
  { title: "AI 成长导师", desc: "把目标拆成行动", icon: MessageCircle, className: "right-0 top-20" },
  { title: "校园导览", desc: "地点查询与地图定位", icon: MapPinned, className: "bottom-24 left-0" },
  { title: "学习资源", desc: "课程、证书与学习路径", icon: BookOpen, className: "bottom-10 right-8" },
  { title: "安全关怀", desc: "安全教育与心理支持", icon: ShieldCheck, className: "left-1/2 top-0 -translate-x-1/2" },
];

const journey = [
  ["01", "发现机会", "从通知、活动和岗位中识别适合自己的成长机会。"],
  ["02", "规划成长", "结合专业、年级和目标生成阶段路线。"],
  ["03", "参与实践", "把机会状态推进到准备中、已报名和已完成。"],
  ["04", "能力提升", "记录竞赛、证书、项目和服务经历。"],
  ["05", "就业升学", "沉淀可展示成果，服务未来选择。"],
] as const;

const sampleProfile: GrowthDiagnosisProfile = {
  collegeId: collegeProfiles[0].id,
  major: collegeProfiles[0].majors[0],
  grade: "大二",
  goal: "竞赛提升",
  statuses: ["目标很清楚", "有学习计划", "准备参加竞赛", "关注过校园机会"],
  interest: "AI应用开发",
};

function isCompleted(item: Opportunity) {
  return String(item.followStatus) === "已完成";
}

function isUrgent(item: Opportunity) {
  return item.status === "即将截止" || item.deadline.includes("本周") || item.deadline.includes("3天");
}

export default function DashboardPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(defaultOpportunities);

  useEffect(() => {
    setOpportunities(getOpportunities());
  }, []);

  const score = useMemo(() => calculateGrowthScore(sampleProfile, opportunities), [opportunities]);
  const stats = useMemo(
    () => [
      ["今日发现机会", opportunities.filter((item) => item.createdAt?.slice(0, 10) === new Date().toISOString().slice(0, 10)).length || 12],
      ["适合你的机会", opportunities.filter((item) => item.recommendLevel >= 4 && !isCompleted(item)).length],
      ["即将截止", opportunities.filter(isUrgent).length],
      ["已完成成长任务", opportunities.filter(isCompleted).length],
    ],
    [opportunities],
  );
  const featured = useMemo(
    () => opportunities.filter((item) => item.isFeatured).slice(0, 3),
    [opportunities],
  );

  return (
    <AppShell>
      <div className="min-w-0 overflow-x-hidden px-4 py-5 sm:px-6 lg:px-8">
        <main className="mx-auto max-w-[1600px] space-y-6">
          <section className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/82 p-6 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75 sm:p-8 lg:rounded-[40px] lg:p-10">
            <div className="pointer-events-none absolute -right-36 -top-36 size-96 rounded-full bg-cyan-200/35 blur-3xl dark:bg-cyan-500/10" />
            <div className="pointer-events-none absolute -bottom-44 left-1/3 size-96 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />

            <div className="relative z-10 grid items-center gap-8 xl:grid-cols-[1fr_560px]">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 dark:border-blue-500/20 dark:bg-blue-950/40 dark:text-blue-200">
                  <Sparkles className="size-4" />
                  AI 校园公益服务平台
                </div>
                <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-6xl lg:text-7xl">
                  扬工智行
                  <span className="mt-3 block text-3xl text-blue-600 sm:text-4xl lg:text-5xl">
                    AI 校园公益服务平台
                  </span>
                </h1>
                <p className="mt-5 text-2xl font-black text-slate-950 dark:text-slate-50 sm:text-3xl">
                  让每一位学生不错过成长机会
                </p>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  面向扬州工业职业技术学院学生，整合校园导航、成长机会、AI 成长规划、学习资源、学生事务、安全教育与心理关怀服务，让校园服务更清晰，让成长路径更可执行。
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/opportunities"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-sm transition duration-500 hover:-translate-y-1 hover:bg-blue-700 active:scale-95"
                  >
                    进入成长机会中心
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/growth"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-900 transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-700 active:scale-95 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    开始成长检测
                  </Link>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/chat" className="text-sm font-black text-blue-700 hover:text-blue-900 dark:text-blue-200">
                    AI 成长导师 →
                  </Link>
                  <Link href="/map" className="text-sm font-black text-blue-700 hover:text-blue-900 dark:text-blue-200">
                    校园地图导览 →
                  </Link>
                </div>
              </div>

              <HeroGrowthOrbit />
            </div>
          </section>

          <SectionHeader
            eyebrow="Core Services"
            title="四个入口，先把学生最常用的事做清楚"
            description="机会、导师、地图、规划放在最前面，其他公益服务作为稳定支撑。"
          />
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {coreServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} primary />
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[32px] border border-slate-200/70 bg-white/82 p-6 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Growth Diagnosis</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
                成长检测，不止给分数。
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                YPI 根据专业、年级、目标、当前状态和机会跟进记录，生成可解释的成长报告，并推荐下一步可以参与的机会。
              </p>
              <Link
                href="/growth"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-blue-700 active:scale-95"
              >
                查看我的成长报告
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="rounded-[32px] border border-slate-200/70 bg-white/82 p-6 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-blue-600">示例画像</p>
                  <h3 className="text-2xl font-black text-slate-950 dark:text-slate-50">
                    {sampleProfile.major} / {sampleProfile.grade} / {sampleProfile.goal}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-black text-blue-600">{score.totalScore}</p>
                  <p className="text-sm font-black text-slate-500 dark:text-slate-400">{score.level}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-5">
                {Object.entries(score.dimensions).map(([key, value]) => (
                  <div key={key} className="rounded-[20px] bg-blue-50/70 p-3 dark:bg-slate-950/70">
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400">{dimensionName(key)}</p>
                    <p className="mt-2 text-2xl font-black text-slate-950 dark:text-slate-50">{value}</p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white dark:bg-slate-800">
                      <div className="h-full rounded-full bg-blue-600" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200/70 bg-white/82 p-6 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75 sm:p-8">
            <SectionHeader
              eyebrow="AI Opportunity Engine"
              title="让机会被看见，让成长有路径"
              description="围绕学生专业、年级、目标和校园机会，计算更适合自己的下一步。"
              compact
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map(([label, value]) => (
                <div key={label} className="rounded-[24px] bg-slate-50 p-5 dark:bg-slate-950/70">
                  <p className="text-5xl font-black text-slate-950 dark:text-slate-50">
                    <CountUp value={value as number} />
                  </p>
                  <p className="mt-2 text-sm font-black text-slate-500 dark:text-slate-400">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {featured.map((item) => (
                <article key={item.id} className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950/70">
                  <p className="text-xs font-black text-blue-600">{item.category}</p>
                  <h3 className="mt-2 text-lg font-black text-slate-950 dark:text-slate-50">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                  <p className="mt-3 text-xs font-black text-amber-600">
                    推荐指数：{"★".repeat(item.recommendLevel)}
                    {"☆".repeat(5 - item.recommendLevel)}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <SectionHeader
            eyebrow="Public Services"
            title="校园公益服务能力"
            description="学习、事务、安全和心理关怀不抢主视觉，但在学生真正需要时随时可用。"
          />
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {supportServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </section>

          <section className="rounded-[32px] border border-slate-200/70 bg-white/82 p-6 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">YPI Foundation</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-slate-50">根植扬工，服务学生成长</h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              扬工智行以扬州工业职业技术学院学生真实校园需求为出发点，把校园服务、成长机会与 AI 能力连接起来，让学生在学习、生活、实践和未来规划中获得更清晰的支持。
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-5">
              {journey.map(([step, title, desc]) => (
                <div key={step} className="rounded-[24px] bg-slate-50 p-4 dark:bg-slate-950/70">
                  <p className="text-xs font-black text-blue-600">{step}</p>
                  <h3 className="mt-2 font-black text-slate-950 dark:text-slate-50">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </AppShell>
  );
}

function HeroGrowthOrbit() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-[420px] overflow-hidden rounded-[36px] border border-slate-200/70 bg-gradient-to-br from-white/84 via-blue-50/45 to-cyan-50/40 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700 dark:from-slate-950/86 dark:via-slate-900/72 dark:to-blue-950/28 sm:min-h-[520px] sm:p-8"
    >
      <div className="pointer-events-none absolute -right-20 top-8 size-64 rounded-full bg-cyan-200/24 blur-3xl dark:bg-cyan-500/10" />
      <div className="pointer-events-none absolute bottom-0 left-8 size-72 rounded-full bg-blue-200/28 blur-3xl dark:bg-blue-500/10" />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">AI Growth Orbit</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-slate-50">成长机会轨道</h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-3 py-2 text-xs font-black text-blue-700 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-blue-200">
          <span className="size-2 rounded-full bg-emerald-400" />
          AI Signal Live
        </span>
      </div>

      <div className="relative z-10 mt-8 hidden aspect-square w-full place-items-center sm:grid">
        <div className="pointer-events-none absolute size-[78%] rounded-full border border-blue-200/70 dark:border-blue-400/18" />
        <div className="pointer-events-none absolute size-[58%] rounded-full border border-cyan-200/70 dark:border-cyan-400/18" />
        <div className="pointer-events-none absolute h-px w-[82%] rotate-12 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent dark:via-blue-400/20" />
        <div className="pointer-events-none absolute h-px w-[72%] -rotate-[28deg] bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent dark:via-cyan-400/18" />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute size-[68%] rounded-full bg-[conic-gradient(from_110deg,transparent_0deg,rgba(37,99,235,0.16)_48deg,rgba(6,182,212,0.1)_76deg,transparent_112deg)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 grid size-44 place-items-center rounded-full border border-white/80 bg-white/88 text-center shadow-[0_22px_70px_rgba(37,99,235,0.14)] backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-950/88">
          <div>
            <p className="text-4xl font-black tracking-tight text-slate-950 dark:text-slate-50">YPI</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-blue-600 dark:text-blue-300">
              AI Growth Engine
            </p>
          </div>
        </div>

        {orbitSignals.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.title}
              className={`absolute z-20 w-44 rounded-[24px] border border-white/78 bg-white/78 p-3 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/72 ${node.className}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + index * 0.08, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-black text-slate-950 dark:text-slate-50">{node.title}</span>
                  <span className="mt-1 block text-xs font-bold leading-5 text-slate-500 dark:text-slate-400">{node.desc}</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 mt-6 grid gap-3 sm:hidden">
        <div className="rounded-[28px] border border-white/80 bg-white/82 p-5 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/70">
          <p className="text-3xl font-black text-slate-950 dark:text-slate-50">YPI</p>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-blue-600">AI Growth Engine</p>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
            从成长机会、AI 导师、校园导览与关怀服务中，为学生生成下一步行动信号。
          </p>
        </div>
        {orbitSignals.slice(0, 3).map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.title}
              className="flex items-center gap-3 rounded-[22px] border border-slate-200/70 bg-white/72 p-3 dark:border-slate-700 dark:bg-slate-950/60"
            >
              <span className="grid size-10 place-items-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">
                <Icon className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-black text-slate-950 dark:text-slate-50">{node.title}</span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{node.desc}</span>
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  compact,
}: {
  eyebrow: string;
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "" : "pt-2"}>
      <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}

function ServiceCard({
  service,
  index,
  primary,
}: {
  service: (typeof coreServices)[number] | (typeof supportServices)[number];
  index: number;
  primary?: boolean;
}) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: "easeOut" }}
      className="group rounded-[28px] border border-slate-200/70 bg-white/82 p-5 shadow-sm backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-blue-200 dark:border-slate-700 dark:bg-slate-900/75"
    >
      <div className={`grid size-12 place-items-center rounded-2xl ${primary ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200"}`}>
        <Icon className="size-6" />
      </div>
      <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-slate-50">{service.title}</h3>
      <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600 dark:text-slate-300">{service.description}</p>
      <Link
        href={service.href}
        className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition group-hover:translate-x-1 dark:text-blue-200"
      >
        进入
        <ArrowRight className="size-4" />
      </Link>
    </motion.article>
  );
}

function dimensionName(key: string) {
  const map: Record<string, string> = {
    direction: "目标",
    skill: "技能",
    opportunity: "机会",
    action: "行动",
    wellbeing: "关怀",
  };
  return map[key] ?? key;
}
