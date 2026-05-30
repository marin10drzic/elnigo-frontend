import { DashboardLayout } from "@/views/dashboard/layout/ui/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
