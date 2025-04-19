"use server";

import { 
  getProjects, 
  getProject, 
  insertProject, 
  removeProject, 
} from "@/functions/db/project";
import { ProjectSchema } from "@/validation/project";
import { withAuth } from "@/helper/with-auth";
import { ProjectIDSchema } from "@/validation/id";
import { getProjectComponents } from "@/functions/db/component";
import { Project } from "@/types/project";

const fetchProjects = async () => 
  withAuth<Project[]>(async (orgId) => {
    const projects = await getProjects(orgId);

    return {
      data: projects,
      message: "Projects fetched successfully",
      code: 200
    };
  });

const fetchFullProject = async (id: string) =>
  withAuth(async (orgId) => {
    const validatedID = ProjectIDSchema.parse({ id });

    const project = await getProject(validatedID.id, orgId);
    const components = await getProjectComponents(id);

    return {
      data: project,
      components,
      code: 200,
      message: "Project fetched successfully" 
    };
  });


const createProject = async (projectData: { 
  name: string; 
  description ?: string 
}) =>
  withAuth(async (orgId) => {
    const { name, description } = projectData;

    const validatedProject = ProjectSchema.parse({ name, description });

    const project = await insertProject(
      orgId, 
      validatedProject.name, 
      validatedProject.description || ""
    );

    return { 
      data: project, 
      message: "Project created successfully",
      code: 200
    };
  },);


const deleteProject = async (id: string) =>
  withAuth(async (orgId) => {
    const validatedID = ProjectIDSchema.parse({ id });

    const succes = await removeProject(validatedID.id, orgId);

    if (!succes) {
      return { 
        message: "Failed to delete project",
        code: 400 
      };
    }

    return {
      message: "Project deleted successfully",
      code: 200 
    };
  });

export { 
  fetchProjects,
  fetchFullProject,
  createProject,
  deleteProject,
};