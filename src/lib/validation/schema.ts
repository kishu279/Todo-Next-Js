import { z } from "zod";

export const todo = z.object({
  userId: z.string().min(1, "UserId is required"),
  todo: z.string().min(1, "Todo text is required"),
  completed: z.boolean(),
});
