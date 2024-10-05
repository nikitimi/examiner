export type Route = ReturnType<typeof routeHelper>;

const home = "home";
export const routes = ["foobar", "testbutton", home] as const;
export const routeHelper = (route: (typeof routes)[number]) => {
  const routePrefix = "/";
  if (route === home) return `${routePrefix}` as const;
  return `${routePrefix}${route}` as const;
};
