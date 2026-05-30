import { apiClient } from "@/shared/lib/apiClient";
import type { ChatChunk, ChatRequest, ChatSession } from "../model/types";

export const chatApi = {
  getAll: (token: string) =>
    apiClient.get<ChatSession[]>("/ai/chats", token),

  getSession: (sessionId: string) =>
    apiClient.get<ChatSession>(`/ai/chat/${sessionId}`),

  deleteSession: (sessionId: string) =>
    apiClient.delete(`/ai/chat/${sessionId}`),

  streamMessage: (
    data: ChatRequest,
    onChunk: (chunk: ChatChunk) => void,
    onDone: () => void,
    onError: (err: Error) => void
  ): (() => void) => {
    const controller = new AbortController();

    fetch(`${apiClient.baseUrl}/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok || !res.body) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });
          const lines = text.split("\n").filter((l) => l.startsWith("data:"));

          for (const line of lines) {
            try {
              const chunk: ChatChunk = JSON.parse(line.slice(5).trim());
              onChunk(chunk);
              if (chunk.done) {
                onDone();
                return;
              }
            } catch {
              // skip malformed lines
            }
          }
        }
        onDone();
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") onError(err);
      });

    return () => controller.abort();
  },
};
