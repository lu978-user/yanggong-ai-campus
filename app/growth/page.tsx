"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";

const routes = ["专业基础", "技能提升", "竞赛实践", "证书规划", "就业方向"];
const contests = ["蓝桥杯", "中国大学生计算机设计大赛", "挑战杯", "互联网+创新创业"];
const certificates = ["计算机等级考试", "Web前端开发证书", "软件测试证书", "信息安全证书"];

export default function GrowthPage() {
  const [diagnosed, setDiagnosed] = useState(false);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 py-6">
        <section className="rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-card-light backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">成长规划</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">AI成长诊断</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            支持专业、年级、目标输入，生成能力雷达、学习路线、竞赛推荐、证书推荐与就业方向建议。
          </p>
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-[360px_1fr]">
          <section className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-card-light backdrop-blur-2xl">
            <div className="space-y-4">
              {[
                ["专业", "计算机应用技术"],
                ["年级", "大一"],
                ["目标", "专升本"],
              ].map(([label, value]) => (
                <label key={label} className="grid gap-2">
                  <span className="text-sm font-black text-slate-700">{label}</span>
                  <select className="h-12 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 text-sm font-bold outline-none">
                    <option>{value}</option>
                  </select>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setDiagnosed(true)}
              className="mt-6 w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-glow transition hover:bg-blue-700"
            >
              开始诊断
            </button>
          </section>

          <section className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-card-light backdrop-blur-2xl">
            <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
              <div>
                <h2 className="text-xl font-black text-slate-950">能力雷达图</h2>
                <div className="mt-5 grid aspect-square place-items-center rounded-[24px] bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="relative grid size-56 place-items-center rounded-full border border-blue-200">
                    <div className="absolute size-40 rounded-full border border-blue-200" />
                    <div className="absolute size-24 rounded-full border border-blue-200" />
                    <div className="grid size-32 place-items-center rounded-full bg-blue-500/20 text-center text-sm font-black text-blue-700">
                      {diagnosed ? "65分\n良好" : "待诊断"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <ResultBlock title="学习路线" items={routes} active={diagnosed} />
                <ResultBlock title="竞赛推荐" items={contests} active={diagnosed} />
                <ResultBlock title="证书推荐" items={certificates} active={diagnosed} />
                <ResultBlock
                  title="就业方向"
                  items={["前端开发", "软件测试", "技术支持", "AI应用开发助理"]}
                  active={diagnosed}
                />
              </div>
            </div>
          </section>
        </div>
        <div className="mt-6">
          <InlineAgent
            title="成长规划智能体"
            description="根据专业、年级和目标，生成学习路线、竞赛建议和证书规划。"
            placeholder="例如：我是计算机应用技术专业大一，想专升本怎么规划？"
            suggested={["大一计算机怎么规划", "专升本学习路线", "推荐竞赛和证书", "就业方向怎么选"]}
          />
        </div>
      </div>
    </AppShell>
  );
}

function ResultBlock({
  title,
  items,
  active,
}: {
  title: string;
  items: string[];
  active: boolean;
}) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/45 p-4">
      <h3 className="font-black text-slate-950">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm"
          >
            {active ? item : "点击诊断后生成"}
          </span>
        ))}
      </div>
    </div>
  );
}
