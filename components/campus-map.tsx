"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Bike, Clock, ExternalLink, Image as ImageIcon, MapPin, Navigation, Route, Search } from "lucide-react";
import { motion } from "framer-motion";
import { mapHotspots, type MapHotspot, type MapHotspotId } from "@/data/map-hotspots";
import { getAmapSearchUrl, getBaiduMapSearchUrl } from "@/lib/map-links";
import { cn } from "@/lib/utils";

const DEBUG_MAP = false;

type CampusMapProps = {
  activeMapId: MapHotspotId | null;
  routeMapId?: MapHotspotId | null;
  onSelect: (id: MapHotspotId) => void;
};

type LayerId =
  | "all"
  | "teaching"
  | "library"
  | "training"
  | "canteen"
  | "dorm"
  | "sport"
  | "landscape"
  | "gate"
  | "activity";

type DisplayCategory = Exclude<LayerId, "all">;

type HotspotMeta = {
  title: string;
  alias: string;
  location: string;
  function: string;
  functions: string[];
  nearby: string;
  route: string[];
  walkTime: string;
  bikeTime: string;
  openTime: string;
};

const layers: Array<{ id: LayerId; label: string }> = [
  { id: "all", label: "全部" },
  { id: "teaching", label: "教学楼" },
  { id: "library", label: "图书馆" },
  { id: "training", label: "实训中心" },
  { id: "canteen", label: "食堂" },
  { id: "dorm", label: "宿舍" },
  { id: "sport", label: "体育设施" },
  { id: "landscape", label: "景观区域" },
  { id: "gate", label: "校门" },
  { id: "activity", label: "校园服务" },
];

const categoryLabels: Record<DisplayCategory, string> = {
  teaching: "教学楼",
  library: "图书馆",
  training: "实训中心",
  canteen: "食堂",
  dorm: "宿舍",
  sport: "体育设施",
  landscape: "景观区域",
  gate: "校门",
  activity: "校园服务",
};

const categoryStyles: Record<DisplayCategory, { pin: string; active: string; badge: string }> = {
  teaching: {
    pin: "from-blue-500 to-sky-400",
    active: "ring-blue-300/55",
    badge: "bg-blue-50 text-blue-700",
  },
  library: {
    pin: "from-sky-500 to-blue-500",
    active: "ring-sky-300/55",
    badge: "bg-sky-50 text-sky-700",
  },
  training: {
    pin: "from-indigo-500 to-violet-400",
    active: "ring-indigo-300/55",
    badge: "bg-indigo-50 text-indigo-700",
  },
  canteen: {
    pin: "from-emerald-500 to-teal-400",
    active: "ring-emerald-300/55",
    badge: "bg-emerald-50 text-emerald-700",
  },
  dorm: {
    pin: "from-lime-500 to-emerald-400",
    active: "ring-lime-300/55",
    badge: "bg-lime-50 text-lime-700",
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
  activity: {
    pin: "from-pink-500 to-violet-500",
    active: "ring-pink-300/55",
    badge: "bg-pink-50 text-pink-700",
  },
};

function buildHotspotMeta(hotspot: MapHotspot): HotspotMeta {
  const route = ["北门", "校园主干道", hotspot.name];
  const categoryText = {
    gate: "校园出入口与到校定位",
    library: "图书借阅、自习、资料检索与学习空间",
    training: "实训实践、技能训练与项目教学",
    canteen: "学生就餐、生活补给与校园服务",
    sport: "体育课程、运动训练与活动集合",
    landscape: "校园景观、休闲与文化导览",
    activity: "社团活动、学生组织、讲座交流与校园文化服务",
    teaching: "课程教学、实训实践与楼宇导览",
    dorm: "学生住宿、生活服务与安全关怀",
  }[hotspot.category];
  const functions = hotspot.functions ?? [categoryText];
  const nearby = hotspot.nearby?.join("、") ?? hotspot.alias.slice(0, 3).join("、") ?? "校园主干道";

  return {
    title: hotspot.name,
    alias: hotspot.alias.join(" / "),
    location: hotspot.description,
    function: categoryText,
    functions,
    nearby,
    route,
    walkTime: hotspot.category === "gate" ? "3分钟" : "5-8分钟",
    bikeTime: hotspot.category === "gate" ? "2分钟" : "3-6分钟",
    openTime: hotspot.category === "gate" || hotspot.category === "landscape" ? "全天开放" : "以校内通知为准",
  };
}

const hotspotMeta: Record<MapHotspotId, HotspotMeta> = Object.fromEntries(
  mapHotspots.map((hotspot) => [hotspot.id, buildHotspotMeta(hotspot)]),
) as Record<MapHotspotId, HotspotMeta>;
function getDisplayCategory(hotspot: MapHotspot): DisplayCategory {
  return hotspot.category;
}

const visualHotspotIds: MapHotspotId[] = [
  "wenhui_building",
  "wenzhu_building",
  "sports_hall",
  "shuangjing_lake",
  "activity_center",
];

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

  const selectedHotspot = activeMapId
    ? mapHotspots.find((hotspot) => hotspot.id === activeMapId) ?? null
    : null;
  const activeHotspot = selectedHotspot ?? mapHotspots[0];
  const hasSelectedHotspot = Boolean(selectedHotspot);
  const activeMeta = hotspotMeta[activeHotspot.id];
  const activeCategory = getDisplayCategory(activeHotspot);
  const amapKeyword =
    activeHotspot.amapKeyword ?? `扬州工业职业技术学院 ${activeHotspot.name}`;
  const baiduKeyword =
    activeHotspot.baiduKeyword ??
    activeHotspot.amapKeyword ??
    `扬州工业职业技术学院 ${activeHotspot.name}`;
  const amapUrl = getAmapSearchUrl(amapKeyword);
  const baiduMapUrl = getBaiduMapSearchUrl(baiduKeyword);

  const visibleHotspots = useMemo(
    () =>
      mapHotspots.filter((hotspot) => {
        if (layer === "all") return true;
        return getDisplayCategory(hotspot) === layer;
      }),
    [layer],
  );

  const routeHotspot = routeMapId
    ? mapHotspots.find((hotspot) => hotspot.id === routeMapId) ?? activeHotspot
    : activeHotspot;
  const routeMeta = hotspotMeta[routeHotspot.id];

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const hotspot = findHotspot(search);
    if (hotspot) {
      setLayer("all");
      onSelect(hotspot.id);
    }
  }

  function handleOpenAmap() {
    if (!hasSelectedHotspot) return;
    window.open(amapUrl, "_blank", "noopener,noreferrer");
  }

  function handleOpenBaiduMap() {
    if (!hasSelectedHotspot) return;
    window.open(baiduMapUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid min-w-0 gap-5">
      <div className="relative min-w-0 overflow-hidden rounded-[24px] border border-white/80 bg-white/60 p-3 shadow-[0_30px_110px_rgba(37,99,235,0.18)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_42px_130px_rgba(37,99,235,0.26)] sm:rounded-[32px] sm:p-5">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-12 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="relative z-10 mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <form
            onSubmit={handleSearch}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-blue-100 bg-white/86 px-3 py-3 shadow-sm sm:gap-3 sm:px-4"
          >
            <Search className="size-5 shrink-0 text-blue-500" />
            <label className="sr-only" htmlFor="campus-map-search">
              搜索校园地点
            </label>
            <input
              id="campus-map-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索文汇楼、文筑楼、体育馆、双镜湖..."
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
            >
              定位
            </button>
          </form>

          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 xl:flex-wrap xl:overflow-visible xl:pb-0">
            {layers.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLayer(item.id)}
                className={cn(
                  "relative shrink-0 overflow-hidden whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold transition-all duration-300",
                  layer === item.id
                    ? "text-white shadow-sm"
                    : "border border-blue-100 bg-white/75 text-slate-600 hover:bg-blue-50 hover:text-blue-700",
                )}
              >
                {layer === item.id && (
                  <motion.span
                    layoutId="map-layer-pill"
                    className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] rounded-[20px] border border-white/90 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_70px_rgba(56,189,248,0.2)] sm:rounded-[32px]">
          <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/95 sm:rounded-[32px]" />
          <div className="relative w-full overflow-hidden rounded-[18px] sm:rounded-[28px]">
            <Image
              src="/campus-map.png"
              alt="校园地图"
              width={2048}
              height={1152}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="block h-auto w-full object-contain"
            />

            <div className="absolute inset-0">
              {visibleHotspots.map((hotspot) => {
                const isActive = hotspot.id === activeMapId;
                const isLocating = hotspot.id === locatingId;
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => onSelect(hotspot.id)}
                    className={cn(
                      "group absolute z-10 grid place-items-center rounded-full transition-all duration-300",
                      activeMapId && !isActive && "opacity-70",
                      isActive ? "z-40" : "hover:z-30",
                    )}
                    style={{
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    aria-label={hotspotMeta[hotspot.id].title}
                    title={hotspotMeta[hotspot.id].title}
                  >
                    <span
                      className={cn(
                        "relative grid size-7 place-items-center rounded-full border border-blue-200/90 bg-white/78 text-sm shadow-lg backdrop-blur-xl transition-all duration-300 group-hover:scale-[1.15] group-hover:border-blue-300 group-hover:bg-white/92 group-hover:shadow-xl md:size-9 md:text-base xl:size-11 xl:text-xl",
                        isActive &&
                          "size-9 border-blue-400 bg-white text-base ring-4 ring-blue-300/70 shadow-[0_0_42px_rgba(37,99,235,0.72)] md:size-12 md:text-xl xl:size-[60px] xl:text-2xl",
                        (isLocating || isActive) && "animate-pulse",
                      )}
                    >
                      {isActive && (
                        <>
                          <span className="animate-pulse-ring pointer-events-none absolute inset-0 rounded-full border-2 border-blue-400" />
                          <span className="pointer-events-none absolute inset-[-12px] rounded-full bg-blue-400/30 blur-lg" />
                        </>
                      )}
                      <span className="relative leading-none drop-shadow-sm">{hotspot.icon}</span>
                    </span>
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 hidden min-w-max -translate-x-1/2 rounded-xl bg-slate-950 px-3 py-1.5 text-xs font-black text-white opacity-0 shadow-xl transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100 md:block">
                      {hotspotMeta[hotspot.id].title}
                    </span>
                    {DEBUG_MAP && (
                      <span className="pointer-events-none absolute left-1/2 top-full mt-2 min-w-max -translate-x-1/2 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-black leading-4 text-blue-700 shadow-sm">
                        {hotspot.id}
                        <br />
                        {hotspot.x},{hotspot.y}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {locatingId && (
              <div className="absolute left-3 top-3 z-20 hidden rounded-2xl border border-white/70 bg-white/86 px-4 py-3 shadow-card-light backdrop-blur-xl md:block">
                <p className="text-xs font-bold text-blue-600">📍 已定位：</p>
                <p className="mt-1 text-sm font-black text-slate-950">
                  {hotspotMeta[locatingId].title}
                </p>
              </div>
            )}
            <div className="absolute right-3 top-3 z-20 hidden rounded-2xl border border-white/80 bg-white/86 px-4 py-3 shadow-card-light backdrop-blur-xl md:block">
              <p className="text-xs font-black text-blue-600">📍 当前定位</p>
              <p className="mt-1 max-w-[240px] truncate text-sm font-black text-slate-950">
                {activeMeta.title}
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-3 rounded-2xl border border-white/70 bg-white/86 px-4 py-3 shadow-card-light backdrop-blur-xl md:hidden">
          <p className="text-xs font-black text-blue-600">📍 当前定位</p>
          <p className="mt-1 text-sm font-black text-slate-950">{activeMeta.title}</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <motion.section
          key={activeHotspot.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="overflow-hidden rounded-[24px] border border-white/70 bg-white/78 shadow-card-light backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl"
        >
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3 bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-5 text-white">
            <div>
              <p className="text-sm font-bold text-white/80">📍 建筑名称</p>
              <h2 className="mt-2 text-2xl font-black text-white">{activeMeta.title}</h2>
              <p className="mt-1 text-sm font-semibold text-white/75">{activeMeta.alias}</p>
            </div>
            <span
              className={cn(
                "rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-xl",
              )}
            >
              {categoryLabels[activeCategory]}
            </span>
          </div>

          <div className="p-5 pt-0">
          {visualHotspotIds.includes(activeHotspot.id) && (
            <div className="mb-5 grid gap-4 lg:grid-cols-[280px_1fr]">
              <div className="relative min-h-[180px] overflow-hidden rounded-[24px] border border-white/80 bg-blue-50 shadow-inner">
                <Image src="/campus-map.png" alt={`${activeMeta.title}地图预览`} fill className="object-contain" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-blue-950/10" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/82 p-3 shadow-sm backdrop-blur-xl">
                  <p className="flex items-center gap-2 text-xs font-black text-blue-700">
                    <ImageIcon className="size-4" />
                    重点建筑预览
                  </p>
                  <p className="mt-1 text-sm font-black text-slate-950">{activeMeta.title}</p>
                </div>
              </div>
              <div className="rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-5">
                <p className="text-xs font-black text-blue-600">建筑简介</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{activeMeta.location}</p>
              </div>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["建筑类型", categoryLabels[activeCategory]],
              ["简介", activeMeta.location],
              ["主要功能", activeMeta.functions.join("、")],
              ["开放时间", activeMeta.openTime],
              ["附近建筑", activeMeta.nearby],
              ["路线规划", `${routeMeta.walkTime} / 骑行${routeMeta.bikeTime}`],
              ["状态", hasSelectedHotspot ? "已定位" : "请先选择校园地点"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-blue-100 bg-blue-50/45 p-4">
                <p className="text-xs font-bold text-blue-600">{label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
              </div>
            ))}
          </div>
          </div>

        </motion.section>

        {routeMeta && (
          <section className="rounded-[20px] border border-white/70 bg-gradient-to-br from-sky-50/90 via-white/86 to-cyan-50/82 p-5 shadow-card-light backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-glow">
                <Route className="size-5" />
              </div>
              <div>
                <p className="text-base font-black text-slate-950">路线与外部导航</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  选择地图应用，打开当前位置到目标地点的外部导航。
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-blue-100 bg-white/78 px-4 py-3">
                  <p className="text-xs font-bold text-slate-400">当前起点</p>
                  <p className="mt-1 text-sm font-black text-slate-800">北门</p>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-white/78 px-4 py-3">
                  <p className="text-xs font-bold text-slate-400">目标地点</p>
                  <p className="mt-1 text-sm font-black text-slate-800">{routeMeta.title}</p>
                </div>
              </div>

              <div className="space-y-2">
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

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                  <Clock className="size-4" />
                  预计步行：{routeMeta.walkTime}
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
                  <Bike className="size-4" />
                  预计骑行：{routeMeta.bikeTime}
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[20px] border border-white/80 bg-gradient-to-br from-blue-50/90 to-cyan-50/80 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-950">外部地图</p>
                  <p className="mt-1 text-xs text-slate-500">外部地图仅作辅助，校园PNG地图仍为主地图。</p>
                </div>
                <MapPin className="size-5 shrink-0 text-blue-500" />
              </div>
              <div className="mt-4 grid overflow-hidden rounded-full border border-white/80 bg-white/76 p-1 shadow-inner sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleOpenAmap}
                  disabled={!hasSelectedHotspot}
                  className="inline-flex min-w-[132px] cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 px-4 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-400"
                >
                  <ExternalLink className="size-4" />
                  {hasSelectedHotspot ? "高德地图" : "请先选择校园地点"}
                </button>
                <button
                  type="button"
                  onClick={handleOpenBaiduMap}
                  disabled={!hasSelectedHotspot}
                  className="inline-flex min-w-[132px] cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 px-4 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-400"
                >
                  <Navigation className="size-4" />
                  {hasSelectedHotspot ? "百度地图" : "请先选择校园地点"}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
