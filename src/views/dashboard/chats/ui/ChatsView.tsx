"use client";

import { useState } from "react";
import { MessageSquare, ChevronDown, ChevronRight, Trash2, User, Bot } from "lucide-react";
import { useChatSessions, useDeleteChatSession } from "@/entities/chat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/dialog";

export function ChatsView() {
  const { data: sessions, isLoading, isError } = useChatSessions();
  const { mutate: deleteSession, isPending: isDeleting } = useDeleteChatSession();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const toggleExpand = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteSession(deleteTarget, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-serif text-white">Chat Sessions</h1>
        <p className="text-stone-500 text-sm mt-1">All AI assistant conversations</p>
      </div>

      {isError && (
        <div className="border border-red-900/40 bg-red-950/20 px-4 py-3 text-red-400 text-sm">
          Failed to load chat sessions.
        </div>
      )}

      <div className="border border-stone-800 bg-[#0a0908]">
        <Table>
          <TableHeader>
            <TableRow className="border-stone-800 hover:bg-transparent">
              <TableHead className="text-stone-500 text-xs tracking-widest uppercase w-8" />
              <TableHead className="text-stone-500 text-xs tracking-widest uppercase">Session ID</TableHead>
              <TableHead className="text-stone-500 text-xs tracking-widest uppercase">Messages</TableHead>
              <TableHead className="text-stone-500 text-xs tracking-widest uppercase">Last message</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-stone-800">
                  <TableCell><Skeleton className="h-4 w-4 bg-stone-800" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48 bg-stone-800" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-10 bg-stone-800" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-64 bg-stone-800" /></TableCell>
                  <TableCell />
                </TableRow>
              ))}

            {!isLoading && sessions?.length === 0 && (
              <TableRow className="border-stone-800">
                <TableCell colSpan={5} className="text-center py-16">
                  <MessageSquare className="w-8 h-8 text-stone-700 mx-auto mb-3" />
                  <p className="text-stone-500 text-sm">No chat sessions yet</p>
                </TableCell>
              </TableRow>
            )}

            {sessions?.map((session) => {
              const messages = session.messages ?? [];
              const lastMsg = messages[messages.length - 1];
              const isOpen = expanded === session.session_id;

              return (
                <>
                  <TableRow
                    key={session.session_id}
                    className="border-stone-800 cursor-pointer hover:bg-stone-900/40"
                    onClick={() => toggleExpand(session.session_id)}
                  >
                    <TableCell className="text-stone-600">
                      {isOpen
                        ? <ChevronDown className="w-4 h-4" />
                        : <ChevronRight className="w-4 h-4" />}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-stone-400">
                      {session.session_id}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">
                        {messages.length}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-stone-400 text-sm max-w-xs truncate">
                      {lastMsg?.content ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-stone-600 hover:text-red-400 hover:bg-transparent"
                        onClick={(e) => { e.stopPropagation(); setDeleteTarget(session.session_id); }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>

                  {isOpen && (
                    <TableRow key={`${session.session_id}-messages`} className="border-stone-800 bg-stone-950/40">
                      <TableCell colSpan={5} className="py-4 px-6">
                        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-2">
                          {messages.map((msg, i) => (
                            <div key={i} className={`flex gap-3 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-amber-500/20" : "bg-stone-800"}`}>
                                {msg.role === "user"
                                  ? <User className="w-3 h-3 text-amber-400" />
                                  : <Bot className="w-3 h-3 text-stone-400" />}
                              </div>
                              <div className={`text-xs leading-relaxed px-3 py-2 max-w-lg ${msg.role === "user" ? "bg-amber-500/10 text-amber-100" : "bg-stone-900 text-stone-300"}`}>
                                {msg.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="bg-[#0f0e0d] border border-stone-800 text-stone-200 sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Session</DialogTitle>
          </DialogHeader>
          <p className="text-stone-400 text-sm">
            Are you sure you want to delete this chat session? This cannot be undone.
          </p>
          <DialogFooter className="gap-2 mt-2">
            <Button variant="outline" className="border-stone-700 text-stone-300" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500 text-white"
              disabled={isDeleting}
              onClick={confirmDelete}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
