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

export const coreServices = [
  {
    title: "成长机会中心",
    description: "发现班助招募、竞赛报名、志愿服务与实习实践机会。",
    href: "/opportunities",
    icon: Megaphone,
    cta: "进入机会中心",
  },
  {
    title: "AI 成长导师",
    description: "围绕专业、目标、证书、竞赛与关怀进行连续对话。",
    href: "/chat",
    icon: Brain,
    cta: "开始对话",
  },
  {
    title: "校园地图导览",
    description: "查询校园地点，联动地图热点、高德与百度地图。",
    href: "/map",
    icon: MapPinned,
    cta: "查看地图",
  },
  {
    title: "成长规划",
    description: "根据专业、年级和目标生成成长路径与行动建议。",
    href: "/growth",
    icon: GraduationCap,
    cta: "开始规划",
  },
];

export const supportServices = [
  {
    title: "学习资源",
    description: "整理课程、工具与学习路径。",
    href: "/resources",
    icon: BookOpen,
  },
  {
    title: "学生事务",
    description: "查询请假、学生证、奖助等事务信息。",
    href: "/affairs",
    icon: ClipboardList,
  },
  {
    title: "安全教育",
    description: "提供反诈、实训、消防等安全提醒。",
    href: "/safety",
    icon: ShieldCheck,
  },
  {
    title: "心理关怀",
    description: "提供压力疏导与心理支持入口。",
    href: "/care",
    icon: HeartHandshake,
  },
];
