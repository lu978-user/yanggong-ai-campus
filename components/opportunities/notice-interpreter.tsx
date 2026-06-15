import { Loader2, Sparkles } from "lucide-react";
import { SectionHeader } from "./shared";

export function NoticeInterpreter({
  notice,
  setNotice,
  aiLoadingUrl,
  onInterpret,
}: {
  notice: string;
  setNotice: (value: string) => void;
  aiLoadingUrl: string;
  onInterpret: () => void;
}) {
  return (
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
        onClick={onInterpret}
        disabled={!notice.trim() || aiLoadingUrl === "manual"}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-glow disabled:cursor-not-allowed disabled:opacity-70 active:scale-95"
      >
        {aiLoadingUrl === "manual" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
        {aiLoadingUrl === "manual" ? "正在分析成长机会..." : "开始AI解读"}
      </button>
    </section>
  );
}
