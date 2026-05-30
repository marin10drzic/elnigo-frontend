"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import { MessageSquare, CalendarDays, UtensilsCrossed, Users, ChefHat, LogOut } from "lucide-react";
import { authStore } from "@/shared/lib/authStore";

const navItems = [
  { label: "Chats",        href: "/dashboard/chats",        icon: MessageSquare },
  { label: "Reservations", href: "/dashboard/reservations", icon: CalendarDays },
  { label: "Menu",         href: "/dashboard/menu",         icon: UtensilsCrossed },
  { label: "Users",        href: "/dashboard/users",        icon: Users },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const isLoginPage = pathname.endsWith("/login");

  useEffect(() => {
    if (isLoginPage) return;
    const token = authStore.getToken();
    if (!token) {
      const locale = pathname.split("/")[1] ?? "de";
      router.replace(`/${locale}/dashboard/login`);
    } else {
      setReady(true);
    }
  }, [pathname, router, isLoginPage]);

  const handleSignOut = () => {
    authStore.clear();
    const locale = pathname.split("/")[1] ?? "de";
    router.replace(`/${locale}/dashboard/login`);
  };

  // login page renders standalone — no sidebar
  if (pathname.endsWith("/login")) {
    return <>{children}</>;
  }

  if (!ready) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#080706]">
        <Sidebar className="border-r border-stone-800">
          <SidebarHeader className="px-4 py-5">
            <div className="flex items-center gap-2">
              <ChefHat className="text-amber-400 w-5 h-5" />
              <span className="font-serif text-lg font-bold tracking-[0.2em] text-amber-400">EL NIGO</span>
            </div>
            <p className="text-[10px] text-stone-500 tracking-[0.3em] uppercase mt-0.5">Admin Dashboard</p>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-stone-600 text-[10px] tracking-[0.25em]">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map(({ label, href, icon: Icon }) => {
                    const active = pathname.includes(href);
                    return (
                      <SidebarMenuItem key={href}>
                        <SidebarMenuButton
                          isActive={active}
                          render={<Link href={href} />}
                          className="flex items-center gap-3"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm tracking-wide">{label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="px-4 py-4 border-t border-stone-800 flex flex-col gap-3">
            <Link href="/" className="text-xs text-stone-500 hover:text-amber-400 transition-colors tracking-wide">
              ← Back to website
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-xs text-stone-600 hover:text-red-400 transition-colors tracking-wide"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center h-14 border-b border-stone-800 px-4">
            <SidebarTrigger className="text-stone-400 hover:text-white" />
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
