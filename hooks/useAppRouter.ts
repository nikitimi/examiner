import type { Route } from "@/lib/utils/route";
import { useRouter } from "expo-router";

export const useAppRouter = () => {
  const router = useRouter();
  return {
    push: (route: Route) => router.push(route),
    replace: (route: Route) => router.replace(route),
  };
};
