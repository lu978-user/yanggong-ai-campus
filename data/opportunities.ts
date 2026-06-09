export type Opportunity = {
  id: string;
  title: string;
  category: string;
  deadline: string;
  status: "报名中" | "即将截止" | "已结束" | "长期有效";
  recommendLevel: number;
  targetAudience: string[];
  description: string;
  requirements: string;
  applyMethod: string;
  source: string;
  tags: string[];
  isFeatured: boolean;
};

export const OPPORTUNITY_STORAGE_KEY = "yanggong_opportunities";

export const opportunityCategories = [
  "校园岗位",
  "学生组织",
  "社团活动",
  "志愿服务",
  "技能竞赛",
  "创新创业",
  "就业实习",
  "讲座培训",
  "奖学金评优",
  "其他",
];

export const opportunityStatuses: Opportunity["status"][] = [
  "报名中",
  "即将截止",
  "已结束",
  "长期有效",
];

export const defaultOpportunities: Opportunity[] = [
  {
    id: "default-class-assistant",
    title: "班主任助理",
    category: "校园岗位",
    deadline: "6月25日",
    status: "报名中",
    recommendLevel: 5,
    targetAudience: ["大二", "大三", "学生干部", "责任心强"],
    description: "适合希望积累学生工作经历、提升组织协调能力的同学。",
    requirements: "在校学生，无处分记录，有责任心，具备一定沟通协调能力。",
    applyMethod: "关注学院或班级通知，按要求提交报名表。",
    source: "成长机会中心默认数据",
    tags: ["学生工作", "组织协调", "履历积累"],
    isFeatured: true,
  },
  {
    id: "default-student-organization",
    title: "学生组织",
    category: "学生组织",
    deadline: "6月22日",
    status: "报名中",
    recommendLevel: 4,
    targetAudience: ["大一", "大二", "沟通表达", "活动策划"],
    description: "参与学生组织工作，积累校园服务、活动执行和团队协作经验。",
    requirements: "热心校园服务，愿意参与活动组织，能够保证基本参与时间。",
    applyMethod: "通过学生组织招新表或现场招新点报名。",
    source: "成长机会中心默认数据",
    tags: ["学生组织", "校园服务", "团队协作"],
    isFeatured: true,
  },
  {
    id: "default-club-recruitment",
    title: "社团招新",
    category: "社团活动",
    deadline: "6月20日",
    status: "即将截止",
    recommendLevel: 4,
    targetAudience: ["大一", "兴趣拓展", "校园融入"],
    description: "找到兴趣组织，建立校园连接，适合新生快速融入校园。",
    requirements: "对社团方向感兴趣，按社团要求完成报名或面试。",
    applyMethod: "查看社团招新通知，加入咨询群或线下报名。",
    source: "成长机会中心默认数据",
    tags: ["社团", "兴趣", "校园融入"],
    isFeatured: true,
  },
  {
    id: "default-volunteer-service",
    title: "志愿服务",
    category: "志愿服务",
    deadline: "6月18日",
    status: "即将截止",
    recommendLevel: 5,
    targetAudience: ["公益服务", "志愿时长", "社会实践"],
    description: "适合希望积累公益服务经历、提升社会责任感的同学。",
    requirements: "具备服务意识，能按时参加活动，服从现场安排。",
    applyMethod: "通过志愿活动报名链接或负责老师处报名。",
    source: "成长机会中心默认数据",
    tags: ["志愿服务", "公益", "社会实践"],
    isFeatured: true,
  },
  {
    id: "default-campus-activity",
    title: "校园活动",
    category: "其他",
    deadline: "6月28日",
    status: "报名中",
    recommendLevel: 4,
    targetAudience: ["活动执行", "校园融入", "综合素质"],
    description: "适合希望拓展校园参与、提升表达与组织能力的同学。",
    requirements: "愿意参与校园文化活动，具备基本执行力和团队意识。",
    applyMethod: "查看活动通知，按要求报名或联系活动负责人。",
    source: "成长机会中心默认数据",
    tags: ["校园活动", "综合素质", "文化活动"],
    isFeatured: true,
  },
  {
    id: "default-skills-competition",
    title: "技能竞赛",
    category: "技能竞赛",
    deadline: "7月5日",
    status: "报名中",
    recommendLevel: 5,
    targetAudience: ["计算机应用技术", "软件技术", "人工智能技术应用"],
    description: "适合信息工程类专业学生提升算法、编程与竞赛能力。",
    requirements: "具备相关专业基础，愿意持续训练并参加选拔。",
    applyMethod: "联系专业老师或竞赛负责人，提交参赛意向。",
    source: "成长机会中心默认数据",
    tags: ["技能竞赛", "专业能力", "证书竞赛"],
    isFeatured: true,
  },
  {
    id: "default-innovation-project",
    title: "创新创业项目",
    category: "创新创业",
    deadline: "7月12日",
    status: "报名中",
    recommendLevel: 4,
    targetAudience: ["项目实践", "团队协作", "创新实践"],
    description: "适合有项目想法、希望参加创新创业训练和赛事的同学。",
    requirements: "有项目方向或团队意愿，能够参与项目打磨与展示。",
    applyMethod: "准备项目简介，联系指导老师或创新创业平台报名。",
    source: "成长机会中心默认数据",
    tags: ["创新创业", "项目实践", "团队协作"],
    isFeatured: true,
  },
  {
    id: "default-internship-practice",
    title: "实习实践",
    category: "就业实习",
    deadline: "7月18日",
    status: "长期有效",
    recommendLevel: 5,
    targetAudience: ["就业导向", "岗位体验", "职业能力"],
    description: "适合希望提前了解岗位要求、积累实践经历和就业素材的同学。",
    requirements: "关注岗位要求，准备简历，具备基本职业素养。",
    applyMethod: "通过学院就业通知、企业宣讲或实习实践平台报名。",
    source: "成长机会中心默认数据",
    tags: ["就业实习", "岗位体验", "职业能力"],
    isFeatured: true,
  },
];

export function getOpportunities() {
  if (typeof window === "undefined") return defaultOpportunities;

  const saved = window.localStorage.getItem(OPPORTUNITY_STORAGE_KEY);
  if (!saved) return defaultOpportunities;

  try {
    const parsed = JSON.parse(saved) as Opportunity[];
    return Array.isArray(parsed) ? parsed : defaultOpportunities;
  } catch {
    return defaultOpportunities;
  }
}

export function saveOpportunities(opportunities: Opportunity[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(OPPORTUNITY_STORAGE_KEY, JSON.stringify(opportunities));
}

export function resetOpportunities() {
  saveOpportunities(defaultOpportunities);
  return defaultOpportunities;
}
