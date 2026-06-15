"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
import { defaultOpportunities, getOpportunities, type Opportunity, type OpportunityFollowStatus } from "@/data/opportunities";

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

const radarProfile = {
  majors: ["计算机应用技术", "软件技术", "人工智能技术应用", "大数据技术", "全部专业"],
  goals: ["竞赛", "就业", "专转本", "综合素质", "学生干部", "学习资源", "职业发展"],
};

function stars(score: number) {
  return "★".repeat(score) + "☆".repeat(5 - score);
}

function isSameDay(value: string | undefined, date = new Date()) {
  if (!value) return false;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return false;
  return (
    parsed.getFullYear() === date.getFullYear() &&
    parsed.getMonth() === date.getMonth() &&
    parsed.getDate() === date.getDate()
  );
}

function daysUntilDeadline(deadline: string) {
  const text = deadline.trim();
  if (!text || text.includes("长期")) return Number.POSITIVE_INFINITY;
  if (text.includes("本周")) return 7;
  const remaining = text.match(/还剩\s*(\d+)\s*天/);
  if (remaining) return Number(remaining[1]);

  const monthDay = text.match(/(\d{1,2})月(\d{1,2})日/);
  if (!monthDay) return Number.POSITIVE_INFINITY;

  const now = new Date();
  const deadlineDate = new Date(now.getFullYear(), Number(monthDay[1]) - 1, Number(monthDay[2]), 23, 59, 59);
  const diff = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diff / 86_400_000);
}

function isDeadlineSoon(deadline: string) {
  const days = daysUntilDeadline(deadline);
  return days >= 0 && days <= 7;
}

function includesAny(source: string[], targets: string[]) {
  return source.some((item) => targets.some((target) => item.includes(target) || target.includes(item)));
}

function matchUserProfile(opportunity: Opportunity) {
  let score = Math.min(25, opportunity.recommendLevel * 5);
  const majorMatched =
    opportunity.relatedMajors.includes("全部专业") || includesAny(opportunity.relatedMajors, radarProfile.majors);
  const goalMatched =
    includesAny(opportunity.relatedGoals, radarProfile.goals) ||
    includesAny(opportunity.tags, radarProfile.goals) ||
    includesAny(opportunity.growthValues, radarProfile.goals);
  const urgent = isDeadlineSoon(opportunity.deadline);

  if (majorMatched || goalMatched) score += 30;
  if (urgent) score += 20;
  if (opportunity.recommendLevel >= 4) score += 20;

  return Math.min(100, score);
}

function buildRadarReason(opportunity: Opportunity, score: number, urgent: boolean) {
  if (urgent) {
    return `该机会距离截止较近，匹配度 ${score}%，建议优先确认报名条件。`;
  }
  if (score >= 70) {
    return `该机会与你的成长画像高度匹配，可沉淀${opportunity.growthValues.slice(0, 2).join("、") || "成长经历"}。`;
  }
  return `该机会推荐指数较高，可作为拓展校园经历与能力标签的候选项。`;
}

function getRadarNodes(opportunities: Opportunity[]) {
  return opportunities
    .map((opportunity) => {
      const score = matchUserProfile(opportunity);
      const isUrgent = isDeadlineSoon(opportunity.deadline);
      return {
        opportunity,
        score,
        isUrgent,
        reason: buildRadarReason(opportunity, score, isUrgent),
      };
    })
    .filter(({ opportunity, isUrgent }) => opportunity.followStatus !== "已完成" && (opportunity.recommendLevel >= 3 || isUrgent))
    .sort((left, right) => Number(right.isUrgent) - Number(left.isUrgent) || right.score - left.score)
    .slice(0, 8);
}

function getFollowStatusClass(status: OpportunityFollowStatus, isUrgent: boolean) {
  if (isUrgent) return "border-orange-200 bg-orange-50 text-orange-700 shadow-[0_0_24px_rgba(251,146,60,0.46)]";
  const styles: Record<OpportunityFollowStatus, string> = {
    未关注: "border-white/25 bg-white/72 text-blue-900",
    已收藏: "border-cyan-200/70 bg-cyan-50/90 text-cyan-800 shadow-[0_0_20px_rgba(103,232,249,0.38)]",
    准备中: "border-blue-200/80 bg-blue-50/95 text-blue-800 shadow-[0_0_24px_rgba(96,165,250,0.45)]",
    已报名: "border-emerald-200/80 bg-emerald-50/95 text-emerald-800 shadow-[0_0_26px_rgba(52,211,153,0.5)]",
    已完成: "border-slate-200 bg-slate-100 text-slate-500",
  };
  return styles[status];
}

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="grid min-h-screen min-w-0 gap-5 overflow-x-hidden px-4 py-4 sm:px-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <main className="min-w-0 space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="premium-card relative overflow-hidden p-6 sm:p-8 lg:min-h-[680px] lg:p-10"
          >
            <ParticleBackground className="z-0 opacity-70" />
            <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-cyan-300/25 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative z-10 grid items-center gap-10 lg:min-h-[600px] lg:grid-cols-[1.02fr_0.98fr]">
              <div className="min-w-0">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-black text-blue-700 shadow-sm backdrop-blur-xl">
                  <Sparkles className="size-4" />
                  AI Opportunity Engine
                </div>
                <h1 className="text-gradient-brand text-5xl font-black tracking-normal sm:text-7xl">
                  让每一位学生不错过成长机会
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                  YPI 扬工智行通过 AI 帮助学生发现校园机会、规划成长路径、获得学习与关怀支持。
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/opportunities"
                    className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 active:scale-95"
                  >
                    进入成长机会中心
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/growth"
                    className="group inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/82 px-6 py-3 text-sm font-bold text-blue-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50 active:scale-95"
                  >
                    开始成长规划
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <OpportunityRadar />
            </div>
          </motion.section>

          <section className="premium-card p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black text-blue-600">Today Growth Opportunities</p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">今日成长机会推荐</h2>
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
                  <h3 className="mt-4 text-xl font-black text-slate-950 dark:text-slate-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">适合人群：{item.audience}</p>
                  <p className="mt-3 text-base font-black text-amber-500">推荐指数：{item.stars}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link href="/opportunities" className="rounded-full bg-blue-600 px-4 py-2 text-xs font-black text-white shadow-sm active:scale-95">
                      AI解读
                    </Link>
                    <button type="button" className="rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black text-blue-700 hover:bg-blue-50 active:scale-95">
                      收藏机会
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="premium-card p-6">
            <p className="text-sm font-black text-blue-600">Growth Loop Model</p>
            <h2 className="mt-1 text-3xl font-black text-slate-950">从发现机会到能力成长</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
              YPI 不只是回答问题，而是帮助学生形成从目标设定、机会发现、实践参与到能力提升的成长闭环。
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
                    <p className="text-base font-black text-slate-950 dark:text-slate-100">{item.title}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{item.desc}</p>
                    {index < growthLoop.length - 1 && (
                      <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl font-black text-blue-400 md:block">
                        ↓
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
                <p className="text-sm font-black text-blue-600">Platform Capability Matrix</p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">平台能力矩阵</h2>
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
                    <h3 className="text-2xl font-black text-slate-950 dark:text-slate-100">{card.title}</h3>
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
              <p className="text-sm font-black text-blue-600">AI-Powered Student Growth Platform</p>
              <h2 className="mt-1 text-3xl font-black text-slate-950">
                发现机会 · 规划成长 · 提供关怀
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["成长机会发现", "通知智能解读", "学习资源推荐", "安全心理关怀"].map((item) => (
                  <div key={item} className="rounded-2xl border border-blue-100 bg-blue-50/45 p-4">
                    <p className="font-black text-slate-950 dark:text-slate-100">{item}</p>
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

function OpportunityRadar() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(defaultOpportunities);

  useEffect(() => {
    function refreshOpportunities() {
      setOpportunities(getOpportunities());
    }

    refreshOpportunities();
    window.addEventListener("focus", refreshOpportunities);
    window.addEventListener("storage", refreshOpportunities);
    return () => {
      window.removeEventListener("focus", refreshOpportunities);
      window.removeEventListener("storage", refreshOpportunities);
    };
  }, []);

  const radarNodes = useMemo(() => getRadarNodes(opportunities), [opportunities]);
  const [activeId, setActiveId] = useState("");
  const activeNode = radarNodes.find((node) => node.opportunity.id === activeId) ?? radarNodes[0] ?? null;
  const stats = useMemo(
    () =>
      [
        ["今日发现机会", opportunities.filter((item) => isSameDay(item.createdAt)).length],
        ["适合你的机会", opportunities.filter((item) => matchUserProfile(item) >= 70).length],
        ["即将截止", opportunities.filter((item) => isDeadlineSoon(item.deadline)).length],
        ["已完成", opportunities.filter((item) => item.followStatus === "已完成").length],
      ] as const,
    [opportunities],
  );

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
      className="relative mx-auto w-full max-w-[600px] overflow-hidden rounded-[34px] border border-white/90 bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-5 shadow-[0_34px_110px_rgba(37,99,235,0.22)]"
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl" />
      <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-blue-500/18 blur-3xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.26em] text-blue-600">YPI</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Discover Opportunities.</h2>
            <p className="mt-1 text-sm font-black text-blue-700">Build Your Future. / 发现机会，塑造未来</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            实时扫描
          </span>
        </div>

        <div className="md:hidden">
          <OpportunityPulseCard stats={stats} />
        </div>

        <div className="hidden md:block">
          <div className="relative mx-auto mt-8 aspect-square max-w-[430px] rounded-full border border-cyan-200/70 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 p-7 shadow-[inset_0_0_56px_rgba(34,211,238,0.22)]">
            <div className="absolute inset-6 rounded-full border border-cyan-300/18" />
            <div className="absolute inset-16 rounded-full border border-cyan-300/18" />
            <div className="absolute inset-[34%] rounded-full border border-cyan-300/18" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-6 rounded-full bg-[conic-gradient(from_0deg,rgba(45,212,191,0.42),rgba(59,130,246,0.18),rgba(255,255,255,0.02)_25%,transparent_38%,transparent)]"
            />
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-300/12" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-300/12" />

            {radarNodes.map((node, index) => {
              const opportunity = node.opportunity;
              const angle = (index / radarNodes.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 41;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              const statusClass = getFollowStatusClass(opportunity.followStatus, node.isUrgent);

              return (
                <motion.button
                  key={opportunity.id}
                  type="button"
                  onClick={() => setActiveId(opportunity.id)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: opportunity.followStatus === "未关注" ? [1, 1.05, 1] : 1 }}
                  transition={{ delay: index * 0.08, repeat: opportunity.followStatus === "未关注" ? Infinity : 0, duration: 1.8 }}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-[11px] font-black shadow-lg backdrop-blur transition hover:scale-110 active:scale-95 ${statusClass}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span className="mr-1 inline-block size-1.5 rounded-full bg-current align-middle opacity-70" />
                  {opportunity.title}
                </motion.button>
              );
            })}

            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot) => (
              <motion.span
                key={dot}
                animate={{ opacity: [0.25, 0.85, 0.25], scale: [1, 1.28, 1] }}
                transition={{ delay: dot * 0.18, repeat: Infinity, duration: 2.6 }}
                className="absolute size-1.5 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(103,232,249,0.78)]"
                style={{
                  left: `${18 + ((dot * 17) % 64)}%`,
                  top: `${20 + ((dot * 23) % 58)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-30 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/50 bg-white/94 text-center shadow-[0_0_46px_rgba(34,211,238,0.42)] backdrop-blur-xl">
              <div>
                <p className="text-xl leading-none">👤</p>
                <p className="mt-1 text-3xl font-black text-blue-700">YPI</p>
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">AI Opportunity Engine</p>
              </div>
            </div>
          </div>

          {activeNode && (
            <div className="mt-5 rounded-[26px] border border-blue-100 bg-white/84 p-4 shadow-sm backdrop-blur-xl">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">
                      {activeNode.opportunity.category}
                    </span>
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700">
                      {activeNode.opportunity.followStatus}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-black text-slate-950">{activeNode.opportunity.title}</h3>
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {activeNode.opportunity.deadline || "以通知为准"} · 推荐指数 {stars(activeNode.opportunity.recommendLevel)}
                  </p>
                  <p className="mt-2 rounded-2xl bg-cyan-50 px-3 py-2 text-xs font-black text-cyan-700">
                    成长价值：{activeNode.opportunity.growthValues.slice(0, 3).join(" / ") || "成长经历 / 能力沉淀"}
                  </p>
                  <p className="mt-2 rounded-2xl bg-blue-50 px-3 py-2 text-xs font-bold leading-5 text-blue-700">
                    推荐理由：{activeNode.reason}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/opportunities#hot-opportunities" className="rounded-full bg-blue-600 px-4 py-2 text-xs font-black text-white shadow-sm active:scale-95">
                    查看详情
                  </Link>
                  <Link href="/opportunities" className="rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black text-blue-700 hover:bg-blue-50 active:scale-95">
                    前往机会中心
                  </Link>
                  <Link href="/opportunities#ai-interpret" className="rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-xs font-black text-cyan-700 hover:bg-cyan-100 active:scale-95">
                    AI解读
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 hidden gap-3 sm:grid-cols-4 md:grid">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-[22px] border border-blue-100 bg-white/78 p-4 text-center shadow-sm backdrop-blur-xl">
              <p className="text-3xl font-black text-blue-700">
                <CountUp value={value} />
              </p>
              <p className="mt-1 text-xs font-black text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-1 text-xs font-black text-blue-700">
          <span>AI 正在分析你的成长机会</span>
          <motion.span animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.2 }}>●</motion.span>
          <motion.span animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.18 }}>●</motion.span>
          <motion.span animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.36 }}>●</motion.span>
        </div>
      </div>
    </motion.div>
  );
}

function OpportunityPulseCard({ stats }: { stats: ReadonlyArray<readonly [string, number]> }) {
  return (
    <div className="mt-6 rounded-[28px] border border-blue-100 bg-white/82 p-5 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Opportunity Pulse</p>
          <h3 className="mt-2 text-2xl font-black text-slate-950">成长机会脉冲</h3>
        </div>
        <motion.span
          animate={{ scale: [1, 1.12, 1], opacity: [0.72, 1, 0.72] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-black text-white shadow-glow"
        >
          YPI
        </motion.span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-[20px] bg-blue-50/80 p-4">
            <p className="text-2xl font-black text-blue-700">
              <CountUp value={value} />
            </p>
            <p className="mt-1 text-xs font-black text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-blue-50">
        <motion.div
          animate={{ x: ["-30%", "115%"] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
        />
      </div>
    </div>
  );
}
