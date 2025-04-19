import { fetchComponents } from "@/actions/component";
import { fetchKeysComponent } from "@/actions/keys";
import { fetchFullProject, fetchProjects } from "@/actions/project";
import { useQuery } from "@tanstack/react-query";

export function useProjectQuery(projectId: string) {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchFullProject(projectId),
    enabled: !!projectId,
  });
}

export function useProjectsQuery() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => { 
      const response = await fetchProjects();
      return response.data;
    },
  });
}

export function useComponentsQuery(projectId: string) {
  return useQuery({
    queryKey: ["components", projectId],
    queryFn: () => fetchComponents(projectId),
    enabled: !!projectId,
  })
}

export function useCompKeyQuery(projectId: string) {
  return useQuery({
    queryKey: ["keys", projectId],
    queryFn: () => fetchKeysComponent(projectId),
    enabled: !!projectId,
  })
}
