import { AppShell } from "@/components/app-shell";

const life = [
  ["食堂信息", "就餐时间、窗口推荐、错峰建议。", "🍜"],
  ["宿舍服务", "住宿区域、返寝路线、生活提醒。", "🏠"],
  ["校园活动", "社团活动、公益活动、学生活动中心。", "🎭"],
  ["生活指引", "校园卡、快递、维修和日常事务。", "🧭"],
];

export default function LifePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 py-6">
        <section className="rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-card-light backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">校园生活</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">校园生活服务</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            围绕吃、住、活动和生活服务构建校园日常支持入口。
          </p>
        </section>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {life.map(([title, desc, icon]) => (
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
