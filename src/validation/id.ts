import { z } from "zod";

const ProjectIDSchema = z.object({
  id: z
    .string()
    .uuid("Invalid project ID")
});

const OrgIDSchema = z.object({
  id: z
    .string()
    .nonempty("Organization ID is required")
});

const ComponentIDSchema = z.object({
  id: z
    .string()
    .uuid("Invalid component ID")
});

export {
    ProjectIDSchema,
    OrgIDSchema,
    ComponentIDSchema
}