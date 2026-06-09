"use client";

import { FormEvent, useState } from "react";
import { Bot, Loader2, Mic, RotateCcw, Send, Sparkles, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { MarkdownResponse } from "@/components/markdown-response";
import { sanitizeResponse } from "@/lib/response-sanitizer";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const FAILURE_MESSAGE = "暂时无法连接智能体，请稍后再试。";

const promptGroups = [
  {
    title: "猜你想问",
    items: ["文汇楼（图书馆）在哪", "西门在哪", "体育馆在哪", "双镜湖在哪"],
  },
  {
    title: "热门咨询",
    items: ["学生证丢了怎么办", "大一怎么规划", "蓝桥杯怎么准备", "最近压力大怎么办"],
  },
  {
    title: "最近咨询",
    items: ["食堂在哪", "宿舍安全注意事项", "专转本建议", "校园卡问题"],
  },
];

function createId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "你好，我是扬工智行。你可以咨询校园导航、校园生活、学习成长、校园文化、安全关怀和学生事务，我会结合校园知识库持续对话。",
    },
  ]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(text: string) {
    const query = text.trim();
    if (!query || loading) return;

    setMessages((current) => [...current, { id: createId(), role: "user", content: query }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/dify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, conversationId }),
      });
      const data = (await response.json()) as {
        answer: string;
        conversationId: string;
      };
      if (!response.ok) throw new Error(data.answer || FAILURE_MESSAGE);

      setConversationId(data.conversationId ?? "");
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: sanitizeResponse(data.answer || "已收到请求，但暂时没有可展示的回答。"),
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { id: createId(), role: "assistant", content: FAILURE_MESSAGE },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function resetChat() {
    setConversationId("");
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "会话已清空。你可以重新开始咨询校园导航、成长规划或学生事务。",
      },
    ]);
  }

  return (
    <AppShell>
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-5 px-4 py-6 sm:px-6 xl:grid-cols-[360px_1fr]">
        <aside className="space-y-4">
          <section className="rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-xl backdrop-blur-2xl">
            <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-blue-600 text-white">
              <Bot className="size-6" />
            </div>
            <p className="text-sm font-black text-blue-600">AI Assistant</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">校园公益服务助手</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              参考 Claude / Kimi 式工作台体验，保留 Dify conversationId 上下文记忆，适合比赛现场连续演示。
            </p>
          </section>

          {promptGroups.map((group) => (
            <section
              key={group.title}
              className="rounded-[24px] border border-white/70 bg-white/78 p-5 shadow-xl backdrop-blur-2xl"
            >
              <h2 className="text-sm font-black text-slate-950">{group.title}</h2>
              <div className="mt-3 grid gap-2">
                {group.items.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => void sendMessage(item)}
                    className="rounded-2xl border border-blue-100 bg-blue-50/55 px-4 py-3 text-left text-sm font-bold text-slate-700 transition-all duration-300 hover:scale-[1.02] hover:border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white active:scale-95"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </aside>

        <section className="flex min-h-[760px] flex-col overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-xl backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-4 border-b border-blue-100/80 px-5 py-4">
            <div>
              <p className="text-xs font-black text-blue-600">YangGong AI Campus</p>
              <h2 className="text-xl font-black text-slate-950">连续对话工作区</h2>
            </div>
            <button
              type="button"
              onClick={resetChat}
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black text-slate-600 transition hover:bg-blue-50"
            >
              <RotateCcw className="size-4" />
              清空会话
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto bg-gradient-to-b from-blue-50/35 to-white px-5 py-5">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.role === "user" ? 32 : -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className={cn("flex gap-3", message.role === "user" && "justify-end")}
              >
                {message.role === "assistant" && (
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-glow">
                    <Bot className="size-5" />
                  </span>
                )}
                <div
                  className={cn(
                    "max-w-[82%] whitespace-pre-wrap rounded-[22px] px-5 py-4 text-sm leading-7 shadow-sm",
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "border border-blue-100 bg-white/86 text-slate-700",
                  )}
                >
                  {message.role === "assistant" ? (
                    <MarkdownResponse text={message.content} />
                  ) : (
                    message.content
                  )}
                </div>
                {message.role === "user" && (
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700">
                    <UserRound className="size-5" />
                  </span>
                )}
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 rounded-2xl bg-white/76 px-4 py-3 text-sm font-semibold text-slate-500 shadow-sm"
              >
                <span className="grid size-8 place-items-center rounded-full bg-blue-600 text-white">
                  <Bot className="size-4" />
                </span>
                <span>扬工智行正在检索校园知识库...</span>
                <span className="flex gap-1">
                  <span className="typing-dot size-1.5 rounded-full bg-blue-600" />
                  <span className="typing-dot size-1.5 rounded-full bg-blue-600" />
                  <span className="typing-dot size-1.5 rounded-full bg-blue-600" />
                </span>
              </motion.div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-blue-100 bg-white/86 p-4">
            <div className="flex items-end gap-3 rounded-[30px] border border-blue-100 bg-blue-50/45 p-2 shadow-inner">
              <button
                type="button"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-slate-500 shadow-sm transition hover:scale-105"
                aria-label="语音输入"
              >
                <Mic className="size-5" />
              </button>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={1}
                placeholder="输入校园服务问题，或点击左侧快捷问题..."
                className="min-h-12 flex-1 resize-none rounded-[24px] bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400 transition focus:bg-white/80 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)]"
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
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["校园导航", "成长规划", "学生事务", "心理关怀"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => void sendMessage(item)}
                  className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700 transition hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white active:scale-95"
                >
                  <Sparkles className="size-3" />
                  {item}
                </button>
              ))}
            </div>
          </form>
        </section>
      </div>
    </AppShell>
  );
}
