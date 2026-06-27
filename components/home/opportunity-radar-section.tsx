"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/count-up";
import {
  defaultOpportunities,
  getOpportunities,
  type Opportunity,
  type OpportunityFollowStatus,
} from "@/data/opportunities";

const USER_PROFILE_STORAGE_KEY = "yanggong_user_profile";

type UserProfile = {
  major: string;
  grade: string;
  goal: string;
};

const defaultUserProfile: UserProfile = {
  major: "计算机应用技术",
  grade: "大一",
  goal: "竞赛",
};

const profileOptions = {
  majors: [
    "计算机应用技术",
    "软件技术",
    "大数据技术",
    "人工智能技术应用",
    "电子商务",
    "机电一体化",
    "工程造价",
    "数字媒体艺术设计",
  ],
  grades: ["大一", "大二", "大三", "大四"],
  goals: ["竞赛", "就业", "专转本", "考证", "学生干部", "综合素质", "学习资源"],
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
  if (text.includes("本月")) return 20;

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

function getProfileGoalKeywords(goal: string) {
  const goalMap: Record<string, string[]> = {
    竞赛: ["竞赛", "技能竞赛", "创新创业", "项目实践"],
    就业: ["就业", "实习", "职业发展", "学生工作"],
    专转本: ["专转本", "升学", "学习资源"],
    考证: ["证书", "考证", "英语A级", "学习资源"],
    学生干部: ["学生干部", "学生工作", "综合素质"],
    综合素质: ["综合素质", "校园融入", "公益服务", "评优评先"],
    学习资源: ["学习资源", "专转本", "考证", "学习习惯"],
  };
  return [goal, ...(goalMap[goal] ?? [])];
}

function loadUserProfile(): UserProfile {
  if (typeof window === "undefined") return defaultUserProfile;

  try {
    const saved = window.localStorage.getItem(USER_PROFILE_STORAGE_KEY);
    if (!saved) return defaultUserProfile;
    const parsed = JSON.parse(saved) as Partial<UserProfile>;
    return {
      major: parsed.major || defaultUserProfile.major,
      grade: parsed.grade || defaultUserProfile.grade,
      goal: parsed.goal || defaultUserProfile.goal,
    };
  } catch {
    return defaultUserProfile;
  }
}

function matchUserProfile(opportunity: Opportunity, profile: UserProfile) {
  let score = Math.min(25, opportunity.recommendLevel * 5);
  const goalKeywords = getProfileGoalKeywords(profile.goal);
  const majorMatched =
    opportunity.relatedMajors.includes("全部专业") ||
    opportunity.relatedMajors.includes(profile.major) ||
    opportunity.targetAudience.includes(profile.major);
  const goalMatched =
    includesAny(opportunity.relatedGoals, goalKeywords) ||
    includesAny(opportunity.tags, goalKeywords) ||
    includesAny(opportunity.growthValues, goalKeywords);
  const gradeMatched = opportunity.targetAudience.includes(profile.grade);
  const urgent = isDeadlineSoon(opportunity.deadline);

  if (majorMatched || goalMatched) score += 30;
  if (gradeMatched) score += 10;
  if (urgent) score += 20;
  if (opportunity.recommendLevel >= 4) score += 20;

  return Math.min(100, score);
}

function buildRadarReason(opportunity: Opportunity, score: number, urgent: boolean, profile: UserProfile) {
  if (urgent) {
    return `距离截止较近，匹配度 ${score}%，建议优先确认报名条件。`;
  }
  if (score >= 70) {
    return `与 ${profile.major} / ${profile.grade} / ${profile.goal} 目标高度相关，可沉淀 ${opportunity.growthValues.slice(0, 2).join("、") || "成长经历"}。`;
  }
  return "推荐指数较高，可作为拓展校园经历与能力标签的候选机会。";
}

function getRadarNodes(opportunities: Opportunity[], profile: UserProfile) {
  return opportunities
    .map((opportunity) => {
      const score = matchUserProfile(opportunity, profile);
      const isUrgent = isDeadlineSoon(opportunity.deadline);
      return {
        opportunity,
        score,
        isUrgent,
        reason: buildRadarReason(opportunity, score, isUrgent, profile),
      };
    })
    .filter(({ opportunity, isUrgent }) => opportunity.followStatus !== "已完成" && (opportunity.recommendLevel >= 3 || isUrgent))
    .sort((left, right) => Number(right.isUrgent) - Number(left.isUrgent) || right.score - left.score)
    .slice(0, 6);
}

function getFollowStatusClass(status: OpportunityFollowStatus, isUrgent: boolean) {
  if (isUrgent) return "border-orange-200 bg-orange-50 text-orange-700 shadow-[0_0_20px_rgba(251,146,60,0.24)]";
  const styles: Record<OpportunityFollowStatus, string> = {
    未关注: "border-slate-200 bg-white/78 text-slate-700",
    已收藏: "border-cyan-200 bg-cyan-50 text-cyan-800 shadow-[0_0_18px_rgba(103,232,249,0.24)]",
    准备中: "border-blue-200 bg-blue-50 text-blue-800 shadow-[0_0_18px_rgba(96,165,250,0.28)]",
    已报名: "border-emerald-200 bg-emerald-50 text-emerald-800 shadow-[0_0_18px_rgba(52,211,153,0.28)]",
    已完成: "border-slate-200 bg-slate-100 text-slate-500",
  };
  return styles[status];
}

function useOpportunityRadarData() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(defaultOpportunities);
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile);

  useEffect(() => {
    function refreshOpportunities() {
      setOpportunities(getOpportunities());
      setProfile(loadUserProfile());
    }

    refreshOpportunities();
    window.addEventListener("focus", refreshOpportunities);
    window.addEventListener("storage", refreshOpportunities);
    return () => {
      window.removeEventListener("focus", refreshOpportunities);
      window.removeEventListener("storage", refreshOpportunities);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const radarNodes = useMemo(() => getRadarNodes(opportunities, profile), [opportunities, profile]);
  const stats = useMemo(
    () =>
      [
        ["今日发现机会", opportunities.filter((item) => isSameDay(item.createdAt)).length],
        ["适合你的机会", opportunities.filter((item) => matchUserProfile(item, profile) >= 70).length],
        ["即将截止", opportunities.filter((item) => isDeadlineSoon(item.deadline)).length],
        ["已完成成长任务", opportunities.filter((item) => item.followStatus === "已完成").length],
      ] as const,
    [opportunities, profile],
  );

  return { profile, setProfile, radarNodes, stats };
}

export function OpportunityRadarPanel({ variant = "section" }: { variant?: "hero" | "section" }) {
  const reduceMotion = useReducedMotion();
  const { profile, setProfile, radarNodes, stats } = useOpportunityRadarData();
  const [activeId, setActiveId] = useState("");
  const activeNode = radarNodes.find((node) => node.opportunity.id === activeId) ?? radarNodes[0] ?? null;
  const isHero = variant === "hero";

  function updateProfile(key: keyof UserProfile, value: string) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
      className={`relative mx-auto w-full overflow-hidden rounded-[40px] border border-slate-200/70 bg-white/72 shadow-[0_28px_90px_rgba(37,99,235,0.10)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/70 ${isHero ? "max-w-[700px] p-5 sm:p-7" : "max-w-[620px] p-4 sm:p-5"}`}
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-200/16 blur-3xl" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="ypi-kicker">AI Opportunity Engine</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100 sm:text-3xl">
              实时匹配你的下一次成长机会
            </h2>
          </div>
        </div>

        {!isHero && (
          <div className="mt-5 grid gap-2 rounded-[24px] border border-slate-200/70 bg-white/72 p-3 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/68 sm:grid-cols-3">
            {[
              ["专业", "major", profileOptions.majors],
              ["年级", "grade", profileOptions.grades],
              ["目标", "goal", profileOptions.goals],
            ].map(([label, key, options]) => (
              <label key={String(key)} className="grid gap-1">
                <span className="text-[11px] font-black text-blue-600">{String(label)}</span>
                <select
                  value={profile[key as keyof UserProfile]}
                  onChange={(event) => updateProfile(key as keyof UserProfile, event.target.value)}
                  className="h-10 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 text-xs font-black text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  {(options as string[]).map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}

        <div className="md:hidden">
          <OpportunityPulseCard stats={stats} />
        </div>

        <div className="hidden md:block">
          <div className={`relative mx-auto ${isHero ? "mt-10 max-w-[560px]" : "mt-8 max-w-[450px]"} aspect-square rounded-full border border-cyan-200/60 bg-[radial-gradient(circle_at_center,#ffffff_0%,#f0f8ff_50%,#e5f3ff_100%)] p-8 shadow-[inset_0_0_58px_rgba(37,99,235,0.08)] dark:bg-[radial-gradient(circle_at_center,#0f172a_0%,#0b1f3b_55%,#061521_100%)]`}>
            <div className="absolute inset-7 rounded-full border border-cyan-300/22" />
            <div className="absolute inset-16 rounded-full border border-cyan-300/22" />
            <div className="absolute inset-[34%] rounded-full border border-cyan-300/22" />
            <motion.div
              animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={{ repeat: reduceMotion ? 0 : Infinity, duration: 14, ease: "linear" }}
              className="absolute inset-7 rounded-full bg-[conic-gradient(from_0deg,rgba(6,182,212,0.16),rgba(37,99,235,0.08),rgba(255,255,255,0.02)_22%,transparent_34%,transparent)]"
            />
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-300/14" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-300/14" />

            {radarNodes.map((node, index) => {
              const opportunity = node.opportunity;
              const angle = (index / Math.max(radarNodes.length, 1)) * Math.PI * 2 - Math.PI / 2;
              const radius = isHero ? 39 : 40;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;

              return (
                <motion.button
                  key={opportunity.id}
                  type="button"
                  onClick={() => setActiveId(opportunity.id)}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.06, duration: 0.45 }}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-[11px] font-black shadow-sm backdrop-blur transition duration-700 hover:-translate-y-[calc(50%+2px)] hover:shadow-[0_0_24px_rgba(6,182,212,0.22)] active:scale-95 ${getFollowStatusClass(opportunity.followStatus, node.isUrgent)}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {opportunity.title}
                </motion.button>
              );
            })}

            <div className={`${isHero ? "size-32" : "size-28"} absolute left-1/2 top-1/2 z-30 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-white/92 text-center shadow-[0_18px_54px_rgba(37,99,235,0.14)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/88`}>
              <div>
                <p className={`${isHero ? "text-4xl" : "text-3xl"} font-black leading-none text-blue-700`}>YPI</p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                  AI Opportunity Engine
                </p>
              </div>
            </div>
          </div>

          {activeNode && (
            <div className="mt-5 rounded-[26px] border border-slate-200/72 bg-white/78 p-4 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/72">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">
                      {activeNode.opportunity.category}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                      匹配度 {activeNode.score}%
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-black text-slate-950 dark:text-slate-100">
                    {activeNode.opportunity.title}
                  </h3>
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {activeNode.opportunity.deadline || "以通知为准"} · 推荐指数 {stars(activeNode.opportunity.recommendLevel)}
                  </p>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">{activeNode.reason}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(activeNode.opportunity.growthValues.length ? activeNode.opportunity.growthValues : ["成长经历"]).slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700 dark:bg-cyan-950/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/opportunities#hot-opportunities" className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white shadow-sm hover:bg-blue-700 active:scale-95">
                    查看机会
                  </Link>
                  <Link href="/opportunities#ai-interpret" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-blue-700 hover:bg-blue-50 active:scale-95 dark:border-slate-700 dark:bg-slate-950">
                    AI解读
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {!isHero && <div className="mt-5 hidden gap-3 sm:grid-cols-4 md:grid">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-[22px] border border-slate-200/72 bg-white/72 p-4 text-center shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
              <p className="text-3xl font-black text-blue-700">
                <CountUp value={value} />
              </p>
              <p className="mt-1 text-xs font-black text-slate-500">{label}</p>
            </div>
          ))}
        </div>}
      </div>
    </motion.div>
  );
}

export function OpportunityEngineSection() {
  const { stats } = useOpportunityRadarData();

  return (
    <section className="ypi-section border-y border-slate-200/70 dark:border-slate-800">
      <div className="mx-auto max-w-6xl text-center">
        <p className="ypi-kicker">AI Opportunity Engine</p>
        <h2 className="mt-5 text-[clamp(3rem,7vw,7.5rem)] font-black leading-none tracking-[-0.055em] text-slate-950 dark:text-slate-50">
          让机会被看见，
          <br />
          让成长有路径
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
          YPI 从校园通知、成长机会、学生目标与行动状态中，计算更适合学生的下一步。
        </p>
      </div>
      <div className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="border-t border-slate-200 pt-6 text-center dark:border-slate-700">
            <p className="text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-none tracking-[-0.06em] text-slate-950 dark:text-slate-100">
              <CountUp value={value} />
            </p>
            <p className="mt-4 text-sm font-black text-slate-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function OpportunityPulseCard({ stats }: { stats: ReadonlyArray<readonly [string, number]> }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-6 rounded-[28px] border border-slate-200/72 bg-white/78 p-5 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/72">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="ypi-kicker">Opportunity Pulse</p>
          <h3 className="mt-2 text-2xl font-black text-slate-950 dark:text-slate-100">成长机会脉冲</h3>
        </div>
        <motion.span
          animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: [1, 1.08, 1], opacity: [0.72, 1, 0.72] }}
          transition={{ repeat: reduceMotion ? 0 : Infinity, duration: 2.4 }}
          className="grid size-12 place-items-center rounded-full bg-slate-950 text-xl font-black text-white"
        >
          YPI
        </motion.span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-[20px] bg-slate-50 p-4 dark:bg-slate-950/60">
            <p className="text-2xl font-black text-blue-700">
              <CountUp value={value} />
            </p>
            <p className="mt-1 text-xs font-black text-slate-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
