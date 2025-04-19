import { APIResponse } from "@/types/response";
import { z } from "zod";

const handleError = (error: unknown): APIResponse<null> => {
  if (error instanceof z.ZodError) {
    return {
      data: null,
      message: error.errors.map((e) => e.message).join(", "),
      code: 400,
    };
  }

  return {
    data: null,
    message:
      error instanceof Error ? error.message : "An unknown error occurred",
    code: 500,
  };
};

export { handleError };
