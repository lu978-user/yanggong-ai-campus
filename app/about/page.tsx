import type { LucideIcon } from "lucide-react";
import { Bot, Cloud, Database, Layers3, MapPinned, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";

const techStack = ["Next.js", "TypeScript", "TailwindCSS", "Dify", "高德地图", "阿里云ECS"];
const innovations = [
  ["AI校园导航", "Dify回答中的mapId驱动校园PNG热点高亮，并提供高德地图外部辅助导航。"],
  ["AI成长规划", "面向全校专业，结合年级、目标和兴趣方向生成学习路线。"],
  ["AI学习助手", "聚合图书、课程、竞赛、证书资源，支持个性化咨询。"],
  ["公益服务平台", "将安全教育、心理关怀、学生事务与校园服务整合为统一入口。"],
];

export default function AboutPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-5 py-6">
        <section className="overflow-hidden rounded-[34px] border border-white/70 bg-white/72 p-8 shadow-xl backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">Competition Showcase</p>
          <h1 className="mt-2 text-5xl font-black tracking-normal text-slate-950">扬工智行</h1>
          <p className="mt-2 text-xl font-black text-blue-700">YangGong AI Campus</p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            扬工智行是一套面向扬州工业职业技术学院全体学生的AI校园公益服务平台，围绕校园导航、AI问答、成长规划、学习资源、安全教育和心理关怀构建智慧校园服务体验。
          </p>
          <div className="mt-6 inline-flex rounded-2xl border border-blue-100 bg-white/80 px-5 py-3 text-sm font-black text-slate-800 shadow-sm">
            校训：厚德强能 · 笃学创新
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_420px]">
          <div className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-xl backdrop-blur-2xl">
            <p className="text-sm font-black text-blue-600">项目背景</p>
            <h2 className="mt-1 text-3xl font-black text-slate-950">从单点问答到智慧校园公益平台</h2>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              传统校园服务入口分散，新生找地点、学生查事务、成长规划和安全关怀往往需要跨多个渠道。扬工智行通过AI智能体与校园知识库整合服务信息，让学生用自然语言完成查询、定位、规划和公益支持。
            </p>
          </div>
          <div className="rounded-[28px] border border-white/70 bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-xl">
            <Sparkles className="size-9" />
            <h2 className="mt-4 text-3xl font-black">项目价值</h2>
            <p className="mt-4 text-sm leading-8 text-white/85">
              降低校园服务获取门槛，提升学生校园适应效率，增强安全与心理公益支持能力，为职业院校智慧校园建设提供可落地样板。
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-xl backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">Architecture</p>
          <h2 className="mt-1 text-3xl font-black text-slate-950">项目架构图</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <ArchCard icon={Layers3} title="Next.js前端" desc="Dashboard、地图、AI助手与多业务页面" />
            <ArchCard icon={Bot} title="Dify Chatflow" desc="意图分类、知识库问答、连续对话" />
            <ArchCard icon={Database} title="校园数据" desc="热点坐标、服务模块、专业资源" />
            <ArchCard icon={MapPinned} title="地图能力" desc="PNG主地图、mapId高亮、高德跳转" />
            <ArchCard icon={Cloud} title="部署支撑" desc="GitHub协作、阿里云ECS演示部署" />
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[360px_1fr]">
          <div className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-xl backdrop-blur-2xl">
            <p className="text-sm font-black text-blue-600">Tech Stack</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">技术栈展示</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {techStack.map((item) => (
                <span key={item} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {innovations.map(([title, desc]) => (
              <article
                key={title}
                className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <p className="text-xl font-black text-slate-950">{title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
              </article>
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
    <article className="rounded-[24px] border border-blue-100 bg-blue-50/45 p-5 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-600 text-white">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-4 font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-600">{desc}</p>
    </article>
  );
}
