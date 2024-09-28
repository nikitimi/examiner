import { z } from "zod";

export type QuestionTypeEnum = z.infer<typeof questionTypeEnum>;

export const questionTypeEnum = z.enum([
  "ESSAY",
  "FILL_IN_THE_BLANK",
  "IDENTIFICATION",
  "MULTIPLE_CHOICE",
  "TRUE_FALSE",
]);
