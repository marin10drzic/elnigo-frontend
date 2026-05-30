"use client";

import { MessageSquare } from "lucide-react";

export function ChatsView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-serif text-white">Chat Sessions</h1>
        <p className="text-stone-500 text-sm mt-1">AI chat history overview</p>
      </div>

      <div className="border border-stone-800 rounded-none p-16 flex flex-col items-center justify-center text-center bg-[#0a0908]">
        <MessageSquare className="w-10 h-10 text-amber-900/50 mb-4" />
        <p className="text-stone-400 text-sm font-medium mb-1">No List Endpoint Available</p>
        <p className="text-stone-600 text-xs max-w-sm leading-relaxed">
          Chat history is stored per session. Sessions appear here when users interact with the chat
          widget. The API provides per-session access via{" "}
          <code className="text-amber-700 text-[11px]">GET /ai/chat/{"{session_id}"}</code> — a
          list endpoint is not currently exposed.
        </p>
      </div>
    </div>
  );
}
