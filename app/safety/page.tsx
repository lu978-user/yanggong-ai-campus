import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";

const cases = [
  {
    title: "刷单诈骗",
    feature: "先返小利获取信任，再诱导继续转账。",
    advice: "不参与刷单，不向陌生账户转账，保留证据及时求助。",
    story: "某同学被拉入兼职群，完成小额任务后被要求垫付大额资金。",
  },
  {
    title: "冒充客服",
    feature: "以退款、理赔、账户异常为由索要验证码。",
    advice: "官方平台核验，不透露验证码、银行卡和密码。",
    story: "骗子冒充网购客服，诱导学生下载会议软件共享屏幕。",
  },
  {
    title: "网络贷款",
    feature: "包装成低息免审核，实际收取手续费和保证金。",
    advice: "不轻信贷款广告，遇到经济困难优先联系学校渠道。",
    story: "学生被诱导先交解冻费，随后又被要求继续转账。",
  },
  {
    title: "校园贷",
    feature: "以低门槛、快到账为诱饵，带来高额费用。",
    advice: "远离非正规借贷，保护个人信息和证件照片。",
    story: "不良平台要求上传身份证和通讯录，后续进行骚扰催收。",
  },
];

export default function SafetyPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 py-6">
        <section className="rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-card-light backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">安全教育</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">反诈宣传与安全知识</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            通过诈骗特点、防范建议和真实案例，帮助学生识别风险、保护个人财产与信息安全。
          </p>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {cases.map((item) => (
            <article
              key={item.title}
              className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-card-light backdrop-blur-2xl"
            >
              <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-blue-50 text-2xl">
                🛡
              </div>
              <h2 className="text-2xl font-black text-slate-950">{item.title}</h2>
              <Info label="诈骗特点" value={item.feature} />
              <Info label="防范建议" value={item.advice} />
              <Info label="真实案例" value={item.story} />
            </article>
          ))}
        </div>
        <div className="mt-6">
          <InlineAgent
            title="安全教育智能体"
            description="识别可疑信息，获取反诈知识、案例分析和防范建议。"
            placeholder="例如：有人让我先交押金做兼职靠谱吗？"
            suggested={["刷单诈骗怎么识别", "冒充客服怎么办", "校园贷有哪些风险", "可疑兼职怎么判断"]}
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
