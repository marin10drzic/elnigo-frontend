import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../api/chatApi";
import { queryKeys } from "@/entities/shared/queryKeys";
import { authStore } from "@/shared/lib/authStore";

export function useChatSessions() {
  const token = authStore.getToken() ?? "";
  return useQuery({
    queryKey: queryKeys.chat.all,
    queryFn: () => chatApi.getAll(token),
    enabled: !!token,
  });
}
