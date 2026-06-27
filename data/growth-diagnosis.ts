import type { Opportunity, OpportunityFollowStatus } from "@/data/opportunities";

export type CollegeProfile = {
  id: string;
  name: string;
  majors: string[];
  growthDirections: string[];
  skillTags: string[];
};

export type GradeValue = "大一" | "大二" | "大三" | "大四";

export type GradeOption = {
  value: GradeValue;
  focus: string;
};

export type GrowthGoal =
  | "专转本"
  | "就业实习"
  | "竞赛提升"
  | "证书规划"
  | "学生干部 / 班助"
  | "创新创业"
  | "暂时不确定";

export type GrowthDiagnosisProfile = {
  collegeId: string;
  major: string;
  grade: GradeValue;
  goal: GrowthGoal;
  statuses: string[];
  interest: string;
};

export type GrowthScoreResult = {
  totalScore: number;
  level: "起步探索型" | "稳步成长型" | "机会突破型" | "目标冲刺型";
  levelDescription: string;
  dimensions: {
    direction: number;
    skill: number;
    opportunity: number;
    action: number;
    wellbeing: number;
  };
  strengths: string[];
  risks: string[];
  suggestions: string[];
};

export const collegeProfiles: CollegeProfile[] = [
  {
    id: "information-engineering",
    name: "信息工程学院",
    majors: ["计算机应用技术", "软件技术", "大数据技术", "人工智能技术应用"],
    growthDirections: ["AI应用开发", "软件项目实践", "数据分析", "技能竞赛"],
    skillTags: ["编程能力", "项目经验", "算法思维", "数据素养"],
  },
  {
    id: "chemical-engineering",
    name: "化学工程学院",
    majors: ["应用化工技术", "石油化工技术", "分析检验技术", "环境工程技术"],
    growthDirections: ["实训安全", "工艺操作", "检测分析", "绿色化工"],
    skillTags: ["实验规范", "安全意识", "工艺理解", "质量检测"],
  },
  {
    id: "traffic-engineering",
    name: "交通工程学院",
    majors: ["汽车检测与维修技术", "新能源汽车技术", "城市轨道交通运营管理"],
    growthDirections: ["交通服务", "车辆检测", "新能源技术", "岗位实习"],
    skillTags: ["设备操作", "服务沟通", "安全规范", "实操能力"],
  },
  {
    id: "art-design",
    name: "艺术设计学院",
    majors: ["数字媒体艺术设计", "环境艺术设计", "视觉传达设计", "室内艺术设计"],
    growthDirections: ["作品集建设", "视觉表达", "数字创意", "设计竞赛"],
    skillTags: ["审美表达", "作品呈现", "创意策划", "软件工具"],
  },
  {
    id: "e-commerce",
    name: "电商学院",
    majors: ["电子商务", "跨境电子商务", "网络营销与直播电商"],
    growthDirections: ["平台运营", "直播电商", "数据营销", "创新创业"],
    skillTags: ["运营能力", "数据分析", "内容表达", "商业意识"],
  },
  {
    id: "business",
    name: "商学院",
    majors: ["市场营销", "大数据与会计", "现代物流管理", "商务数据分析与应用"],
    growthDirections: ["财会实务", "市场策划", "物流管理", "就业实习"],
    skillTags: ["沟通表达", "财务意识", "数据处理", "组织协调"],
  },
  {
    id: "intelligent-manufacturing",
    name: "智能制造学院",
    majors: ["机电一体化", "工业机器人", "电气自动化技术", "数控技术"],
    growthDirections: ["智能制造", "设备调试", "机器人应用", "技能竞赛"],
    skillTags: ["设备调试", "工匠精神", "工程实践", "自动化思维"],
  },
  {
    id: "architecture",
    name: "建筑工程学院",
    majors: ["建筑工程技术", "工程造价", "建筑装饰工程技术", "建设工程管理"],
    growthDirections: ["工程实践", "造价管理", "施工组织", "BIM应用"],
    skillTags: ["工程识图", "项目管理", "规范意识", "BIM能力"],
  },
  {
    id: "international",
    name: "国际教育学院",
    majors: ["国际交流项目", "语言提升", "跨文化沟通"],
    growthDirections: ["语言能力", "国际视野", "升学衔接", "跨文化实践"],
    skillTags: ["英语能力", "沟通表达", "自主学习", "文化理解"],
  },
  {
    id: "continuing-education",
    name: "继续教育学院",
    majors: ["继续教育", "职业培训", "学历提升"],
    growthDirections: ["学历提升", "职业证书", "终身学习"],
    skillTags: ["学习规划", "自律能力", "职业发展"],
  },
  {
    id: "marxism",
    name: "马克思主义学院",
    majors: ["思想政治教育", "理论学习", "社会实践"],
    growthDirections: ["理论素养", "社会实践", "表达展示"],
    skillTags: ["价值判断", "表达能力", "社会责任"],
  },
  {
    id: "basic-science",
    name: "基础科学部",
    majors: ["数学基础", "英语基础", "公共基础课程"],
    growthDirections: ["基础能力", "英语A级", "专转本基础"],
    skillTags: ["基础学习", "英语能力", "逻辑思维"],
  },
  {
    id: "sports",
    name: "体育部",
    majors: ["体育健康", "体能训练", "校园体育活动"],
    growthDirections: ["身心健康", "团队协作", "体育活动"],
    skillTags: ["身体素质", "团队意识", "心理韧性"],
  },
];

export const gradeOptions: GradeOption[] = [
  { value: "大一", focus: "适应大学、打基础、发现方向" },
  { value: "大二", focus: "强化技能、参加竞赛、积累证书" },
  { value: "大三", focus: "项目实践、实习就业、专转本冲刺" },
  { value: "大四", focus: "就业升学收口、成果证明整理" },
];

export const growthGoalOptions: GrowthGoal[] = [
  "专转本",
  "就业实习",
  "竞赛提升",
  "证书规划",
  "学生干部 / 班助",
  "创新创业",
  "暂时不确定",
];

export const growthStatusOptions = [
  "目标很清楚",
  "目标不太清楚",
  "有学习计划",
  "没有学习计划",
  "参加过竞赛",
  "准备参加竞赛",
  "有证书计划",
  "正在准备证书",
  "关注过校园机会",
  "压力有点大",
  "有作品或项目经历",
  "正在找实习",
];

export function getCollegeProfile(id: string) {
  return collegeProfiles.find((college) => college.id === id) ?? collegeProfiles[0];
}

export function stableOffset(seed: string, min = -4, max = 4) {
  let hash = 0;
  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return min + (hash % (max - min + 1));
}

function clampScore(value: number) {
  return Math.max(45, Math.min(99, Math.round(value)));
}

function countStatus(opportunities: Opportunity[], statuses: OpportunityFollowStatus[]) {
  return opportunities.filter((item) => statuses.includes(item.followStatus)).length;
}

function getOpportunityStateBonus(opportunities: Opportunity[]) {
  return Math.min(
    18,
    countStatus(opportunities, ["已收藏"]) * 3 +
      countStatus(opportunities, ["准备中", "已报名"]) * 4 +
      countStatus(opportunities, ["已完成"]) * 5,
  );
}

export function calculateGrowthScore(
  profile: GrowthDiagnosisProfile,
  opportunities: Opportunity[] = [],
): GrowthScoreResult {
  const status = new Set(profile.statuses);
  const college = getCollegeProfile(profile.collegeId);
  const seed = `${profile.collegeId}-${profile.major}-${profile.grade}-${profile.goal}-${profile.statuses.join("|")}-${profile.interest}`;
  const opportunityBonus = getOpportunityStateBonus(opportunities);

  let direction = 66;
  let skill = 64;
  let opportunity = 56 + opportunityBonus;
  let action = 62;
  let wellbeing = 78;

  if (status.has("目标很清楚")) direction += 16;
  if (status.has("目标不太清楚")) direction -= 16;
  if (profile.goal === "暂时不确定") direction -= 12;

  if (status.has("有学习计划")) action += 12;
  if (status.has("没有学习计划")) action -= 14;
  if (status.has("有证书计划") || status.has("正在准备证书")) skill += 10;
  if (status.has("参加过竞赛")) skill += 8;
  if (status.has("准备参加竞赛")) opportunity += 8;
  if (status.has("关注过校园机会")) opportunity += 10;
  if (status.has("有作品或项目经历")) skill += 9;
  if (status.has("正在找实习")) opportunity += 7;
  if (status.has("压力有点大")) wellbeing -= 18;

  const gradeAdjust: Record<GradeValue, Partial<GrowthScoreResult["dimensions"]>> = {
    大一: { direction: -2, skill: -4, opportunity: 2, action: -1, wellbeing: 3 },
    大二: { direction: 3, skill: 5, opportunity: 5, action: 3 },
    大三: { direction: 6, skill: 7, opportunity: 6, action: 5, wellbeing: -2 },
    大四: { direction: 8, skill: 8, opportunity: 4, action: 7, wellbeing: -3 },
  };
  const adjust = gradeAdjust[profile.grade];
  direction += adjust.direction ?? 0;
  skill += adjust.skill ?? 0;
  opportunity += adjust.opportunity ?? 0;
  action += adjust.action ?? 0;
  wellbeing += adjust.wellbeing ?? 0;

  if (profile.goal === "专转本") {
    direction += 6;
    action += status.has("有学习计划") ? 8 : -8;
    skill += status.has("正在准备证书") || status.has("有证书计划") ? 4 : -2;
  }
  if (profile.goal === "就业实习") {
    direction += 5;
    skill += status.has("有作品或项目经历") || status.has("有证书计划") ? 9 : -8;
    opportunity += status.has("正在找实习") ? 8 : 0;
  }
  if (profile.goal === "竞赛提升") {
    skill += status.has("参加过竞赛") || status.has("准备参加竞赛") ? 12 : -3;
    opportunity += 8;
  }
  if (profile.goal === "证书规划") {
    skill += status.has("有证书计划") || status.has("正在准备证书") ? 12 : -4;
    action += 5;
  }
  if (profile.goal === "学生干部 / 班助") {
    direction += 4;
    opportunity += 7;
    wellbeing += 2;
  }
  if (profile.goal === "创新创业") {
    skill += status.has("有作品或项目经历") ? 8 : 0;
    opportunity += 6;
  }

  if (college.skillTags.some((tag) => profile.interest.includes(tag))) skill += 3;

  const dimensions = {
    direction: clampScore(direction + stableOffset(`${seed}-direction`, -3, 3)),
    skill: clampScore(skill + stableOffset(`${seed}-skill`, -4, 4)),
    opportunity: clampScore(opportunity + stableOffset(`${seed}-opportunity`, -4, 4)),
    action: clampScore(action + stableOffset(`${seed}-action`, -3, 3)),
    wellbeing: clampScore(wellbeing + stableOffset(`${seed}-wellbeing`, -3, 3)),
  };

  const weighted =
    dimensions.direction * 0.24 +
    dimensions.skill * 0.22 +
    dimensions.opportunity * 0.22 +
    dimensions.action * 0.2 +
    dimensions.wellbeing * 0.12;
  const totalScore = Math.max(55, Math.min(96, Math.round(weighted + stableOffset(seed))));

  const level =
    totalScore >= 90
      ? "目标冲刺型"
      : totalScore >= 80
        ? "机会突破型"
        : totalScore >= 70
          ? "稳步成长型"
          : "起步探索型";

  const levelDescriptionMap: Record<GrowthScoreResult["level"], string> = {
    起步探索型: "你正在形成方向感，当前最重要的是明确目标，并先完成一个小行动。",
    稳步成长型: "你已经具备成长意识，建议把计划和机会参与变成可持续记录。",
    机会突破型: "你适合主动争取竞赛、岗位、证书或实践项目，形成可展示成果。",
    目标冲刺型: "你的方向、行动和机会参与较成熟，适合进入升学、就业或项目成果冲刺。",
  };

  const strengths: string[] = [];
  const risks: string[] = [];
  const suggestions: string[] = [];

  if (dimensions.direction >= 78) strengths.push("目标方向较清晰，适合把目标拆成阶段任务。");
  if (dimensions.skill >= 78) strengths.push(`专业能力基础较好，可围绕${college.skillTags.slice(0, 2).join("、")}继续沉淀。`);
  if (dimensions.opportunity >= 76) strengths.push("已经具备机会意识，可以持续跟进校园机会。");
  if (dimensions.action >= 76) strengths.push("行动执行力较稳定，适合建立每周复盘节奏。");
  if (strengths.length === 0) strengths.push("已经开始关注个人成长，这是形成规划的第一步。");

  if (dimensions.direction < 68) risks.push("目标方向还不够聚焦，容易出现努力分散。");
  if (dimensions.skill < 68) risks.push("专业能力或作品证据偏弱，需要尽早形成可展示成果。");
  if (dimensions.opportunity < 68) risks.push("机会参与度偏低，可能错过竞赛、岗位或活动窗口。");
  if (dimensions.action < 68) risks.push("本月行动不够具体，计划容易停留在想法层面。");
  if (dimensions.wellbeing < 68) risks.push("近期压力偏高，需要保留休息、运动和求助通道。");
  if (risks.length === 0) risks.push("继续保持节奏，避免只规划不记录成果。");

  suggestions.push("收藏 1 个成长机会，并设置跟进状态。");
  suggestions.push("制定一个本周可完成的小目标，写清时间和产出。");
  if (profile.goal === "专转本") suggestions.push("建立英语和专业课复习节奏，优先补齐基础短板。");
  if (profile.goal === "就业实习") suggestions.push("整理一份作品、证书或实习经历清单，准备简历素材。");
  if (profile.goal === "竞赛提升") suggestions.push("选择 1 个竞赛方向，联系同学或老师组成小队。");
  if (status.has("压力有点大")) suggestions.push("把目标拆小，并使用心理关怀或老师同学支持减轻压力。");
  suggestions.push("使用 AI 成长导师生成更详细的月度规划。");

  return {
    totalScore,
    level,
    levelDescription: levelDescriptionMap[level],
    dimensions,
    strengths: strengths.slice(0, 4),
    risks: risks.slice(0, 4),
    suggestions: suggestions.slice(0, 5),
  };
}
