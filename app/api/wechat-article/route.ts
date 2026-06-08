import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type WechatArticleResult =
  | {
      success: true;
      title: string;
      content: string;
      summary: string;
      url: string;
    }
  | {
      success: false;
      message: string;
    };

const PARSE_FAILURE = "公众号文章解析失败，请复制文章正文后粘贴。";

function isAllowedWechatUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    if (url.hostname !== "mp.weixin.qq.com") return false;
    if (["localhost", "127.0.0.1", "0.0.0.0", "::1"].includes(url.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function stripHtml(value: string) {
  return decodeHtmlEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractMeta(html: string, property: string) {
  const pattern = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*)["'][^>]*>`,
    "i",
  );
  return decodeHtmlEntities(html.match(pattern)?.[1] ?? "").trim();
}

function extractTitle(html: string) {
  const ogTitle = extractMeta(html, "og:title");
  if (ogTitle) return ogTitle;

  const richMediaTitle = stripHtml(
    html.match(/<h1[^>]+id=["']activity-name["'][^>]*>([\s\S]*?)<\/h1>/i)?.[1] ??
      html.match(/<[^>]+class=["'][^"']*rich_media_title[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/i)?.[1] ??
      "",
  );
  if (richMediaTitle) return richMediaTitle;

  return stripHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "微信公众号文章");
}

function extractContent(html: string) {
  const jsContent =
    html.match(/<div[^>]+id=["']js_content["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>/i)?.[1] ??
    html.match(/<div[^>]+id=["']js_content["'][^>]*>([\s\S]*?)<\/div>/i)?.[1] ??
    "";
  return stripHtml(jsContent).slice(0, 4000);
}

async function fetchWechatHtml(url: string, depth = 0): Promise<{ html: string; finalUrl: string }> {
  if (depth > 2 || !isAllowedWechatUrl(url)) {
    throw new Error("Invalid redirect target");
  }

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
    redirect: "manual",
    cache: "no-store",
  });

  if ([301, 302, 303, 307, 308].includes(response.status)) {
    const location = response.headers.get("location");
    if (!location) throw new Error("Missing redirect location");
    const nextUrl = new URL(location, url).toString();
    if (!isAllowedWechatUrl(nextUrl)) throw new Error("Unsafe redirect target");
    return fetchWechatHtml(nextUrl, depth + 1);
  }

  if (!response.ok) {
    throw new Error(`Wechat article request failed: ${response.status}`);
  }

  return { html: await response.text(), finalUrl: url };
}

export async function POST(request: Request) {
  let body: { url?: string };

  try {
    body = (await request.json()) as { url?: string };
  } catch {
    return NextResponse.json({ success: false, message: PARSE_FAILURE } satisfies WechatArticleResult);
  }

  const inputUrl = body.url?.trim() ?? "";
  if (!isAllowedWechatUrl(inputUrl)) {
    return NextResponse.json({
      success: false,
      message: "仅支持微信公众号文章链接。",
    } satisfies WechatArticleResult);
  }

  try {
    const { html, finalUrl } = await fetchWechatHtml(inputUrl);
    const title = extractTitle(html);
    const content = extractContent(html);

    if (!content || content.length < 50) {
      return NextResponse.json({ success: false, message: PARSE_FAILURE } satisfies WechatArticleResult);
    }

    return NextResponse.json({
      success: true,
      title,
      content,
      summary: content.slice(0, 300),
      url: finalUrl,
    } satisfies WechatArticleResult);
  } catch {
    return NextResponse.json({ success: false, message: PARSE_FAILURE } satisfies WechatArticleResult);
  }
}
