import { fetchKeysComponent } from "@/actions/keys";
import { Key } from "@/types/key";
import { useCallback, useEffect, useMemo, useState } from "react";

function useKeyComponents(componentId: string) {
  const [keys, setKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getKeys() {
      try {
        setLoading(true);

        if (!componentId) {
          setError(new Error("Missing required fields"));
          return;
        }

        const { 
          data: fetchedKeys, 
          message, 
          code 
        } = await fetchKeysComponent(componentId);

        if (code && code !== 200) {
          setError(new Error(message || "Error fetching keys"));
          return;
        }

        if (!fetchedKeys) {
          setError(new Error("An error occurred while fetching keys."));
          return;
        }

        setKeys(fetchedKeys);
        setError(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    getKeys();
  }, [componentId]);

  const addKey = useCallback((key: Key) => {
    setKeys((prevKeys) => [...prevKeys, key]);
  }, []);

  const removeKey = useCallback((keyToRemove: Key) => {
    setKeys((prevKeys) => prevKeys.filter((k) => k.id !== keyToRemove.id));
  }, []);

  const updateKey = useCallback((updatedKey: Key) => {
    setKeys((prevKeys) =>
      prevKeys.map((k) => (k.id === updatedKey.id ? updatedKey : k))
    );
  }, []);

  const returnValue = useMemo(
    () => ({
      isPending: loading,
      error,
      keys,
      addKey,
      removeKey,
      updateKey,
    }),
    [loading, error, keys, addKey, removeKey, updateKey]
  );

  return returnValue;
}

export { useKeyComponents };