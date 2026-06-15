"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BrainCircuit,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  Medal,
  Radar,
  ScrollText,
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
  type OpportunityFollowStatus,
} from "@/data/opportunities";

const colleges = [
  {
    name: "信息工程学院",
    majors: ["计算机应用技术", "软件技术", "大数据技术", "人工智能技术应用"],
  },
  {
    name: "智能制造学院",
    majors: ["机电一体化", "工业机器人"],
  },
  {
    name: "建筑工程学院",
    majors: ["建筑工程技术", "工程造价"],
  },
  {
    name: "经济管理学院",
    majors: ["电子商务", "市场营销", "大数据与会计"],
  },
  {
    name: "艺术设计学院",
    majors: ["数字媒体艺术设计", "环境艺术设计"],
  },
];

const timeline = [
  ["大一", "基础学习", "夯实公共课、专业基础和学习习惯，尽早了解竞赛、证书与校园机会。"],
  ["大二", "专业提升", "完成核心技能训练，开始证书规划、竞赛准备和项目实践。"],
  ["大三", "项目实践", "进入真实项目、实训基地和作品集建设，积累可展示成果。"],
  ["大四", "就业升学", "完成专转本、就业方向或创业项目收口，形成简历和面试材料。"],
];

const resultCards = [
  { title: "学习路线", icon: TrendingUp, items: ["基础课复盘", "专业核心课", "项目实训", "阶段复盘"] },
  { title: "竞赛推荐", icon: Medal, items: ["蓝桥杯", "挑战杯", "互联网+", "职业技能大赛"] },
  { title: "证书推荐", icon: ScrollText, items: ["等级考试", "职业技能证书", "1+X证书", "行业认证"] },
  { title: "就业方向", icon: BriefcaseBusiness, items: ["技术实施", "开发测试", "运营支持", "升学深造"] },
];

type GrowthOpportunity = {
  opportunity: Opportunity;
  matchScore: number;
  reason: string;
  fit: string;
};

function getGoalKeywords(goal: string) {
  const goalMap: Record<string, string[]> = {
    专转本: ["专转本", "升学", "学习资源"],
    就业: ["就业", "实习", "职业发展", "学生工作"],
    竞赛获奖: ["竞赛", "技能竞赛", "创新创业"],
    考证: ["证书", "考证", "专转本", "学习资源"],
    创业: ["创新创业", "创业", "项目实践"],
  };

  return [goal, ...(goalMap[goal] ?? [])];
}

function includesAny(source: string[], targets: string[]) {
  return source.some((item) => targets.some((target) => item.includes(target) || target.includes(item)));
}

function matchOpportunity(opportunity: Opportunity, major: string, grade: string, goal: string): GrowthOpportunity {
  const goalKeywords = getGoalKeywords(goal);
  const majorMatched =
    opportunity.relatedMajors.includes("全部专业") ||
    opportunity.relatedMajors.includes(major) ||
    opportunity.targetAudience.includes(major);
  const goalMatched =
    includesAny(opportunity.relatedGoals, goalKeywords) ||
    includesAny(opportunity.tags, goalKeywords) ||
    includesAny(opportunity.growthValues, goalKeywords);
  const gradeMatched = opportunity.targetAudience.includes(grade);
  const score = Math.min(
    98,
    30 + (majorMatched ? 28 : 0) + (goalMatched ? 28 : 0) + (gradeMatched ? 6 : 0) + opportunity.recommendLevel * 4,
  );
  const reason = goalMatched
    ? `与“${goal}”目标高度相关，可沉淀${opportunity.growthValues.slice(0, 2).join("、") || "成长经历"}。`
    : `可补充${grade}阶段的实践经历，提升${opportunity.growthValues.slice(0, 2).join("、") || "综合能力"}。`;

  return {
    opportunity,
    matchScore: score,
    reason,
    fit: `${majorMatched ? major : "跨专业可参与"} / ${goalMatched ? goal : "综合成长"}`,
  };
}

function getRecommendedOpportunities(opportunities: Opportunity[], major: string, grade: string, goal: string): GrowthOpportunity[] {
  return opportunities
    .map((opportunity) => matchOpportunity(opportunity, major, grade, goal))
    .sort((left, right) => right.matchScore - left.matchScore)
    .slice(0, 4);
}

function getMonthlyActions(recommended: GrowthOpportunity[]) {
  const first = recommended[0]?.opportunity;
  const second = recommended[1]?.opportunity;
  return [
    "收藏一个成长机会",
    first ? `关注「${first.title}」报名节点` : "关注一个竞赛报名",
    second ? `推进「${second.title}」准备事项` : "参加一次校园活动",
    "完成一次能力提升并记录成长收获",
  ];
}

export default function GrowthPage() {
  const [diagnosed, setDiagnosed] = useState(false);
  const [diagnosing, setDiagnosing] = useState(false);
  const [college, setCollege] = useState(colleges[0].name);
  const [major, setMajor] = useState(colleges[0].majors[0]);
  const [grade, setGrade] = useState("大一");
  const [goal, setGoal] = useState("专转本");
  const [interest, setInterest] = useState("AI应用开发");
  const [opportunityLibrary, setOpportunityLibrary] = useState<Opportunity[]>(defaultOpportunities);

  const currentCollege = colleges.find((item) => item.name === college) ?? colleges[0];

  useEffect(() => {
    function refreshOpportunities() {
      setOpportunityLibrary(getOpportunities());
    }

    refreshOpportunities();
    window.addEventListener("focus", refreshOpportunities);
    return () => window.removeEventListener("focus", refreshOpportunities);
  }, []);

  const recommendedOpportunities = useMemo(
    () => getRecommendedOpportunities(opportunityLibrary, major, grade, goal),
    [opportunityLibrary, major, grade, goal],
  );
  const monthlyActions = useMemo(
    () => getMonthlyActions(recommendedOpportunities),
    [recommendedOpportunities],
  );

  function startDiagnosis() {
    setDiagnosing(true);
    setDiagnosed(false);
    window.setTimeout(() => {
      setDiagnosing(false);
      setDiagnosed(true);
    }, 900);
  }

  function updateOpportunityStatus(id: string, followStatus: OpportunityFollowStatus) {
    const next = opportunityLibrary.map((item) =>
      item.id === id ? { ...item, followStatus } : item,
    );
    setOpportunityLibrary(next);
    saveOpportunities(next);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-5 py-6">
        <section className="premium-card overflow-hidden p-6 lg:p-8">
          <p className="text-sm font-black text-blue-600">Growth Intelligence</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">AI成长报告</h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            支持全校专业分类、年级目标和兴趣方向输入，生成成长评分、学习路线、竞赛证书、就业方向，并联动成长机会中心推荐可参与的校园机会。
          </p>
        </section>

        <div className="mt-5 grid gap-5 xl:grid-cols-[390px_1fr]">
          <section className="premium-card p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-600 text-white">
                <BrainCircuit className="size-6" />
              </span>
              <div>
                <p className="text-sm font-black text-blue-600">AI诊断输入</p>
                <h2 className="text-xl font-black text-slate-950">生成个人成长方案</h2>
              </div>
            </div>

            <div className="space-y-4">
              <Field label="专业分类">
                <select
                  value={college}
                  onChange={(event) => {
                    const nextCollege = event.target.value;
                    const next = colleges.find((item) => item.name === nextCollege) ?? colleges[0];
                    setCollege(next.name);
                    setMajor(next.majors[0]);
                  }}
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/60 px-4 text-sm font-bold outline-none"
                >
                  {colleges.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="专业">
                <select
                  value={major}
                  onChange={(event) => setMajor(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/60 px-4 text-sm font-bold outline-none"
                >
                  {currentCollege.majors.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="年级">
                  <select
                    value={grade}
                    onChange={(event) => setGrade(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/60 px-4 text-sm font-bold outline-none"
                  >
                    {["大一", "大二", "大三", "大四"].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </Field>
                <Field label="目标">
                  <select
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/60 px-4 text-sm font-bold outline-none"
                  >
                    {["专转本", "就业", "竞赛获奖", "考证", "创业"].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="兴趣方向">
                <input
                  value={interest}
                  onChange={(event) => setInterest(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/60 px-4 text-sm font-bold outline-none"
                />
              </Field>
            </div>
            <button
              type="button"
              onClick={startDiagnosis}
              disabled={diagnosing}
              className="mt-6 w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-glow transition hover:scale-[1.02] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-75 active:scale-95"
            >
              {diagnosing ? <LoadingSpinner label="正在诊断..." className="justify-center text-white [&_svg]:text-white" /> : "开始诊断"}
            </button>
            {diagnosing && (
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-50">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                  initial={{ width: "8%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </div>
            )}
          </section>

          <section className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
              <div className="premium-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-blue-600">成长评分</p>
                    <h2 className="text-xl font-black text-slate-950">能力雷达图</h2>
                  </div>
                  <Radar className="size-5 text-blue-600" />
                </div>
                <div className="animate-scan-line relative mt-5 grid aspect-square place-items-center overflow-hidden rounded-[26px] bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                  <div className="relative grid size-60 place-items-center rounded-full border border-blue-200">
                    <div className="absolute size-48 rounded-full border border-blue-200" />
                    <div className="absolute size-36 rounded-full border border-blue-200" />
                    <div className="absolute size-24 rounded-full border border-blue-200" />
                    <div className="grid size-32 place-items-center rounded-full bg-blue-500/20 text-center text-sm font-black text-blue-700">
                      {diagnosed ? "82分\n潜力优秀" : "待诊断"}
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold text-slate-500">
                  {["专业能力", "实践能力", "创新能力", "竞赛能力", "就业能力"].map((item) => (
                    <span key={item} className="rounded-full bg-blue-50 px-3 py-1.5">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {resultCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <motion.article
                      key={card.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
                      className="premium-card p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    >
                      <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="text-xl font-black text-slate-950">{card.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {card.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700"
                          >
                            {diagnosed ? item : "诊断后生成"}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            <section className="premium-card p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-blue-600">Linked Opportunities</p>
                  <h2 className="text-2xl font-black text-slate-950">推荐成长机会</h2>
                </div>
                <Link
                  href="/opportunities"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-blue-700 active:scale-95"
                >
                  前往成长机会中心
                  <ExternalLink className="size-4" />
                </Link>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                根据当前方案：{major} / {grade} / {goal}，为你匹配可参与、可收藏、可跟进的成长机会。
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {recommendedOpportunities.map((item, index) => (
                  <motion.article
                    key={item.opportunity.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="rounded-[24px] border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700">
                        {item.opportunity.category}
                      </span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                        {item.matchScore}% 匹配
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.opportunity.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.reason}</p>
                    <div className="mt-3 grid gap-2 text-xs font-black text-slate-600">
                      <p className="rounded-2xl bg-white/80 px-3 py-2 text-blue-700">
                        截止：{item.opportunity.deadline || "以通知为准"}
                      </p>
                      <p className="rounded-2xl bg-white/80 px-3 py-2 text-amber-600">
                        推荐指数：{"★".repeat(item.opportunity.recommendLevel)}{"☆".repeat(5 - item.opportunity.recommendLevel)}
                      </p>
                      <p className="rounded-2xl bg-white/80 px-3 py-2 text-violet-700">
                        跟进状态：{item.opportunity.followStatus}
                      </p>
                    </div>
                    {item.opportunity.growthValues.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.opportunity.growthValues.slice(0, 3).map((value) => (
                          <span key={value} className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700">
                            {value}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-3 rounded-2xl bg-white/80 px-3 py-2 text-xs font-black text-blue-700">
                      适配：{item.fit}
                    </p>
                    <div className="mt-3 grid gap-2">
                      <p className="text-xs font-black text-slate-500">推进状态</p>
                      <div className="flex flex-wrap gap-2">
                        {(["已收藏", "准备中", "已报名"] as const).map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => updateOpportunityStatus(item.opportunity.id, status)}
                            className={`rounded-full px-3 py-1.5 text-xs font-black transition-all duration-300 active:scale-95 ${
                              item.opportunity.followStatus === status
                                ? "bg-blue-600 text-white shadow-glow"
                                : "border border-blue-100 bg-white/82 text-blue-700 hover:bg-blue-50"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="premium-card p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-glow">
                  <CalendarCheck className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-black text-blue-600">Monthly Action Plan</p>
                  <h2 className="text-2xl font-black text-slate-950">本月行动清单</h2>
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
                    className="flex items-start gap-3 rounded-[22px] border border-blue-100 bg-blue-50/55 p-4"
                  >
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                      <CheckCircle2 className="size-4" />
                    </span>
                    <div>
                      <p className="font-black text-slate-950">{item}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        建议在本月内完成，作为成长报告的下一步行动。
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="premium-card p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-blue-600">Growth Timeline</p>
                  <h2 className="text-2xl font-black text-slate-950">成长路线时间轴</h2>
                </div>
                <p className="text-sm font-bold text-slate-500">
                  当前方案：{major} / {grade} / {goal} / {interest}
                </p>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-4">
                {timeline.map(([year, title, desc], index) => (
                  <motion.article
                    key={year}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
                    className="relative rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-3 inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">
                      Step {index + 1}
                    </div>
                    <h3 className="text-xl font-black text-slate-950">{year}</h3>
                    <p className="mt-1 font-black text-blue-700">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                  </motion.article>
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
      <span className="text-sm font-black text-slate-700">{label}</span>
      {children}
    </label>
  );
}
