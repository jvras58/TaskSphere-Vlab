import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/session";
import { SessionProvider } from "@/modules/auth/utils/sync-session";
import { DashboardSidebar } from "@/components/sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
          <AppSidebar />
            {children}
      </SidebarProvider>
    </SessionProvider>
  );
}