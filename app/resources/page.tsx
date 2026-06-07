import { BookOpen, ChartNoAxesCombined, LibraryBig, Medal, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";

const stats = [
  ["图书资源", "3.2万册", "馆藏借阅与电子资源"],
  ["课程资源", "240+", "公共课、专业课、复习资料"],
  ["竞赛资源", "36项", "蓝桥杯、挑战杯、技能大赛"],
  ["证书资源", "48类", "等级考试、1+X、行业认证"],
];

const resources = [
  {
    title: "图书馆资源",
    desc: "图书借阅、电子资源、学习空间查询与文献检索指引。",
    icon: LibraryBig,
    tag: "馆藏",
    score: "96%",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "课程学习",
    desc: "公共课、专业课、复习资料和高效学习方法整理。",
    icon: BookOpen,
    tag: "课程",
    score: "92%",
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    title: "竞赛资料",
    desc: "蓝桥杯、计算机设计大赛、挑战杯备赛资料与赛程提示。",
    icon: Medal,
    tag: "竞赛",
    score: "98%",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "证书规划",
    desc: "技能证书、等级考试、职业资格信息与备考路线。",
    icon: ChartNoAxesCombined,
    tag: "证书",
    score: "90%",
    gradient: "from-violet-500 to-fuchsia-500",
  },
];

const ranking = ["专转本英语复习路线", "蓝桥杯Java备赛清单", "计算机等级考试二级", "图书馆自习空间预约", "AI工具学习指南"];

export default function ResourcesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-5 py-6">
        <section className="overflow-hidden rounded-[34px] border border-white/70 bg-white/72 p-8 shadow-xl backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">Learning Resource Hub</p>
          <h1 className="mt-2 text-5xl font-black tracking-normal text-slate-950">
            校园学习资源中心
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            聚合图书馆、课程学习、竞赛资料和证书规划入口，后续可接入知识库，为不同专业学生生成个性化学习计划。
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          {stats.map(([title, value, desc]) => (
            <div key={title} className="rounded-[24px] border border-white/70 bg-white/78 p-5 shadow-xl backdrop-blur-2xl">
              <p className="text-3xl font-black text-slate-950">{value}</p>
              <p className="mt-2 font-black text-blue-700">{title}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_360px]">
          <section className="grid gap-4 md:grid-cols-2">
            {resources.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className={`h-28 bg-gradient-to-br ${item.gradient} p-5 text-white`}>
                    <Icon className="size-10" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                        {item.tag}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                        推荐指数 {item.score}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-950">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="space-y-5">
            <section className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur-2xl">
              <p className="text-sm font-black text-blue-600">Hot Ranking</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">热门资源排行榜</h2>
              <div className="mt-4 space-y-3">
                {ranking.map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-blue-50/55 p-3">
                    <span className="grid size-8 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-[28px] border border-white/70 bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white shadow-xl">
              <Sparkles className="size-8" />
              <h2 className="mt-4 text-2xl font-black">AI推荐学习计划</h2>
              <p className="mt-3 text-sm leading-7 text-white/85">
                根据专业、年级、目标和近期咨询记录，为学生生成资源清单、复习节奏和阶段任务。
              </p>
            </section>
          </aside>
        </div>

        <div className="mt-6">
          <InlineAgent
            title="学习资源智能体"
            description="咨询图书馆、课程学习、竞赛资料和证书规划，生成个性化资源推荐。"
            placeholder="例如：计算机应用技术大一适合准备什么证书？"
            suggested={["图书馆开放时间", "蓝桥杯怎么准备", "专转本学习计划", "推荐计算机证书"]}
          />
        </div>
      </div>
    </AppShell>
  );
}
