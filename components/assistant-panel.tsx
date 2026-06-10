"use client";

import { FormEvent, useRef, useState } from "react";
import { Bot, Loader2, Send, UserRound } from "lucide-react";
import { MarkdownResponse } from "@/components/markdown-response";
import { useDifyChat } from "@/hooks/use-dify-chat";
import { cn } from "@/lib/utils";

const prompts = [
  "大一成长规划怎么做",
  "适合我的竞赛有哪些",
  "证书怎么规划",
  "最近有哪些成长机会",
  "学习资源怎么找",
  "我是计算机应用技术专业大一",
];

const FAILURE_MESSAGE = "暂时无法连接智能体，请稍后再试。";
const INITIAL_MESSAGE =
  "你好，我是扬工智行AI成长导师。你可以咨询成长规划、竞赛推荐、证书推荐、成长机会、学习资源和心理关怀。";

export function AssistantPanel() {
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const { messages, loading, sendMessage: sendDifyMessage } = useDifyChat({
    initialMessage: INITIAL_MESSAGE,
    failureMessage: FAILURE_MESSAGE,
    fallbackAnswer: "已收到请求。",
  });

  async function sendMessage(text: string) {
    const query = text.trim();
    if (!query || loading) return;

    setInput("");
    await sendDifyMessage(query);
    setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, 0);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <aside className="flex h-[calc(100vh-48px)] min-h-[720px] flex-col rounded-[24px] border border-white/70 bg-white/80 shadow-card-light backdrop-blur-2xl">
      <div className="border-b border-blue-100/80 p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-glow">
            <Bot className="size-5" />
          </span>
          <div>
            <h2 className="font-black text-slate-950">AI成长导师</h2>
            <p className="text-xs text-slate-500">成长规划 · 机会推荐 · 关怀支持</p>
          </div>
        </div>
      </div>

      <div className="border-b border-blue-100/80 p-5">
        <p className="mb-3 text-xs font-black text-slate-500">推荐问题</p>
        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void sendMessage(prompt)}
              className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex gap-3", message.role === "user" && "justify-end")}
          >
            {message.role === "assistant" && (
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                <Bot className="size-4" />
              </span>
            )}
            <div
              className={cn(
                "max-w-[84%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm",
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "border border-blue-100 bg-blue-50/80 text-slate-700",
              )}
            >
              {message.role === "assistant" ? (
                <MarkdownResponse text={message.content} />
              ) : (
                message.content
              )}
            </div>
            {message.role === "user" && (
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700">
                <UserRound className="size-4" />
              </span>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Loader2 className="size-4 animate-spin" />
            正在请求Dify
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-3 border-t border-blue-100/80 p-4">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={1}
          placeholder="输入你的问题..."
          className="min-h-11 flex-1 resize-none rounded-2xl border border-blue-100 bg-white/82 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(37,99,235,0.14)]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-glow transition hover:rotate-6 hover:scale-110 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="发送"
          title="发送"
        >
          {loading ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
        </button>
      </form>
    </aside>
  );
}
