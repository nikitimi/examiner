import { Pressable, StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.titleContainer}>
      <Pressable onPress={() => router.push("/foobar")}>
        <ThemedText>Foobar</ThemedText>
      </Pressable>
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
