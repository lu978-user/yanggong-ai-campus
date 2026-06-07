export function getAmapSearchUrl(keyword: string): string {
  return `https://uri.amap.com/search?keyword=${encodeURIComponent(keyword)}`;
}
