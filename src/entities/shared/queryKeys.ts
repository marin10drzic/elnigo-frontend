export const queryKeys = {
  menu: {
    categories: ["menu", "categories"] as const,
    items: (filters?: { categoryId?: string; availableOnly?: boolean }) =>
      ["menu", "items", filters] as const,
    item: (id: string) => ["menu", "items", id] as const,
  },
  tables: {
    all: ["tables"] as const,
  },
  reservations: {
    all: (filters?: { date?: string; status?: string; tableId?: string }) =>
      ["reservations", filters] as const,
    my: ["reservations", "my"] as const,
    detail: (id: string) => ["reservations", id] as const,
    availability: (date: string, partySize: number) =>
      ["reservations", "availability", date, partySize] as const,
  },
  chat: {
    all: ["chat"] as const,
    session: (sessionId: string) => ["chat", sessionId] as const,
  },
  users: {
    me: ["users", "me"] as const,
    all: (role?: string) => ["users", role] as const,
  },
};
