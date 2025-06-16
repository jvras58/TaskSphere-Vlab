import { DashboardSidebar } from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {children}
      </main>
    </div>
  );
}