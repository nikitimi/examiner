import { z } from "zod";
import { questionTypeEnum } from "../schema/questionTypeEnum";

export type TrueFalse = z.infer<typeof trueFalseSchema>;

export const trueFalseSchema = z.object({
  data: z.array(
    z.object({
      choices: z.array(z.boolean()),
      correctAnswer: z.object({
        answer: z.boolean(),
        explanation: z.string(),
      }),
      hint: z.union([z.string(), z.undefined()]),
      question: z.string(),
      reference: z.string(),
    })
  ),
  type: z.literal(questionTypeEnum.enum.TRUE_FALSE),
});
