"use server";

import { duplicateComponent, getDiscoverComps, getProjectComponents, insertComponent } from "@/functions/db/component";
import { withAuth } from "@/helper/with-auth";
import { ComponentInsertSchema } from "@/validation/component";
import { ComponentIDSchema, ProjectIDSchema } from "@/validation/id";
import { DiscoverComponent, StackComponent } from "@/types/component";
import { APIResponse } from "@/types/response";

const copyComponent = async (data: {
  componentId: string,
  projectId: string
}): Promise<APIResponse<null>> =>
  withAuth<null>(async (orgId) => {
    const { componentId, projectId } = data;

    const validCompID = ComponentIDSchema.parse({ id: componentId });
    const validProjectID = ProjectIDSchema.parse({ id: projectId });

    const succes = await duplicateComponent(validCompID.id, validProjectID.id);

    if (!succes) {
      return {
        data: null,
        message: "Failed to copy component",
        code: 400
      }
    }

    return {
      data: null,
      message: "Component successfully copied",
      code: 200
    }
  });
    
const createComponent = async (componentData: {
  projectId: string;
  name: string; 
  description: string; 
  instructions: string;
}): Promise<APIResponse<StackComponent>> =>
  withAuth<StackComponent>(async (orgId) => {
    const { projectId, name, description, instructions } = componentData;

    const validatedComponent = ComponentInsertSchema.parse({ name, description, instructions });
    const validatedProject = ProjectIDSchema.parse({ id: projectId });

    const component = await insertComponent(
      validatedProject.id, 
      validatedComponent.name, 
      validatedComponent.description || "", 
      validatedComponent.instructions || ""
    );

    return {
      data: component,
      message: "Component created successfully",
      code: 200
    }
  });


const fetchComponents = async (id: string): Promise<APIResponse<StackComponent[]>> =>
  withAuth<StackComponent[]>(async (orgId) => {
    const validatedID = ProjectIDSchema.parse({ id });

    const components = await getProjectComponents(validatedID.id);

    return {
      data: components,
      message: "Components fetched successfully",
      code: 200
    };
  });

const getDiscoverComponents = async (): Promise<APIResponse<DiscoverComponent[]>> =>
  withAuth<DiscoverComponent[]>(async (orgId) => {
    const components = await getDiscoverComps();

    return {
      data: components,
      message: "Components fetched successfully",
      code: 200
    }
  });

export {
  copyComponent,
  createComponent,
  fetchComponents,
  getDiscoverComponents
}