import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type OpportunityNotice = {
  title: string;
  date: string;
  url: string;
  type: string;
  summary: string;
};

const KEYWORDS = [
  "招聘",
  "招募",
  "报名",
  "社团",
  "志愿",
  "竞赛",
  "讲座",
  "勤工助学",
  "学生干部",
  "班主任助理",
  "班助",
  "活动",
  "实践",
  "创新创业",
];

const DEFAULT_SOURCE_URLS = [
  "https://www.ypi.edu.cn/",
  "https://www.ypi.edu.cn/xwzx/tzgg.htm",
  "https://www.ypi.edu.cn/tzgg.htm",
];

function getSourceUrls() {
  const configured = process.env.OPPORTUNITIES_SOURCE_URL?.trim();
  return configured ? [configured] : DEFAULT_SOURCE_URLS;
}

function stripHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(buffer: ArrayBuffer, contentType: string) {
  const bytes = new Uint8Array(buffer);
  const headerCharset = contentType.match(/charset=([^;\s]+)/i)?.[1];
  const preview = new TextDecoder("utf-8", { fatal: false }).decode(bytes.slice(0, 4096));
  const htmlCharset = preview.match(/charset=["']?([^"'\s/>]+)/i)?.[1];
  const charset = (headerCharset ?? htmlCharset ?? "utf-8").toLowerCase();
  const encoding = charset.includes("gb") ? "gb18030" : "utf-8";

  const utf8Text = new TextDecoder("utf-8", { fatal: false }).decode(bytes);

  try {
    const configuredText = new TextDecoder(encoding).decode(bytes);
    return scoreDecodedText(utf8Text) >= scoreDecodedText(configuredText)
      ? utf8Text
      : configuredText;
  } catch {
    return utf8Text;
  }
}

function scoreDecodedText(text: string) {
  const chineseCount = (text.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const mojibakeCount = (text.match(/[ÃÂäåæçèéêëìíîïðñòóôöùúûü]/g) ?? []).length;
  const replacementCount = (text.match(/\uFFFD/g) ?? []).length;
  return chineseCount * 3 - mojibakeCount - replacementCount * 5;
}

function absolutizeUrl(href: string, sourceUrl: string) {
  try {
    return new URL(href, sourceUrl).toString();
  } catch {
    return sourceUrl;
  }
}

function getNoticeType(text: string) {
  if (text.includes("招聘") || text.includes("招募") || text.includes("班主任助理") || text.includes("班助")) {
    return "招聘招募";
  }
  if (text.includes("报名") || text.includes("竞赛") || text.includes("创新创业")) return "竞赛报名";
  if (text.includes("志愿")) return "志愿活动";
  if (text.includes("社团")) return "社团招新";
  if (text.includes("讲座")) return "讲座通知";
  if (text.includes("勤工助学")) return "勤工助学";
  if (text.includes("学生干部")) return "学生干部";
  if (text.includes("实践")) return "实践活动";
  return "校园活动";
}

function parseDate(text: string) {
  const date =
    text.match(/20\d{2}[-/.年]\d{1,2}[-/.月]\d{1,2}/)?.[0] ??
    text.match(/\d{4}-\d{2}-\d{2}/)?.[0] ??
    text.match(/\d{1,2}[-/.月]\d{1,2}/)?.[0] ??
    "";

  return date.replace(/年|月/g, "-").replace(/日/g, "").replace(/\./g, "-").replace(/\//g, "-");
}

function summarize(title: string, context: string) {
  const clean = stripHtml(context)
    .replace(title, "")
    .replace(/\b(class|href|target|title|span|div|li|ul|rel)\b[^，。；、\s]*/gi, "")
    .trim();
  if (!clean || /[<>"'=]/.test(clean) || clean.length < 8) {
    return `与“${title}”相关的学校官网公开通知。`;
  }
  const source = clean || title;
  return source.length > 96 ? `${source.slice(0, 96)}...` : source;
}

function parseOpportunities(html: string, sourceUrl: string): OpportunityNotice[] {
  const notices: OpportunityNotice[] = [];
  const seen = new Set<string>();
  const anchorPattern = /<a\b([^>]*?)>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = anchorPattern.exec(html))) {
    const attrs = match[1] ?? "";
    const body = match[2] ?? "";
    const href = attrs.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) continue;

    const titleAttr = attrs.match(/\btitle=["']([^"']+)["']/i)?.[1];
    const title = stripHtml(titleAttr || body);
    if (!title || title.length < 4) continue;
    if (!KEYWORDS.some((keyword) => title.includes(keyword))) continue;

    const contextStart = Math.max(0, match.index - 240);
    const contextEnd = Math.min(html.length, anchorPattern.lastIndex + 240);
    const context = html.slice(contextStart, contextEnd);
    const url = absolutizeUrl(href, sourceUrl);
    const key = `${title}-${url}`;
    if (seen.has(key)) continue;
    seen.add(key);

    notices.push({
      title,
      date: parseDate(context),
      url,
      type: getNoticeType(title),
      summary: summarize(title, context),
    });
  }

  return notices.slice(0, 12);
}

async function fetchSource(sourceUrl: string) {
  const response = await fetch(sourceUrl, {
    headers: {
      "User-Agent": "YangGong-AI-Campus/1.0 public-notice-fetcher",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${sourceUrl}: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  return decodeHtml(await response.arrayBuffer(), contentType);
}

export async function GET() {
  for (const sourceUrl of getSourceUrls()) {
    try {
      const html = await fetchSource(sourceUrl);
      const notices = parseOpportunities(html, sourceUrl);
      if (notices.length > 0) {
        return NextResponse.json(notices satisfies OpportunityNotice[]);
      }
    } catch {
      // Try the next public source URL, then fall through to an empty failure response.
    }
  }

  return NextResponse.json(
    { error: "暂时无法获取官网通知，请稍后再试。" },
    { status: 502 },
  );
}
