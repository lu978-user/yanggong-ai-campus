"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterGroup = {
  title: string;
  icon: string;
  links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    title: "校内资源",
    icon: "🏫",
    links: [
      { label: "扬州工业职业技术学院", href: "https://www.ypi.edu.cn", external: true },
      { label: "教务处", href: "https://www.ypi.edu.cn", external: true },
      { label: "图书馆", href: "https://www.ypi.edu.cn", external: true },
      { label: "信息化建设中心", href: "https://www.ypi.edu.cn", external: true },
    ],
  },
  {
    title: "学习成长",
    icon: "📚",
    links: [
      { label: "中国大学MOOC", href: "https://www.icourse163.org", external: true },
      { label: "智慧职教", href: "https://www.icve.com.cn", external: true },
      { label: "国家智慧教育平台", href: "https://www.smartedu.cn", external: true },
      { label: "学习强国", href: "https://www.xuexi.cn", external: true },
    ],
  },
  {
    title: "就业创业",
    icon: "💼",
    links: [
      { label: "江苏24365大学生就业平台", href: "https://www.91job.org.cn", external: true },
      { label: "国家大学生就业服务平台", href: "https://www.ncss.cn", external: true },
    ],
  },
  {
    title: "AI 学习工具",
    icon: "🤖",
    links: [
      { label: "DeepSeek", href: "https://www.deepseek.com", external: true },
      { label: "通义千问", href: "https://tongyi.aliyun.com", external: true },
    ],
  },
  {
    title: "平台能力",
    icon: "✨",
    links: [
      { label: "成长机会中心", href: "/opportunities" },
      { label: "AI 成长导师", href: "/chat" },
      { label: "校园地图导览", href: "/map" },
      { label: "心理关怀服务", href: "/care" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10">
      <section className="mx-auto max-w-[1800px] rounded-[28px] border border-white/70 bg-white/68 p-5 shadow-sm backdrop-blur-2xl transition-colors duration-300 dark:border-slate-700/70 dark:bg-slate-900/70 sm:p-6">
        <div className="mb-6 flex flex-col gap-4 rounded-[24px] border border-blue-100/80 bg-blue-50/70 p-5 transition-colors duration-300 dark:border-blue-500/20 dark:bg-blue-950/20 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">YPI Growth Start</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">
              准备好开始了吗？
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              从一次成长检测开始，找到适合你的下一步。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/growth"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 active:scale-95"
            >
              开始成长检测
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-black text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-200 active:scale-95 dark:border-slate-700 dark:bg-slate-950 dark:text-blue-200"
            >
              进入成长机会中心
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-5">
            <p className="text-sm font-black text-blue-600">友情链接</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {footerGroups.map((group) => (
              <div
                key={group.title}
                className="group min-h-[170px] rounded-[24px] border border-[rgba(15,23,42,0.08)] bg-white/82 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)] dark:border-slate-700/70 dark:bg-slate-900/72 dark:hover:border-blue-400/30"
              >
                <h3 className="flex items-center gap-2 text-base font-black text-slate-950 dark:text-slate-100">
                  <span className="text-lg">{group.icon}</span>
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-col gap-2">
                  {group.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold leading-5 text-slate-500 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-sm font-bold leading-5 text-slate-500 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-300"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-blue-100 pt-4 text-xs font-bold text-slate-500 dark:border-slate-700 dark:text-slate-300 md:flex-row md:items-center md:justify-between">
          <span>© 2026 YPI · 扬工智行</span>
          <span>让每一位学生不错过成长机会</span>
          <span>技术支持：Dify · Next.js · 阿里云 ECS</span>
        </div>
      </section>
    </footer>
  );
}
