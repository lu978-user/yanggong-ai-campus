import { AppShell } from "@/components/app-shell";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="mx-auto grid min-h-screen max-w-5xl place-items-center px-4 py-10">
        <section className="w-full rounded-3xl border border-blue-100 bg-white/85 p-8 shadow-card-light">
          <p className="text-sm font-bold text-blue-600">关于项目</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">扬工智行</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            扬工智行是面向高校AI智能体比赛的校园公益服务平台。第一版聚焦首页、地图导览、Dify接口和基础聊天能力，后续继续补充完整项目介绍与展示材料。
          </p>
        </section>
      </div>
    </AppShell>
  );
}
