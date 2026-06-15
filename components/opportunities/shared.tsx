import { type ReactNode } from "react";

export function getOpportunityType(text: string) {
  if (text.includes("班主任助理") || text.includes("班助")) return "班主任助理";
  if (text.includes("社团")) return "社团招新";
  if (text.includes("志愿")) return "志愿活动";
  if (text.includes("竞赛") || text.includes("蓝桥杯") || text.includes("创新创业")) return "竞赛活动";
  if (text.includes("就业") || text.includes("实习") || text.includes("招聘")) return "就业实习";
  return "校园通知";
}

export function getTypeBadge(type: string) {
  if (type.includes("竞赛")) return "bg-violet-50 text-violet-700 border-violet-100";
  if (type.includes("班主任")) return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (type.includes("社团")) return "bg-orange-50 text-orange-700 border-orange-100";
  if (type.includes("志愿")) return "bg-pink-50 text-pink-700 border-pink-100";
  if (type.includes("就业") || type.includes("实习")) return "bg-cyan-50 text-cyan-700 border-cyan-100";
  return "bg-blue-50 text-blue-700 border-blue-100";
}

export function getScore(text: string) {
  if (text.includes("班主任助理") || text.includes("竞赛") || text.includes("志愿")) return 5;
  if (text.includes("社团") || text.includes("讲座") || text.includes("活动")) return 4;
  return 3;
}

export function stars(score: number) {
  return "★".repeat(score) + "☆".repeat(5 - score);
}

export function getAudienceTags(text: string) {
  const candidates = ["大一", "大二", "计算机应用技术", "人工智能技术应用", "专转本", "就业导向", "学生干部"];
  const matched = candidates.filter((item) => text.includes(item));
  return matched.length > 0 ? matched : ["大一", "大二", "学生干部", "成长导向"];
}

export function getConditions(text: string) {
  const base = ["在校学生", "无处分记录", "有责任心"];
  if (text.includes("专业") || text.includes("计算机") || text.includes("人工智能")) {
    return [...base, "满足专业要求"];
  }
  return [...base, "按通知要求提交材料"];
}

export function makeSummary(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) {
    return [
      "本次通知主要面向希望参与校园成长机会的同学。",
      "参与后可提升组织协调、沟通表达与团队协作能力。",
      "对评优评先、学生干部经历积累和未来就业具有帮助。",
      "建议符合条件的同学尽快查看通知并准备报名材料。",
    ];
  }
  return [
    `本次通知主要围绕“${clean.slice(0, 28)}...”展开。`,
    "参与后可提升组织协调、沟通表达与团队协作能力。",
    "对简历经历、评优评先、升学就业方向具有一定帮助。",
    "建议符合条件的同学尽快关注截止时间并准备报名材料。",
  ];
}

export function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div>
      <p className="text-sm font-black text-blue-600">{eyebrow}</p>
      <h2 className="mt-1 text-3xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
    </div>
  );
}

export function StatusMessage({ tone, text }: { tone: "blue" | "orange"; text: string }) {
  return (
    <div className={`mt-5 rounded-[24px] border px-5 py-4 text-sm font-bold ${
      tone === "orange"
        ? "border-orange-100 bg-orange-50 text-orange-700"
        : "border-blue-100 bg-blue-50 text-blue-700"
    }`}>
      {text}
    </div>
  );
}

export function ReportCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[20px] border border-white/70 bg-white/76 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className ?? ""}`}>
      <h3 className="mb-4 text-lg font-black text-slate-950">{title}</h3>
      {children}
    </div>
  );
}
