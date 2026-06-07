"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ExternalLink, MapPin, Navigation, Route, Search } from "lucide-react";
import { motion } from "framer-motion";
import { mapHotspots, type MapHotspot, type MapHotspotId } from "@/data/map-hotspots";
import { getAmapSearchUrl, getBaiduMapSearchUrl } from "@/lib/map-links";
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

function buildHotspotMeta(hotspot: MapHotspot): HotspotMeta {
  const route = ["北门", "校园主干道", hotspot.name];
  const categoryText = {
    gate: "校园出入口与到校定位",
    study: "学习、自习、借阅与资料检索",
    life: "校园生活与日常服务",
    sport: "体育课程、运动训练与活动集合",
    landscape: "校园景观、休闲与文化导览",
    activity: "社团活动、学生组织与校园公益活动",
    teaching: "课程教学、实训实践与楼宇导览",
    dorm: "学生住宿、生活服务与安全关怀",
  }[hotspot.category];

  return {
    title: hotspot.name,
    alias: hotspot.alias.join(" / "),
    location: hotspot.description,
    function: categoryText,
    nearby: hotspot.alias.slice(0, 3).join("、") || "校园主干道",
    route,
    walkTime: hotspot.category === "gate" ? "3分钟" : "5-8分钟",
  };
}

const hotspotMeta: Record<MapHotspotId, HotspotMeta> = Object.fromEntries(
  mapHotspots.map((hotspot) => [hotspot.id, buildHotspotMeta(hotspot)]),
) as Record<MapHotspotId, HotspotMeta>;
function getDisplayCategory(hotspot: MapHotspot): DisplayCategory {
  if (hotspot.category === "gate") return "gate";
  if (hotspot.category === "sport") return "sport";
  if (hotspot.category === "landscape") return "landscape";
  if (["life", "dorm", "activity"].includes(hotspot.category)) return "life";
  return "teaching";
}

function getHotspotIcon(hotspot: MapHotspot) {
  if (hotspot.id === "wenhui_building") return "📚";
  if (hotspot.id === "wenzhu_building") return "🏫";
  if (hotspot.id === "sports_hall") return "⚽";
  if (["shuangjing_lake", "dingxiang_garden", "qinchun_garden", "hupan_garden", "erfen_bridge"].includes(hotspot.id)) return "🌊";
  if (hotspot.category === "gate") return "🚪";
  if (hotspot.category === "dorm") return "🏠";
  if (hotspot.category === "activity") return "🎭";
  if (hotspot.category === "sport") return "⚽";
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
    <div className="grid min-h-0 gap-4">
      <div className="rounded-[24px] border border-white/70 bg-white/72 p-4 shadow-card-light backdrop-blur-2xl transition-all duration-300 hover:scale-[1.005] hover:shadow-2xl">
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
              placeholder="搜索文汇楼、文筑楼、体育馆、双镜湖..."
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
                  "relative overflow-hidden rounded-full px-3 py-2 text-xs font-bold transition-all duration-300",
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
                    "group absolute z-10 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-gradient-to-br text-lg shadow-xl transition-all duration-300 hover:scale-125",
                    styles.pin,
                    isActive && "ring-4",
                    isActive && styles.active,
                    (isLocating || isActive) && "scale-[1.6] animate-pulse",
                  )}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  aria-label={hotspotMeta[hotspot.id].title}
                  title={hotspotMeta[hotspot.id].title}
                >
                  {isActive && (
                    <span className="animate-pulse-ring pointer-events-none absolute inset-0 rounded-full border-2 border-blue-400" />
                  )}
                  <span className="drop-shadow-sm">{getHotspotIcon(hotspot)}</span>
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 min-w-max -translate-x-1/2 rounded-xl bg-slate-950 px-3 py-1.5 text-xs font-black text-white opacity-0 shadow-xl transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                    {hotspotMeta[hotspot.id].title}
                  </span>
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
        <motion.section
          key={activeHotspot.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="rounded-[20px] border border-white/70 bg-white/78 p-5 shadow-card-light backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl"
        >
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

              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                预计步行：{routeMeta.walkTime}
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
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleOpenAmap}
                  disabled={!hasSelectedHotspot}
                  className="inline-flex min-w-[132px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 px-4 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-400"
                >
                  <ExternalLink className="size-4" />
                  {hasSelectedHotspot ? "高德地图" : "请先选择校园地点"}
                </button>
                <button
                  type="button"
                  onClick={handleOpenBaiduMap}
                  disabled={!hasSelectedHotspot}
                  className="inline-flex min-w-[132px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 px-4 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-400"
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
