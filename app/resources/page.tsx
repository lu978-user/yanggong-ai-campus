import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";

const resources = [
  ["图书馆资源", "图书借阅、电子资源、学习空间查询。", "📚"],
  ["课程学习", "公共课、专业课、复习资料和学习方法。", "📝"],
  ["竞赛资料", "蓝桥杯、计算机设计大赛、挑战杯备赛指引。", "🏆"],
  ["证书规划", "技能证书、等级考试、职业资格信息整理。", "📜"],
];

export default function ResourcesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 py-6">
        <section className="rounded-[34px] border border-white/70 bg-white/72 p-8 shadow-card-light backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">学习资源</p>
          <h1 className="mt-2 text-5xl font-black tracking-normal text-slate-950">
            校园学习资源中心
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            聚合图书馆、课程学习、竞赛资料和证书规划入口，后续可接入知识库做个性化推荐。
          </p>
        </section>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {resources.map(([title, desc, icon]) => (
            <article
              key={title}
              className="group rounded-[28px] border border-white/70 bg-white/76 p-7 shadow-card-light backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="text-4xl">{icon}</div>
              <h2 className="mt-5 text-2xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <InlineAgent
            title="学习资源智能体"
            description="询问图书馆、课程学习、竞赛资料和证书规划。"
            placeholder="例如：计算机应用技术专业大一适合准备什么证书？"
            suggested={["图书馆开放时间", "蓝桥杯怎么准备", "专升本学习计划", "推荐计算机证书"]}
          />
        </div>
      </div>
    </AppShell>
  );
}
