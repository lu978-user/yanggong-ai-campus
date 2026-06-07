export type MapHotspotId =
  | "library"
  | "east_gate"
  | "west_gate"
  | "north_gate"
  | "sports_hall"
  | "canteen"
  | "shuangjing_lake"
  | "activity_center"
  | "dorm_east"
  | "dorm_west"
  | "training_base"
  | "wenhui"
  | "wenfeng"
  | "zhenzhou"
  | "gaoqiao";

export type MapHotspot = {
  id: MapHotspotId;
  name: string;
  alias: string[];
  description: string;
  x: number;
  y: number;
  category: "gate" | "study" | "life" | "sport" | "landscape" | "activity" | "teaching" | "dorm";
  keywords: string[];
};

export const mapHotspots: MapHotspot[] = [
  {
    id: "library",
    name: "图书馆/文筑馆",
    alias: ["图书馆", "文筑馆", "文筑楼"],
    description: "校园学习与资料检索核心空间，适合自习、借阅和信息查询。",
    x: 45,
    y: 35,
    category: "study",
    keywords: ["library", "图书馆", "文筑馆", "自习", "借书"],
  },
  {
    id: "east_gate",
    name: "东门",
    alias: ["学校东门", "东大门"],
    description: "校园东侧主要出入口，常用于校外通勤与访客到达。",
    x: 10,
    y: 29,
    category: "gate",
    keywords: ["east_gate", "东门", "东大门", "入口"],
  },
  {
    id: "west_gate",
    name: "西门",
    alias: ["学校西门", "西大门"],
    description: "校园西侧出入口，连接周边生活服务区。",
    x: 83,
    y: 77,
    category: "gate",
    keywords: ["west_gate", "西门", "西大门"],
  },
  {
    id: "north_gate",
    name: "北门",
    alias: ["学校北门", "北大门"],
    description: "校园北侧出入口，适合定位北侧教学与生活区域。",
    x: 25,
    y: 78,
    category: "gate",
    keywords: ["north_gate", "北门", "北大门"],
  },
  {
    id: "sports_hall",
    name: "体育馆",
    alias: ["体育中心", "运动馆"],
    description: "体育课程、运动训练和大型活动常用场地。",
    x: 57,
    y: 74,
    category: "sport",
    keywords: ["sports_hall", "体育馆", "运动", "体育课"],
  },
  {
    id: "canteen",
    name: "食堂区域",
    alias: ["食堂", "餐厅", "学生餐厅"],
    description: "学生日常就餐区域，可结合高峰时间给出就餐建议。",
    x: 66,
    y: 60,
    category: "life",
    keywords: ["canteen", "食堂", "餐厅", "吃饭", "就餐"],
  },
  {
    id: "shuangjing_lake",
    name: "双镜湖",
    alias: ["双镜湖", "湖区", "校园湖"],
    description: "校园景观与休闲区域，适合散步、拍照和校园文化导览。",
    x: 62,
    y: 66,
    category: "landscape",
    keywords: ["shuangjing_lake", "双镜湖", "湖", "景观"],
  },
  {
    id: "activity_center",
    name: "大学生活动中心",
    alias: ["学生活动中心", "活动中心", "大学生活动中心"],
    description: "社团活动、学生组织和校园公益活动的重要空间。",
    x: 66,
    y: 56,
    category: "activity",
    keywords: ["activity_center", "活动中心", "社团", "学生会"],
  },
  {
    id: "dorm_east",
    name: "东侧学生宿舍区",
    alias: ["东宿舍", "东侧宿舍", "东区宿舍"],
    description: "东侧学生住宿区域，可用于生活服务与夜间返寝路线提示。",
    x: 35,
    y: 26,
    category: "dorm",
    keywords: ["dorm_east", "东侧宿舍", "宿舍", "寝室"],
  },
  {
    id: "dorm_west",
    name: "西侧学生宿舍区",
    alias: ["西宿舍", "西侧宿舍", "西区宿舍"],
    description: "西侧学生住宿区域，适合关联生活服务和安全关怀场景。",
    x: 78,
    y: 58,
    category: "dorm",
    keywords: ["dorm_west", "西侧宿舍", "宿舍", "寝室"],
  },
  {
    id: "training_base",
    name: "实训基地",
    alias: ["实训楼", "训练基地", "实践基地"],
    description: "实践教学、技能训练和项目实作相关区域。",
    x: 64,
    y: 88,
    category: "teaching",
    keywords: ["training_base", "实训基地", "实训", "实践"],
  },
  {
    id: "wenhui",
    name: "文汇楼",
    alias: ["文汇", "文汇教学楼"],
    description: "教学与公共课程相关楼宇，后续可接入课表与教室导航。",
    x: 52,
    y: 54,
    category: "teaching",
    keywords: ["wenhui", "文汇楼", "教学楼"],
  },
  {
    id: "wenfeng",
    name: "文峰楼",
    alias: ["文峰", "文峰教学楼"],
    description: "校园教学楼宇之一，可用于上课路线与楼宇查询。",
    x: 27,
    y: 44,
    category: "teaching",
    keywords: ["wenfeng", "文峰楼", "教学楼"],
  },
  {
    id: "zhenzhou",
    name: "真州楼",
    alias: ["真州", "真州教学楼"],
    description: "校园教学楼宇之一，支持按楼名进行导览高亮。",
    x: 48,
    y: 49,
    category: "teaching",
    keywords: ["zhenzhou", "真州楼", "教学楼"],
  },
  {
    id: "gaoqiao",
    name: "高桥楼",
    alias: ["高桥", "高桥教学楼"],
    description: "校园教学楼宇之一，可作为学生事务与教学服务地点。",
    x: 55,
    y: 70,
    category: "teaching",
    keywords: ["gaoqiao", "高桥楼", "教学楼"],
  },
];

export const mapHotspotIds = mapHotspots.map((hotspot) => hotspot.id);

export function getMapHotspotById(id: string | null | undefined) {
  return mapHotspots.find((hotspot) => hotspot.id === id) ?? null;
}
