import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 py-6">
        <section className="rounded-[34px] border border-white/70 bg-white/72 p-8 shadow-card-light backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">关于我们</p>
          <h1 className="mt-2 text-5xl font-black tracking-normal text-slate-950">
            扬工智行
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            扬工智行（YangGong AI Campus）是面向高校AI智能体比赛的校园公益服务平台，围绕校园导航、学习成长、校园服务、安全教育和心理关怀构建五位一体的智慧校园服务体验。
          </p>
          <div className="mt-6 inline-flex rounded-2xl border border-blue-100 bg-white/80 px-5 py-3 text-sm font-black text-slate-800 shadow-sm">
            校训：厚德强能 · 笃学创新
          </div>
        </section>
        <div className="mt-6">
          <InlineAgent
            title="项目介绍智能体"
            description="询问项目定位、技术栈、Dify接入和比赛展示亮点。"
            placeholder="例如：这个项目的核心亮点是什么？"
            suggested={["项目核心亮点", "技术栈介绍", "Dify如何接入", "比赛答辩怎么讲"]}
          />
        </div>
      </div>
    </AppShell>
  );
}
