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
  links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    title: "🏫 校内资源",
    links: [
      { label: "扬州工业职业技术学院", href: "https://www.ypi.edu.cn", external: true },
      { label: "教务处", href: "https://www.ypi.edu.cn", external: true },
      { label: "图书馆", href: "https://www.ypi.edu.cn", external: true },
      { label: "信息化建设中心", href: "https://www.ypi.edu.cn", external: true },
    ],
  },
  {
    title: "📚 学习成长",
    links: [
      { label: "中国大学MOOC", href: "https://www.icourse163.org", external: true },
      { label: "智慧职教", href: "https://www.icve.com.cn", external: true },
      { label: "国家智慧教育平台", href: "https://www.smartedu.cn", external: true },
      { label: "学习强国", href: "https://www.xuexi.cn", external: true },
    ],
  },
  {
    title: "💼 就业创业",
    links: [
      { label: "江苏24365大学生就业平台", href: "https://www.91job.org.cn", external: true },
      { label: "国家大学生就业服务平台", href: "https://www.ncss.cn", external: true },
    ],
  },
  {
    title: "🤖 AI学习工具",
    links: [
      { label: "DeepSeek", href: "https://www.deepseek.com", external: true },
      { label: "通义千问", href: "https://tongyi.aliyun.com", external: true },
    ],
  },
  {
    title: "✨ 平台能力",
    links: [
      { label: "成长机会中心", href: "/opportunities" },
      { label: "AI成长导师", href: "/chat" },
      { label: "校园地图导览", href: "/map" },
      { label: "心理关怀服务", href: "/care" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pb-10">
      <section className="mx-auto max-w-[1800px] overflow-hidden rounded-[32px] border border-white/70 bg-white/72 p-6 shadow-card-light backdrop-blur-2xl transition-colors duration-300 dark:border-slate-700/70 dark:bg-slate-900/70 sm:p-8">
        <div className="mb-8 grid gap-5 rounded-[28px] border border-blue-100 bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-6 text-white shadow-glow md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-black text-white/75">Growth Opportunity CTA</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal sm:text-4xl">
              每一个机会，都可能改变未来。
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/82">
              扬工智行帮助你发现属于自己的成长道路，从校园活动、竞赛实践到就业升学，让AI陪伴你的每一步成长。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-xl transition hover:-translate-y-0.5 active:scale-95"
            >
              进入成长机会中心
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/growth"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/14 px-5 py-3 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/22 active:scale-95"
            >
              开始成长规划
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <p className="text-sm font-black text-blue-600">友情链接</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {footerGroups.map((group) => (
            <div key={group.title} className="rounded-[24px] border border-blue-100/70 bg-white/58 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl dark:border-slate-700/70 dark:bg-slate-950/35">
              <h3 className="text-base font-black text-slate-950 dark:text-slate-100">{group.title}</h3>
              <div className="mt-4 grid gap-2">
                {group.links.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-slate-500 transition hover:translate-x-1 hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm font-bold text-slate-500 transition hover:translate-x-1 hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-300"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-blue-100 pt-5 text-sm font-bold text-slate-500 dark:border-slate-700 dark:text-slate-300 md:flex-row md:items-center md:justify-between">
          <span>© 2026 YPI · 扬工智行</span>
          <span>让每一位学生不错过成长机会</span>
          <span>技术支持：Dify · Next.js · 阿里云 ECS</span>
        </div>
      </section>
    </footer>
  );
}
