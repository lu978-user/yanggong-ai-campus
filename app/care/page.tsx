"use client";

import { useState } from "react";
import { HeartHandshake, PhoneCall, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";

const tests = [
  ["压力测试", "了解近期学习、生活和人际压力水平。"],
  ["焦虑测试", "识别考试、未来规划和社交焦虑信号。"],
  ["情绪测试", "记录情绪波动，寻找可调节的触发因素。"],
  ["睡眠测试", "关注作息质量、入睡困难和疲惫感。"],
];

const topics = [
  ["学习压力", "把任务拆成今天能完成的一小步，先恢复节奏，再逐步提高完成度。"],
  ["考试焦虑", "使用复习清单和模拟时间表降低不确定感，给自己留下休息时间。"],
  ["情绪管理", "通过呼吸、书写、散步和倾诉整理情绪，持续困扰时寻求专业支持。"],
  ["人际关系", "先澄清事实和感受，再选择合适时间沟通，必要时联系辅导员。"],
];

const knowledge = ["情绪急救包", "睡眠改善指南", "考试周稳定计划", "人际沟通模板", "自我接纳练习"];

export default function CarePage() {
  const [active, setActive] = useState(topics[0]);
  const [testing, setTesting] = useState<string | null>(null);

  function startTest(title: string) {
    setTesting(title);
    window.setTimeout(() => setTesting(null), 900);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-5 py-6">
        <section className="relative overflow-hidden rounded-[34px] border border-white/70 bg-gradient-to-br from-pink-50 via-white to-violet-50 p-8 shadow-xl backdrop-blur-2xl">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-pink-300/25 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-black text-pink-600">Public Care</p>
            <h1 className="mt-2 text-5xl font-black tracking-normal text-slate-950">心理关怀公益中心</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              面向学习压力、考试焦虑、情绪管理、人际关系和睡眠困扰，提供温和、非评判的公益支持引导，不替代专业心理咨询。
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-3 text-sm font-black text-white shadow-xl transition hover:scale-[1.02] active:scale-95">
              <PhoneCall className="size-4" />
              紧急求助
            </button>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          {tests.map(([title, desc]) => (
            <button
              key={title}
              type="button"
              onClick={() => startTest(title)}
              className="relative overflow-hidden rounded-[24px] border border-white/70 bg-white/82 p-5 text-left shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-pink-50 hover:to-violet-50 hover:shadow-2xl"
            >
              <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-pink-50 text-2xl">
                💗
              </div>
              <h2 className="font-black text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              {testing === title && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-violet-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              )}
            </button>
          ))}
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-[360px_1fr]">
          <div className="grid gap-3">
            {topics.map((topic) => (
              <button
                key={topic[0]}
                type="button"
                onClick={() => setActive(topic)}
                className={`rounded-[22px] border p-5 text-left shadow-sm transition-all duration-300 hover:scale-[1.02] ${
                  active[0] === topic[0]
                    ? "border-pink-200 bg-pink-50 text-pink-700"
                    : "border-white/70 bg-white/82 text-slate-700"
                }`}
              >
                <span className="text-2xl">💗</span>
                <span className="ml-3 font-black">{topic[0]}</span>
              </button>
            ))}
          </div>

          <section className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-xl backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 text-white">
                <HeartHandshake className="size-6" />
              </span>
              <div>
                <p className="text-sm font-black text-pink-600">情绪调节建议</p>
                <h2 className="text-3xl font-black text-slate-950">{active[0]}</h2>
              </div>
            </div>
            <p className="mt-5 text-base leading-8 text-slate-600">{active[1]}</p>
            <div className="animate-breathe-soft mt-6 rounded-2xl bg-pink-50 p-5 text-sm leading-7 text-slate-600">
              如果出现持续痛苦、明显危机或无法保证安全，请立即联系辅导员、学校心理健康教育中心、家人或当地紧急救助渠道。
            </div>
          </section>
        </div>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-xl backdrop-blur-2xl">
            <p className="text-sm font-black text-pink-600">Knowledge Base</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">心理健康知识库</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {knowledge.map((item) => (
                <span key={item} className="rounded-full bg-violet-50 px-4 py-2 text-sm font-black text-violet-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-white/70 bg-gradient-to-br from-pink-500 to-violet-500 p-6 text-white shadow-xl">
            <Sparkles className="size-8" />
            <h2 className="mt-4 text-2xl font-black">校园心理咨询</h2>
            <p className="mt-3 text-sm leading-7 text-white/85">
              可通过辅导员、学院学生工作办公室或学校心理健康教育中心预约线下支持。
            </p>
          </div>
        </section>

        <div className="mt-6">
          <InlineAgent
            title="心理关怀智能体"
            description="获取压力调节、情绪管理和校园支持资源引导。"
            placeholder="例如：我最近学习压力很大，应该怎么调整？"
            suggested={["学习压力大怎么办", "考试焦虑怎么办", "如何管理情绪", "人际关系困扰怎么办"]}
          />
        </div>
      </div>
    </AppShell>
  );
}
