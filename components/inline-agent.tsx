"use client";

import { FormEvent, useState } from "react";
import { Bot, Loader2, Send } from "lucide-react";
import { MarkdownResponse } from "@/components/markdown-response";
import { sanitizeResponse } from "@/lib/response-sanitizer";

const FAILURE_MESSAGE = "暂时无法连接智能体，请稍后再试。";

export function InlineAgent({
  title = "智能体互动",
  description = "向扬工智行提问，获取当前模块的个性化建议。",
  placeholder = "输入你的问题...",
  suggested = [],
}: {
  title?: string;
  description?: string;
  placeholder?: string;
  suggested?: string[];
}) {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask(text: string) {
    const message = text.trim();
    if (!message || loading) return;

    setInput("");
    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/dify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, conversationId }),
      });
      const data = (await response.json()) as { answer: string; conversationId: string };
      if (!response.ok) throw new Error(data.answer || FAILURE_MESSAGE);

      setConversationId(data.conversationId ?? "");
      setAnswer(sanitizeResponse(data.answer || "已收到请求。"));
    } catch {
      setAnswer(FAILURE_MESSAGE);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  return (
    <section className="rounded-[28px] border border-white/70 bg-white/72 p-5 shadow-card-light backdrop-blur-2xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-glow">
            <Bot className="size-5" />
          </span>
          <div>
            <h2 className="text-xl font-black text-slate-950">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggested.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => void ask(item)}
              className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white active:scale-95"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={submit} className="mt-5 flex gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          className="min-h-12 flex-1 rounded-2xl border border-blue-100 bg-white/82 px-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.14)]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="grid size-12 place-items-center rounded-full bg-blue-600 text-white shadow-glow transition hover:rotate-6 hover:scale-110 hover:bg-blue-700 disabled:opacity-50"
          aria-label="发送"
        >
          {loading ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
        </button>
      </form>

      {(answer || loading) && (
        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm leading-7 text-slate-700">
          {loading ? "正在请求智能体..." : <MarkdownResponse text={answer} />}
        </div>
      )}
    </section>
  );
}
