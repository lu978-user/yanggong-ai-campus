"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";

const topics = [
  ["学习压力", "把任务拆成今天能完成的一小步，先恢复节奏，再逐步提高完成度。"],
  ["考试焦虑", "使用复习清单和模拟时间表降低不确定感，给自己留下休息时间。"],
  ["情绪管理", "通过呼吸、书写、散步和倾诉整理情绪，持续困扰时寻求专业支持。"],
  ["人际关系", "先澄清事实和感受，再选择合适时间沟通，必要时联系辅导员。"],
];

export default function CarePage() {
  const [active, setActive] = useState(topics[0]);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 py-6">
        <section className="rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-card-light backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">心理关怀</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">情绪调节小贴士</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            面向学习压力、考试焦虑、情绪管理和人际关系提供温和建议，不替代专业心理咨询。
          </p>
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-[360px_1fr]">
          <div className="grid gap-3">
            {topics.map((topic) => (
              <button
                key={topic[0]}
                type="button"
                onClick={() => setActive(topic)}
                className="rounded-[20px] border border-white/70 bg-white/82 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-card-light"
              >
                <span className="text-2xl">💗</span>
                <span className="ml-3 font-black text-slate-950">{topic[0]}</span>
              </button>
            ))}
          </div>
          <section className="rounded-[24px] border border-white/70 bg-white/82 p-6 shadow-card-light backdrop-blur-2xl">
            <h2 className="text-3xl font-black text-slate-950">{active[0]}</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">{active[1]}</p>
            <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-sm leading-7 text-slate-600">
              如出现持续痛苦、明显危机或无法保证安全，请立即联系辅导员、学校心理健康教育中心、家人或当地紧急救助渠道。
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
