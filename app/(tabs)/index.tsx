import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { routeHelper, routes } from "@/lib/utils/route";
import Welcome from "@/components/onboarding/Welcome";
import { useAppRouter } from "@/hooks/useAppRouter";

export default function HomeScreen() {
  const router = useAppRouter();

  return (
    <ThemedView style={styles.titleContainer}>
      <Welcome />
      {routes.map((route) => {
        return (
          <Pressable
            key={route}
            onPress={() => router.push(routeHelper(route))}
          >
            <ThemedText>{route}</ThemedText>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: "100%",
  },
});
