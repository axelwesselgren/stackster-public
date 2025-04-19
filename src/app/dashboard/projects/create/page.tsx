"use client";

import { ProjectForm } from "@/components/forms/project-form";
import { createProject } from "@/actions/project";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useProjects } from "@/hooks/use-projects";

export default function Page() {
	const { toast } = useToast();
	const router = useRouter();

	const { addProject } = useProjects();

	async function handleCreation({ name, description }: { name: string; description: string }) {
    const { 
      data: project, 
      message 
    } = await createProject({ name, description });

    if (!project) {
      toast({
        title: "An error occurred",
        description: message,
        variant: "destructive",
      });

      return;
    }

		addProject(project);

		router.push(`/dashboard/projects/${project.id}`);

    toast({
      title: "Project Created",
      description: "Your new project has been successfully created.",
    });
  }
    
  return (
    <ProjectForm createProject={handleCreation}/>
  );
}