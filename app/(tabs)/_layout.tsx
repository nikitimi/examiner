import { type Href, Tabs, usePathname } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { BLACK, Colors, WHITE } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { routeHelper, type RouteNames, routes } from "@/lib/utils/route";
import { useAppSelector } from "@/redux/store";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathName = usePathname();
  const excludedRoutes: RouteNames[] = ["profile"];
  const themeColor = useAppSelector((s) => s.theme.themeColor);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      {routes.map((route) => {
        const homeReferenceFilename = "index";
        const newHomeName = "home";
        const finalRouteName =
          route.name === homeReferenceFilename ? newHomeName : route.name;
        const computedRoute = routeHelper(route.name);
        const isActiveRoute = pathName === computedRoute;
        const textIconColor = isActiveRoute
          ? {
              color: `${themeColor}FF`,
            }
          : { color: `${WHITE}99` };
        const isRouteExcludedInTabs = excludedRoutes.includes(route.name);

        return (
          <Tabs.Screen
            key={route.name}
            name={route.name}
            options={{
              href: (isRouteExcludedInTabs
                ? null
                : computedRoute) as unknown as Href,
              tabBarIcon: () => (
                <TabBarIcon
                  name={
                    isActiveRoute ? route.icons.active : route.icons.inactive
                  }
                  size={isActiveRoute ? 24 : 22}
                  style={[
                    textIconColor,
                    isActiveRoute
                      ? styles.activeTabBarIconStyle
                      : styles.tabBarIconStyle,
                    { borderColor: `${themeColor}99` },
                  ]}
                />
              ),
              tabBarStyle: [
                styles.tabBarStyle,
                {
                  display: isRouteExcludedInTabs ? "none" : "flex",
                  borderTopColor: `${themeColor}33`,
                },
              ],
              tabBarLabelStyle: [styles.tabBarLabelStyle, textIconColor],
              title: isActiveRoute ? finalRouteName.replace(/_/g, " ") : "",
            }}
          />
        );
      })}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: BLACK,
  },
  tabBarLabelStyle: {
    textTransform: "capitalize",
  },
  tabBarIconStyle: {},
  activeTabBarIconStyle: {
    backgroundColor: BLACK,
    borderWidth: 2,
    width: 42,
    height: 42,
    borderRadius: 100,
    position: "absolute",
    textAlign: "center",
    verticalAlign: "middle",
    zIndex: 0,
    top: -10,
  },
});
