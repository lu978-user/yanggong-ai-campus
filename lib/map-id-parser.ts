import { mapHotspotIds, type MapHotspotId } from "@/data/map-hotspots";

const mapIdPattern = /地图ID\s*[:：]\s*([a-zA-Z0-9_]+)/;

const legacyMapIdAliases: Record<string, MapHotspotId> = {
  library: "wenhui_building",
  wenhui: "wenhui_building",
  wenfeng: "wenfeng_building",
  zhenzhou: "zhenzhou_building",
  gaoqiao: "gaoqiao_building",
  training_base: "wenzhu_building",
  dorm_east: "zhuqing_courtyard",
  dorm_west: "meixiang_garden",
};

export function parseMapId(answer: string): MapHotspotId | null {
  const match = answer.match(mapIdPattern);
  if (!match) return null;

  const candidate = match[1];
  const normalized = legacyMapIdAliases[candidate] ?? candidate;
  return mapHotspotIds.includes(normalized as MapHotspotId)
    ? (normalized as MapHotspotId)
    : null;
}
