import { z } from "zod";

const ComponentInsertSchema = z.object({
  name: z
    .string()
    .min(1, "Component name is required")
    .max(50, "Component name must be less than 50 characters")
    .transform((value) => value.trim()),
  description: z
    .string()
    .max(100, "Component description must be less than 100 characters")
    .transform((value) => value.trim())
    .optional(),
  instructions: z
    .string()
    .max(500, "Component instructions must be less than 500 characters")
    .transform((value) => value.trim())
    .optional(),
});

export { 
  ComponentInsertSchema 
};
