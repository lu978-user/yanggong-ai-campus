export type MapHotspotId =
  | "east_gate"
  | "west_gate"
  | "huayang_building"
  | "dingxiang_garden"
  | "yuntai_building"
  | "wenfeng_building"
  | "weiyang_building"
  | "zhuqing_courtyard"
  | "wenzhu_building"
  | "east_playground"
  | "ziqing_building"
  | "zhenzhou_building"
  | "wenhui_building"
  | "gaoqiao_building"
  | "north_gate"
  | "sports_hall"
  | "erfen_bridge"
  | "shuangjing_lake"
  | "activity_center"
  | "qinchun_garden"
  | "hupan_garden"
  | "west_playground"
  | "meixiang_garden";

export type MapHotspot = {
  id: MapHotspotId;
  name: string;
  alias: string[];
  description: string;
  x: number;
  y: number;
  category:
    | "gate"
    | "library"
    | "training"
    | "canteen"
    | "sport"
    | "landscape"
    | "activity"
    | "teaching"
    | "dorm";
  keywords: string[];
  icon: string;
  functions?: string[];
  nearby?: string[];
  mapId?: MapHotspotId;
  amapKeyword?: string;
  baiduKeyword?: string;
};

const schoolName = "扬州工业职业技术学院";

export const mapHotspots: MapHotspot[] = [
  {
    id: "east_gate",
    name: "东门",
    alias: ["学校东门", "东大门"],
    description: "校园东侧出入口，靠近丁香园与东侧教学生活区域。",
    x: 10,
    y: 31,
    category: "gate",
    keywords: ["east_gate", "东门", "东大门", "校门", "入口"],
    icon: "🚪",
    amapKeyword: `${schoolName} 东门`,
    baiduKeyword: `${schoolName} 东门`,
  },
  {
    id: "west_gate",
    name: "西门",
    alias: ["学校西门", "西大门"],
    description: "校园西侧出入口，靠近西操场与西区学生宿舍。",
    x: 84,
    y: 72,
    category: "gate",
    keywords: ["west_gate", "西门", "西大门", "校门", "入口"],
    icon: "🚪",
    amapKeyword: `${schoolName} 西门`,
    baiduKeyword: `${schoolName} 西门`,
  },
  {
    id: "huayang_building",
    name: "华阳楼",
    alias: ["华阳", "华阳教学楼"],
    description: "校园西北侧楼宇，可用于教学楼定位与校园导览。",
    x: 18,
    y: 41,
    category: "teaching",
    keywords: ["huayang_building", "华阳楼", "华阳", "教学楼"],
    icon: "🏫",
    amapKeyword: `${schoolName} 华阳楼`,
    baiduKeyword: `${schoolName} 华阳楼`,
  },
  {
    id: "dingxiang_garden",
    name: "丁香园",
    alias: ["丁香园景观", "丁香园区域"],
    description: "靠近东门的食堂区域，为学生提供日常就餐与校园生活服务。",
    x: 24,
    y: 27,
    category: "canteen",
    keywords: ["dingxiang_garden", "丁香园", "食堂", "餐厅", "就餐"],
    icon: "🍽️",
    amapKeyword: `${schoolName} 丁香园`,
    baiduKeyword: `${schoolName} 丁香园`,
  },
  {
    id: "yuntai_building",
    name: "芸台楼",
    alias: ["芸台", "芸台楼"],
    description: "东门附近楼宇，适合新生入校导览与位置查询。",
    x: 26,
    y: 33,
    category: "teaching",
    keywords: ["yuntai_building", "芸台楼", "芸台", "教学楼"],
    icon: "🏫",
    amapKeyword: `${schoolName} 芸台楼`,
    baiduKeyword: `${schoolName} 芸台楼`,
  },
  {
    id: "wenfeng_building",
    name: "文峰楼",
    alias: ["文峰", "文峰教学楼"],
    description: "校园教学楼宇之一，可用于上课路线与楼宇查询。",
    x: 32,
    y: 40,
    category: "teaching",
    keywords: ["wenfeng_building", "文峰楼", "文峰", "教学楼"],
    icon: "🏫",
    amapKeyword: `${schoolName} 文峰楼`,
    baiduKeyword: `${schoolName} 文峰楼`,
  },
  {
    id: "weiyang_building",
    name: "维扬楼",
    alias: ["维扬", "维扬楼"],
    description: "西侧教学与公共服务楼宇，可用于课程与校园服务导览。",
    x: 29,
    y: 51,
    category: "teaching",
    keywords: ["weiyang_building", "维扬楼", "维扬", "教学楼"],
    icon: "🏫",
    amapKeyword: `${schoolName} 维扬楼`,
    baiduKeyword: `${schoolName} 维扬楼`,
  },
  {
    id: "zhuqing_courtyard",
    name: "竹青院（西区学生宿舍）",
    alias: ["竹青院", "西区宿舍", "西区学生宿舍", "学生宿舍"],
    description: "西区学生宿舍区域，适合生活服务与夜间返寝路线提示。",
    x: 38,
    y: 33,
    category: "dorm",
    keywords: ["zhuqing_courtyard", "zhuqing_dorm", "竹青院", "西区学生宿舍", "西区宿舍", "宿舍"],
    icon: "🏠",
    amapKeyword: `${schoolName} 竹青院`,
    baiduKeyword: `${schoolName} 竹青院`,
  },
  {
    id: "wenzhu_building",
    name: "文筑楼（实训中心）",
    alias: ["文筑楼", "文筑", "实训中心", "实训楼"],
    description: "标准地点为文筑楼，当前功能定位为实训中心，不再作为图书馆使用。",
    x: 49,
    y: 35,
    category: "training",
    keywords: ["wenzhu_building", "文筑楼", "文筑", "实训中心", "实训"],
    icon: "🛠️",
    amapKeyword: `${schoolName} 文筑楼`,
    baiduKeyword: `${schoolName} 文筑楼`,
  },
  {
    id: "east_playground",
    name: "东操场",
    alias: ["东运动场", "东侧操场", "运动场"],
    description: "校园东侧运动区域，适合体育锻炼与活动集合。",
    x: 45,
    y: 44,
    category: "sport",
    keywords: ["east_playground", "东操场", "东运动场", "操场", "运动场"],
    icon: "🏃",
    amapKeyword: `${schoolName} 东操场`,
    baiduKeyword: `${schoolName} 东操场`,
  },
  {
    id: "ziqing_building",
    name: "自清楼",
    alias: ["自清", "自清楼"],
    description: "校园中部楼宇，可用于教学服务、事务咨询与位置导航。",
    x: 46,
    y: 56,
    category: "teaching",
    keywords: ["ziqing_building", "自清楼", "自清", "教学楼"],
    icon: "🏫",
    amapKeyword: `${schoolName} 自清楼`,
    baiduKeyword: `${schoolName} 自清楼`,
  },
  {
    id: "zhenzhou_building",
    name: "真州楼",
    alias: ["真州", "真州教学楼"],
    description: "校园教学楼宇之一，支持按楼名进行导览高亮。",
    x: 58,
    y: 48,
    category: "teaching",
    keywords: ["zhenzhou_building", "真州楼", "真州", "教学楼"],
    icon: "🏫",
    amapKeyword: `${schoolName} 真州楼`,
    baiduKeyword: `${schoolName} 真州楼`,
  },
  {
    id: "wenhui_building",
    name: "文汇楼（图书馆）",
    alias: ["文汇楼", "文汇", "图书馆", "校图书馆"],
    description: "文汇楼为校园图书馆所在建筑，提供自习、借阅、资料检索和学习空间服务。",
    x: 61,
    y: 55,
    category: "library",
    keywords: ["wenhui_building", "文汇楼", "图书馆", "借书", "自习", "学习空间"],
    icon: "📚",
    amapKeyword: `${schoolName} 文汇楼 图书馆`,
    baiduKeyword: `${schoolName} 文汇楼 图书馆`,
  },
  {
    id: "gaoqiao_building",
    name: "高桥楼",
    alias: ["高桥", "高桥教学楼"],
    description: "双镜湖南侧楼宇，可作为教学服务与校园导览地点。",
    x: 55,
    y: 66,
    category: "teaching",
    keywords: ["gaoqiao_building", "高桥楼", "高桥", "教学楼"],
    icon: "🏫",
    amapKeyword: `${schoolName} 高桥楼`,
    baiduKeyword: `${schoolName} 高桥楼`,
  },
  {
    id: "north_gate",
    name: "北门",
    alias: ["学校北门", "北大门"],
    description: "校园北侧出入口，适合定位北侧教学与生活区域。",
    x: 39,
    y: 72,
    category: "gate",
    keywords: ["north_gate", "北门", "北大门", "校门", "入口"],
    icon: "🚪",
    amapKeyword: `${schoolName} 北门`,
    baiduKeyword: `${schoolName} 北门`,
  },
  {
    id: "sports_hall",
    name: "体育馆",
    alias: ["体育中心", "运动馆"],
    description: "体育课程、运动训练和大型活动常用场地。",
    x: 59,
    y: 76,
    category: "sport",
    keywords: ["sports_hall", "体育馆", "运动", "体育课"],
    icon: "🏃",
    amapKeyword: `${schoolName} 体育馆`,
    baiduKeyword: `${schoolName} 体育馆`,
  },
  {
    id: "erfen_bridge",
    name: "二分桥",
    alias: ["二分桥景观", "桥"],
    description: "双镜湖附近的校园景观节点，可用于路线指引与文化导览。",
    x: 65,
    y: 55,
    category: "landscape",
    keywords: ["erfen_bridge", "二分桥", "桥", "景观"],
    icon: "🌊",
    amapKeyword: `${schoolName} 二分桥`,
    baiduKeyword: `${schoolName} 二分桥`,
  },
  {
    id: "shuangjing_lake",
    name: "双镜湖",
    alias: ["双镜湖", "湖区", "校园湖"],
    description: "校园景观与休闲区域，适合散步、拍照和校园文化导览。",
    x: 67,
    y: 62,
    category: "landscape",
    keywords: ["shuangjing_lake", "双镜湖", "湖", "景观"],
    icon: "🌊",
    amapKeyword: `${schoolName} 双镜湖`,
    baiduKeyword: `${schoolName} 双镜湖`,
  },
  {
    id: "activity_center",
    name: "大学生活动中心",
    alias: ["学生活动中心", "活动中心", "大学生活动中心"],
    description: "大学生活动中心是学生社团活动、校园文化活动、讲座交流和学生组织服务的重要空间。",
    x: 70,
    y: 49,
    category: "activity",
    keywords: ["activity_center", "大学生活动中心", "活动中心", "社团", "学生会", "校园讲座", "学生组织"],
    icon: "🎭",
    functions: ["社团活动", "学生活动", "校园讲座", "学生组织服务", "校园文化交流"],
    nearby: ["双镜湖", "二分桥", "文汇楼", "湖畔园"],
    mapId: "activity_center",
    amapKeyword: `${schoolName} 大学生活动中心`,
    baiduKeyword: `${schoolName} 大学生活动中心`,
  },
  {
    id: "qinchun_garden",
    name: "沁春园",
    alias: ["沁春园", "沁春园食堂", "食堂区域"],
    description: "沁春园为校园食堂区域，靠近西门与宿舍区，服务学生日常就餐。",
    x: 76,
    y: 62,
    category: "canteen",
    keywords: ["qinchun_garden", "沁春园", "食堂", "餐厅", "就餐"],
    icon: "🍽️",
    amapKeyword: `${schoolName} 沁春园`,
    baiduKeyword: `${schoolName} 沁春园`,
  },
  {
    id: "hupan_garden",
    name: "湖畔园",
    alias: ["湖畔园", "湖畔园食堂", "食堂区域"],
    description: "湖畔园为双镜湖附近的食堂区域，承担学生就餐与校园生活服务。",
    x: 72,
    y: 55,
    category: "canteen",
    keywords: ["hupan_garden", "湖畔园", "湖畔", "食堂", "餐厅", "就餐"],
    icon: "🍽️",
    amapKeyword: `${schoolName} 湖畔园`,
    baiduKeyword: `${schoolName} 湖畔园`,
  },
  {
    id: "west_playground",
    name: "西操场",
    alias: ["西运动场", "西侧操场", "运动场"],
    description: "校园西侧运动区域，适合体育锻炼、集合和赛事活动。",
    x: 78,
    y: 68,
    category: "sport",
    keywords: ["west_playground", "西操场", "西运动场", "操场", "运动场"],
    icon: "🏃",
    amapKeyword: `${schoolName} 西操场`,
    baiduKeyword: `${schoolName} 西操场`,
  },
  {
    id: "meixiang_garden",
    name: "梅香园（西区学生宿舍）",
    alias: ["梅香园", "西区宿舍", "西区学生宿舍", "学生宿舍"],
    description: "西区学生宿舍区域，靠近西门和西操场，适合生活服务与安全关怀场景。",
    x: 83,
    y: 59,
    category: "dorm",
    keywords: ["meixiang_garden", "梅香园", "西区学生宿舍", "西区宿舍", "宿舍"],
    icon: "🏠",
    amapKeyword: `${schoolName} 梅香园`,
    baiduKeyword: `${schoolName} 梅香园`,
  },
];

export const mapHotspotIds = mapHotspots.map((hotspot) => hotspot.id);

export function getMapHotspotById(id: string | null | undefined) {
  return mapHotspots.find((hotspot) => hotspot.id === id) ?? null;
}
