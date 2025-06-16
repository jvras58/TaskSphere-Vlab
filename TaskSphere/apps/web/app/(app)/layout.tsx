import { DashboardSidebar } from "@/components/sidebar";
import { getSession } from "@/lib/session";
import { SessionProvider } from "@/modules/auth/utils/sync-session";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SessionProvider>
  );
}