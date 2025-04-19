import { Project } from "@/types/project";
import { executeQuery } from "@/helper/execute";
import { ProjectSchema } from "@/validation/project";
import { OrgIDSchema, ProjectIDSchema } from "@/validation/id";

const getProjects = async (orgId: string): Promise<Project[]> => {
  if (!orgId) throw new Error('Organization ID is required');
  
  return executeQuery(async (sql) => {
    const projects = await sql`SELECT * FROM "project" WHERE "orgId" = ${orgId}`;
  
    return projects as Project[];
  });
};

const getProject = async (projectId: string, orgId: string): Promise<Project | null> => {
  const validatedProjectID = ProjectIDSchema.parse({ id: projectId });
  const validatedOrgID = OrgIDSchema.parse({ id: orgId });
  
  return executeQuery(async (sql) => {
    const result = await sql`
      SELECT * FROM "project" 
      WHERE "id" = ${validatedProjectID.id.toString()} AND "orgId" = ${validatedOrgID.id}
    `;
    
    return result.length ? (result[0] as Project) : null;
  });
};

const insertProject = async (
  orgId: string, 
  name: string, 
  description: string
): Promise<Project> => {
  const validatedOrgID = OrgIDSchema.parse({ id: orgId });
  const validatedProject = ProjectSchema.parse({ name, description });
  
  return executeQuery(async (sql) => {
    const result = await sql`
      INSERT INTO "project" ("orgId", "name", "description") 
      VALUES (${validatedOrgID.id}, ${validatedProject.name}, ${validatedProject.description}) 
      RETURNING *
    `;
    
    if (!result.length) {
      throw new Error('Failed to create project');
    }
    
    return result[0] as Project;
  });
};

const removeProject = async (projectId: string, orgId: string): Promise<boolean> => {
  const validatedProjectID = ProjectIDSchema.parse({ id: projectId });
  const validatedOrgID = OrgIDSchema.parse({ id: orgId });
  
  return executeQuery(async (sql) => {
    const result = await sql`
      DELETE FROM "project" 
      WHERE "id" = ${validatedProjectID.id.toString()} AND "orgId" = ${validatedOrgID}
      RETURNING id
    `;
    
    return result.length > 0;
  });
};

export {
  getProjects,
  getProject,
  insertProject,
  removeProject,
}