"use client";

import { ComponentForm } from "@/components/forms/component-form";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createComponent } from "@/actions/component";
import { useComponents } from "@/hooks/use-components";

export default function Create() {
  const params = useParams<{ id: string }>();

  const { toast } = useToast();
  const router = useRouter();
  const { addComponent } = useComponents();

  async function handleCreation({ 
    name, 
    description, 
    instructions 
  }: {
    name: string; 
    description: string; 
    instructions: string
  }) {
    const { 
      data: component, 
      code, 
      message 
    } = await createComponent({
      projectId: params.id, 
      name, 
      description, 
      instructions
    });

    if (code && code !== 200) {
      toast({
        title: "Something went wrong",
        description: message,
      });
      return;
    }

    if (!component) {
      toast({
        title: "Something went wrong",
        description: "Failed to create component",
      });
      return;
    }

    toast({
      title: "Component created",
      description: "The component has been created successfully",
    });

    addComponent(component);

    router.back();
  }

  return <ComponentForm createComponent={handleCreation}/>
}
