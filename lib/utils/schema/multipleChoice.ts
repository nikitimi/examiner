import { z } from "zod";
import { questionTypeEnum } from "../schema/questionTypeEnum";

export type MultipleChoice = z.infer<typeof multipleChoiceSchema>;

export const multipleChoiceSchema = z.object({
  data: z.array(
    z.object({
      choices: z.array(z.string()),
      correctAnswer: z.object({
        answer: z.string(),
        explanation: z.string(),
      }),
      hint: z.union([z.string(), z.undefined()]),
      question: z.string(),
      reference: z.string(),
    })
  ),
  type: z.literal(questionTypeEnum.enum.MULTIPLE_CHOICE),
});
