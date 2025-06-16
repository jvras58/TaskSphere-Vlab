import { getSession } from '@/lib/session';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-2">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        Bem-vindo, {session?.user?.name || ''}
        <br />
        {session?.user?.role ? `Perfil: ${session.user.role.name}` : ''}
      </p>
    </div>
  );
}