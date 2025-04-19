"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StackComponent } from "@/types/component";
import { fetchComponents } from "@/actions/component";
import { useState } from "react";

export const useComponents = () => {
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  const {
    data: components = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['components', currentProjectId],
    queryFn: async () => {
      if (!currentProjectId) {
        return [];
      }
      
      const { data, code, message } = await fetchComponents(currentProjectId);
      
      if (code && code !== 200) {
        throw new Error(message || "Error fetching components");
      }
      
      if (!data) {
        throw new Error("Failed to fetch components");
      }
      
      return data;
    },
    enabled: !!currentProjectId,
  });

  const addComponentMutation = useMutation({
    mutationFn: (component: StackComponent) => {
      return Promise.resolve(component);
    },
    onSuccess: (newComponent) => {
      queryClient.setQueryData(['components', currentProjectId], (oldData: StackComponent[] = []) => [
        newComponent,
        ...oldData,
      ]);
    },
  });

  return {
    components,
    error,
    setCurrentProjectId,
    addComponent: addComponentMutation.mutate,
    loading,
    addComponentIsPending: addComponentMutation.isPending,
  };
};