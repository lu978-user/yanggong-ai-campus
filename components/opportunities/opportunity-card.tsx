"use client";

import { motion } from "framer-motion";
import { Bookmark, Loader2, Sparkles } from "lucide-react";
import { opportunityFollowStatuses, type Opportunity, type OpportunityFollowStatus } from "@/data/opportunities";
import { stars } from "./shared";

const followStatusStyles: Record<OpportunityFollowStatus, string> = {
  未关注: "bg-slate-100 text-slate-600 border-slate-200",
  已收藏: "bg-amber-50 text-amber-700 border-amber-100",
  准备中: "bg-blue-50 text-blue-700 border-blue-100",
  已报名: "bg-emerald-50 text-emerald-700 border-emerald-100",
  已完成: "bg-violet-50 text-violet-700 border-violet-100",
};

export function OpportunityCard({
  item,
  index,
  loading,
  onInterpret,
  onFollowStatusChange,
}: {
  item: Opportunity;
  index: number;
  loading: boolean;
  onInterpret: () => void;
  onFollowStatusChange: (status: OpportunityFollowStatus) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="premium-card group p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">{item.category}</span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">截止：{item.deadline}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{item.status}</span>
        <span className={`rounded-full border px-3 py-1 text-xs font-black ${followStatusStyles[item.followStatus]}`}>
          {item.followStatus}
        </span>
      </div>
      <h3 className="text-2xl font-black text-slate-950">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
      {item.followStatus === "已完成" && (
        <div className="mt-4 rounded-[20px] border border-emerald-100 bg-emerald-50/80 px-4 py-3">
          <p className="text-sm font-black text-emerald-700">✓ 已完成</p>
          {item.completedSkills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {item.completedSkills.map((skill) => (
                <span key={skill} className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-emerald-700">
                  获得：{skill}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      <OpportunityProgress current={item.followStatus} onChange={onFollowStatusChange} />
      <div className="mt-4 grid gap-2 text-sm font-black text-slate-700">
        <span>推荐指数：{stars(item.recommendLevel)}</span>
        {item.growthValues.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-black text-slate-500">成长价值</p>
            <div className="flex flex-wrap gap-2">
              {item.growthValues.map((value) => (
                <span key={value} className="rounded-full bg-cyan-50 px-3 py-1 text-xs text-cyan-700">
                  {value}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {item.targetAudience.map((tag) => (
            <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/80 px-3 py-1 text-xs text-slate-500">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <select
          value={item.followStatus}
          onChange={(event) => onFollowStatusChange(event.target.value as OpportunityFollowStatus)}
          className="h-10 rounded-full border border-blue-100 bg-white px-4 text-sm font-black text-blue-700 outline-none transition focus:border-blue-400"
          aria-label="切换跟进状态"
        >
          {opportunityFollowStatuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-black text-blue-700 hover:bg-blue-50 active:scale-95">
            查看详情
          </button>
          <button
            type="button"
            onClick={onInterpret}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-black text-white shadow-glow disabled:opacity-70 active:scale-95"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            AI解读
          </button>
          <button
            type="button"
            onClick={() => onFollowStatusChange("已收藏")}
            className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-black text-amber-700 hover:bg-amber-100 active:scale-95"
          >
            <Bookmark className="size-4" />
            收藏机会
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function OpportunityProgress({
  current,
  onChange,
}: {
  current: OpportunityFollowStatus;
  onChange: (status: OpportunityFollowStatus) => void;
}) {
  const activeIndex = opportunityFollowStatuses.indexOf(current);

  return (
    <div className="mt-5 rounded-[22px] border border-blue-100 bg-white/70 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-black text-slate-800">成长进度</p>
        <p className="text-xs font-bold text-slate-500">发现机会 → 参与机会 → 完成机会 → 获得成长</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-5">
        {opportunityFollowStatuses.map((status, index) => {
          const isActive = status === current;
          const isPassed = index < activeIndex;

          return (
            <button
              key={status}
              type="button"
              onClick={() => onChange(status)}
              className={`group rounded-2xl border px-3 py-3 text-left transition-all duration-300 active:scale-95 ${
                isActive
                  ? "border-blue-300 bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-glow"
                  : isPassed
                    ? "border-emerald-100 bg-emerald-50 text-emerald-700 hover:-translate-y-0.5"
                    : "border-slate-100 bg-white/80 text-slate-500 hover:-translate-y-0.5 hover:border-blue-100 hover:text-blue-700"
              }`}
              aria-pressed={isActive}
            >
              <span className="flex items-center gap-2 text-xs font-black">
                <span className={`grid size-5 place-items-center rounded-full border text-[10px] ${
                  isActive
                    ? "border-white/70 bg-white/20"
                    : isPassed
                      ? "border-emerald-200 bg-white text-emerald-600"
                      : "border-slate-200 bg-slate-50 text-slate-400"
                }`}
                >
                  {isPassed ? "✓" : "○"}
                </span>
                {status}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
