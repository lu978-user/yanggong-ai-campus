"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bookmark,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Loader2,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CountUp } from "@/components/count-up";
import {
  defaultOpportunities,
  getOpportunities,
  opportunityCategories,
  type Opportunity,
} from "@/data/opportunities";
import { sanitizeResponse } from "@/lib/response-sanitizer";

type OpportunityNotice = {
  title: string;
  date: string;
  url: string;
  type: string;
  summary: string;
};

type WechatArticle = {
  title: string;
  content: string;
  summary: string;
  url: string;
};

type FavoriteOpportunity = {
  title: string;
  type: string;
  deadline: string;
  url?: string;
};

const categoryFilters = [
  "全部",
  ...opportunityCategories,
];

const stats = [
  ["本周机会", 12],
  ["正在报名", 8],
  ["即将截止", 3],
  ["推荐机会", 5],
];

function getOpportunityType(text: string) {
  if (text.includes("班主任助理") || text.includes("班助")) return "班主任助理";
  if (text.includes("社团")) return "社团招新";
  if (text.includes("志愿")) return "志愿活动";
  if (text.includes("竞赛") || text.includes("蓝桥杯") || text.includes("创新创业")) return "竞赛活动";
  if (text.includes("就业") || text.includes("实习") || text.includes("招聘")) return "就业实习";
  return "校园通知";
}

function getTypeBadge(type: string) {
  if (type.includes("竞赛")) return "bg-violet-50 text-violet-700 border-violet-100";
  if (type.includes("班主任")) return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (type.includes("社团")) return "bg-orange-50 text-orange-700 border-orange-100";
  if (type.includes("志愿")) return "bg-pink-50 text-pink-700 border-pink-100";
  if (type.includes("就业") || type.includes("实习")) return "bg-cyan-50 text-cyan-700 border-cyan-100";
  return "bg-blue-50 text-blue-700 border-blue-100";
}

function getScore(text: string) {
  if (text.includes("班主任助理") || text.includes("竞赛") || text.includes("志愿")) return 5;
  if (text.includes("社团") || text.includes("讲座") || text.includes("活动")) return 4;
  return 3;
}

function stars(score: number) {
  return "★".repeat(score) + "☆".repeat(5 - score);
}

function getAudienceTags(text: string) {
  const candidates = [
    "大一",
    "大二",
    "计算机应用技术",
    "人工智能技术应用",
    "专升本",
    "就业导向",
    "学生干部",
  ];
  const matched = candidates.filter((item) => text.includes(item));
  return matched.length > 0 ? matched : ["大一", "大二", "学生干部", "成长导向"];
}

function getConditions(text: string) {
  const base = ["在校学生", "无处分记录", "有责任心"];
  if (text.includes("专业") || text.includes("计算机") || text.includes("人工智能")) {
    return [...base, "满足专业要求"];
  }
  return [...base, "按通知要求提交材料"];
}

function nowText() {
  const date = new Date();
  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function makeSummary(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) {
    return [
      "本次通知主要面向希望参与校园成长机会的同学。",
      "参与后可提升组织协调、沟通表达与团队协作能力。",
      "对评优评先、学生干部经历积累和未来就业具有帮助。",
      "建议符合条件的同学尽快查看通知并准备报名材料。",
    ];
  }
  return [
    `本次通知主要围绕“${clean.slice(0, 28)}...”展开。`,
    "参与后可提升组织协调、沟通表达与团队协作能力。",
    "对简历经历、评优评先、升学就业方向具有一定帮助。",
    "建议符合条件的同学尽快关注截止时间并准备报名材料。",
  ];
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

  useEffect(() => {
    setOpportunities(getOpportunities());
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
        const response = await fetch("/api/opportunities", { cache: "no-store" });
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
内容：
${content}`,
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
    await askDify(
      `请解读以下成长机会通知：

来源：微信公众号
标题：${article.title}
链接：${article.url}
正文：
${article.content}

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
        title: article.title,
        date: "",
        url: article.url,
        type: getOpportunityType(`${article.title}${article.content}`),
        summary: article.summary,
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
            <h1 className="mt-4 text-4xl font-black tracking-normal text-slate-950 sm:text-6xl">
              成长机会中心
            </h1>
            <p className="mt-2 text-2xl font-black text-blue-700">发现机会 · 参与实践 · 沉淀成长</p>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
              聚合班主任助理、学生组织、社团招新、志愿服务、校园活动、技能竞赛、创新创业、实习实践等成长机会，通过 AI 自动分析参与价值与行动建议。
            </p>
            <Link
              href="/opportunity-admin"
              className="mt-5 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 active:scale-95"
            >
              管理机会
            </Link>
          </div>
        </section>

        <section className="mt-5 grid gap-3 md:grid-cols-4">
          {stats.map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="rounded-[24px] bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <p className="text-4xl font-black">
                <CountUp value={Number(value)} />
              </p>
              <p className="mt-2 text-sm font-bold text-white/80">{label}</p>
            </motion.div>
          ))}
        </section>

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

        <section className="mt-5">
          <SectionHeader eyebrow="Hot Opportunities" title="热门成长机会" desc="优先展示适合学生成长、实践、履历积累和能力提升的机会。" />
          <div className="mt-4 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {filteredHot.map((item, index) => (
              <motion.article
                key={item.id}
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
                </div>
                <h3 className="text-2xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                <div className="mt-4 grid gap-2 text-sm font-black text-slate-700">
                  <span>推荐指数：{stars(item.recommendLevel)}</span>
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
                <div className="mt-5 flex flex-wrap gap-2">
                  <button type="button" className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-black text-blue-700 hover:bg-blue-50 active:scale-95">
                    查看详情
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void interpretWithAi({
                        title: item.title,
                        date: item.deadline,
                        url: "",
                        type: item.category,
                        summary: `${item.description}\n报名条件：${item.requirements}\n报名方式：${item.applyMethod}\n来源：${item.source}`,
                      })
                    }
                    disabled={aiLoadingUrl === item.title}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-black text-white shadow-glow disabled:opacity-70 active:scale-95"
                  >
                    {aiLoadingUrl === item.title ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                    AI解读
                  </button>
                  <button
                    type="button"
                    onClick={() => saveFavorite({ title: item.title, type: item.category, deadline: item.deadline })}
                    className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-black text-amber-700 hover:bg-amber-100 active:scale-95"
                  >
                    <Bookmark className="size-4" />
                    收藏
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="premium-card mt-5 p-6">
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
                  onInterpret={() => void interpretWithAi(item)}
                  onFavorite={() => saveFavorite({ title: item.title, type: item.type, deadline: item.date || "官网通知", url: item.url })}
                />
              ))}
            </div>
          )}
        </section>

        <section className="premium-card mt-5 p-6">
          <SectionHeader
            eyebrow="AI Notice Interpreter"
            title="AI通知解读助手"
            desc="支持解析学校官网通知、公众号通知、班级群通知、活动报名通知等内容，帮助判断是否值得参与以及下一步怎么做。"
          />
          <textarea
            value={notice}
            onChange={(event) => setNotice(event.target.value)}
            placeholder="请粘贴通知内容，例如班主任助理招募、社团招新、竞赛报名、志愿服务等。"
            className="mt-5 min-h-64 w-full rounded-[28px] border border-blue-100 bg-white/86 p-5 text-sm leading-7 outline-none shadow-inner transition focus:border-blue-400 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
          />
          <button
            type="button"
            onClick={() => void interpretManualNotice()}
            disabled={!notice.trim() || aiLoadingUrl === "manual"}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-glow disabled:cursor-not-allowed disabled:opacity-70 active:scale-95"
          >
            {aiLoadingUrl === "manual" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {aiLoadingUrl === "manual" ? "正在分析成长机会..." : "开始AI解读"}
          </button>
        </section>

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

        <section id="my-opportunities" className="premium-card mt-5 p-6">
          <SectionHeader eyebrow="My Opportunity Library" title="我的机会库" desc="收藏后的机会会保存在本地，便于比赛演示和个人跟进。" />
          {favorites.length === 0 ? (
            <StatusMessage tone="blue" text="暂无收藏机会，点击热门机会或官网通知中的“收藏”即可加入。" />
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {favorites.map((item) => (
                <article key={item.title} className="rounded-[24px] border border-blue-100 bg-white/76 p-4 shadow-sm">
                  <div className="mb-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
                    ⭐ 已收藏
                  </div>
                  <h3 className="font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm font-bold text-slate-500">{item.type} · {item.deadline}</p>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-black text-blue-700">
                      查看原文 →
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div>
      <p className="text-sm font-black text-blue-600">{eyebrow}</p>
      <h2 className="mt-1 text-3xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
    </div>
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

function OpportunityReport({
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

function ReportCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[20px] border border-white/70 bg-white/76 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className ?? ""}`}>
      <h3 className="mb-4 text-lg font-black text-slate-950">{title}</h3>
      {children}
    </div>
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

function StatusMessage({ tone, text }: { tone: "blue" | "orange"; text: string }) {
  return (
    <div className={`mt-5 rounded-[24px] border px-5 py-4 text-sm font-bold ${
      tone === "orange"
        ? "border-orange-100 bg-orange-50 text-orange-700"
        : "border-blue-100 bg-blue-50 text-blue-700"
    }`}>
      {text}
    </div>
  );
}

function WechatParser({
  wechatUrl,
  setWechatUrl,
  wechatLoading,
  wechatError,
  wechatArticle,
  aiLoadingUrl,
  parseWechatArticle,
  interpretWechatWithAi,
}: {
  wechatUrl: string;
  setWechatUrl: (value: string) => void;
  wechatLoading: boolean;
  wechatError: string;
  wechatArticle: WechatArticle | null;
  aiLoadingUrl: string;
  parseWechatArticle: () => Promise<void>;
  interpretWechatWithAi: (article: WechatArticle) => Promise<void>;
}) {
  return (
    <section className="premium-card mt-5 p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-black text-violet-700">实验功能</span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">仅解析用户粘贴的公开文章链接</span>
      </div>
      <SectionHeader
        eyebrow="Wechat Notice Parser"
        title="公众号通知解析"
        desc="粘贴学校公众号、团委公众号或社团公众号文章链接，AI 将尝试提取通知重点并生成报名建议。部分公众号文章可能因平台限制无法解析。"
      />
      <div className="mt-5 flex flex-col gap-3 lg:flex-row">
        <input
          value={wechatUrl}
          onChange={(event) => setWechatUrl(event.target.value)}
          placeholder="请粘贴微信公众号文章链接，例如：https://mp.weixin.qq.com/s/xxxx"
          className="min-h-13 flex-1 rounded-[26px] border border-blue-100 bg-white/86 px-5 py-4 text-sm font-semibold outline-none shadow-inner transition placeholder:text-slate-400 focus:border-blue-400 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
        />
        <button
          type="button"
          onClick={() => void parseWechatArticle()}
          disabled={wechatLoading || !wechatUrl.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-500 px-5 py-3 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65 active:scale-95"
        >
          {wechatLoading ? <Loader2 className="size-4 animate-spin" /> : <ClipboardList className="size-4" />}
          {wechatLoading ? "正在解析公众号文章..." : "解析公众号文章"}
        </button>
      </div>
      {wechatError && (
        <StatusMessage
          tone="orange"
          text="无法自动解析该公众号文章，请复制正文粘贴到通知解读框。"
        />
      )}
      {wechatArticle && (
        <article className="mt-5 rounded-[24px] border border-blue-100 bg-white/76 p-5 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">微信公众号</span>
            <a href={wechatArticle.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 hover:bg-blue-100">
              <ExternalLink className="size-3.5" />
              原文链接
            </a>
          </div>
          <h3 className="text-xl font-black leading-8 text-slate-950">{wechatArticle.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{wechatArticle.summary}</p>
          <button
            type="button"
            onClick={() => void interpretWechatWithAi(wechatArticle)}
            disabled={aiLoadingUrl === wechatArticle.url}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 active:scale-95"
          >
            {aiLoadingUrl === wechatArticle.url ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            AI解读这条通知
          </button>
        </article>
      )}
    </section>
  );
}
