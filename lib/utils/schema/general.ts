import { z } from "zod";
import { questionTypeEnum } from "../schema/questionTypeEnum";

export type GeneralQuestion = z.infer<typeof generalQuestionSchema>;

/**
 * Includes essay, identification, and fill in the blank questions.
 * Maybe use AI to check if the answer is correct, since there are no choices
 * for these question types.
 */
export const generalQuestionSchema = z.object({
  data: z.array(
    z.object({
      correctAnswer: z.object({
        answer: z.string(),
        explanation: z.string(),
      }),
      hint: z.string(),
      question: z.string(),
      reference: z.string(),
    })
  ),
  type: z.union([
    z.literal(questionTypeEnum.enum.ESSAY),
    z.literal(questionTypeEnum.enum.FILL_IN_THE_BLANK),
    z.literal(questionTypeEnum.enum.IDENTIFICATION),
  ]),
});
