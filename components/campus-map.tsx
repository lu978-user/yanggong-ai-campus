"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ExternalLink, Navigation, Search } from "lucide-react";
import { mapHotspots, type MapHotspot, type MapHotspotId } from "@/data/map-hotspots";
import { getAmapSearchUrl } from "@/lib/amap-link";
import { cn } from "@/lib/utils";

type CampusMapProps = {
  activeMapId: MapHotspotId | null;
  routeMapId?: MapHotspotId | null;
  onSelect: (id: MapHotspotId) => void;
};

type LayerId = "all" | "teaching" | "life" | "sport" | "landscape" | "gate";

type DisplayCategory = Exclude<LayerId, "all">;

type HotspotMeta = {
  title: string;
  alias: string;
  location: string;
  function: string;
  nearby: string;
  route: string[];
  walkTime: string;
};

const layers: Array<{ id: LayerId; label: string }> = [
  { id: "all", label: "全部" },
  { id: "teaching", label: "教学楼" },
  { id: "life", label: "生活服务" },
  { id: "sport", label: "运动场馆" },
  { id: "landscape", label: "景观区域" },
  { id: "gate", label: "校门" },
];

const categoryLabels: Record<DisplayCategory, string> = {
  teaching: "教学楼",
  life: "生活服务",
  sport: "运动场馆",
  landscape: "景观区域",
  gate: "校门",
};

const categoryStyles: Record<DisplayCategory, { pin: string; active: string; badge: string }> = {
  teaching: {
    pin: "from-blue-500 to-sky-400",
    active: "ring-blue-300/55",
    badge: "bg-blue-50 text-blue-700",
  },
  life: {
    pin: "from-emerald-500 to-teal-400",
    active: "ring-emerald-300/55",
    badge: "bg-emerald-50 text-emerald-700",
  },
  sport: {
    pin: "from-orange-500 to-amber-400",
    active: "ring-orange-300/55",
    badge: "bg-orange-50 text-orange-700",
  },
  landscape: {
    pin: "from-violet-500 to-fuchsia-400",
    active: "ring-violet-300/55",
    badge: "bg-violet-50 text-violet-700",
  },
  gate: {
    pin: "from-cyan-600 to-blue-500",
    active: "ring-cyan-300/55",
    badge: "bg-cyan-50 text-cyan-700",
  },
};

const hotspotMeta: Record<MapHotspotId, HotspotMeta> = {
  library: {
    title: "图书馆（文筑馆）",
    alias: "图书馆 / 文筑馆",
    location: "位于校园北部核心学习区，靠近文峰楼、文汇楼与运动场。",
    function: "自习、借阅、资料检索、学习研讨与校园知识服务。",
    nearby: "文峰楼、文汇楼、运动场、学生宿舍区",
    route: ["北门", "春江路", "文筑馆"],
    walkTime: "3分钟",
  },
  east_gate: {
    title: "东门",
    alias: "东门 / 东大门",
    location: "位于校园东侧，连接校外道路与东侧生活区。",
    function: "校园出入口、访客到达、校外通勤定位。",
    nearby: "丁香园、学生宿舍区、文筑馆",
    route: ["东门", "主干道", "文筑馆"],
    walkTime: "6分钟",
  },
  west_gate: {
    title: "西门",
    alias: "西门 / 西大门",
    location: "位于校园西侧，靠近运动场与西侧宿舍区域。",
    function: "校园出入口、生活服务、校外交通衔接。",
    nearby: "运动场、体育馆、古津楼",
    route: ["西门", "运动场", "体育馆"],
    walkTime: "4分钟",
  },
  north_gate: {
    title: "北门",
    alias: "北门 / 北大门",
    location: "位于校园北侧，靠近停车场与主要教学楼区域。",
    function: "校园北侧出入口、教学区到达、访客定位。",
    nearby: "停车场、文汇楼、高桥楼",
    route: ["北门", "停车场", "文汇楼"],
    walkTime: "5分钟",
  },
  sports_hall: {
    title: "体育馆",
    alias: "体育馆 / 运动场馆",
    location: "位于校园南部运动区域，靠近篮球场与运动场。",
    function: "体育教学、运动训练、社团活动和赛事组织。",
    nearby: "篮球场、运动场、实训基地",
    route: ["北门", "明月路", "体育馆"],
    walkTime: "8分钟",
  },
  canteen: {
    title: "食堂区域",
    alias: "食堂 / 餐厅",
    location: "分布在宿舍与活动区域附近，便于学生日常就餐。",
    function: "学生就餐、生活补给、校园生活服务。",
    nearby: "大学生活动中心、宿舍区、湖畔园",
    route: ["北门", "文汇楼", "湖畔园"],
    walkTime: "7分钟",
  },
  shuangjing_lake: {
    title: "双镜湖",
    alias: "双镜湖 / 湖区景观",
    location: "位于校园中东部景观带，靠近大学生活动中心。",
    function: "休闲散步、校园文化展示、拍照打卡和景观导览。",
    nearby: "大学生活动中心、湖畔园、高桥楼",
    route: ["北门", "明月路", "双镜湖"],
    walkTime: "6分钟",
  },
  activity_center: {
    title: "大学生活动中心",
    alias: "活动中心 / 学生活动中心",
    location: "位于双镜湖附近，是校园文化活动的重要场地。",
    function: "社团活动、学生组织、公益活动、校园展示。",
    nearby: "双镜湖、湖畔园、文汇楼",
    route: ["北门", "文汇楼", "大学生活动中心"],
    walkTime: "7分钟",
  },
  dorm_east: {
    title: "东侧学生宿舍区",
    alias: "东区宿舍 / 学生宿舍",
    location: "位于校园东侧生活片区，靠近东门和生活服务设施。",
    function: "学生住宿、生活服务、夜间安全关怀。",
    nearby: "东门、食堂区域、活动中心",
    route: ["东门", "学生宿舍区", "食堂区域"],
    walkTime: "4分钟",
  },
  dorm_west: {
    title: "西侧学生宿舍区",
    alias: "西区宿舍 / 学生宿舍",
    location: "位于校园西侧生活片区，靠近运动场和体育馆。",
    function: "学生住宿、生活服务、日常返寝路线提示。",
    nearby: "体育馆、运动场、西门",
    route: ["西门", "运动场", "西侧宿舍区"],
    walkTime: "5分钟",
  },
  training_base: {
    title: "实训基地",
    alias: "实训基地 / 技术实训",
    location: "位于校园南侧实践教学区域。",
    function: "技能训练、实践教学、项目实作和工匠精神培养。",
    nearby: "体育馆、运动场、高桥楼",
    route: ["北门", "明月路", "实训基地"],
    walkTime: "9分钟",
  },
  wenhui: {
    title: "文汇楼",
    alias: "文汇楼 / 教学楼",
    location: "位于校园中部教学区，靠近双镜湖和大学生活动中心。",
    function: "日常教学、公共课程、课堂学习。",
    nearby: "双镜湖、大学生活动中心、高桥楼",
    route: ["北门", "文汇楼"],
    walkTime: "5分钟",
  },
  wenfeng: {
    title: "文峰楼",
    alias: "文峰楼 / 教学楼",
    location: "位于校园西北教学区，靠近图书馆和华扬楼。",
    function: "课程教学、教室导航、教学服务。",
    nearby: "图书馆、华扬楼、运动场",
    route: ["北门", "春江路", "文峰楼"],
    walkTime: "6分钟",
  },
  zhenzhou: {
    title: "真州楼",
    alias: "真州楼 / 教学楼",
    location: "位于校园中部教学区，周边连通多条主干道。",
    function: "课程教学、学生事务咨询、教学管理服务。",
    nearby: "文汇楼、高桥楼、双镜湖",
    route: ["北门", "明月路", "真州楼"],
    walkTime: "6分钟",
  },
  gaoqiao: {
    title: "高桥楼",
    alias: "高桥楼 / 教学楼",
    location: "位于双镜湖南侧，靠近实训基地与体育馆。",
    function: "课程教学、教学服务、实践学习衔接。",
    nearby: "双镜湖、体育馆、实训基地",
    route: ["北门", "明月路", "高桥楼"],
    walkTime: "7分钟",
  },
};

function getDisplayCategory(hotspot: MapHotspot): DisplayCategory {
  if (hotspot.category === "gate") return "gate";
  if (hotspot.category === "sport") return "sport";
  if (hotspot.category === "landscape") return "landscape";
  if (["life", "dorm", "activity"].includes(hotspot.category)) return "life";
  return "teaching";
}

function getHotspotIcon(hotspot: MapHotspot) {
  if (hotspot.id === "library") return "📚";
  if (hotspot.id === "canteen") return "🍜";
  if (hotspot.id === "sports_hall") return "⚽";
  if (hotspot.id === "shuangjing_lake") return "🌊";
  if (hotspot.category === "gate") return "🚪";
  if (hotspot.category === "dorm") return "🏠";
  if (hotspot.category === "activity") return "🎭";
  return "🏫";
}

function findHotspot(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;

  return (
    mapHotspots.find((hotspot) => {
      const meta = hotspotMeta[hotspot.id];
      const terms = [
        hotspot.id,
        hotspot.name,
        ...hotspot.alias,
        ...hotspot.keywords,
        meta.title,
        meta.alias,
      ];
      return terms.some((term) => term.toLowerCase().includes(normalized));
    }) ?? null
  );
}

export function CampusMap({ activeMapId, routeMapId, onSelect }: CampusMapProps) {
  const [search, setSearch] = useState("");
  const [layer, setLayer] = useState<LayerId>("all");
  const [locatingId, setLocatingId] = useState<MapHotspotId | null>(activeMapId);

  useEffect(() => {
    if (!activeMapId) return;
    setLocatingId(activeMapId);
    const timer = window.setTimeout(() => setLocatingId(null), 3000);
    return () => window.clearTimeout(timer);
  }, [activeMapId]);

  const activeHotspot =
    mapHotspots.find((hotspot) => hotspot.id === activeMapId) ?? mapHotspots[0];
  const activeMeta = hotspotMeta[activeHotspot.id];
  const activeCategory = getDisplayCategory(activeHotspot);
  const amapKeyword =
    activeHotspot.amapKeyword ?? `扬州工业职业技术学院 ${activeHotspot.name}`;
  const amapUrl = getAmapSearchUrl(amapKeyword);

  const visibleHotspots = useMemo(
    () =>
      mapHotspots.filter((hotspot) => {
        if (layer === "all") return true;
        return getDisplayCategory(hotspot) === layer;
      }),
    [layer],
  );

  const routeHotspot = routeMapId
    ? mapHotspots.find((hotspot) => hotspot.id === routeMapId)
    : null;
  const routeMeta = routeHotspot ? hotspotMeta[routeHotspot.id] : null;

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const hotspot = findHotspot(search);
    if (hotspot) {
      setLayer("all");
      onSelect(hotspot.id);
    }
  }

  function handleOpenAmap() {
    window.open(amapUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid min-h-0 gap-4">
      <div className="rounded-[24px] border border-white/70 bg-white/72 p-4 shadow-card-light backdrop-blur-2xl">
        <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <form
            onSubmit={handleSearch}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-blue-100 bg-white/86 px-4 py-3 shadow-sm"
          >
            <Search className="size-5 shrink-0 text-blue-500" />
            <label className="sr-only" htmlFor="campus-map-search">
              搜索校园地点
            </label>
            <input
              id="campus-map-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索图书馆、体育馆、东门..."
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
            >
              定位
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {layers.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLayer(item.id)}
                className={cn(
                  "rounded-full px-3 py-2 text-xs font-bold transition",
                  layer === item.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-blue-100 bg-white/75 text-slate-600 hover:bg-blue-50 hover:text-blue-700",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-blue-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50 shadow-inner">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/campus-map.png"
              alt="校园地图"
              fill
              priority
              className="object-contain"
            />

            {visibleHotspots.map((hotspot) => {
              const isActive = hotspot.id === activeMapId;
              const isLocating = hotspot.id === locatingId;
              const displayCategory = getDisplayCategory(hotspot);
              const styles = categoryStyles[displayCategory];

              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => onSelect(hotspot.id)}
                  className={cn(
                    "absolute z-10 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-gradient-to-br text-lg shadow-xl transition-all duration-300 hover:scale-125",
                    styles.pin,
                    isActive && "ring-4",
                    isActive && styles.active,
                    isLocating && "scale-[1.8] animate-pulse",
                  )}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  aria-label={hotspotMeta[hotspot.id].title}
                  title={hotspotMeta[hotspot.id].title}
                >
                  <span className="drop-shadow-sm">{getHotspotIcon(hotspot)}</span>
                </button>
              );
            })}

            {locatingId && (
              <div className="absolute left-5 top-5 z-20 rounded-2xl border border-white/70 bg-white/86 px-4 py-3 shadow-card-light backdrop-blur-xl">
                <p className="text-xs font-bold text-blue-600">📍 已定位：</p>
                <p className="mt-1 text-sm font-black text-slate-950">
                  {hotspotMeta[locatingId].title}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <section className="rounded-[20px] border border-white/70 bg-white/78 p-5 shadow-card-light backdrop-blur-2xl">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-blue-600">📍 建筑名称</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">{activeMeta.title}</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">{activeMeta.alias}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold",
                categoryStyles[activeCategory].badge,
              )}
            >
              {categoryLabels[activeCategory]}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["位置说明", activeMeta.location],
              ["主要功能", activeMeta.function],
              ["附近建筑", activeMeta.nearby],
              ["状态", "已定位"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-blue-100 bg-blue-50/45 p-4">
                <p className="text-xs font-bold text-blue-600">{label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:bg-blue-700"
            >
              <Navigation className="size-4" />
              导航到这里
            </button>
            <button
              type="button"
              onClick={handleOpenAmap}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ExternalLink className="size-4" />
              打开高德地图
            </button>
          </div>
        </section>

        {routeMeta && (
          <section className="rounded-[20px] border border-white/70 bg-gradient-to-br from-white/86 to-blue-50/76 p-5 shadow-card-light backdrop-blur-2xl">
            <p className="text-sm font-black text-slate-950">🚶 推荐路线</p>
            <div className="mt-5 space-y-2">
              {routeMeta.route.map((step, index) => (
                <div key={`${step}-${index}`}>
                  <div className="rounded-2xl border border-blue-100 bg-white/78 px-4 py-3 text-sm font-bold text-slate-800">
                    {step}
                  </div>
                  {index < routeMeta.route.length - 1 && (
                    <div className="px-4 py-1 text-blue-500">↓</div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              预计步行：{routeMeta.walkTime}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
