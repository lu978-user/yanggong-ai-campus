export type MapHotspotId =
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
  category: "gate" | "study" | "life" | "sport" | "landscape" | "activity" | "teaching" | "dorm";
  keywords: string[];
  amapKeyword?: string;
};

const schoolName = "扬州工业职业技术学院";

export const mapHotspots: MapHotspot[] = [
  {
    id: "west_gate",
    name: "西门",
    alias: ["学校西门", "西大门"],
    description: "校园西侧出入口，靠近西操场与西区学生宿舍。",
    x: 83,
    y: 77,
    category: "gate",
    keywords: ["west_gate", "西门", "西大门", "校门", "入口"],
    amapKeyword: `${schoolName} 西门`,
  },
  {
    id: "huayang_building",
    name: "华阳楼",
    alias: ["华阳", "华阳教学楼"],
    description: "校园西北侧楼宇，可用于教学楼定位与校园导览。",
    x: 16,
    y: 45,
    category: "teaching",
    keywords: ["huayang_building", "华阳楼", "华阳", "教学楼"],
    amapKeyword: `${schoolName} 华阳楼`,
  },
  {
    id: "dingxiang_garden",
    name: "丁香园",
    alias: ["丁香园景观", "丁香园区域"],
    description: "靠近东门的校园景观与休闲区域。",
    x: 20,
    y: 29,
    category: "landscape",
    keywords: ["dingxiang_garden", "丁香园", "景观", "花园"],
    amapKeyword: `${schoolName} 丁香园`,
  },
  {
    id: "yuntai_building",
    name: "芸台楼",
    alias: ["芸台", "芸台楼"],
    description: "东门附近楼宇，适合新生入校导览与位置查询。",
    x: 25,
    y: 35,
    category: "teaching",
    keywords: ["yuntai_building", "芸台楼", "芸台", "教学楼"],
    amapKeyword: `${schoolName} 芸台楼`,
  },
  {
    id: "wenfeng_building",
    name: "文峰楼",
    alias: ["文峰", "文峰教学楼"],
    description: "校园教学楼宇之一，可用于上课路线与楼宇查询。",
    x: 27,
    y: 44,
    category: "teaching",
    keywords: ["wenfeng_building", "文峰楼", "文峰", "教学楼"],
    amapKeyword: `${schoolName} 文峰楼`,
  },
  {
    id: "weiyang_building",
    name: "维扬楼",
    alias: ["维扬", "维扬楼"],
    description: "西侧教学与公共服务楼宇，可用于课程与校园服务导览。",
    x: 28,
    y: 60,
    category: "teaching",
    keywords: ["weiyang_building", "维扬楼", "维扬", "教学楼"],
    amapKeyword: `${schoolName} 维扬楼`,
  },
  {
    id: "zhuqing_courtyard",
    name: "竹青院（西区学生宿舍）",
    alias: ["竹青院", "西区宿舍", "西区学生宿舍", "学生宿舍"],
    description: "西区学生宿舍区域，适合生活服务与夜间返寝路线提示。",
    x: 35,
    y: 26,
    category: "dorm",
    keywords: ["zhuqing_courtyard", "竹青院", "西区学生宿舍", "西区宿舍", "宿舍"],
    amapKeyword: `${schoolName} 竹青院`,
  },
  {
    id: "wenzhu_building",
    name: "文筑楼（实训中心）",
    alias: ["文筑楼", "文筑", "实训中心", "实训楼"],
    description: "标准地点为文筑楼，当前功能定位为实训中心，不再作为图书馆使用。",
    x: 45,
    y: 35,
    category: "teaching",
    keywords: ["wenzhu_building", "文筑楼", "文筑", "实训中心", "实训"],
    amapKeyword: `${schoolName} 文筑楼`,
  },
  {
    id: "east_playground",
    name: "东操场",
    alias: ["东运动场", "东侧操场", "运动场"],
    description: "校园东侧运动区域，适合体育锻炼与活动集合。",
    x: 38,
    y: 46,
    category: "sport",
    keywords: ["east_playground", "东操场", "东运动场", "操场", "运动场"],
    amapKeyword: `${schoolName} 东操场`,
  },
  {
    id: "ziqing_building",
    name: "自清楼",
    alias: ["自清", "自清楼"],
    description: "校园中部楼宇，可用于教学服务、事务咨询与位置导航。",
    x: 44,
    y: 58,
    category: "teaching",
    keywords: ["ziqing_building", "自清楼", "自清", "教学楼"],
    amapKeyword: `${schoolName} 自清楼`,
  },
  {
    id: "zhenzhou_building",
    name: "真州楼",
    alias: ["真州", "真州教学楼"],
    description: "校园教学楼宇之一，支持按楼名进行导览高亮。",
    x: 48,
    y: 49,
    category: "teaching",
    keywords: ["zhenzhou_building", "真州楼", "真州", "教学楼"],
    amapKeyword: `${schoolName} 真州楼`,
  },
  {
    id: "wenhui_building",
    name: "文汇楼（图书馆）",
    alias: ["文汇楼", "文汇", "图书馆", "校图书馆"],
    description: "文汇楼为校园图书馆所在建筑，提供自习、借阅、资料检索和学习空间服务。",
    x: 52,
    y: 54,
    category: "study",
    keywords: ["wenhui_building", "文汇楼", "图书馆", "借书", "自习", "学习空间"],
    amapKeyword: `${schoolName} 文汇楼 图书馆`,
  },
  {
    id: "gaoqiao_building",
    name: "高桥楼",
    alias: ["高桥", "高桥教学楼"],
    description: "双镜湖南侧楼宇，可作为教学服务与校园导览地点。",
    x: 55,
    y: 70,
    category: "teaching",
    keywords: ["gaoqiao_building", "高桥楼", "高桥", "教学楼"],
    amapKeyword: `${schoolName} 高桥楼`,
  },
  {
    id: "north_gate",
    name: "北门",
    alias: ["学校北门", "北大门"],
    description: "校园北侧出入口，适合定位北侧教学与生活区域。",
    x: 25,
    y: 78,
    category: "gate",
    keywords: ["north_gate", "北门", "北大门", "校门", "入口"],
    amapKeyword: `${schoolName} 北门`,
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
    amapKeyword: `${schoolName} 体育馆`,
  },
  {
    id: "erfen_bridge",
    name: "二分桥",
    alias: ["二分桥景观", "桥"],
    description: "双镜湖附近的校园景观节点，可用于路线指引与文化导览。",
    x: 63,
    y: 58,
    category: "landscape",
    keywords: ["erfen_bridge", "二分桥", "桥", "景观"],
    amapKeyword: `${schoolName} 二分桥`,
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
    amapKeyword: `${schoolName} 双镜湖`,
  },
  {
    id: "activity_center",
    name: "大学生活动中心",
    alias: ["学生活动中心", "活动中心", "大学生活动中心"],
    description: "社团活动、学生组织和校园公益活动的重要空间。",
    x: 66,
    y: 56,
    category: "activity",
    keywords: ["activity_center", "大学生活动中心", "活动中心", "社团", "学生会"],
    amapKeyword: `${schoolName} 大学生活动中心`,
  },
  {
    id: "qinchun_garden",
    name: "沁春园",
    alias: ["沁春园景观", "沁春园区域"],
    description: "靠近西门与宿舍区的校园生活与景观节点。",
    x: 74,
    y: 66,
    category: "landscape",
    keywords: ["qinchun_garden", "沁春园", "景观", "花园"],
    amapKeyword: `${schoolName} 沁春园`,
  },
  {
    id: "hupan_garden",
    name: "湖畔园",
    alias: ["湖畔园景观", "湖畔区域"],
    description: "双镜湖附近的休闲景观区域，可用于校园文化导览。",
    x: 66,
    y: 62,
    category: "landscape",
    keywords: ["hupan_garden", "湖畔园", "湖畔", "景观"],
    amapKeyword: `${schoolName} 湖畔园`,
  },
  {
    id: "west_playground",
    name: "西操场",
    alias: ["西运动场", "西侧操场", "运动场"],
    description: "校园西侧运动区域，适合体育锻炼、集合和赛事活动。",
    x: 78,
    y: 74,
    category: "sport",
    keywords: ["west_playground", "西操场", "西运动场", "操场", "运动场"],
    amapKeyword: `${schoolName} 西操场`,
  },
  {
    id: "meixiang_garden",
    name: "梅香园（西区学生宿舍）",
    alias: ["梅香园", "西区宿舍", "西区学生宿舍", "学生宿舍"],
    description: "西区学生宿舍区域，靠近西门和西操场，适合生活服务与安全关怀场景。",
    x: 78,
    y: 58,
    category: "dorm",
    keywords: ["meixiang_garden", "梅香园", "西区学生宿舍", "西区宿舍", "宿舍"],
    amapKeyword: `${schoolName} 梅香园`,
  },
];

export const mapHotspotIds = mapHotspots.map((hotspot) => hotspot.id);

export function getMapHotspotById(id: string | null | undefined) {
  return mapHotspots.find((hotspot) => hotspot.id === id) ?? null;
}
