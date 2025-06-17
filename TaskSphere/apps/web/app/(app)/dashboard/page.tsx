import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/content-layout";
import Link from "next/link";
import { Metadata } from "next";
import { CreateEditProjectDialog } from "@/modules/project/components/create-update-project-dialog";
import { DashboardCard } from "@/modules/dashboard/components/dashboard-card";
import { CheckCircle2, ClipboardList, ListTodo } from "lucide-react";


export const metadata: Metadata = {
  title: "Dashboard - Projetos",
};

export default async function DashboardPage() {
  return (
     <ContentLayout className="pt-8 pb-8 px-4 sm:px-8" title="Dashboard">
      <div className="flex w-full justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Início</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/projects">Projetos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CreateEditProjectDialog />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <DashboardCard title="Projetos ativos" queryKey="projects" />
      <DashboardCard title="Tarefas pendentes" queryKey="tasks" filter="todo" />
      <DashboardCard title="Tarefas concluídas" queryKey="tasks" filter="done" />

      </section>
      {/* <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Projetos Recentes</h2>
        <RecentProjects />
      </section> */}

      
    </ContentLayout>
  );
}
