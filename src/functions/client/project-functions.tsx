import { copyComponent } from "@/actions/component";
import { DiscoverComponent } from "@/types/component";
import { useToast } from "@/hooks/use-toast";

function useProjectFunctions() {
  const { toast } = useToast();
  
  async function linkDiscoverComp({ 
    component,
    projectId
  }: { 
    component: DiscoverComponent;
    projectId: string;
  }) {
    const { message, code } = await copyComponent({
      componentId: component.id,
      projectId: projectId,
    });

    if (code !== 200) {
      toast({
        title: "Something went wrong",
        description: message,
      });

      return;
    }

    toast({
      title: "Action completed",
      description: message,
    });
  }

  return {
    linkDiscoverComp,
  };
}

export { useProjectFunctions };
