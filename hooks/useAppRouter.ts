import type { Routes } from "@/lib/utils/route";
import { type Href, useRouter } from "expo-router";

export const useAppRouter = () => {
  const router = useRouter();
  return {
    push: (route: Routes) => router.push(route as Href),
    replace: (route: Routes) => router.replace(route as Href),
  };
};
