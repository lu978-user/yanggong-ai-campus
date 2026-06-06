import { mapHotspotIds, type MapHotspotId } from "@/data/map-hotspots";

const mapIdPattern = /地图ID\s*[:：]\s*([a-zA-Z0-9_]+)/;

export function parseMapId(answer: string): MapHotspotId | null {
  const match = answer.match(mapIdPattern);
  if (!match) return null;

  const candidate = match[1] as MapHotspotId;
  return mapHotspotIds.includes(candidate) ? candidate : null;
}
