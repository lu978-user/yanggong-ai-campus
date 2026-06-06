"use client";

import { useState } from "react";
import { RadioTower } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CampusMap } from "@/components/campus-map";
import { MapChatPanel } from "@/components/map-chat-panel";
import { type MapHotspotId } from "@/data/map-hotspots";

export default function MapPage() {
  const [activeMapId, setActiveMapId] = useState<MapHotspotId | null>("library");
  const [routeMapId, setRouteMapId] = useState<MapHotspotId | null>(null);

  function handleAiMapId(id: MapHotspotId) {
    setActiveMapId(id);
    setRouteMapId(id);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1720px] px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-6 rounded-[28px] border border-white/70 bg-white/76 p-6 shadow-card-light backdrop-blur-2xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm font-bold text-blue-600">AI Campus Navigation</p>
              <h1 className="mt-2 text-4xl font-black tracking-normal text-slate-950">
                AI智慧校园导览
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                基于Dify智能体与校园知识库，实现校园地点查询、地图定位、学习服务与公益信息导览。
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
              <RadioTower className="size-4" />
              系统在线
            </div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[70fr_30fr]">
          <CampusMap
            activeMapId={activeMapId}
            routeMapId={routeMapId}
            onSelect={setActiveMapId}
          />
          <MapChatPanel onMapId={handleAiMapId} />
        </div>
      </div>
    </AppShell>
  );
}
