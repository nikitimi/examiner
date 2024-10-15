import { z } from "zod";

export type AppInitialSettings = z.infer<typeof appInitialSettings>;

const appInitialSettings = z.object({
  name: z.string(),
  version: z.string(),
  currentEmoji: z.string(),
  whenAppLatestMessage: z.string(),
  uri: z.string(),
});

export default appInitialSettings;
