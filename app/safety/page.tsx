import { AlertTriangle, Flame, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";

const safetyCards = [
  {
    title: "诈骗防范",
    level: "高风险",
    icon: "🛡",
    case: "兼职刷单、冒充客服、虚假贷款等场景容易诱导学生转账。",
    advice: "不点陌生链接，不共享屏幕，不透露验证码，转账前先核实。",
  },
  {
    title: "消防安全",
    level: "中风险",
    icon: "🔥",
    case: "宿舍违规电器、插线板过载可能引发火灾隐患。",
    advice: "不用大功率电器，离开宿舍断电，熟悉消防通道。",
  },
  {
    title: "宿舍安全",
    level: "中风险",
    icon: "🏠",
    case: "贵重物品随意放置、夜间未锁门容易造成财物损失。",
    advice: "离寝锁门，证件妥善保管，异常情况及时联系宿管。",
  },
  {
    title: "实验室安全",
    level: "高风险",
    icon: "🧪",
    case: "实训操作不规范可能造成设备损坏或人身伤害。",
    advice: "遵守实验室制度，按流程操作设备，异常立即报告老师。",
  },
  {
    title: "网络安全",
    level: "中风险",
    icon: "🔐",
    case: "弱密码、公共Wi-Fi登录敏感账号容易泄露个人信息。",
    advice: "开启强密码和二次验证，警惕钓鱼网页和陌生文件。",
  },
  {
    title: "夜间出行安全",
    level: "提醒",
    icon: "🌙",
    case: "夜间单独出行、偏僻路线可能增加安全风险。",
    advice: "结伴出行，选择照明良好路线，及时告知同学或辅导员。",
  },
];

export default function SafetyPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-5 py-6">
        <section className="rounded-[32px] border border-white/70 bg-white/78 p-6 shadow-xl backdrop-blur-2xl lg:p-8">
          <p className="text-sm font-black text-blue-600">Safety Education</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
            校园安全教育中心
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            不只展示诈骗案例，而是覆盖反诈、消防、宿舍、实验室、网络和夜间出行安全，形成面向学生的公益安全知识网格。
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {safetyCards.map((item) => (
            <article
              key={item.title}
              className="rounded-[26px] border border-white/70 bg-white/82 p-5 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-orange-50 text-3xl">
                  {item.icon}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-700">
                  <AlertTriangle className="size-3" />
                  {item.level}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-950">{item.title}</h2>
              <Info label="案例分析" value={item.case} />
              <Info label="防范建议" value={item.advice} />
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-xl backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-600 text-white">
                <ShieldCheck className="size-6" />
              </span>
              <div>
                <p className="text-sm font-black text-blue-600">Campus Safety Loop</p>
                <h2 className="text-2xl font-black text-slate-950">安全教育闭环</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {["识别风险", "案例学习", "防范建议", "求助指引"].map((item) => (
                <div key={item} className="rounded-2xl bg-blue-50/55 p-4 text-center font-black text-blue-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-white/70 bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white shadow-xl">
            <Flame className="size-9" />
            <h2 className="mt-4 text-2xl font-black">紧急提醒</h2>
            <p className="mt-3 text-sm leading-7 text-white/85">
              涉及转账、验证码、共享屏幕、校园贷和人身安全时，优先联系辅导员、保卫处或官方渠道。
            </p>
          </div>
        </section>

        <div className="mt-6">
          <InlineAgent
            title="安全教育智能体"
            description="识别可疑信息，获取反诈、消防、宿舍、实验室、网络安全和夜间出行建议。"
            placeholder="例如：有人让我先交押金做兼职，靠谱吗？"
            suggested={["刷单诈骗怎么识别", "宿舍消防注意事项", "夜间出行怎么安全", "网络贷款有什么风险"]}
          />
        </div>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 rounded-2xl bg-blue-50/55 p-4">
      <p className="text-xs font-black text-blue-600">{label}</p>
      <p className="mt-2 text-sm leading-7 text-slate-600">{value}</p>
    </div>
  );
}
