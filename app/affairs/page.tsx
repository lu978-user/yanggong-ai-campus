import { AppShell } from "@/components/app-shell";

const affairs = [
  ["学生证补办", "材料清单、办理地点、注意事项。", "🪪"],
  ["证明材料", "在读证明、成绩证明、申请流程。", "📄"],
  ["奖助事务", "奖学金、助学金、困难认定指引。", "⭐"],
  ["请假流程", "申请步骤、审批路径、材料提醒。", "📋"],
];

export default function AffairsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 py-6">
        <section className="rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-card-light backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">学生事务</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">学生事务办理指引</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            将常见学生事务整理为流程化指引，帮助学生少跑腿、少迷路。
          </p>
        </section>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {affairs.map(([title, desc, icon]) => (
            <article
              key={title}
              className="rounded-[24px] border border-white/70 bg-white/82 p-6 shadow-card-light backdrop-blur-2xl"
            >
              <div className="text-3xl">{icon}</div>
              <h2 className="mt-4 text-2xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
