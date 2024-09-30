import z from "zod";
import { multipleChoiceSchema } from "./multipleChoice";
import { generalQuestionSchema } from "./general";
import { trueFalseSchema } from "./trueFalse";

export type Book = z.infer<typeof bookSchema>;

export const bookSchema = z.object({
  author: z.string(),
  data: z.array(
    z.object({
      chapter: z.string(),
      questions: z.union([
        z.array(generalQuestionSchema),
        z.array(multipleChoiceSchema),
        z.array(trueFalseSchema),
      ]),
      topic: z.string(),
    })
  ),
  edition: z.string(),
  title: z.string(),
});
