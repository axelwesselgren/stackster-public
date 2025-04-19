import { getDiscoverComponents } from "@/actions/component";
import { DiscoverComponent } from "@/types/component";
import { useEffect, useState } from "react";

function useDiscoverComponents() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [components, setComponents] = useState<DiscoverComponent[]>([]);

  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);

      const { data, message, code } = await getDiscoverComponents();

      setLoading(false);

      if (code !== 200) {
        setError(new Error(message));
        return;
      }

      if (!data) {
        setError(new Error("No components found"));
        return;
      }

      setComponents(data);
    };

    fetchComponents();
  }, []);

  return {
    loading,
    components,
    error,
  };
}

export { useDiscoverComponents };
