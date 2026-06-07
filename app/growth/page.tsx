"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { BrainCircuit, BriefcaseBusiness, Medal, Radar, ScrollText, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";
import { LoadingSpinner } from "@/components/loading-spinner";

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
  ["大一", "基础学习", "夯实公共课、专业基础和学习习惯。"],
  ["大二", "专业提升", "完成核心技能训练，开始证书和竞赛准备。"],
  ["大三", "项目实践", "进入真实项目、实训基地和作品集建设。"],
  ["大四", "就业升学", "完成专转本、就业方向或创业项目收口。"],
];

const resultCards = [
  { title: "学习路线", icon: TrendingUp, items: ["基础课复盘", "专业核心课", "项目实训", "阶段复盘"] },
  { title: "竞赛推荐", icon: Medal, items: ["蓝桥杯", "挑战杯", "互联网+", "职业技能大赛"] },
  { title: "证书推荐", icon: ScrollText, items: ["等级考试", "职业技能证书", "1+X证书", "行业认证"] },
  { title: "就业方向", icon: BriefcaseBusiness, items: ["技术实施", "开发测试", "运营支持", "升学深造"] },
];

export default function GrowthPage() {
  const [diagnosed, setDiagnosed] = useState(false);
  const [diagnosing, setDiagnosing] = useState(false);
  const [college, setCollege] = useState(colleges[0].name);
  const [major, setMajor] = useState(colleges[0].majors[0]);
  const [grade, setGrade] = useState("大一");
  const [goal, setGoal] = useState("专转本");
  const [interest, setInterest] = useState("AI应用开发");

  const currentCollege = colleges.find((item) => item.name === college) ?? colleges[0];

  function startDiagnosis() {
    setDiagnosing(true);
    setDiagnosed(false);
    window.setTimeout(() => {
      setDiagnosing(false);
      setDiagnosed(true);
    }, 900);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-5 py-6">
        <section className="overflow-hidden rounded-[32px] border border-white/70 bg-white/78 p-6 shadow-xl backdrop-blur-2xl lg:p-8">
          <p className="text-sm font-black text-blue-600">Growth Intelligence</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">AI成长规划中心</h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            支持全校专业分类、年级目标和兴趣方向输入，结合Dify智能体生成成长评分、学习路线、竞赛证书、就业方向与专转本建议。
          </p>
        </section>

        <div className="mt-6 grid gap-5 xl:grid-cols-[390px_1fr]">
          <section className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-xl backdrop-blur-2xl">
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
              <div className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-xl backdrop-blur-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-slate-950">能力雷达图</h2>
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
                      className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
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

            <section className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-xl backdrop-blur-2xl">
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
                    className="relative rounded-2xl bg-gradient-to-br from-blue-50 to-white p-4 transition-all duration-300 hover:scale-[1.02]"
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
