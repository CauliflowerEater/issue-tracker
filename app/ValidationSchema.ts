import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  discription: z.string().min(1, "Discription is required.").max(65535),
});
export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  discription: z
    .string()
    .min(1, "Discription is required.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});
