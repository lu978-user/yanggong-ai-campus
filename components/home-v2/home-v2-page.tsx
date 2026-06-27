"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, Compass, Sparkles } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { coreServices, supportServices } from "@/components/home-v2/home-v2-data";
import { defaultOpportunities, getOpportunities, type Opportunity } from "@/data/opportunities";

function isSameDay(value: string | undefined, date = new Date()) {
  if (!value) return false;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return false;
  return parsed.toDateString() === date.toDateString();
}

function daysUntilDeadline(deadline: string) {
  const text = deadline.trim();
  if (!text || text.includes("长期")) return Number.POSITIVE_INFINITY;
  if (text.includes("本周")) return 7;
  if (text.includes("本月")) return 20;

  const remaining = text.match(/还剩\s*(\d+)\s*天/);
  if (remaining) return Number(remaining[1]);

  const monthDay = text.match(/(\d{1,2})月(\d{1,2})日/);
  if (!monthDay) return Number.POSITIVE_INFINITY;

  const now = new Date();
  const deadlineDate = new Date(now.getFullYear(), Number(monthDay[1]) - 1, Number(monthDay[2]), 23, 59, 59);
  return Math.ceil((deadlineDate.getTime() - now.getTime()) / 86_400_000);
}

function isDeadlineSoon(deadline: string) {
  const days = daysUntilDeadline(deadline);
  return days >= 0 && days <= 7;
}

function HomeV2Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-0 overflow-x-hidden px-4 py-4 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-[1500px] space-y-8">{children}</main>
    </div>
  );
}

export function HomeV2Page() {
  return (
    <HomeV2Shell>
      <HeroV2 />
      <CoreServicesSection />
      <OpportunityEngineSection />
      <SupportServicesSection />
      <FoundationSection />
    </HomeV2Shell>
  );
}

function HeroV2() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/72 sm:p-8 xl:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 size-72 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="relative z-10 grid min-h-[560px] items-center gap-8 xl:grid-cols-[minmax(0,1.02fr)_minmax(380px,0.82fr)]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">
            YPI · AI Campus Service Platform
          </p>
          <h1 className="mt-6 text-[clamp(3.3rem,8vw,8rem)] font-black leading-[0.96] tracking-[-0.05em] text-slate-950 dark:text-slate-50">
            扬工智行
            <br />
            <span className="text-blue-700">AI 校园公益服务平台</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            面向扬州工业职业技术学院学生，整合校园导航、成长机会、AI 成长规划、学习支持与安全关怀，让校园服务更清晰，让成长机会被看见。
          </p>
          <p className="mt-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 dark:border-blue-400/30 dark:bg-blue-950/40">
            让每一位学生不错过成长机会
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/opportunities"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-[0_16px_40px_rgba(37,99,235,0.22)] transition hover:-translate-y-1 hover:bg-blue-700 active:scale-95"
            >
              进入成长机会中心
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/growth"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-900 transition hover:-translate-y-1 hover:border-blue-200 hover:text-blue-700 active:scale-95 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              开始 AI 成长规划
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/chat" className="text-sm font-black text-slate-500 transition hover:text-blue-700">
              AI 成长导师
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/map" className="text-sm font-black text-slate-500 transition hover:text-blue-700">
              校园地图
            </Link>
          </div>
        </motion.div>

        <HeroServicePanel />
      </div>
    </section>
  );
}

function HeroServicePanel() {
  const previewItems = [
    { label: "成长机会", value: "机会推荐", icon: Sparkles },
    { label: "校园服务", value: "地图 / 事务", icon: Compass },
    { label: "行动状态", value: "准备中", icon: Clock3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
      className="relative z-10 rounded-[28px] border border-slate-200/70 bg-slate-50/90 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-950/70 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Campus AI Panel</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-slate-100">今日校园成长提醒</h2>
        </div>
        <span className="grid size-12 place-items-center rounded-2xl bg-blue-600 text-sm font-black text-white">YPI</span>
      </div>

      <div className="mt-6 grid gap-3">
        {previewItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between rounded-[20px] border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-slate-950">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-black text-slate-950 dark:text-slate-100">{item.label}</span>
                  <span className="block text-xs font-bold text-slate-500">{item.value}</span>
                </span>
              </div>
              <CheckCircle2 className="size-5 text-cyan-500" />
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-[22px] bg-blue-600 p-5 text-white">
        <p className="text-sm font-black">推荐下一步</p>
        <p className="mt-2 text-2xl font-black leading-tight">查看本周成长机会，并收藏一个准备参与。</p>
        <Link href="/opportunities" className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-blue-700">
          去看看
        </Link>
      </div>
    </motion.div>
  );
}

function CoreServicesSection() {
  return (
    <section>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Core Services</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-950 dark:text-slate-100">核心服务入口</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-500">学生最常用的四个入口，直接进入，不绕路。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {coreServices.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.href}
              href={service.href}
              className="group flex min-h-[230px] flex-col rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)] active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900/72"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-slate-950">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-slate-100">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                {service.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function OpportunityEngineSection() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(defaultOpportunities);

  useEffect(() => {
    setOpportunities(getOpportunities());
  }, []);

  const stats = useMemo(
    () => [
      ["今日发现机会", opportunities.filter((item) => isSameDay(item.createdAt)).length],
      ["适合你的机会", opportunities.filter((item) => item.recommendLevel >= 4).length],
      ["即将截止", opportunities.filter((item) => isDeadlineSoon(item.deadline)).length],
      ["已完成成长任务", opportunities.filter((item) => item.followStatus === "已完成").length],
    ],
    [opportunities],
  );

  const featured = opportunities.filter((item) => item.recommendLevel >= 4).slice(0, 3);

  return (
    <section className="rounded-[32px] border border-slate-200/70 bg-white/76 p-6 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/72 sm:p-8">
      <div className="grid gap-8 xl:grid-cols-[0.82fr_1fr] xl:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">AI Opportunity Engine</p>
          <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950 dark:text-slate-100 sm:text-5xl">
            让机会被看见，让成长有路径
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            YPI 可以围绕学生专业、年级、目标和校园机会，帮助学生发现更适合自己的成长任务。
          </p>
          <div className="mt-7 grid grid-cols-2 gap-4">
            {stats.map(([label, value]) => (
              <div key={label} className="border-t border-slate-200 pt-4 dark:border-slate-700">
                <p className="text-4xl font-black tracking-[-0.04em] text-slate-950 dark:text-slate-100">
                  <CountUp value={Number(value)} />
                </p>
                <p className="mt-2 text-xs font-black text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {featured.map((item) => (
            <Link
              key={item.id}
              href="/opportunities"
              className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white active:scale-[0.98] dark:border-slate-700 dark:bg-slate-950/60"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-black text-slate-950 dark:text-slate-100">{item.title}</h3>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 dark:bg-blue-950/40">
                  {item.category}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
              <p className="mt-3 text-xs font-black text-slate-500">推荐指数：{"★".repeat(item.recommendLevel)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportServicesSection() {
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Campus Care</p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-950 dark:text-slate-100">校园公益服务能力</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {supportServices.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.href}
              href={service.href}
              className="group rounded-[24px] border border-slate-200/70 bg-white/66 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900/60"
            >
              <Icon className="size-6 text-blue-700" />
              <h3 className="mt-4 font-black text-slate-950 dark:text-slate-100">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{service.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function FoundationSection() {
  return (
    <section className="rounded-[28px] border border-slate-200/70 bg-slate-950 p-6 text-white shadow-sm dark:border-slate-700 sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">YPI Foundation</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">根植扬工，服务学生成长</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-white/72">
        扬工智行以扬州工业职业技术学院学生真实校园需求为出发点，把校园服务、成长机会与 AI 能力连接起来，让学生在学习、生活、实践和未来规划中获得更清晰的支持。
      </p>
      <p className="mt-5 text-sm font-black text-white/86">
        从校园服务到成长支持，YPI 关注的是每一位学生的下一步。
      </p>
    </section>
  );
}
