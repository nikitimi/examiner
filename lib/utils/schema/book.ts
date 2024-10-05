import z from "zod";
import { multipleChoiceSchema } from "./multipleChoice";
import { generalQuestionSchema } from "./general";
import { trueFalseSchema } from "./trueFalse";

export type MultipleChoiceBook = z.infer<typeof multipleChoiceBookSchema>;
export type GeneralQuestionBook = z.infer<typeof generalQuestionBookSchema>;
export type TrueFalseBook = z.infer<typeof trueFalseBookSchema>;

const bookSchema = z.object({
  author: z.string(),
  edition: z.string(),
  title: z.string(),
});

export const multipleChoiceBookSchema = bookSchema.extend({
  data: z.array(
    z.object({
      chapter: z.string(),
      questions: z.array(multipleChoiceSchema),
      topic: z.string(),
    })
  ),
});
export const generalQuestionBookSchema = bookSchema.extend({
  data: z.array(
    z.object({
      chapter: z.string(),
      questions: z.array(generalQuestionSchema),
      topic: z.string(),
    })
  ),
});
export const trueFalseBookSchema = bookSchema.extend({
  data: z.array(
    z.object({
      chapter: z.string(),
      questions: z.array(trueFalseSchema),
      topic: z.string(),
    })
  ),
});
