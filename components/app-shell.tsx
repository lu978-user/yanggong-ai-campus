"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    title: "主平台",
    items: [
      { href: "/", label: "首页", icon: "🏠" },
      { href: "/map", label: "校园导航", icon: "📍" },
      { href: "/chat", label: "AI助手", icon: "🤖" },
    ],
  },
  {
    title: "学习成长",
    items: [
      { href: "/growth", label: "成长规划", icon: "🎓" },
      { href: "/resources", label: "学习资源", icon: "📚" },
    ],
  },
  {
    title: "校园服务",
    items: [
      { href: "/life", label: "校园生活", icon: "🍜" },
      { href: "/affairs", label: "学生事务", icon: "📋" },
    ],
  },
  {
    title: "公益关怀",
    items: [
      { href: "/safety", label: "安全教育", icon: "🛡" },
      { href: "/care", label: "心理关怀", icon: "💗" },
      { href: "/about", label: "关于我们", icon: "ℹ" },
    ],
  },
];

const utilityItems = [
  { href: "/chat", label: "我的收藏", icon: "⭐" },
  { href: "/chat", label: "历史对话", icon: "🕒" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    主平台: true,
    学习成长: true,
    校园服务: true,
    公益关怀: true,
  });

  return (
    <main className="min-h-screen bg-page text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] border-r border-white/70 bg-white/72 px-4 py-5 shadow-card-light backdrop-blur-2xl lg:block">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative grid size-12 place-items-center overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
            <Image src="/logo.png" alt="扬工智行" fill className="object-contain p-1.5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-black text-slate-950">扬工智行</span>
            <span className="block truncate text-xs font-semibold text-blue-600">
              AI校园公益服务助手
            </span>
          </span>
        </Link>

        <nav className="mt-6 space-y-3">
          {navGroups.map((group) => {
            const open = openGroups[group.title];
            return (
              <div key={group.title}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenGroups((current) => ({
                      ...current,
                      [group.title]: !current[group.title],
                    }))
                  }
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-black text-slate-400 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {group.title}
                  <ChevronDown
                    className={cn("size-4 transition", open && "rotate-180 text-blue-500")}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-300",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="min-h-0 space-y-1.5">
                    {group.items.map((item) => {
                      const active =
                        item.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:translate-x-0.5 hover:bg-blue-50 hover:text-blue-700",
                            active &&
                              "bg-blue-600 text-white shadow-glow hover:bg-blue-600 hover:text-white",
                          )}
                        >
                          <span className="w-5 text-center">{item.icon}</span>
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="border-t border-blue-100 pt-3">
            {utilityItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
              >
                <span className="w-5 text-center">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-5 left-4 right-4">
          <button
            type="button"
            className="mb-3 flex w-full items-center gap-3 rounded-xl border border-blue-100 bg-white/70 px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-blue-50"
          >
            <span>🌙</span>
            深色模式
          </button>
          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
            <p className="text-sm font-black text-blue-800">YangGong AI Campus</p>
            <p className="mt-2 text-xs leading-6 text-slate-600">
              五位一体的智慧校园公益服务平台。
            </p>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-blue-100/80 bg-white/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-blue-100 bg-white">
              <Image src="/logo.png" alt="扬工智行" fill className="object-contain p-1" />
            </span>
            <span className="font-black">扬工智行</span>
          </Link>
          <Link
            href="/chat"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            AI助手
          </Link>
        </div>
      </header>

      <div className="lg:pl-[240px]">{children}</div>
    </main>
  );
}
