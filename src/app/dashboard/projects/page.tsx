"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { deleteProject } from "@/actions/project";
import { useProjects } from "@/hooks/use-projects";
import { ProjectLanding } from "@/components/project/project-landing";
import { ProjectsHeader } from "@/components/headers/projects-header";
import { ProjectCards } from "@/components/cards/project-card";
import { useToast } from "@/hooks/use-toast";

export default function ReportList() {
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { projects, loading, removeProject } = useProjects();

  const { toast } = useToast();

  async function handleDuplication() {}

  async function handleDeletion(id: string) {
    setDeletionLoading(true);

    const { code, message } = await deleteProject(id);

    if (code === 401) {
      toast({
        title: "Something went wrong",
        description: message
      });
      return;
    }

    removeProject(projects[0].id);

    setDeletionLoading(false);
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <LoaderCircle className="animate-spin"/>
      </div>
    );
  }

  if (projects.length === 0) {
    return <ProjectLanding/>
  }

  return (
    <div>
      <ProjectsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ProjectCards 
        projects={projects}
        deleteProject={handleDeletion}
        deletionLoading={deletionLoading}
        duplicateProject={handleDuplication}
      />
    </div>
  );
}