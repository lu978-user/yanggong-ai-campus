import { Bookmark, ExternalLink, Loader2, Sparkles } from "lucide-react";
import { type FavoriteOpportunity, type OpportunityNotice } from "@/types/opportunity";
import { SectionHeader, StatusMessage } from "./shared";

export function LatestNotices({
  latest,
  latestError,
  latestLoading,
  aiLoadingUrl,
  onInterpret,
  onFavorite,
}: {
  latest: OpportunityNotice[];
  latestError: string;
  latestLoading: boolean;
  aiLoadingUrl: string;
  onInterpret: (item: OpportunityNotice) => void;
  onFavorite: (item: FavoriteOpportunity) => void;
}) {
  return (
    <section id="ai-interpret" className="premium-card mt-5 scroll-mt-24 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader eyebrow="Official Notices" title="最新成长机会" desc="自动筛选学校官网公开通知中的班助、组织招募、社团、志愿、竞赛、讲座和实习实践机会。" />
        {latestLoading && (
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
            <Loader2 className="size-4 animate-spin" />
            正在获取官网通知
          </span>
        )}
      </div>

      {latestError && <StatusMessage tone="orange" text={latestError} />}
      {!latestError && !latestLoading && latest.length === 0 && <StatusMessage tone="blue" text="暂无匹配的成长机会通知。" />}

      {latest.length > 0 && (
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {latest.map((item) => (
            <NoticeCard
              key={`${item.title}-${item.url}`}
              item={item}
              loading={aiLoadingUrl === item.url}
              onInterpret={() => onInterpret(item)}
              onFavorite={() => onFavorite({ title: item.title, type: item.type, deadline: item.date || "官网通知", url: item.url })}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function NoticeCard({
  item,
  loading,
  onInterpret,
  onFavorite,
}: {
  item: OpportunityNotice;
  loading: boolean;
  onInterpret: () => void;
  onFavorite: () => void;
}) {
  return (
    <article className="rounded-[24px] border border-blue-100 bg-white/76 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">{item.type}</span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{item.date || "官网通知"}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">来源：学校官网</span>
      </div>
      <h3 className="text-lg font-black leading-7 text-slate-950">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-black text-blue-700 hover:bg-blue-50 active:scale-95">
          <ExternalLink className="size-4" />
          查看原文
        </a>
        <button type="button" onClick={onInterpret} disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-black text-white shadow-glow disabled:opacity-70 active:scale-95">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          AI解读
        </button>
        <button type="button" onClick={onFavorite} className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-black text-amber-700 hover:bg-amber-100 active:scale-95">
          <Bookmark className="size-4" />
          收藏
        </button>
      </div>
    </article>
  );
}
