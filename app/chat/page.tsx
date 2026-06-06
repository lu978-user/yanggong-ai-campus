"use client";

import { FormEvent, useState } from "react";
import { Bot, Loader2, Send, UserRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const FAILURE_MESSAGE = "暂时无法连接智能体，请稍后再试。";

function createId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "你好，我是扬工智行。你可以咨询校园导航、校园生活、学习成长、校园文化、安全关怀和学生事务。",
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
        body: JSON.stringify({
          message: query,
          conversationId,
        }),
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
          content: data.answer || "已收到请求，但暂时没有可展示的回答。",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: FAILURE_MESSAGE,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <AppShell>
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5">
          <p className="text-sm font-bold text-blue-600">AI聊天</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">校园公益服务助手</h1>
        </div>

        <section className="flex min-h-[680px] flex-1 flex-col rounded-3xl border border-blue-100 bg-white shadow-card-light">
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3", message.role === "user" && "justify-end")}
              >
                {message.role === "assistant" && (
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                    <Bot className="size-4" />
                  </span>
                )}
                <div
                  className={cn(
                    "max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7",
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "border border-blue-100 bg-blue-50/70 text-slate-700",
                  )}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700">
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

          <form onSubmit={handleSubmit} className="flex items-end gap-3 border-t border-blue-100 p-4">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={1}
              placeholder="输入校园服务问题"
              className="min-h-11 flex-1 resize-none rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="发送"
              title="发送"
            >
              {loading ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
            </button>
          </form>
        </section>
      </div>
    </AppShell>
  );
}
