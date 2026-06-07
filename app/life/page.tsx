import type { LucideIcon } from "lucide-react";
import { CalendarDays, Coffee, Home, Utensils } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { InlineAgent } from "@/components/inline-agent";

const life = [
  ["食堂信息", "就餐时间、窗口推荐、错峰建议与食堂位置导览。", "🍜", "生活服务"],
  ["宿舍服务", "住宿区域、返寝路线、维修报修和安全提醒。", "🏠", "住宿支持"],
  ["校园活动", "社团活动、公益活动、大学生活动中心导览。", "🎭", "活动推荐"],
  ["生活指引", "校园卡、快递、维修、缴费与日常事务指引。", "🧭", "便民服务"],
];

const hotServices = ["食堂在哪", "校园卡丢失", "宿舍维修", "快递点查询", "活动中心在哪"];

export default function LifePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-5 py-6">
        <section className="rounded-[34px] border border-white/70 bg-white/72 p-8 shadow-xl backdrop-blur-2xl">
          <p className="text-sm font-black text-blue-600">Campus Life</p>
          <h1 className="mt-2 text-5xl font-black tracking-normal text-slate-950">
            校园生活服务中心
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            围绕吃、住、活动和日常生活服务构建校园生活支持入口，让学生少查找、少绕路、更快获得帮助。
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <Quick icon={Utensils} title="就餐推荐" value="错峰用餐" />
          <Quick icon={Home} title="宿舍支持" value="返寝提醒" />
          <Quick icon={CalendarDays} title="校园活动" value="社团公益" />
          <Quick icon={Coffee} title="生活服务" value="卡务快递" />
        </section>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_360px]">
          <section className="grid gap-4 md:grid-cols-2">
            {life.map(([title, desc, icon, tag]) => (
              <article
                key={title}
                className="rounded-[28px] border border-white/70 bg-white/80 p-7 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="text-4xl">{icon}</div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                    {tag}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-950">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
              </article>
            ))}
          </section>

          <aside className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur-2xl">
            <p className="text-sm font-black text-blue-600">Hot Services</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">热门生活服务</h2>
            <div className="mt-4 space-y-3">
              {hotServices.map((item) => (
                <div key={item} className="rounded-2xl bg-blue-50/55 px-4 py-3 text-sm font-black text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-6">
          <InlineAgent
            title="校园生活智能体"
            description="咨询食堂、宿舍、活动和校园生活服务。"
            placeholder="例如：食堂在哪，今天怎么错峰就餐？"
            suggested={["食堂在哪", "宿舍区怎么走", "活动中心在哪", "校园卡丢了怎么办"]}
          />
        </div>
      </div>
    </AppShell>
  );
}

function Quick({
  icon: Icon,
  title,
  value,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/70 bg-white/78 p-5 shadow-xl backdrop-blur-2xl">
      <Icon className="size-6 text-blue-600" />
      <p className="mt-4 text-xl font-black text-slate-950">{title}</p>
      <p className="mt-2 text-sm font-bold text-slate-500">{value}</p>
    </div>
  );
}
