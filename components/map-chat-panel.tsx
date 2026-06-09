"use client";

import { FormEvent, useRef, useState } from "react";
import { Bot, Loader2, Send, Sparkles, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { type MapHotspotId } from "@/data/map-hotspots";
import { MarkdownResponse } from "@/components/markdown-response";
import { sanitizeResponse } from "@/lib/response-sanitizer";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type DifyResponse = {
  answer: string;
  conversationId: string;
  mapId: MapHotspotId | null;
  raw: unknown;
};

type MapChatPanelProps = {
  onMapId: (id: MapHotspotId) => void;
};

const recommendedPrompts = [
  "📍 文汇楼（图书馆）在哪",
  "📍 西门在哪",
  "📍 体育馆在哪",
  "📍 双镜湖在哪",
  "📍 文筑楼在哪",
];
const FAILURE_MESSAGE = "暂时无法连接智能体，请稍后再试。";

function createId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function cleanPrompt(prompt: string) {
  return prompt.replace(/^📍\s*/, "");
}

export function MapChatPanel({ onMapId }: MapChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "你好，我是扬工智行地图导览助手。你可以询问校园地点，我会调用Dify智能体并根据返回的地图ID自动高亮地图热点。",
    },
  ]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  async function sendMessage(text: string) {
    const query = cleanPrompt(text).trim();
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

      const data = (await response.json()) as DifyResponse;
      if (!response.ok) throw new Error(data.answer || FAILURE_MESSAGE);

      setConversationId(data.conversationId ?? "");
      if (data.mapId) onMapId(data.mapId);

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
        {
          id: createId(),
          role: "assistant",
          content: FAILURE_MESSAGE,
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      }, 0);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <aside className="flex min-h-[560px] min-w-0 flex-col rounded-[24px] border border-white/70 bg-white/76 shadow-card-light backdrop-blur-2xl xl:min-h-[760px]">
      <div className="border-b border-blue-100/80 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-glow">
            <Bot className="size-5" />
          </span>
          <div>
            <h2 className="font-black text-slate-950">AI地图导览</h2>
            <p className="text-xs text-slate-500">Dify Chatflow API · 地图ID联动</p>
          </div>
        </div>
      </div>

      <div className="border-b border-blue-100/80 px-5 py-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-500">
          <Sparkles className="size-4 text-blue-500" />
          推荐提问
        </div>
        <div className="flex flex-wrap gap-2">
          {recommendedPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void sendMessage(prompt)}
              className="rounded-full border border-blue-100 bg-blue-50/70 px-3 py-2 text-left text-xs font-bold text-blue-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:shadow-sm active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: message.role === "user" ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={cn("flex gap-3", message.role === "user" && "justify-end")}
          >
            {message.role === "assistant" && (
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                <Bot className="size-4" />
              </span>
            )}
            <div
              className={cn(
                "max-w-[84%] min-w-0 whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm",
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
          </motion.div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 rounded-2xl bg-blue-50/70 px-4 py-3 text-sm font-semibold text-slate-500">
            <Loader2 className="size-4 animate-spin" />
            扬工智行正在检索校园知识库...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-3 border-t border-blue-100/80 p-4">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={1}
          placeholder="输入地点问题，例如：文汇楼（图书馆）在哪"
          className="min-h-14 flex-1 resize-none rounded-[28px] border border-blue-100 bg-white/88 px-5 py-4 text-sm outline-none shadow-inner transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)]"
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
