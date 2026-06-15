"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { type OpportunityNotice } from "@/types/opportunity";
import {
  getAudienceTags,
  getConditions,
  getOpportunityType,
  getScore,
  getTypeBadge,
  makeSummary,
  ReportCard,
  stars,
} from "./shared";

export function OpportunityReport({
  source,
  aiAnswer,
  reportTime,
}: {
  source: OpportunityNotice;
  aiAnswer: string;
  reportTime: string;
}) {
  const text = `${source.title}${source.summary}${aiAnswer}`;
  const type = getOpportunityType(text || source.type);
  const score = getScore(text);
  const tags = getAudienceTags(text);
  const conditions = getConditions(text);
  const summary = makeSummary(aiAnswer || source.summary);
  const progressItems = [
    ["组织协调", 88],
    ["沟通表达", 82],
    ["团队协作", 86],
    ["项目管理", 78],
    ["创新实践", 72],
  ];
  const values = [
    ["能力提升", 5],
    ["简历加分", 4],
    ["评优评先", 4],
    ["升学帮助", 3],
    ["就业帮助", 5],
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card mt-5 p-6"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-950">📢 成长机会分析报告</h2>
          <p className="mt-2 text-sm font-bold text-slate-500">由扬工智行 AI 自动生成</p>
        </div>
        <p className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
          分析时间：{reportTime}
        </p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[360px_1fr]">
        <ReportCard title="通知概览">
          <div className="grid gap-3">
            <MetaLine label="通知类型" value={<span className={`rounded-full border px-3 py-1 text-xs font-black ${getTypeBadge(type)}`}>{type}</span>} />
            <MetaLine label="推荐指数" value={<StarsWithBar score={score} />} />
            <MetaLine label="紧急程度" value="中" />
            <MetaLine label="截止时间" value={source.date || "以原通知为准"} />
            <MetaLine label="状态" value="报名中" />
          </div>
        </ReportCard>

        <div className="grid gap-4 md:grid-cols-2">
          <ReportCard title="适合人群">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700">
                  {tag}
                </span>
              ))}
            </div>
          </ReportCard>
          <ReportCard title="报名条件">
            <ul className="space-y-2">
              {conditions.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </ReportCard>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <ReportCard title="🎓 参与价值分析">
          <div className="grid gap-3">
            {values.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-blue-50/60 px-4 py-3">
                <span className="text-sm font-black text-slate-700">{label}</span>
                <span className="text-sm font-black text-blue-700">{stars(Number(value))}</span>
              </div>
            ))}
          </div>
        </ReportCard>

        <ReportCard title="参与后可提升">
          <div className="grid gap-3">
            {progressItems.map(([label, value]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-sm font-black text-slate-700">
                  <span>{label}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-blue-50">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </ReportCard>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_360px]">
        <ReportCard title="AI总结">
          <div className="space-y-2 text-sm leading-7 text-slate-700">
            {summary.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </ReportCard>
        <ReportCard title="关键时间节点">
          <div className="space-y-3">
            {["📅 发布通知", "📝 开始报名", "⏰ 截止报名", "🎉 公布结果"].map((item, index) => (
              <div key={item}>
                <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-black text-slate-800">{item}</div>
                {index < 3 && <div className="px-5 py-1 text-blue-500">↓</div>}
              </div>
            ))}
          </div>
        </ReportCard>
      </div>

      <ReportCard title="下一步建议" className="mt-4">
        <div className="grid gap-3 md:grid-cols-5">
          {["查看原通知", "确认报名条件", "准备材料", "提交申请", "加入咨询群"].map((item, index) => (
            <div key={item} className="rounded-[20px] border border-blue-100 bg-blue-50/70 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-2xl font-black text-blue-700">0{index + 1}</p>
              <p className="mt-2 text-sm font-black text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </ReportCard>
    </motion.section>
  );
}

function MetaLine({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-blue-50/60 px-4 py-3">
      <span className="text-sm font-black text-slate-500">{label}</span>
      <span className="text-sm font-black text-slate-900">{value}</span>
    </div>
  );
}

function StarsWithBar({ score }: { score: number }) {
  return (
    <span className="inline-flex min-w-[150px] flex-col gap-1 text-right">
      <span className="text-amber-500">{stars(score)}</span>
      <span className="h-1.5 overflow-hidden rounded-full bg-amber-100">
        <span className="block h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: `${score * 20}%` }} />
      </span>
    </span>
  );
}
