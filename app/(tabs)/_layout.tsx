import { type Href, Tabs, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { BLACK, WHITE } from "@/constants/Colors";
import { routeHelper, type RouteNames, routes } from "@/lib/utils/route";
import useThemeColor from "@/hooks/useThemeColor";
import { useFonts } from "expo-font";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { STARTING_INDEX } from "@/constants/Numbers";
import * as SplashScreen from "expo-splash-screen";
import useTelemetry from "@/hooks/useTelemetry";
import { AppInitialSettings } from "@/lib/utils/schema/appInitialSettings";
import { setAppSettingsState } from "@/redux/reducers/appSettingsReducer";
import debugMessage from "@/lib/utils/debugMessage";
import { EMPTY_STRING } from "@/constants/String";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const pathName = usePathname();
  const excludedRoutes: RouteNames[] = [
    "profile",
    "random_questions",
    "scoreboard",
  ];
  const { themeColor, themeMode } = useThemeColor();
  const isThemeModeDark = themeMode === "dark";
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  const dispatch = useAppDispatch();
  const version = useAppSelector((s) => s.appSettingsState.version);
  const settingSpotlight = useAppSelector(
    (s) =>
      s.onboarding.spotlights.filter(
        (spotlight) => spotlight.title === "settings_button"
      )[0]
  );
  useTelemetry();

  useEffect(() => {
    async function fetchInitialSettings() {
      if (version !== EMPTY_STRING) return;
      try {
        const result = await fetch(
          "https://examiner-server.vercel.app/api/app/initialSettings",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        const response: AppInitialSettings = await result.json();
        Object.entries(response).forEach((v) => {
          const [key, value] = v;
          dispatch(
            setAppSettingsState({ key: key as keyof AppInitialSettings, value })
          );
        });
      } catch (err) {
        debugMessage(`onLayout network error -> ${JSON.stringify(err)}`);
      }
    }
    return () => {
      void fetchInitialSettings();
      if (loaded && settingSpotlight.width > STARTING_INDEX) {
        SplashScreen.hideAsync();
      }
    };
  }, [dispatch, loaded, settingSpotlight.width, version]);

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
