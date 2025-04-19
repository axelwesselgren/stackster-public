import { ComponentIDSchema, ProjectIDSchema } from "@/validation/id";
import { executeQuery } from "@/helper/execute";
import { ComponentInsertSchema } from "@/validation/component";
import { DiscoverComponent, StackComponent } from "@/types/component";

const getProjectComponents = async (
  projectId: string
): Promise<StackComponent[]> => {
  const validatedProjectID = ProjectIDSchema.parse({ id: projectId });

  return executeQuery(async (sql) => {
    const components = await sql`
      SELECT * FROM "stack_component" 
      WHERE "projectId" = ${validatedProjectID.id.toString()}
    `;

    return components as StackComponent[];
  });
};

const insertComponent = async (
  projectId: string,
  name: string,
  description: string,
  instructions: string
): Promise<StackComponent> => {
  const validatedProjectID = ProjectIDSchema.parse({ id: projectId });
  const validatedComponent = ComponentInsertSchema.parse({
    projectId: validatedProjectID.id,
    name,
    description,
    instructions,
  });

  return executeQuery(async (sql) => {
    const result = await sql`
      INSERT INTO "stack_component" ("projectId", "name", "description", "setup")
      VALUES (${validatedProjectID.id}, ${validatedComponent.name}, ${validatedComponent.description || ""}, ${validatedComponent.instructions || ""})
      RETURNING *
    `;

    if (!result.length) {
      throw new Error("Failed to create component");
    }

    return result[0] as StackComponent;
  });
};

const duplicateComponent = async (
  compId: string,
  projectId: string
): Promise<boolean> => {
  const validCompID = ComponentIDSchema.parse({ id: compId });
  const validProjectID = ProjectIDSchema.parse({ id: projectId });

  return executeQuery(async (sql) => {
    const result = await sql`
      INSERT INTO "stack_component" ("name", "description", "setup", "projectId")
      SELECT "name", "description", "setup", ${validProjectID.id}
      FROM "discover_component"
      WHERE id = ${validCompID.id}
      RETURNING id
    `;

    return result.length > 0;
  });
};

const getDiscoverComps = async (): Promise<DiscoverComponent[]> => {
  return executeQuery(async (sql) => {
    const result = await sql`
      SELECT "id", "name", "description", "tag"
      FROM "discover_component"
    `

    return result as DiscoverComponent[]
  });
}

export {
  getProjectComponents,
  insertComponent,
  executeQuery,
  duplicateComponent,
  getDiscoverComps
}