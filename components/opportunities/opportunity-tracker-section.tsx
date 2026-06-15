import { opportunityFollowStatuses, type OpportunityFollowStatus } from "@/data/opportunities";
import { type FavoriteOpportunity, type OpportunityTrackerGroup } from "@/types/opportunity";
import { SectionHeader } from "./shared";

const followStatusStyles: Record<OpportunityFollowStatus, string> = {
  未关注: "bg-slate-100 text-slate-600 border-slate-200",
  已收藏: "bg-amber-50 text-amber-700 border-amber-100",
  准备中: "bg-blue-50 text-blue-700 border-blue-100",
  已报名: "bg-emerald-50 text-emerald-700 border-emerald-100",
  已完成: "bg-violet-50 text-violet-700 border-violet-100",
};

export function OpportunityTrackerSection({
  groups,
  favorites,
  onFollowStatusChange,
}: {
  groups: OpportunityTrackerGroup[];
  favorites: FavoriteOpportunity[];
  onFollowStatusChange: (id: string, status: OpportunityFollowStatus) => void;
}) {
  return (
    <section id="my-opportunities" className="premium-card mt-5 p-6">
      <SectionHeader eyebrow="My Growth Opportunities" title="我的成长机会" desc="按跟进状态管理机会，帮助你从收藏、准备、报名一路推进到完成。" />
      <div className="mt-5 grid gap-4 xl:grid-cols-4">
        {groups.map((group) => (
          <div key={group.status} className="rounded-[24px] border border-blue-100 bg-white/70 p-4 shadow-sm">
            <div className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-black ${followStatusStyles[group.status]}`}>
              {group.status} · {group.items.length + (group.status === "已收藏" ? favorites.length : 0)}
            </div>
            <p className="mb-4 text-xs font-bold leading-5 text-slate-500">{group.desc}</p>
            <div className="grid gap-3">
              {group.items.length === 0 && !(group.status === "已收藏" && favorites.length > 0) ? (
                <p className="rounded-2xl bg-blue-50/70 px-4 py-3 text-sm font-bold text-slate-500">暂无机会</p>
              ) : (
                <>
                  {group.items.map((item) => (
                    <article key={item.id} className="rounded-2xl bg-blue-50/65 p-4">
                      <h3 className="font-black text-slate-950">{item.title}</h3>
                      <p className="mt-1 text-xs font-bold text-slate-500">{item.category} · {item.deadline}</p>
                      {item.growthValues.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.growthValues.slice(0, 3).map((value) => (
                            <span key={value} className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-black text-cyan-700">
                              {value}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.followStatus === "已完成" && item.completedSkills.length > 0 && (
                        <div className="mt-3 rounded-2xl bg-emerald-50 px-3 py-2">
                          <p className="text-xs font-black text-emerald-700">✓ 已完成</p>
                          <p className="mt-1 text-[11px] font-bold leading-5 text-emerald-700">
                            获得能力：{item.completedSkills.join(" / ")}
                          </p>
                        </div>
                      )}
                      <select
                        value={item.followStatus}
                        onChange={(event) => onFollowStatusChange(item.id, event.target.value as OpportunityFollowStatus)}
                        className="mt-3 h-9 w-full rounded-full border border-blue-100 bg-white px-3 text-xs font-black text-blue-700 outline-none"
                      >
                        {opportunityFollowStatuses.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </article>
                  ))}
                  {group.status === "已收藏" && favorites.map((item) => (
                    <article key={item.title} className="rounded-2xl bg-amber-50/70 p-4">
                      <h3 className="font-black text-slate-950">{item.title}</h3>
                      <p className="mt-1 text-xs font-bold text-slate-500">{item.type} · {item.deadline}</p>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs font-black text-blue-700">
                          查看原文 →
                        </a>
                      )}
                    </article>
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
