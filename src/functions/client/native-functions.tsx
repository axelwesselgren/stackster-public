import { useAPIHandler } from "@/hooks/use-api-handler";
import { useToast } from "@/hooks/use-toast";

function useNativeFunctions() {
  const { toast } = useToast();
  const { defaultError, defaultSuccess } = useAPIHandler();

  async function copyToClipboard(value: string | undefined) {
    try {
      if (value && typeof value === "string") {
        await navigator.clipboard.writeText(value);
  
        toast({
          title: defaultSuccess,
          description: "Copied to clipboard",
        });
      }
    } catch (error) {
      console.error(error);
  
      toast({
        title: defaultError,
        description: "Failed to copy to clipboard",
      });
    }
  }

  return {
    copyToClipboard,
  };
}

export { useNativeFunctions };