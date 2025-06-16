import { DashboardSidebar } from "@/components/sidebar";
import { getSession } from "@/lib/session";
import { SessionProvider } from "@/modules/auth/utils/sync-session";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}