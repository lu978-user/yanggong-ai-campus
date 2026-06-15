export type OpportunityFollowStatus = "未关注" | "已收藏" | "准备中" | "已报名" | "已完成";

export type Opportunity = {
  id: string;
  title: string;
  category: string;
  deadline: string;
  status: "报名中" | "即将截止" | "已结束" | "长期有效";
  followStatus: OpportunityFollowStatus;
  recommendLevel: number;
  targetAudience: string[];
  description: string;
  requirements: string;
  applyMethod: string;
  source: string;
  createdAt?: string;
  tags: string[];
  growthValues: string[];
  completedSkills: string[];
  relatedMajors: string[];
  relatedGoals: string[];
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

export const opportunityFollowStatuses: OpportunityFollowStatus[] = [
  "未关注",
  "已收藏",
  "准备中",
  "已报名",
  "已完成",
];

export const defaultOpportunities: Opportunity[] = [
  {
    id: "default-class-assistant",
    title: "班主任助理招募",
    category: "校园岗位",
    deadline: "6月25日",
    status: "报名中",
    followStatus: "未关注",
    recommendLevel: 5,
    targetAudience: ["大二", "大三", "学生干部", "责任心强"],
    description: "适合希望积累学生工作经历、提升组织协调能力的同学。",
    requirements: "在校学生，无处分记录，有责任心，具备一定沟通协调能力。",
    applyMethod: "关注学院或班级通知，按要求提交报名表。",
    source: "成长机会中心默认数据",
    tags: ["学生工作", "组织协调", "履历积累"],
    growthValues: ["组织协调", "沟通表达", "学生工作经验"],
    completedSkills: ["组织能力", "表达能力", "服务意识"],
    relatedMajors: ["全部专业"],
    relatedGoals: ["就业", "学生干部", "综合素质"],
    isFeatured: true,
  },
  {
    id: "default-student-organization",
    title: "学生组织招新",
    category: "学生组织",
    deadline: "6月22日",
    status: "报名中",
    followStatus: "未关注",
    recommendLevel: 4,
    targetAudience: ["大一", "大二", "沟通表达", "活动策划"],
    description: "参与学生组织工作，积累校园服务、活动执行和团队协作经验。",
    requirements: "热心校园服务，愿意参与活动组织，能够保证基本参与时间。",
    applyMethod: "通过学生组织招新表或线下招新点报名。",
    source: "成长机会中心默认数据",
    tags: ["学生组织", "校园服务", "团队协作"],
    growthValues: ["活动策划", "团队协作", "校园服务经验"],
    completedSkills: ["协作能力", "执行能力", "沟通能力"],
    relatedMajors: ["全部专业"],
    relatedGoals: ["学生干部", "就业", "综合素质"],
    isFeatured: true,
  },
  {
    id: "default-club-recruitment",
    title: "社团纳新活动",
    category: "社团活动",
    deadline: "本周内",
    status: "即将截止",
    followStatus: "未关注",
    recommendLevel: 4,
    targetAudience: ["大一", "兴趣拓展", "校园融入"],
    description: "找到兴趣组织，建立校园连接，适合新生快速融入校园。",
    requirements: "对社团方向感兴趣，按社团要求完成报名或面试。",
    applyMethod: "查看社团招新通知，加入咨询群或线下报名。",
    source: "成长机会中心默认数据",
    tags: ["社团", "兴趣", "校园融入"],
    growthValues: ["兴趣拓展", "团队连接", "校园融入"],
    completedSkills: ["表达能力", "协作能力", "社交能力"],
    relatedMajors: ["全部专业"],
    relatedGoals: ["兴趣发展", "综合素质", "就业"],
    isFeatured: true,
  },
  {
    id: "default-volunteer-service",
    title: "青年志愿者招募",
    category: "志愿服务",
    deadline: "长期有效",
    status: "长期有效",
    followStatus: "未关注",
    recommendLevel: 5,
    targetAudience: ["公益服务", "志愿时长", "社会实践"],
    description: "适合希望积累公益服务经历、提升社会责任感的同学。",
    requirements: "具备服务意识，能按时参加活动，服从现场安排。",
    applyMethod: "通过志愿活动报名链接或负责老师处报名。",
    source: "成长机会中心默认数据",
    tags: ["志愿服务", "公益", "社会实践"],
    growthValues: ["志愿时长", "社会实践", "团队协作"],
    completedSkills: ["责任意识", "服务能力", "协作能力"],
    relatedMajors: ["全部专业"],
    relatedGoals: ["公益服务", "评优评先", "综合素质"],
    isFeatured: true,
  },
  {
    id: "default-campus-activity",
    title: "校园活动报名",
    category: "其他",
    deadline: "6月28日",
    status: "报名中",
    followStatus: "未关注",
    recommendLevel: 4,
    targetAudience: ["活动执行", "校园融入", "综合素质"],
    description: "适合希望拓展校园参与、提升表达与组织能力的同学。",
    requirements: "愿意参与校园文化活动，具备基本执行力和团队意识。",
    applyMethod: "查看活动通知，按要求报名或联系活动负责人。",
    source: "成长机会中心默认数据",
    tags: ["校园活动", "综合素质", "文化活动"],
    growthValues: ["活动参与", "表达展示", "综合素质"],
    completedSkills: ["表达能力", "执行能力", "组织能力"],
    relatedMajors: ["全部专业"],
    relatedGoals: ["综合素质", "校园融入", "就业"],
    isFeatured: true,
  },
  {
    id: "default-skills-competition",
    title: "蓝桥杯竞赛报名",
    category: "技能竞赛",
    deadline: "7月5日",
    status: "报名中",
    followStatus: "未关注",
    recommendLevel: 5,
    targetAudience: ["计算机应用技术", "软件技术", "人工智能技术应用"],
    description: "适合信息工程类专业学生提升算法、编程与竞赛能力。",
    requirements: "具备相关专业基础，愿意持续训练并参加选拔。",
    applyMethod: "联系专业老师或竞赛负责人，提交参赛意向。",
    source: "成长机会中心默认数据",
    tags: ["技能竞赛", "专业能力", "证书竞赛"],
    growthValues: ["编程能力", "竞赛经历", "简历亮点"],
    completedSkills: ["算法思维", "项目经验", "专业能力"],
    relatedMajors: ["计算机应用技术", "软件技术", "人工智能技术应用", "大数据技术"],
    relatedGoals: ["竞赛", "就业", "专转本"],
    isFeatured: true,
  },
  {
    id: "default-innovation-project",
    title: "创新创业项目",
    category: "创新创业",
    deadline: "7月12日",
    status: "报名中",
    followStatus: "未关注",
    recommendLevel: 4,
    targetAudience: ["项目实践", "团队协作", "创新实践"],
    description: "适合有项目想法、希望参加创新创业训练和赛事的同学。",
    requirements: "有项目方向或团队意愿，能够参与项目打磨与展示。",
    applyMethod: "准备项目简介，联系指导老师或创新创业平台报名。",
    source: "成长机会中心默认数据",
    tags: ["创新创业", "项目实践", "团队协作"],
    growthValues: ["项目实践", "创新能力", "团队协作"],
    completedSkills: ["项目经验", "路演表达", "创新实践"],
    relatedMajors: ["计算机应用技术", "软件技术", "人工智能技术应用", "电子商务"],
    relatedGoals: ["创新创业", "就业", "竞赛"],
    isFeatured: true,
  },
  {
    id: "default-computer-design-contest",
    title: "中国大学生计算机设计大赛",
    category: "技能竞赛",
    deadline: "7月20日",
    status: "报名中",
    followStatus: "未关注",
    recommendLevel: 5,
    targetAudience: ["计算机应用技术", "软件技术", "人工智能技术应用", "大一", "大二"],
    description: "适合信息工程类学生围绕作品、系统或AI应用形成可展示项目成果。",
    requirements: "具备项目想法或技术基础，愿意组队完成作品设计与展示。",
    applyMethod: "关注学院竞赛通知，联系专业老师组队报名。",
    source: "成长机会中心默认数据",
    tags: ["技能竞赛", "作品竞赛", "项目实践"],
    growthValues: ["项目能力", "竞赛经历", "作品集亮点"],
    completedSkills: ["项目经验", "展示表达", "技术实践"],
    relatedMajors: ["计算机应用技术", "软件技术", "人工智能技术应用", "大数据技术"],
    relatedGoals: ["竞赛", "就业", "专转本"],
    isFeatured: true,
  },
  {
    id: "default-tech-club",
    title: "技术社团项目组招新",
    category: "社团活动",
    deadline: "本月内",
    status: "报名中",
    followStatus: "未关注",
    recommendLevel: 4,
    targetAudience: ["计算机应用技术", "软件技术", "人工智能技术应用", "大一", "大二"],
    description: "参与校园技术项目、小程序、网站或AI应用实践，积累团队协作经验。",
    requirements: "对技术实践感兴趣，愿意持续参与社团项目。",
    applyMethod: "通过社团招新通知或项目组负责人报名。",
    source: "成长机会中心默认数据",
    tags: ["技术社团", "项目实践", "团队协作"],
    growthValues: ["技术实践", "团队协作", "项目经验"],
    completedSkills: ["协作能力", "开发经验", "表达能力"],
    relatedMajors: ["计算机应用技术", "软件技术", "人工智能技术应用", "大数据技术"],
    relatedGoals: ["竞赛", "就业", "综合素质"],
    isFeatured: true,
  },
  {
    id: "default-english-a-prep",
    title: "英语A级备考计划",
    category: "讲座培训",
    deadline: "长期有效",
    status: "长期有效",
    followStatus: "未关注",
    recommendLevel: 4,
    targetAudience: ["大一", "大二", "专转本"],
    description: "围绕英语A级与专转本英语基础，提供复习节奏、资料和打卡建议。",
    requirements: "有英语提升或专转本备考目标，能坚持阶段复习。",
    applyMethod: "关注学习资源中心或班级学习通知。",
    source: "成长机会中心默认数据",
    tags: ["英语A级", "专转本", "学习资源"],
    growthValues: ["英语基础", "学习习惯", "升学准备"],
    completedSkills: ["英语能力", "自律能力", "备考规划"],
    relatedMajors: ["全部专业"],
    relatedGoals: ["专转本", "升学", "学习资源"],
    isFeatured: true,
  },
  {
    id: "default-transfer-lecture",
    title: "专转本政策与备考讲座",
    category: "讲座培训",
    deadline: "本周内",
    status: "即将截止",
    followStatus: "未关注",
    recommendLevel: 5,
    targetAudience: ["大一", "大二", "大三", "专转本"],
    description: "解读专转本政策、院校选择、备考科目与阶段计划。",
    requirements: "有升学意向或希望提前了解专转本路径。",
    applyMethod: "通过学院通知、班级群或学习发展活动报名。",
    source: "成长机会中心默认数据",
    tags: ["专转本", "讲座培训", "升学"],
    growthValues: ["升学规划", "信息获取", "备考方向"],
    completedSkills: ["规划能力", "信息分析", "学习目标"],
    relatedMajors: ["全部专业"],
    relatedGoals: ["专转本", "升学", "学习资源"],
    isFeatured: true,
  },
  {
    id: "default-study-checkin",
    title: "学习打卡活动",
    category: "讲座培训",
    deadline: "长期有效",
    status: "长期有效",
    followStatus: "未关注",
    recommendLevel: 4,
    targetAudience: ["大一", "大二", "专转本", "考证"],
    description: "通过阶段打卡帮助学生形成稳定学习节奏，适合备考、考证和课程复盘。",
    requirements: "愿意制定学习目标并持续记录学习过程。",
    applyMethod: "通过班级学习小组或学习资源中心参与。",
    source: "成长机会中心默认数据",
    tags: ["学习打卡", "考证", "专转本"],
    growthValues: ["自律能力", "学习习惯", "阶段复盘"],
    completedSkills: ["自我管理", "时间规划", "学习执行"],
    relatedMajors: ["全部专业"],
    relatedGoals: ["专转本", "考证", "学习资源"],
    isFeatured: true,
  },
  {
    id: "default-enterprise-talk",
    title: "企业宣讲会",
    category: "就业实习",
    deadline: "6月30日",
    status: "报名中",
    followStatus: "未关注",
    recommendLevel: 5,
    targetAudience: ["大二", "大三", "就业导向"],
    description: "了解岗位要求、企业用人标准和实习就业机会，适合就业目标学生。",
    requirements: "关注岗位方向，准备个人简历或问题清单。",
    applyMethod: "通过学院就业通知或宣讲会报名入口参加。",
    source: "成长机会中心默认数据",
    tags: ["就业", "企业宣讲", "实习"],
    growthValues: ["岗位认知", "职业规划", "求职准备"],
    completedSkills: ["职业认知", "沟通表达", "简历意识"],
    relatedMajors: ["全部专业"],
    relatedGoals: ["就业", "实习", "职业发展"],
    isFeatured: true,
  },
  {
    id: "default-internship-practice",
    title: "实习实践",
    category: "就业实习",
    deadline: "长期有效",
    status: "长期有效",
    followStatus: "未关注",
    recommendLevel: 5,
    targetAudience: ["就业导向", "岗位体验", "职业能力"],
    description: "适合希望提前了解岗位要求、积累实践经历和就业素材的同学。",
    requirements: "关注岗位要求，准备简历，具备基本职业素养。",
    applyMethod: "通过学院就业通知、企业宣讲或实习实践平台报名。",
    source: "成长机会中心默认数据",
    tags: ["就业实习", "岗位体验", "职业能力"],
    growthValues: ["岗位体验", "职业能力", "简历素材"],
    completedSkills: ["职业素养", "简历经验", "岗位认知"],
    relatedMajors: ["计算机应用技术", "软件技术", "大数据技术", "人工智能技术应用"],
    relatedGoals: ["就业", "实习", "职业发展"],
    isFeatured: true,
  },
];

function normalizeList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
}

function normalizeOpportunity(item: Partial<Opportunity>): Opportunity {
  return {
    id: item.id ?? `opp_${Date.now()}`,
    title: item.title ?? "未命名机会",
    category: item.category ?? "其他",
    deadline: item.deadline ?? "",
    status: item.status ?? "报名中",
    followStatus: item.followStatus ?? "未关注",
    recommendLevel: item.recommendLevel ?? 4,
    targetAudience: normalizeList(item.targetAudience),
    description: item.description ?? "",
    requirements: item.requirements ?? "",
    applyMethod: item.applyMethod ?? "",
    source: item.source ?? "",
    createdAt: item.createdAt ?? new Date().toISOString(),
    tags: normalizeList(item.tags),
    growthValues: normalizeList(item.growthValues),
    completedSkills: normalizeList(item.completedSkills),
    relatedMajors: normalizeList(item.relatedMajors),
    relatedGoals: normalizeList(item.relatedGoals),
    isFeatured: item.isFeatured ?? true,
  };
}

export function getOpportunities() {
  if (typeof window === "undefined") return defaultOpportunities.map(normalizeOpportunity);

  const saved = window.localStorage.getItem(OPPORTUNITY_STORAGE_KEY);
  if (!saved) return defaultOpportunities.map(normalizeOpportunity);

  try {
    const parsed = JSON.parse(saved) as Partial<Opportunity>[];
    return Array.isArray(parsed) ? parsed.map(normalizeOpportunity) : defaultOpportunities.map(normalizeOpportunity);
  } catch {
    return defaultOpportunities.map(normalizeOpportunity);
  }
}

export function saveOpportunities(opportunities: Opportunity[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(OPPORTUNITY_STORAGE_KEY, JSON.stringify(opportunities.map(normalizeOpportunity)));
}

export function resetOpportunities() {
  const normalized = defaultOpportunities.map(normalizeOpportunity);
  saveOpportunities(normalized);
  return normalized;
}
