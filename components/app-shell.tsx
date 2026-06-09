"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    title: "主平台",
    items: [
      { href: "/", label: "首页", icon: "🏠" },
      { href: "/map", label: "校园导航", icon: "📍" },
      { href: "/chat", label: "AI成长导师", icon: "🤖" },
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
      { href: "/opportunities", label: "成长机会", icon: "📢" },
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
  { href: "/opportunities#my-opportunities", label: "我的机会", icon: "⭐" },
  { href: "/opportunity-admin", label: "机会管理", icon: "🛠" },
  { href: "/chat", label: "我的收藏", icon: "📌" },
  { href: "/chat", label: "历史对话", icon: "🕒" },
];

const mobileItems = [
  { href: "/", label: "首页", icon: "🏠" },
  { href: "/map", label: "导航", icon: "📍" },
  { href: "/chat", label: "AI", icon: "🤖" },
  { href: "/opportunities", label: "机会", icon: "📢" },
  { href: "/care", label: "关怀", icon: "💗" },
];

type ThemeMode = "light" | "dark";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    主平台: true,
    学习成长: true,
    校园服务: true,
    公益关怀: true,
  });

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const initialTheme: ThemeMode = savedTheme === "dark" ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  function toggleTheme() {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      window.localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-page text-foreground transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] overflow-y-auto border-r border-white/70 bg-white/72 px-4 py-5 shadow-card-light backdrop-blur-2xl transition-colors duration-300 dark:border-slate-700/60 dark:bg-slate-950/90 lg:block">
        <SidebarContent
          isActive={isActive}
          openGroups={openGroups}
          setOpenGroups={setOpenGroups}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </aside>

      <header className="sticky top-0 z-30 border-b border-blue-100/80 bg-white/90 px-4 py-3 backdrop-blur-xl transition-colors duration-300 dark:border-slate-700/70 dark:bg-slate-950/90 lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-blue-100 bg-white">
              <Image src="/logo.png" alt="扬工智行" fill className="object-contain p-1" />
            </span>
            <span>
              <span className="block text-sm font-black text-slate-950 dark:text-slate-100">扬工智行</span>
              <span className="block text-[10px] font-bold text-blue-600">成长机会与关怀</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-blue-100 bg-white text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            aria-label="打开菜单"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-label="关闭菜单背景"
          />
          <aside className="absolute inset-y-0 left-0 w-[86vw] max-w-[330px] overflow-y-auto border-r border-white/70 bg-white/92 px-4 py-5 shadow-2xl backdrop-blur-2xl transition-colors duration-300 dark:border-slate-700/70 dark:bg-slate-950/95">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="grid size-9 place-items-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100"
                aria-label="关闭菜单"
              >
                <X className="size-4" />
              </button>
            </div>
            <SidebarContent
              isActive={isActive}
              openGroups={openGroups}
              setOpenGroups={setOpenGroups}
              theme={theme}
              onToggleTheme={toggleTheme}
              onNavigate={() => setDrawerOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="pb-20 lg:pb-0 lg:pl-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-blue-100/80 bg-white/92 px-2 py-2 backdrop-blur-xl transition-colors duration-300 dark:border-slate-700/70 dark:bg-slate-950/92 lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {mobileItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center rounded-2xl px-2 py-1.5 text-[11px] font-black text-slate-500 transition-all duration-300 hover:-translate-y-0.5 dark:text-slate-300",
                isActive(item.href) && "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow",
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}

function SidebarContent({
  isActive,
  openGroups,
  setOpenGroups,
  theme,
  onToggleTheme,
  onNavigate,
}: {
  isActive: (href: string) => boolean;
  openGroups: Record<string, boolean>;
  setOpenGroups: Dispatch<SetStateAction<Record<string, boolean>>>;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex min-h-full flex-col gap-5">
      <Link href="/" onClick={onNavigate} className="flex items-center gap-3">
        <span className="relative grid size-12 place-items-center overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <Image src="/logo.png" alt="扬工智行" fill className="object-contain p-1.5" />
        </span>
        <span className="min-w-0">
          <span className="block whitespace-normal break-words text-lg font-black text-slate-950 dark:text-slate-100">扬工智行</span>
          <span className="block truncate text-xs font-semibold text-blue-600">
            成长机会与关怀平台
          </span>
        </span>
      </Link>

      <nav className="space-y-3">
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
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-black text-slate-400 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-blue-300"
              >
                {group.title}
                <ChevronDown className={cn("size-4 transition", open && "rotate-180 text-blue-500")} />
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-300 ease-out",
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0 space-y-1.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition-all duration-300 hover:translate-x-1 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-300",
                        isActive(item.href) &&
                          "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow hover:text-white",
                      )}
                    >
                      <span className="w-5 text-center transition-transform duration-300 group-hover:scale-110">
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        <div className="border-t border-blue-100 pt-3 dark:border-slate-700">
          {utilityItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition-all duration-300 hover:translate-x-1 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-300"
            >
              <span className="w-5 text-center transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="mt-auto min-h-fit rounded-2xl border border-blue-100 bg-blue-50/80 p-4 pb-4 transition-colors duration-300 dark:border-slate-700/70 dark:bg-slate-900/80">
        <p className="whitespace-normal break-words text-sm font-black text-blue-800 dark:text-blue-300">YangGong AI Campus</p>
        <p className="mt-2 whitespace-normal break-words text-xs leading-6 text-slate-600 dark:text-slate-300">
          大学生成长机会与关怀服务平台，陪伴学生发现机会、规划成长、获取支持。
        </p>
        <button
          type="button"
          onClick={onToggleTheme}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white/70 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          <span>{theme === "dark" ? "☀️" : "🌙"}</span>
          {theme === "dark" ? "浅色模式" : "深色模式"}
        </button>
      </div>
    </div>
  );
}
