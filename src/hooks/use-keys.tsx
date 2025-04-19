"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Key } from "@/types/key";
import { authClient } from "@/auth-client";
import { fetchKeys } from "@/actions/keys";

export function useKeys() {
  const queryClient = useQueryClient();
  const { data: org } = authClient.useActiveOrganization();
  
  const { 
    data: keys = [], 
    isPending, 
    error 
  } = useQuery({
    queryKey: ['keys', org?.id],
    queryFn: async () => {
      const { data: fetchedKeys, message, code } = await fetchKeys();
      
      if (code && code !== 200) {
        throw new Error(message || "Error fetching keys");
      }
      
      if (!fetchedKeys) {
        throw new Error("An error occurred while fetching keys.");
      }
      
      return fetchedKeys;
    },
    // Disabled if no org is selected
    enabled: !!org
  });
  
  // Mutation for adding a key
  const addKeyMutation = useMutation({
    mutationFn: (key: Key) => {
      // Implement your API call to add a key here
      // For example: return addKeyToAPI(key);
      // For now, just returning the key to simulate
      return Promise.resolve(key);
    },
    onSuccess: (newKey) => {
      // Update the cache after successful mutation
      queryClient.setQueryData(['keys', org?.id], (oldData: Key[] = []) => [
        ...oldData,
        newKey,
      ]);
    },
  });
  
  const removeKeyMutation = useMutation({
    mutationFn: (keyToRemove: Key) => {
      return Promise.resolve(keyToRemove);
    },
    onSuccess: (removedKey) => {
      queryClient.setQueryData(['keys', org?.id], (oldData: Key[] = []) => 
        oldData.filter((k) => k.id !== removedKey.id)
      );
    },
  });
  
  const updateKeyMutation = useMutation({
    mutationFn: (updatedKey: Key) => {
      return Promise.resolve(updatedKey);
    },
    onSuccess: (updatedKey) => {
      queryClient.setQueryData(['keys', org?.id], (oldData: Key[] = []) =>
        oldData.map((k) => (k.id === updatedKey.id ? updatedKey : k))
      );
    },
  });
  
  return {
    keys,
    isPending,
    error,
    addKey: addKeyMutation.mutate,
    removeKey: removeKeyMutation.mutate,
    updateKey: updateKeyMutation.mutate,
    addKeyIsPending: addKeyMutation.isPending,
    removeKeyIsPending: removeKeyMutation.isPending,
    updateKeyIsPending: updateKeyMutation.isPending,
  };
}