"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Bike, Clock, Flame, MapPin, RadioTower, Route, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CampusMap } from "@/components/campus-map";
import { MapChatPanel } from "@/components/map-chat-panel";
import { mapHotspots, type MapHotspotId } from "@/data/map-hotspots";

const popularPlaces = ["文汇楼（图书馆）", "文筑楼", "体育馆", "双镜湖", "大学生活动中心"];
const realSceneCards = [
  ["文汇楼（图书馆）", "学习、自习与资料检索中心", "📚"],
  ["体育馆", "体育课程、运动训练与赛事活动", "⚽"],
  ["文筑楼（实训中心）", "实训实践、技能训练与项目实作", "🏫"],
  ["竹青院", "西区学生宿舍与生活服务", "🏠"],
  ["梅香园", "西区学生宿舍与安全关怀场景", "🏠"],
];

export default function MapPage() {
  const [activeMapId, setActiveMapId] = useState<MapHotspotId | null>("wenhui_building");
  const [routeMapId, setRouteMapId] = useState<MapHotspotId | null>(null);

  const activeHotspot = useMemo(
    () => mapHotspots.find((item) => item.id === activeMapId) ?? mapHotspots[0],
    [activeMapId],
  );

  function handleAiMapId(id: MapHotspotId) {
    setActiveMapId(id);
    setRouteMapId(id);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-6 overflow-hidden rounded-[32px] border border-white/70 bg-white/76 p-6 shadow-xl backdrop-blur-2xl">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm font-bold text-blue-600">AI Campus Navigation</p>
              <h1 className="mt-2 text-4xl font-black tracking-normal text-slate-950 sm:text-5xl">
                AI智慧校园导览
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                保留校园PNG主地图，结合Dify智能体、mapId热点定位与高德地图外部导航，完成校园地点查询、路线规划和公益信息导览。
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:w-[520px]">
              <InfoPill icon={RadioTower} label="实时状态" value="系统在线" tone="emerald" />
              <InfoPill icon={MapPin} label="当前定位" value={activeHotspot.name} tone="blue" />
            </div>
          </div>
        </section>

        <section className="mb-5 grid gap-4 md:grid-cols-4">
          <MetricCard icon={MapPin} label="热点数量" value={`${mapHotspots.length}个`} />
          <MetricCard icon={Flame} label="热门地点" value={popularPlaces.join(" / ")} />
          <MetricCard icon={Clock} label="最近访问" value={activeHotspot.name} />
          <MetricCard icon={UsersRound} label="服务对象" value="全体在校学生" />
        </section>

        <div className="grid gap-5 xl:grid-cols-[70fr_30fr]">
          <div className="space-y-5">
            <CampusMap
              activeMapId={activeMapId}
              routeMapId={routeMapId}
              onSelect={setActiveMapId}
            />

            <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
              <div className="rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur-2xl">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue-600 text-white">
                    <Route className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-blue-600">路线规划模块</p>
                    <h2 className="text-xl font-black text-slate-950">从北门到目标地点</h2>
                  </div>
                </div>
                <div className="grid gap-3 text-sm">
                  <RouteLine label="当前位置" value="北门" />
                  <RouteLine label="目标地点" value={activeHotspot.name} />
                  <RouteLine label="预计步行" value={routeMapId ? "3-8分钟" : "选择地点后生成"} />
                  <RouteLine label="预计骑行" value={routeMapId ? "2-5分钟" : "选择地点后生成"} icon={Bike} />
                </div>
              </div>

              <div className="rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur-2xl">
                <p className="text-sm font-black text-blue-600">Building Preview</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">建筑实景展示</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  {realSceneCards.map(([title, desc, icon]) => (
                    <article
                      key={title}
                      className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-4 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="text-3xl">{icon}</div>
                      <p className="mt-3 font-black text-slate-950">{title}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <MapChatPanel onMapId={handleAiMapId} />
        </div>
      </div>
    </AppShell>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur-2xl">
      <div className="mb-3 grid size-10 place-items-center rounded-2xl bg-blue-50 text-blue-700">
        <Icon className="size-5" />
      </div>
      <p className="text-xs font-black text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-black leading-6 text-slate-950">{value}</p>
    </div>
  );
}

function InfoPill({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: "emerald" | "blue";
}) {
  const className =
    tone === "emerald"
      ? "border-emerald-100 bg-emerald-50 text-emerald-700"
      : "border-blue-100 bg-blue-50 text-blue-700";

  return (
    <div className={`inline-flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-bold shadow-sm ${className}`}>
      <Icon className="size-4" />
      <span className="text-slate-500">{label}</span>
      <span className="text-current">{value}</span>
    </div>
  );
}

function RouteLine({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-blue-50/55 px-4 py-3">
      <span className="font-bold text-slate-500">{label}</span>
      <span className="inline-flex items-center gap-2 font-black text-slate-950">
        {Icon && <Icon className="size-4 text-blue-600" />}
        {value}
      </span>
    </div>
  );
}
