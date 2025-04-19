"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { LoadingScreen } from "@/components/states/loading-screen";
import { ErrorScreen } from "@/components/states/error-screen";
import { ComponentCard } from "@/components/cards/component-card";
import { NoComponentState } from "@/components/states/Empty-state";
import { ProjectHeader } from "@/components/headers/project-header";
import { StackComponent } from "@/types/component";
import { useProjects } from "@/hooks/use-projects";
import { useComponents } from "@/hooks/use-components";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();

  const {
    currentProject,
    setCurrentProjectId,
    loading: projectLoading,
    error: projectError,
  } = useProjects();

  const {
    components,
    loading: compLoading,
    setCurrentProjectId: setCurrentProjectIdComp,
  } = useComponents();

  useEffect(() => {
    if (params.id) {
      setCurrentProjectId(params.id);
      setCurrentProjectIdComp(params.id);
    }
  }, [params, setCurrentProjectId, setCurrentProjectIdComp]); 

  if (projectError) {
    return <ErrorScreen title="Error" message={projectError.message} /> 
  }

  if (projectLoading) {
    return <LoadingScreen />
  }

  return (
    <div>
      <ProjectHeader name={currentProject?.name ?? ""} />
      {compLoading ? (
        <LoadingScreen />
      ) : components.length === 0 ? (
        <NoComponentState id={params.id} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {components && components.map((component: StackComponent) => (
            <ComponentCard 
              component={component} 
              key={component.id}
            />
          ))}

          <Link 
            href={`/dashboard/projects/${params.id}/create`} 
            className={cn(buttonVariants(), "col-span-1 md:col-span-2 xl:col-span-3 lg:hidden")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Component
          </Link>
        </div>
      )}
    </div>
  );
}