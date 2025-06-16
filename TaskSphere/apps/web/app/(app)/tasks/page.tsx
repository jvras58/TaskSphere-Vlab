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
import { CreateEditTaskDialog } from "@/modules/task/components/create-update-task-dialog";
import { TaskList } from "@/modules/task/components/task-list";


export const metadata: Metadata = {
  title: "Tasks",
};

export default async function TaskPage() {
  return (
     <ContentLayout className="pt-8 pb-8 px-4 sm:px-8" title="Taref">
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
              <BreadcrumbPage>Tarefas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CreateEditTaskDialog projectId="" />
      </div>
      <div className="mx-10 mt-10 mb-10 space-y-28">
        <TaskList projectId=""/>
      </div>
    </ContentLayout>
  );
}
