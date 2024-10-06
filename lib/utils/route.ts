import { Ionicons } from "@expo/vector-icons";
import type { IconProps } from "@expo/vector-icons/build/createIconSet";
import type { ComponentProps } from "react";

export type IconNames = IconProps<
  ComponentProps<typeof Ionicons>["name"]
>["name"];
export type Routes = ReturnType<typeof routeHelper>;
export type RouteNames = (typeof routesName)[number];
export type RouteDetails = {
  name: RouteNames;
  icons: {
    active: IconNames;
    inactive: IconNames;
  };
};

const home = "index";
const routesName = [
  "random_questions",
  "review",
  "scoreboard",
  "profile",
  home,
] as const;

export const routes: RouteDetails[] = [
  {
    name: home,
    icons: {
      active: "home",
      inactive: "home-outline",
    },
  },
  {
    name: "random_questions",
    icons: {
      active: "search",
      inactive: "search-outline",
    },
  },
  {
    name: "review",
    icons: {
      active: "reader",
      inactive: "reader-outline",
    },
  },
  {
    name: "scoreboard",
    icons: {
      active: "bag",
      inactive: "bag-outline",
    },
  },
  {
    name: "profile",
    icons: {
      active: "book",
      inactive: "book-outline",
    },
  },
];

export const routeHelper = (route: RouteNames) => {
  const routePrefix = "/";
  if (route === home) return `${routePrefix}` as const;
  return `${routePrefix}${route}` as const;
};
