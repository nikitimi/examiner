import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.parentContainer}>
      <ThemedText>History</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    height: "100%",
  },
});
