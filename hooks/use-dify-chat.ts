"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type MapHotspotId } from "@/data/map-hotspots";
import { sanitizeResponse } from "@/lib/response-sanitizer";

export type DifyChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type DifyChatResponse = {
  answer: string;
  conversationId: string;
  mapId: MapHotspotId | null;
  raw: unknown;
};

type UseDifyChatOptions = {
  initialMessage?: string;
  failureMessage: string;
  fallbackAnswer?: string;
  normalizeMessage?: (message: string) => string;
  onMapId?: (id: MapHotspotId) => void;
};

function createId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function createInitialMessages(initialMessage?: string): DifyChatMessage[] {
  if (!initialMessage) return [];

  return [
    {
      id: "welcome",
      role: "assistant",
      content: initialMessage,
    },
  ];
}

export function useDifyChat({
  initialMessage,
  failureMessage,
  fallbackAnswer = "已收到请求。",
  normalizeMessage,
  onMapId,
}: UseDifyChatOptions) {
  const [messages, setMessages] = useState<DifyChatMessage[]>(() =>
    createInitialMessages(initialMessage),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversationId, setConversationId] = useState("");
  const controllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  const conversationIdRef = useRef("");
  const loadingRef = useRef(false);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      controllerRef.current?.abort();
    };
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const query = (normalizeMessage ? normalizeMessage(text) : text).trim();
      if (!query || loadingRef.current) return false;

      const controller = new AbortController();
      controllerRef.current = controller;
      loadingRef.current = true;
      setError("");
      setLoading(true);
      setMessages((current) => [...current, { id: createId(), role: "user", content: query }]);

      try {
        const response = await fetch("/api/dify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query, conversationId: conversationIdRef.current }),
          signal: controller.signal,
        });
        const data = (await response.json()) as DifyChatResponse;
        if (!response.ok) throw new Error(data.answer || failureMessage);

        const nextConversationId = data.conversationId ?? "";
        conversationIdRef.current = nextConversationId;
        if (mountedRef.current) setConversationId(nextConversationId);
        if (data.mapId) onMapId?.(data.mapId);

        if (mountedRef.current) {
          setMessages((current) => [
            ...current,
            {
              id: createId(),
              role: "assistant",
              content: sanitizeResponse(data.answer || fallbackAnswer),
            },
          ]);
        }
        return true;
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return false;
        }

        if (mountedRef.current) {
          setError(failureMessage);
          setMessages((current) => [
            ...current,
            { id: createId(), role: "assistant", content: failureMessage },
          ]);
        }
        return false;
      } finally {
        if (controllerRef.current === controller) {
          controllerRef.current = null;
        }
        loadingRef.current = false;
        if (mountedRef.current) setLoading(false);
      }
    },
    [failureMessage, fallbackAnswer, normalizeMessage, onMapId],
  );

  const clearMessages = useCallback(
    (nextInitialMessage = initialMessage) => {
      controllerRef.current?.abort();
      controllerRef.current = null;
      conversationIdRef.current = "";
      loadingRef.current = false;
      setConversationId("");
      setError("");
      setLoading(false);
      setMessages(createInitialMessages(nextInitialMessage));
    },
    [initialMessage],
  );

  return {
    messages,
    loading,
    error,
    conversationId,
    sendMessage,
    clearMessages,
  };
}
