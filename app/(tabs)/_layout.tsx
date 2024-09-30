import { Stack } from "expo-router";
import React from "react";

// import { TabBarIcon } from "@/components/navigation/TabBarIcon";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />
      <Stack.Screen
        name="foobar"
        options={{
          title: "Foobar",
        }}
      />
    </Stack>
  );
}
