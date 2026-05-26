# Project Architecture — Feature-Sliced Design (FSD)

Reference: https://feature-sliced.design/docs/get-started/overview

## Layer Overview (lowest → highest)

Layers can only import from layers **below** them. Never import upward.

```
pages
  └── widgets
        └── features
              └── entities
                    └── shared
```

---

## `/src/shared`

The foundation. No imports from any other layer.

```
src/shared/
  components/       # Pure UI components — no backend calls, no business logic
  constants/        # App-wide constants (routes, config values, enums)
  lib/              # Generic utilities (formatters, helpers, hooks)
  types/            # Shared TypeScript types
  ui/               # Design system primitives (Button, Input, Modal, ...)
```

**Rules:**
- Components here are fully reusable and stateless (or local state only)
- Zero API calls — if it touches the backend, it does not belong here
- No imports from `entities`, `features`, `widgets`, or `pages`

---

## `/src/entities`

Business domain objects and all backend communication.

```
src/entities/
  shared/
    queryKeys.ts    # ALL React Query / TanStack Query keys go here as constants
  [entity]/         # e.g. user/, product/, order/
    api/            # API functions (fetch, create, update, delete)
    model/          # Types, interfaces, Zod schemas for this entity
    hooks/          # Data-fetching hooks (useQuery, useMutation wrappers)
    index.ts        # Public API — export only what other layers need
```

**`entities/shared/queryKeys.ts` example:**
```ts
export const queryKeys = {
  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
  },
  products: {
    all: ['products'] as const,
    list: (filters: unknown) => ['products', 'list', filters] as const,
  },
}
```

**Rules:**
- All backend functions (axios/fetch calls) live inside an entity's `api/` folder
- Always use `queryKeys` from `entities/shared/queryKeys.ts` — never inline string arrays
- Can import from `shared` only
- Each entity exposes a clean `index.ts` — other layers import from there, not deep paths

---

## `/src/features`

User-facing interactions that combine UI with backend calls.

```
src/features/
  [feature-name]/   # e.g. auth-login/, product-filter/, cart-add-item/
    ui/             # Feature-specific components
    model/          # Local state, form logic, derived state
    api/            # Feature-specific mutations (if not covered by entities)
    index.ts
```

**Rules:**
- Can import from `shared` and `entities`
- Contains the logic that connects UI actions to backend operations
- A feature is a user action, not a page section (e.g. "login", "add to cart", "filter products")

---

## `/src/widgets`

Large self-contained UI blocks composed of multiple features.

```
src/widgets/
  [widget-name]/    # e.g. header/, product-catalog/, user-profile-panel/
    ui/
    index.ts
```

**Rules:**
- Can import from `shared`, `entities`, and `features`
- Widgets are reusable page sections, not full pages
- No page-specific logic — a widget should be droppable into any page

---

## `/src/pages`

Application routes. Each page assembles widgets into a full view.

```
src/pages/
  [page-name]/      # e.g. home/, product-detail/, checkout/
    ui/
    index.ts
```

**Rules:**
- Can import from all layers below
- Pages should be thin — just layout and widget composition
- No business logic or direct API calls in pages

---

## Import Rules Summary

| Layer     | Can import from                          |
|-----------|------------------------------------------|
| shared    | nothing (self-contained)                 |
| entities  | shared                                   |
| features  | shared, entities                         |
| widgets   | shared, entities, features               |
| pages     | shared, entities, features, widgets      |

---

## Query Keys Convention

Always define query keys in `src/entities/shared/queryKeys.ts`. Use them in every `useQuery` / `useMutation` / `queryClient.invalidateQueries` call.

```ts
// CORRECT
import { queryKeys } from '@/entities/shared/queryKeys'
useQuery({ queryKey: queryKeys.users.detail(id), queryFn: ... })

// WRONG — never inline
useQuery({ queryKey: ['users', id], queryFn: ... })
```

---

## Path Aliases

Use `@/` as the alias for `src/`:
- `@/shared/...`
- `@/entities/...`
- `@/features/...`
- `@/widgets/...`
- `@/pages/...`

---

## Backend API

Base URL: `http://localhost:8080/api/v1` (dev) / `https://api.restoran.hr/api/v1` (prod)

Auth: Supabase JWT — `Authorization: Bearer <token>` header.
- No token required: menu (GET), reservations (POST), availability check, AI chat
- `role: guest` required: `/reservations/my`, `/users/me`
- `role: admin` or `superadmin` required: all other write/admin endpoints

### Entities and their endpoints

| Entity | Endpoints |
|--------|-----------|
| **menu/category** | `GET /menu/categories` · `POST /menu/categories` (admin) · `PUT /menu/categories/{id}` (admin) · `DELETE /menu/categories/{id}` (admin) |
| **menu/item** | `GET /menu/items` · `GET /menu/items/{id}` · `POST /menu/items` (admin) · `PUT /menu/items/{id}` (admin) · `DELETE /menu/items/{id}` (admin) |
| **table** | `GET /tables` · `POST /tables` (admin) · `PUT /tables/{id}` (admin) · `DELETE /tables/{id}` (admin) |
| **reservation** | `GET /reservations` (admin) · `POST /reservations` (public) · `GET /reservations/availability` (public) · `GET /reservations/my` (guest) · `GET /reservations/{id}` (admin) · `PATCH /reservations/{id}` (admin) · `DELETE /reservations/{id}` |
| **ai/chat** | `POST /ai/chat` (SSE stream) · `GET /ai/chat/{session_id}` · `DELETE /ai/chat/{session_id}` |
| **user** | `GET /users/me` · `PUT /users/me` · `GET /users` (admin) · `PATCH /users/{id}/role` (superadmin) |

### Query params
- `GET /menu/items` — `?category_id=uuid&available_only=bool`
- `GET /reservations` — `?date=YYYY-MM-DD&status=pending|confirmed|cancelled|completed&table_id=uuid`
- `GET /reservations/availability` — `?date=YYYY-MM-DD&party_size=int` (both required)
- `GET /users` — `?role=guest|admin|superadmin`

### AI Chat
Streaming via SSE. Frontend generates a unique `session_id`. Response chunks: `{ session_id, message, done }`.

---

## Database Schema

PostgreSQL via Supabase. All IDs are UUIDs. RLS is enabled on all tables.

### Tables

**`menu_categories`** — `id`, `name`, `description`, `sort_order`, `created_at`

**`menu_items`** — `id`, `category_id` (→ menu_categories), `name`, `description`, `price` (numeric 10,2), `image_url`, `is_available` (bool, default true), `allergens` (text[]), `tags` (text[]), `sort_order`, `created_at`, `updated_at`

**`tables`** — `id`, `table_number` (unique int), `capacity`, `location` (unutra|terasa|vip), `is_active`, `created_at`

**`reservations`** — `id`, `table_id` (→ tables), `guest_name`, `guest_email`, `guest_phone`, `party_size`, `reserved_at` (timestamptz), `duration_mins` (default 90), `status` (pending|confirmed|cancelled|completed), `notes`, `created_at`, `updated_at`

**`chat_sessions`** — `id`, `session_id` (text, unique), `messages` (jsonb array), `created_at`, `updated_at`

**`user_profiles`** — `id` (→ auth.users), `full_name`, `phone`, `role` (guest|admin|superadmin, default guest), `avatar_url`, `created_at`, `updated_at`

### RLS rules
- Menu & tables: public read, admin write
- Reservations: public insert; guests see own (matched by email); admin sees all
- Chat sessions: open (per session_id)
- User profiles: each user sees/edits their own; admin can read all

### Key relations
- `menu_items.category_id` → `menu_categories.id` (SET NULL on delete)
- `reservations.table_id` → `tables.id` (SET NULL on delete)
- `user_profiles.id` → `auth.users.id` (CASCADE on delete)
- New Supabase auth user → auto-creates `user_profiles` row via trigger

---

## Query Keys (this project)

```ts
// src/entities/shared/queryKeys.ts
export const queryKeys = {
  menu: {
    categories: ['menu', 'categories'] as const,
    items: (filters?: { categoryId?: string; availableOnly?: boolean }) =>
      ['menu', 'items', filters] as const,
    item: (id: string) => ['menu', 'items', id] as const,
  },
  tables: {
    all: ['tables'] as const,
  },
  reservations: {
    all: (filters?: { date?: string; status?: string; tableId?: string }) =>
      ['reservations', filters] as const,
    my: ['reservations', 'my'] as const,
    detail: (id: string) => ['reservations', id] as const,
    availability: (date: string, partySize: number) =>
      ['reservations', 'availability', date, partySize] as const,
  },
  chat: {
    session: (sessionId: string) => ['chat', sessionId] as const,
  },
  users: {
    me: ['users', 'me'] as const,
    all: (role?: string) => ['users', role] as const,
  },
}
```
