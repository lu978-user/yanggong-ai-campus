"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  Radar,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";
import { LoadingSpinner } from "@/components/loading-spinner";
import {
  defaultOpportunities,
  getOpportunities,
  saveOpportunities,
  type Opportunity,
} from "@/data/opportunities";
import {
  calculateGrowthScore,
  collegeProfiles,
  getCollegeProfile,
  gradeOptions,
  growthGoalOptions,
  growthStatusOptions,
  type GrowthDiagnosisProfile,
  type GrowthGoal,
} from "@/data/growth-diagnosis";

type GrowthOpportunity = {
  opportunity: Opportunity;
  matchScore: number;
  reason: string;
  fit: string;
};

const dimensionLabels = [
  ["direction", "目标清晰度"],
  ["skill", "专业能力"],
  ["opportunity", "机会意识"],
  ["action", "行动执行"],
  ["wellbeing", "关怀支持"],
] as const;

function getGoalKeywords(goal: GrowthGoal) {
  const goalMap: Record<GrowthGoal, string[]> = {
    专转本: ["专转本", "升学", "学习资源", "英语A级"],
    就业实习: ["就业", "实习", "职业发展", "学生工作"],
    竞赛提升: ["竞赛", "技能竞赛", "创新创业", "项目实践"],
    证书规划: ["证书", "考证", "专转本", "学习资源"],
    "学生干部 / 班助": ["学生干部", "班主任助理", "学生工作", "综合素质"],
    创新创业: ["创新创业", "创业", "项目实践", "竞赛"],
    暂时不确定: ["综合素质", "校园融入", "兴趣发展"],
  };

  return [goal, ...goalMap[goal]];
}

function includesAny(source: string[], targets: string[]) {
  return source.some((item) => targets.some((target) => item.includes(target) || target.includes(item)));
}

function matchOpportunity(opportunity: Opportunity, profile: GrowthDiagnosisProfile): GrowthOpportunity {
  const goalKeywords = getGoalKeywords(profile.goal);
  const majorMatched =
    opportunity.relatedMajors.includes("全部专业") ||
    opportunity.relatedMajors.includes(profile.major) ||
    opportunity.targetAudience.includes(profile.major);
  const goalMatched =
    includesAny(opportunity.relatedGoals, goalKeywords) ||
    includesAny(opportunity.tags, goalKeywords) ||
    includesAny(opportunity.growthValues, goalKeywords);
  const gradeMatched = opportunity.targetAudience.includes(profile.grade);
  const score = Math.min(
    98,
    30 +
      (majorMatched ? 28 : 0) +
      (goalMatched ? 28 : 0) +
      (gradeMatched ? 6 : 0) +
      opportunity.recommendLevel * 4,
  );
  const reason = goalMatched
    ? `与“${profile.goal}”目标高度相关，可沉淀${opportunity.growthValues.slice(0, 2).join("、") || "成长经历"}。`
    : `可补充${profile.grade}阶段的实践经历，提升${opportunity.growthValues.slice(0, 2).join("、") || "综合能力"}。`;

  return {
    opportunity,
    matchScore: score,
    reason,
    fit: `${majorMatched ? profile.major : "跨专业可参与"} / ${goalMatched ? profile.goal : "综合成长"}`,
  };
}

function getRecommendedOpportunities(opportunities: Opportunity[], profile: GrowthDiagnosisProfile) {
  return opportunities
    .map((opportunity) => matchOpportunity(opportunity, profile))
    .sort((left, right) => right.matchScore - left.matchScore)
    .slice(0, 4);
}

function getMonthlyActions(recommended: GrowthOpportunity[]) {
  const first = recommended[0]?.opportunity;
  const second = recommended[1]?.opportunity;
  return [
    "收藏一个成长机会，并设置跟进状态",
    first ? `关注「${first.title}」报名节点` : "关注一个竞赛或讲座报名",
    second ? `推进「${second.title}」准备事项` : "参加一次校园活动或学习打卡",
    "完成一次能力提升，并记录成长收获",
  ];
}

export default function GrowthPage() {
  const [diagnosed, setDiagnosed] = useState(false);
  const [diagnosing, setDiagnosing] = useState(false);
  const [profile, setProfile] = useState<GrowthDiagnosisProfile>({
    collegeId: collegeProfiles[0].id,
    major: collegeProfiles[0].majors[0],
    grade: "大一",
    goal: "专转本",
    statuses: ["目标很清楚", "有学习计划"],
    interest: "AI应用开发",
  });
  const [opportunityLibrary, setOpportunityLibrary] = useState<Opportunity[]>(defaultOpportunities);

  const currentCollege = getCollegeProfile(profile.collegeId);
  const currentGrade = gradeOptions.find((item) => item.value === profile.grade) ?? gradeOptions[0];
  const scoreResult = useMemo(
    () => calculateGrowthScore(profile, opportunityLibrary),
    [profile, opportunityLibrary],
  );
  const recommendedOpportunities = useMemo(
    () => getRecommendedOpportunities(opportunityLibrary, profile),
    [opportunityLibrary, profile],
  );
  const monthlyActions = useMemo(() => getMonthlyActions(recommendedOpportunities), [recommendedOpportunities]);

  useEffect(() => {
    function refreshOpportunities() {
      setOpportunityLibrary(getOpportunities());
    }

    refreshOpportunities();
    window.addEventListener("focus", refreshOpportunities);
    return () => window.removeEventListener("focus", refreshOpportunities);
  }, []);

  function updateProfile(next: Partial<GrowthDiagnosisProfile>) {
    setProfile((current) => ({ ...current, ...next }));
  }

  function toggleStatus(status: string) {
    setProfile((current) => ({
      ...current,
      statuses: current.statuses.includes(status)
        ? current.statuses.filter((item) => item !== status)
        : [...current.statuses, status],
    }));
  }

  function startDiagnosis() {
    setDiagnosing(true);
    setDiagnosed(false);
    window.setTimeout(() => {
      setDiagnosing(false);
      setDiagnosed(true);
    }, 800);
  }

  function updateOpportunityStatus(id: string, followStatus: Opportunity["followStatus"]) {
    const next = opportunityLibrary.map((item) => (item.id === id ? { ...item, followStatus } : item));
    setOpportunityLibrary(next);
    saveOpportunities(next);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/82 p-6 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75 sm:p-8">
          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-500/10" />
          <div className="relative z-10 max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Growth Diagnosis</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">
              AI 成长检测
            </h1>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              输入学院、专业、年级、成长目标与当前状态，YPI 会生成可解释的成长评分、能力雷达、推荐成长机会和本月行动清单，让成长规划和机会跟进真正连起来。
            </p>
          </div>
        </section>

        <div className="mt-5 grid gap-5 xl:grid-cols-[410px_1fr]">
          <section className="rounded-[28px] border border-slate-200/70 bg-white/82 p-5 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-600 text-white">
                <BrainCircuit className="size-6" />
              </span>
              <div>
                <p className="text-sm font-black text-blue-600">学生画像</p>
                <h2 className="text-xl font-black text-slate-950 dark:text-slate-50">生成个人成长报告</h2>
              </div>
            </div>

            <div className="space-y-4">
              <Field label="学院 / 部门">
                <select
                  value={profile.collegeId}
                  onChange={(event) => {
                    const nextCollege = getCollegeProfile(event.target.value);
                    updateProfile({ collegeId: nextCollege.id, major: nextCollege.majors[0] });
                  }}
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/60 px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  {collegeProfiles.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="专业 / 方向">
                <select
                  value={profile.major}
                  onChange={(event) => updateProfile({ major: event.target.value })}
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/60 px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  {currentCollege.majors.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="年级">
                  <select
                    value={profile.grade}
                    onChange={(event) => updateProfile({ grade: event.target.value as GrowthDiagnosisProfile["grade"] })}
                    className="h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/60 px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {gradeOptions.map((item) => (
                      <option key={item.value}>{item.value}</option>
                    ))}
                  </select>
                </Field>
                <Field label="成长目标">
                  <select
                    value={profile.goal}
                    onChange={(event) => updateProfile({ goal: event.target.value as GrowthGoal })}
                    className="h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/60 px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {growthGoalOptions.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="兴趣 / 关键词">
                <input
                  value={profile.interest}
                  onChange={(event) => updateProfile({ interest: event.target.value })}
                  placeholder="例如：AI应用开发、专转本、班助、蓝桥杯"
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/60 px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </Field>
              <Field label="当前状态（可多选）">
                <div className="flex flex-wrap gap-2">
                  {growthStatusOptions.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => toggleStatus(status)}
                      className={`rounded-full px-3 py-2 text-xs font-black transition-all duration-300 active:scale-95 ${
                        profile.statuses.includes(status)
                          ? "bg-blue-600 text-white shadow-sm"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            <button
              type="button"
              onClick={startDiagnosis}
              disabled={diagnosing}
              className="mt-6 w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-75 active:scale-95"
            >
              {diagnosing ? (
                <LoadingSpinner label="正在生成成长报告..." className="justify-center text-white [&_svg]:text-white" />
              ) : diagnosed ? (
                "重新检测"
              ) : (
                "生成成长检测结果"
              )}
            </button>
            {diagnosing && (
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-50 dark:bg-slate-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                  initial={{ width: "8%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            )}
          </section>

          <section className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
              <div className="rounded-[28px] border border-slate-200/70 bg-white/82 p-5 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-blue-600">成长评分</p>
                    <h2 className="text-xl font-black text-slate-950 dark:text-slate-50">能力雷达</h2>
                  </div>
                  <Radar className="size-5 text-blue-600" />
                </div>
                <div className="relative mt-5 grid aspect-square place-items-center overflow-hidden rounded-[26px] bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
                  <div className="absolute inset-x-8 top-1/2 h-px bg-blue-200/70 dark:bg-blue-500/20" />
                  <div className="absolute inset-y-8 left-1/2 w-px bg-blue-200/70 dark:bg-blue-500/20" />
                  <div className="relative grid size-60 place-items-center rounded-full border border-blue-200 dark:border-blue-500/30">
                    <div className="absolute size-48 rounded-full border border-blue-200/80 dark:border-blue-500/20" />
                    <div className="absolute size-36 rounded-full border border-blue-200/80 dark:border-blue-500/20" />
                    <div className="absolute size-24 rounded-full border border-blue-200/80 dark:border-blue-500/20" />
                    <div className="grid size-32 place-items-center rounded-full bg-blue-600 text-center text-white shadow-sm">
                      <span className="whitespace-pre-line text-2xl font-black">
                        {diagnosed ? `${scoreResult.totalScore}分\n${scoreResult.level}` : "待检测"}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold leading-6 text-blue-800 dark:bg-blue-950/40 dark:text-blue-200">
                  {diagnosed ? scoreResult.levelDescription : `${currentGrade.value}重点：${currentGrade.focus}`}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {dimensionLabels.map(([key, label], index) => {
                  const value = diagnosed ? scoreResult.dimensions[key] : 0;
                  return (
                    <motion.article
                      key={key}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06, duration: 0.35, ease: "easeOut" }}
                      className="rounded-[24px] border border-slate-200/70 bg-white/82 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900/75"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-black text-slate-950 dark:text-slate-50">{label}</h3>
                        <span className="text-2xl font-black text-blue-600">{diagnosed ? value : "--"}</span>
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                      </div>
                      <p className="mt-3 text-xs font-bold leading-5 text-slate-500 dark:text-slate-400">
                        {diagnosed ? "由你的输入、目标状态和机会跟进情况动态计算。" : "完成检测后显示该维度评分。"}
                      </p>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            {diagnosed && (
              <section className="grid gap-4 lg:grid-cols-3">
                <ReportList title="优势信号" icon={<Sparkles className="size-5" />} items={scoreResult.strengths} />
                <ReportList title="风险提醒" icon={<Target className="size-5" />} items={scoreResult.risks} />
                <ReportList title="下一步建议" icon={<TrendingUp className="size-5" />} items={scoreResult.suggestions} />
              </section>
            )}

            <section className="rounded-[28px] border border-slate-200/70 bg-white/82 p-5 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-blue-600">Linked Opportunities</p>
                  <h2 className="text-2xl font-black text-slate-950 dark:text-slate-50">推荐成长机会</h2>
                </div>
                <Link
                  href="/opportunities"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 active:scale-95"
                >
                  前往成长机会中心
                  <ExternalLink className="size-4" />
                </Link>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                当前画像：{profile.major} / {profile.grade} / {profile.goal}。推荐来自你的本地机会库，状态会和成长机会中心同步。
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {recommendedOpportunities.map((item, index) => (
                  <motion.article
                    key={item.opportunity.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="rounded-[24px] border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:from-slate-900 dark:to-slate-800"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-200">
                        {item.opportunity.category}
                      </span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 dark:bg-blue-950/40 dark:text-blue-200">
                        {item.matchScore}% 匹配
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-black text-slate-950 dark:text-slate-50">{item.opportunity.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.reason}</p>
                    <div className="mt-3 grid gap-2 text-xs font-black text-slate-600 dark:text-slate-300">
                      <p className="rounded-2xl bg-white/80 px-3 py-2 text-blue-700 dark:bg-slate-950/70 dark:text-blue-200">
                        截止：{item.opportunity.deadline || "以通知为准"}
                      </p>
                      <p className="rounded-2xl bg-white/80 px-3 py-2 text-amber-600 dark:bg-slate-950/70">
                        推荐指数：{"★".repeat(item.opportunity.recommendLevel)}
                        {"☆".repeat(5 - item.opportunity.recommendLevel)}
                      </p>
                      <p className="rounded-2xl bg-white/80 px-3 py-2 text-violet-700 dark:bg-slate-950/70 dark:text-violet-200">
                        跟进状态：{item.opportunity.followStatus}
                      </p>
                    </div>
                    {item.opportunity.growthValues.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.opportunity.growthValues.slice(0, 3).map((value) => (
                          <span
                            key={value}
                            className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-200"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-3 rounded-2xl bg-white/80 px-3 py-2 text-xs font-black text-blue-700 dark:bg-slate-950/70 dark:text-blue-200">
                      适配：{item.fit}
                    </p>
                    <div className="mt-3 grid gap-2">
                      <p className="text-xs font-black text-slate-500 dark:text-slate-400">推进状态</p>
                      <div className="flex flex-wrap gap-2">
                        {(["已收藏", "准备中", "已报名"] as unknown as Opportunity["followStatus"][]).map((status) => (
                          <button
                            key={String(status)}
                            type="button"
                            onClick={() => updateOpportunityStatus(item.opportunity.id, status)}
                            className={`rounded-full px-3 py-1.5 text-xs font-black transition-all duration-300 active:scale-95 ${
                              item.opportunity.followStatus === status
                                ? "bg-blue-600 text-white shadow-sm"
                                : "border border-blue-100 bg-white/82 text-blue-700 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950 dark:text-blue-200"
                            }`}
                          >
                            {String(status)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200/70 bg-white/82 p-5 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm">
                  <CalendarCheck className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-black text-blue-600">Monthly Action Plan</p>
                  <h2 className="text-2xl font-black text-slate-950 dark:text-slate-50">本月行动清单</h2>
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {monthlyActions.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 rounded-[22px] border border-blue-100 bg-blue-50/55 p-4 dark:border-slate-700 dark:bg-slate-950/50"
                  >
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                      <CheckCircle2 className="size-4" />
                    </span>
                    <div>
                      <p className="font-black text-slate-950 dark:text-slate-50">{item}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        建议在本月内完成，作为成长报告的下一步行动。
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </section>
        </div>

        <div className="mt-6">
          <InlineAgent
            title="成长规划智能体"
            description="输入专业、年级、目标和兴趣方向，进一步生成个性化学习路线、竞赛证书建议和就业/专转本方案。"
            placeholder="例如：我是软件技术大二，目标就业，喜欢前端开发，应该怎么规划？"
            suggested={["软件技术大二怎么规划", "人工智能专业竞赛推荐", "工程造价考证路线", "大数据与会计就业方向"]}
          />
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-700 dark:text-slate-200">{label}</span>
      {children}
    </label>
  );
}

function ReportList({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-[24px] border border-slate-200/70 bg-white/82 p-5 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75"
    >
      <div className="mb-4 flex items-center gap-2 text-blue-600">
        {icon}
        <h3 className="text-lg font-black text-slate-950 dark:text-slate-50">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <p key={item} className="flex gap-2 text-sm font-bold leading-6 text-slate-600 dark:text-slate-300">
            <ArrowRight className="mt-1 size-4 shrink-0 text-blue-500" />
            {item}
          </p>
        ))}
      </div>
    </motion.article>
  );
}
