import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  discription: z.string().min(1, "Discription is required."),
});
