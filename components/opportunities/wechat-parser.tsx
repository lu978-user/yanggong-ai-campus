import { ClipboardList, ExternalLink, Loader2, Sparkles } from "lucide-react";
import { type WechatArticle } from "@/types/opportunity";
import { SectionHeader, StatusMessage } from "./shared";

export function WechatParser({
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
