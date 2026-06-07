import { BadgeCheck, ClipboardList, FileText, HandCoins } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";

const affairs = [
  {
    title: "学生证补办",
    icon: BadgeCheck,
    desc: "材料清单、办理地点、注意事项与进度咨询。",
    steps: ["提交申请", "学院审核", "事务窗口办理"],
  },
  {
    title: "证明材料",
    icon: FileText,
    desc: "在读证明、成绩证明、申请流程和材料模板。",
    steps: ["选择证明类型", "准备材料", "到指定窗口办理"],
  },
  {
    title: "奖助事务",
    icon: HandCoins,
    desc: "奖学金、助学金、困难认定与政策指引。",
    steps: ["查看通知", "提交材料", "学院评审公示"],
  },
  {
    title: "请假流程",
    icon: ClipboardList,
    desc: "申请步骤、审批路径、材料提醒与销假说明。",
    steps: ["填写申请", "辅导员审批", "按时销假"],
  },
];

export default function AffairsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-5 py-6">
        <section className="rounded-[34px] border border-white/70 bg-white/72 p-8 shadow-xl backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">Student Affairs</p>
          <h1 className="mt-2 text-5xl font-black tracking-normal text-slate-950">
            学生事务办理指引
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            将常见学生事务整理为流程化指引，帮助学生少跑腿、少迷路、少遗漏材料，并通过智能体提供连续问答。
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {affairs.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-[28px] border border-white/70 bg-white/80 p-7 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="mb-5 grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                  <Icon className="size-7" />
                </div>
                <h2 className="text-2xl font-black text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                <div className="mt-5 grid gap-2">
                  {item.steps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl bg-blue-50/55 px-4 py-3">
                      <span className="grid size-7 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">
                        {index + 1}
                      </span>
                      <span className="text-sm font-bold text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </section>

        <div className="mt-6">
          <InlineAgent
            title="学生事务智能体"
            description="咨询学生证、证明材料、奖助事务和请假流程。"
            placeholder="例如：学生证丢了怎么办？"
            suggested={["学生证丢了怎么办", "请假流程是什么", "在读证明怎么开", "奖学金需要哪些材料"]}
          />
        </div>
      </div>
    </AppShell>
  );
}
