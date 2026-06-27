import {
  BookOpen,
  Brain,
  ClipboardList,
  GraduationCap,
  HeartHandshake,
  MapPinned,
  Megaphone,
  ShieldCheck,
} from "lucide-react";

export const platformCapabilities = [
  {
    title: "成长机会中心",
    icon: Megaphone,
    desc: "聚合校园岗位、竞赛、社团、志愿服务与实习实践机会。",
    href: "/opportunities",
  },
  {
    title: "AI 成长导师",
    icon: Brain,
    desc: "围绕规划、证书、竞赛、资源与关怀提供连续建议。",
    href: "/chat",
  },
  {
    title: "成长规划",
    icon: GraduationCap,
    desc: "根据专业、年级与目标生成阶段化成长路线。",
    href: "/growth",
  },
  {
    title: "校园地图",
    icon: MapPinned,
    desc: "保留校园 PNG 地图，支持热点定位与外部导航。",
    href: "/map",
  },
  {
    title: "学习资源",
    icon: BookOpen,
    desc: "整合课程、图书、竞赛资料与证书学习入口。",
    href: "/resources",
  },
  {
    title: "学生事务",
    icon: ClipboardList,
    desc: "提供常见事务流程、材料准备与办理指引。",
    href: "/affairs",
  },
  {
    title: "安全教育",
    icon: ShieldCheck,
    desc: "覆盖防诈骗、网络安全、宿舍安全与出行提醒。",
    href: "/safety",
  },
  {
    title: "心理关怀",
    icon: HeartHandshake,
    desc: "提供压力调节、情绪管理与心理支持入口。",
    href: "/care",
  },
];

export const growthJourney = [
  {
    title: "发现机会",
    desc: "AI 识别校园通知、活动招募与成长资源。",
  },
  {
    title: "理解目标",
    desc: "结合专业、年级和个人方向判断适合路径。",
  },
  {
    title: "规划行动",
    desc: "把模糊目标拆成可执行计划。",
  },
  {
    title: "参与实践",
    desc: "把机会转化为真实经历。",
  },
  {
    title: "面向未来",
    desc: "为升学、就业和综合素质积累证据。",
  },
];

export const homeFriendlyLinks = [
  "扬州工业职业技术学院官网",
  "扬州工业职业技术学院教务相关入口",
  "江苏省教育考试院",
  "中国大学 MOOC",
  "智慧树",
  "学信网",
];
