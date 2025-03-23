import { z } from "zod";

export const todo = z.object({
  userId: z.string(),
  todo: z.string(),
  completed: z.boolean(),
});
