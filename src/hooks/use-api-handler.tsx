import { useToast } from "@/hooks/use-toast";
import { APIResponse } from "@/types/response";

function useAPIHandler() {
  const { toast } = useToast();

  const defaultSuccess = "Success";
  const defaultError = "Something went wrong";

  async function handleFetch<T>(
    {
      fn,
      successTitle = defaultSuccess,
      errorTitle = defaultError,
      onSuccess,
    }: {
      fn: () => Promise<APIResponse<T>>;
      successTitle?: string;
      errorTitle?: string;
      onSuccess?: (data: T) => void;
    }
  ): Promise<{ success: boolean; data?: T }> {
    try {
      const { data, message, code } = await fn();

      if (code && code !== 200) {
        toast({
          title: errorTitle,
          description: message,
        });

        return { success: false };
      }

      toast({
        title: successTitle,
        description: message,
      });

      if (onSuccess && data) {
        onSuccess(data);
      }

      return { success: true, data };
    } catch (error) {
      console.error(error);

      toast({
        title: errorTitle,
        description: "Unexpected error occurred",
      });

      return { success: false };
    }
  }

  return {
    handleFetch,
    defaultError,
    defaultSuccess
  };
}

export { useAPIHandler };
