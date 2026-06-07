export function getAmapSearchUrl(keyword: string): string {
  return `https://uri.amap.com/search?keyword=${encodeURIComponent(keyword)}`;
}

export function getBaiduMapSearchUrl(keyword: string): string {
  return `https://api.map.baidu.com/geocoder?address=${encodeURIComponent(keyword)}&output=html`;
}
