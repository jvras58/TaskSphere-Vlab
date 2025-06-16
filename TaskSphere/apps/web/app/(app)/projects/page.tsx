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
import { ProjectList } from "@/modules/project/components/project-list";


export const metadata: Metadata = {
  title: "Projetos",
};

export default async function ProjectPage() {
  return (
     <ContentLayout className="pt-8 pb-8 px-4 sm:px-8" title="Projetos">
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
              <BreadcrumbPage>Projetos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CreateEditProjectDialog />
      </div>
      <div className="mx-10 mt-10 mb-10 space-y-28">
        <ProjectList/>
      </div>
    </ContentLayout>
  );
}
