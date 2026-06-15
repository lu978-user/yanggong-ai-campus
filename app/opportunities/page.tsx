"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Megaphone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { LatestNotices } from "@/components/opportunities/latest-notices";
import { NoticeInterpreter } from "@/components/opportunities/notice-interpreter";
import { OpportunityCard } from "@/components/opportunities/opportunity-card";
import { OpportunityReport } from "@/components/opportunities/opportunity-report";
import { OpportunityStats } from "@/components/opportunities/opportunity-stats";
import { OpportunityTrackerSection } from "@/components/opportunities/opportunity-tracker-section";
import { getOpportunityType, SectionHeader } from "@/components/opportunities/shared";
import { WechatParser } from "@/components/opportunities/wechat-parser";
import {
  defaultOpportunities,
  getOpportunities,
  opportunityCategories,
  saveOpportunities,
  type Opportunity,
  type OpportunityFollowStatus,
} from "@/data/opportunities";
import { sanitizeResponse } from "@/lib/response-sanitizer";
import { type FavoriteOpportunity, type OpportunityNotice, type TrackedOpportunityStatus, type WechatArticle } from "@/types/opportunity";

const categoryFilters = ["全部", ...opportunityCategories];
const trackedStatuses: TrackedOpportunityStatus[] = ["已收藏", "准备中", "已报名", "已完成"];

const followStatusDescriptions: Record<TrackedOpportunityStatus, string> = {
  已收藏: "感兴趣但未行动",
  准备中: "正在准备材料或等待报名",
  已报名: "已经参与",
  已完成: "已经完成",
};

function nowText() {
  const date = new Date(), pad = (value: number) => value.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function sanitizeForPrompt(text: string) {
  return text
    .replace(/[<>{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 2000);
}

export default function OpportunitiesPage() {
  const [notice, setNotice] = useState("");
  const [activeFilter, setActiveFilter] = useState("全部");
  const [opportunities, setOpportunities] = useState<Opportunity[]>(defaultOpportunities);
  const [latest, setLatest] = useState<OpportunityNotice[]>([]);
  const [latestError, setLatestError] = useState("");
  const [latestLoading, setLatestLoading] = useState(true);
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoadingUrl, setAiLoadingUrl] = useState("");
  const [reportSource, setReportSource] = useState<OpportunityNotice | null>(null);
  const [reportTime, setReportTime] = useState("");
  const [favorites, setFavorites] = useState<FavoriteOpportunity[]>([]);
  const [wechatUrl, setWechatUrl] = useState("");
  const [wechatArticle, setWechatArticle] = useState<WechatArticle | null>(null);
  const [wechatError, setWechatError] = useState("");
  const [wechatLoading, setWechatLoading] = useState(false);

  const filteredHot = useMemo(
    () =>
      activeFilter === "全部"
        ? opportunities
        : opportunities.filter((item) => item.category === activeFilter),
    [activeFilter, opportunities],
  );

  const groupedFollow = useMemo(
    () =>
      trackedStatuses.map((status) => ({
        status,
        desc: followStatusDescriptions[status],
        items: opportunities.filter((item) => item.followStatus === status),
      })),
    [opportunities],
  );
  const trackerStats = useMemo(
    () => [
      { label: "收藏机会", value: opportunities.filter((item) => item.followStatus === "已收藏").length },
      { label: "准备中", value: opportunities.filter((item) => item.followStatus === "准备中").length },
      { label: "已报名", value: opportunities.filter((item) => item.followStatus === "已报名").length },
      { label: "已完成", value: opportunities.filter((item) => item.followStatus === "已完成").length },
    ],
    [opportunities],
  );

  useEffect(() => {
    const savedOpportunities = getOpportunities();
    setOpportunities(savedOpportunities);
    const saved = window.localStorage.getItem("yanggong-opportunities-favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved) as FavoriteOpportunity[]);
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("yanggong-opportunities-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    let ignore = false;

    async function loadLatest() {
      setLatestLoading(true);
      setLatestError("");

      try {
        const response = await fetch("/api/opportunities");
        if (!response.ok) throw new Error("failed");
        const data = (await response.json()) as OpportunityNotice[];
        if (!ignore) setLatest(data);
      } catch {
        if (!ignore) setLatestError("暂时无法获取官网通知，请稍后再试。");
      } finally {
        if (!ignore) setLatestLoading(false);
      }
    }

    void loadLatest();
    return () => {
      ignore = true;
    };
  }, []);

  function persistOpportunities(next: Opportunity[]) {
    setOpportunities(next);
    saveOpportunities(next);
  }

  function updateFollowStatus(id: string, followStatus: OpportunityFollowStatus) {
    persistOpportunities(
      opportunities.map((item) => (item.id === id ? { ...item, followStatus } : item)),
    );
  }

  function saveFavorite(item: FavoriteOpportunity) {
    setFavorites((current) => {
      if (current.some((saved) => saved.title === item.title)) return current;
      return [item, ...current].slice(0, 12);
    });
  }

  async function askDify(message: string, source: OpportunityNotice) {
    setAiLoadingUrl(source.url || source.title);
    setAiAnswer("");
    setReportSource(source);
    setReportTime(nowText());

    try {
      const response = await fetch("/api/dify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = (await response.json()) as { answer?: string };
      if (!response.ok) throw new Error("failed");
      setAiAnswer(sanitizeResponse(data.answer || "已完成解读。"));
    } catch {
      setAiAnswer("暂时无法连接智能体，请稍后再试。");
    } finally {
      setAiLoadingUrl("");
    }
  }

  async function interpretWithAi(item: OpportunityNotice) {
    await askDify(
      `请解读以下成长机会通知：
标题：${item.title}
内容：${item.summary}
链接：${item.url}`,
      item,
    );
  }

  async function interpretManualNotice() {
    const content = notice.trim();
    if (!content) return;

    await askDify(
      `请解读以下成长机会通知：
内容：${content}`,
      {
        title: content.slice(0, 28) || "手动粘贴通知",
        date: "",
        url: "manual",
        type: getOpportunityType(content),
        summary: content.slice(0, 300),
      },
    );
  }

  async function parseWechatArticle() {
    const url = wechatUrl.trim();
    if (!url) return;

    setWechatLoading(true);
    setWechatError("");
    setWechatArticle(null);
    setAiAnswer("");

    try {
      const response = await fetch("/api/wechat-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = (await response.json()) as
        | ({ success: true } & WechatArticle)
        | { success: false; message: string };

      if (!data.success) {
        setWechatError(data.message || "公众号文章解析失败，请复制文章正文后粘贴。");
        return;
      }

      setWechatArticle(data);
    } catch {
      setWechatError("无法自动解析该公众号文章，请复制正文粘贴到通知解读框。");
    } finally {
      setWechatLoading(false);
    }
  }

  async function interpretWechatWithAi(article: WechatArticle) {
    const safeTitle = sanitizeForPrompt(article.title);
    const safeUrl = sanitizeForPrompt(article.url);
    const safeContent = sanitizeForPrompt(article.content);

    await askDify(
      `请解读以下成长机会通知：

来源：微信公众号
标题：${safeTitle}
链接：${safeUrl}
正文：
${safeContent}

请按照以下格式输出：

📌 通知类型
🎯 核心内容
👥 适合人群
📝 报名条件
⏰ 时间节点
📍 地点与方式
✅ 需要准备
⭐ 参与价值
⚠️ 注意事项
➡️ 下一步建议`,
      {
        title: safeTitle,
        date: "",
        url: article.url,
        type: getOpportunityType(`${safeTitle}${safeContent}`),
        summary: sanitizeForPrompt(article.summary).slice(0, 300),
      },
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
        <section className="premium-card relative overflow-hidden p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-black text-blue-600">
              <Megaphone className="size-4" />
              Campus Opportunity Intelligence
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-normal text-slate-950 sm:text-6xl">成长机会中心</h1>
            <p className="mt-2 text-2xl font-black text-blue-700">发现机会 · 管理机会 · 把握机会</p>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
              聚合班主任助理、学生组织、社团招新、志愿服务、竞赛报名、实习实践等成长机会，并支持收藏、准备、报名和完成状态跟进。
            </p>
            <Link
              href="/opportunity-admin"
              className="mt-5 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 active:scale-95"
            >
              管理机会
            </Link>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-6 text-white shadow-glow transition-all duration-300 hover:-translate-y-1 dark:border-slate-700/60">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-white/70">Opportunity Tracker</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">今天你跟进机会了吗？</h2>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-white/84">
                把机会从“看到”推进到“准备中、已报名、已完成”，让每一次校园通知都变成可执行的成长行动。
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href="#hot-opportunities" className="rounded-full bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                立即查看机会
              </a>
              <a href="#my-opportunities" className="rounded-full border border-white/60 bg-white/16 px-5 py-3 text-sm font-black text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/24 active:scale-95">
                查看我的机会
              </a>
            </div>
          </div>
        </section>

        <OpportunityStats stats={trackerStats} />

        <section className="premium-card mt-5 p-5">
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveFilter(item)}
                className={`rounded-full px-4 py-2 text-sm font-black transition-all duration-300 active:scale-95 ${
                  activeFilter === item
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow"
                    : "bg-white/78 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section id="hot-opportunities" className="mt-5 scroll-mt-24">
          <SectionHeader eyebrow="Hot Opportunities" title="热门成长机会" desc="每张机会卡支持切换跟进状态，并保存到本地机会库。" />
          <div className="mt-4 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {filteredHot.map((item, index) => (
              <OpportunityCard
                key={item.id}
                item={item}
                index={index}
                loading={aiLoadingUrl === item.title}
                onInterpret={() =>
                  void interpretWithAi({
                    title: item.title,
                    date: item.deadline,
                    url: "",
                    type: item.category,
                    summary: `${item.description}\n报名条件：${item.requirements}\n报名方式：${item.applyMethod}\n来源：${item.source}`,
                  })
                }
                onFollowStatusChange={(status) => updateFollowStatus(item.id, status)}
              />
            ))}
          </div>
        </section>

        <LatestNotices
          latest={latest}
          latestError={latestError}
          latestLoading={latestLoading}
          aiLoadingUrl={aiLoadingUrl}
          onInterpret={(item) => void interpretWithAi(item)}
          onFavorite={saveFavorite}
        />

        <NoticeInterpreter
          notice={notice}
          setNotice={setNotice}
          aiLoadingUrl={aiLoadingUrl}
          onInterpret={() => void interpretManualNotice()}
        />

        <WechatParser
          wechatUrl={wechatUrl}
          setWechatUrl={setWechatUrl}
          wechatLoading={wechatLoading}
          wechatError={wechatError}
          wechatArticle={wechatArticle}
          aiLoadingUrl={aiLoadingUrl}
          parseWechatArticle={parseWechatArticle}
          interpretWechatWithAi={interpretWechatWithAi}
        />

        {reportSource && (
          <OpportunityReport
            source={reportSource}
            aiAnswer={aiAnswer}
            reportTime={reportTime}
          />
        )}

        <OpportunityTrackerSection
          groups={groupedFollow}
          favorites={favorites}
          onFollowStatusChange={updateFollowStatus}
        />
      </div>
    </AppShell>
  );
}
