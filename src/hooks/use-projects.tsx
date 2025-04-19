"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProjects } from "@/actions/project";
import { authClient } from "@/auth-client";
import { Project } from "@/types/project";
import { useState, useMemo } from "react";

export const useProjects = () => {
  const [currentProjectId, setCurrentProjectId] = useState<string>("");

  const queryClient = useQueryClient();
  const { data: org } = authClient.useActiveOrganization();

  const {
    data: projects = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['projects', org?.id],
    queryFn: async () => {
      const { 
        data: fetchedProjects 
      } = await fetchProjects();

      if (!fetchedProjects) {
        return [];
      }

      return fetchedProjects;
    },
    enabled: !!org,
  });

  const addProjectMutation = useMutation({
    mutationFn: (project: Project) => {
      return Promise.resolve(project);
    },
    onSuccess: (newProject) => {
      queryClient.setQueryData(['projects', org?.id], (oldData: Project[] = []) => [
        newProject,
        ...oldData,
      ]);
    },
  });

  const removeProjectMutation = useMutation({
    mutationFn: (projectId: string) => {
      return Promise.resolve(projectId);
    },
    onSuccess: (projectId) => {
      queryClient.setQueryData(['projects', org?.id], (oldData: Project[] = []) =>
        oldData.filter((project) => project.id !== projectId)
      );
    },
  });

  const currentProject = useMemo(
    () => projects.find((project) => project.id === currentProjectId),
    [projects, currentProjectId]
  );

  return {
    projects,
    error,
    addProject: addProjectMutation.mutate,
    removeProject: removeProjectMutation.mutate,
    setCurrentProjectId,
    currentProject,
    currentProjectId,
    loading,
    addProjectIsPending: addProjectMutation.isPending,
    removeProjectIsPending: removeProjectMutation.isPending,
  };
};