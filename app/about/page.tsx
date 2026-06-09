"use client";

import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Bot, Cloud, Database, Layers3, MapPinned, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";

const techStack = ["Next.js", "TypeScript", "TailwindCSS", "Dify", "高德地图", "百度地图", "阿里云ECS"];
const innovations = [
  ["AI智能问答", "基于Dify Chatflow和校园知识库，支持连续对话与多意图校园咨询。"],
  ["校园地图联动", "Dify回答中的mapId驱动校园PNG热点高亮，并提供高德与百度地图外部辅助导航。"],
  ["成长规划推荐", "面向全校专业，结合年级、目标和兴趣方向生成学习路线。"],
  ["成长关怀服务", "将机会发现、学习资源、心理关怀、学生事务与基础校园服务整合为统一入口。"],
];

const valueStats = [
  ["服务模块", 8, "+"],
  ["知识库文档", 120, "+"],
  ["热点定位", 22, "+"],
  ["满意度", 98, "%"],
];

export default function AboutPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-5 py-6">
        <section className="premium-card overflow-hidden p-8">
          <p className="text-sm font-black text-blue-600">Competition Showcase</p>
          <h1 className="mt-2 text-5xl font-black tracking-normal text-slate-950">扬工智行</h1>
          <p className="mt-2 text-xl font-black text-blue-700">YangGong AI Campus</p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            扬工智行是一套面向扬州工业职业技术学院学生的大学生成长机会与关怀服务平台，围绕成长规划、机会发现、学习资源、成长关怀和校园基础服务构建智慧校园体验。
          </p>
          <div className="mt-6 inline-flex rounded-2xl border border-blue-100 bg-white/80 px-5 py-3 text-sm font-black text-slate-800 shadow-sm">
            校训：厚德强能 · 笃学创新
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_420px]">
          <div className="premium-card p-6">
            <p className="text-sm font-black text-blue-600">项目背景</p>
            <h2 className="mt-1 text-3xl font-black text-slate-950">从单点问答到成长机会与关怀平台</h2>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              传统校园信息入口分散，学生规划成长、发现机会、获取学习资源和寻求关怀支持往往需要跨多个渠道。扬工智行通过AI智能体与校园知识库整合信息，让学生用自然语言完成规划、解读、查询、定位和支持获取。
            </p>
          </div>
          <div className="rounded-[28px] border border-white/70 bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-xl">
            <Sparkles className="size-9" />
            <h2 className="mt-4 text-3xl font-black">项目价值</h2>
            <p className="mt-4 text-sm leading-8 text-white/85">
              帮助学生发现成长机会、规划阶段目标、获取学习资源并获得安全心理关怀，同时保留校园导航与事务办理等基础服务能力。
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {valueStats.map(([label, value, suffix]) => (
                <div key={label} className="rounded-2xl bg-white/16 p-3 backdrop-blur-xl">
                  <p className="text-2xl font-black">
                    <CountUp value={Number(value)} />
                    {suffix}
                  </p>
                  <p className="mt-1 text-xs font-bold text-white/75">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="premium-card mt-6 p-6">
          <p className="text-sm font-black text-blue-600">Architecture</p>
          <h2 className="mt-1 text-3xl font-black text-slate-950">项目架构图</h2>
          <div className="mt-6 rounded-[28px] border border-blue-100 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-5 text-white shadow-2xl">
            <div className="grid gap-3 md:grid-cols-5">
              {["Next.js 前端", "API Route", "Dify Chatflow", "校园知识库", "地图与ECS"].map((node, index) => (
                <div key={node} className="relative rounded-[22px] border border-white/15 bg-white/12 p-4 text-center backdrop-blur-xl">
                  <p className="text-xs font-bold text-cyan-200">Layer {index + 1}</p>
                  <p className="mt-2 text-sm font-black">{node}</p>
                  {index < 4 && (
                    <span className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 rounded-full bg-cyan-300 text-center text-sm font-black leading-6 text-blue-950 md:block">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <ArchCard icon={Layers3} title="Next.js前端" desc="Dashboard、地图、AI成长导师与多业务页面" />
            <ArchCard icon={Bot} title="Dify Chatflow" desc="意图分类、知识库问答、连续对话" />
            <ArchCard icon={Database} title="校园数据" desc="热点坐标、服务模块、专业资源" />
            <ArchCard icon={MapPinned} title="地图能力" desc="PNG主地图、mapId高亮、高德与百度地图跳转" />
            <ArchCard icon={Cloud} title="部署支撑" desc="GitHub协作、阿里云ECS演示部署" />
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[360px_1fr]">
          <div className="premium-card p-6">
            <p className="text-sm font-black text-blue-600">Tech Stack</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">技术栈展示</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {techStack.map((item) => (
                <span key={item} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white hover:shadow-xl">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {innovations.map(([title, desc], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
                className="premium-card p-5 transition-all duration-300 hover:scale-[1.02]"
              >
                <p className="text-xl font-black text-slate-950">{title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <div className="mt-6">
          <InlineAgent
            title="项目答辩智能体"
            description="咨询项目定位、技术架构、Dify接入和比赛展示亮点。"
            placeholder="例如：这个项目的核心创新点是什么？"
            suggested={["项目核心亮点", "技术栈介绍", "Dify如何接入", "比赛答辩怎么讲"]}
          />
        </div>
        <section className="mt-6 rounded-[32px] bg-gradient-to-r from-slate-950 via-blue-950 to-blue-700 p-8 text-center text-white shadow-2xl">
          <p className="text-sm font-black text-cyan-200">Project Slogan</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal">
            让校园信息从“能查询”升级为“能理解、能发现、能陪伴”。
          </h2>
        </section>
      </div>
    </AppShell>
  );
}

function ArchCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <article className="group relative rounded-[24px] border border-blue-100 bg-blue-50/45 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-600 text-white">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-4 font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-600">{desc}</p>
      <div className="pointer-events-none absolute -top-3 left-1/2 z-20 w-44 -translate-x-1/2 -translate-y-full rounded-2xl bg-slate-950 px-3 py-2 text-xs font-bold leading-5 text-white opacity-0 shadow-xl transition-all duration-300 group-hover:-translate-y-[calc(100%+6px)] group-hover:opacity-100">
        {desc}
      </div>
    </article>
  );
}

function CountUp({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const total = 28;
    const timer = window.setInterval(() => {
      frame += 1;
      setCount(Math.round((value * frame) / total));
      if (frame >= total) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, [value]);

  return count;
}
