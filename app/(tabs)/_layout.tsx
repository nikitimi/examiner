import { type Href, Tabs, usePathname } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { BLACK, WHITE } from "@/constants/Colors";
import { routeHelper, type RouteNames, routes } from "@/lib/utils/route";
import useThemeColor from "@/hooks/useThemeColor";

export default function TabLayout() {
  const pathName = usePathname();
  const excludedRoutes: RouteNames[] = ["profile"];
  const { themeColor, themeMode } = useThemeColor();
  const isThemeModeDark = themeMode === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColor,
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
              color: isThemeModeDark ? `${themeColor}FF` : BLACK,
            }
          : { color: isThemeModeDark ? `${WHITE}99` : `${BLACK}99` };
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
                    {
                      borderColor: isThemeModeDark
                        ? `${themeColor}99`
                        : `${BLACK}99`,
                      backgroundColor: isThemeModeDark
                        ? BLACK
                        : `${themeColor}99`,
                    },
                  ]}
                />
              ),
              tabBarStyle: [
                styles.tabBarStyle,
                {
                  backgroundColor: isThemeModeDark ? BLACK : themeColor,
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
  tabBarStyle: {},
  tabBarLabelStyle: {
    textTransform: "capitalize",
  },
  tabBarIconStyle: {},
  activeTabBarIconStyle: {
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
