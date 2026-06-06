import { NextResponse } from "next/server";
import { type MapHotspotId } from "@/data/map-hotspots";
import { parseMapId } from "@/lib/map-id-parser";

type DifyRouteRequest = {
  message?: string;
  conversationId?: string;
};

type DifyApiResponse = {
  answer: string;
  conversationId: string;
  mapId: MapHotspotId | null;
  raw: unknown;
};

const DIFY_API_URL =
  process.env.DIFY_API_URL ?? "https://api.dify.ai/v1/chat-messages";
const FAILURE_MESSAGE = "暂时无法连接智能体，请稍后再试。";

function createFailureResponse(raw: unknown, status = 500) {
  return NextResponse.json(
    {
      answer: FAILURE_MESSAGE,
      conversationId: "",
      mapId: null,
      raw,
    } satisfies DifyApiResponse,
    { status },
  );
}

export async function POST(request: Request) {
  let body: DifyRouteRequest;

  try {
    body = (await request.json()) as DifyRouteRequest;
  } catch {
    return createFailureResponse({ error: "Invalid JSON body" }, 400);
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json(
      {
        answer: "请输入需要咨询的校园问题。",
        conversationId: body.conversationId ?? "",
        mapId: null,
        raw: null,
      } satisfies DifyApiResponse,
      { status: 400 },
    );
  }

  const apiKey = process.env.DIFY_API_KEY;
  const user = process.env.DIFY_USER ?? "yanggong-web-user";

  if (!apiKey || !DIFY_API_URL || !user) {
    return createFailureResponse({ error: "Missing Dify environment variables" }, 500);
  }

  try {
    const difyResponse = await fetch(DIFY_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {},
        query: message,
        response_mode: "blocking",
        conversation_id: body.conversationId || "",
        user,
      }),
    });

    const contentType = difyResponse.headers.get("content-type") ?? "";
    const raw = contentType.includes("application/json")
      ? await difyResponse.json()
      : { answer: await difyResponse.text() };

    if (!difyResponse.ok) {
      return createFailureResponse(raw, difyResponse.status);
    }

    const answer = typeof raw?.answer === "string" ? raw.answer : "";
    const conversationId =
      typeof raw?.conversation_id === "string" ? raw.conversation_id : "";

    return NextResponse.json({
      answer,
      conversationId,
      mapId: parseMapId(answer),
      raw,
    } satisfies DifyApiResponse);
  } catch (error) {
    return createFailureResponse(
      {
        error: error instanceof Error ? error.message : "Unknown Dify request error",
      },
      500,
    );
  }
}
