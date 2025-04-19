import { z } from "zod";

const ProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(50, "Project name must be less than 50 characters")
    .transform(value => value.trim()),
  description: z
    .string()
    .max(100, "Project description must be less than 100 characters")
    .transform(value => value.trim())
    .optional()
});

export {  
  ProjectSchema,
};