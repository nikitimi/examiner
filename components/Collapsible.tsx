import { PropsWithChildren, useState } from "react";
import { StyleSheet, Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BLACK, WHITE } from "@/constants/Colors";
import useThemeColor from "@/hooks/useThemeColor";
import { HelloWave } from "./HelloWave";

type CollapsibleProps = PropsWithChildren & {
  additionalContent?: string;
  isHello?: boolean;
  title: string;
};

export function Collapsible(props: CollapsibleProps) {
  const { additionalContent, children, isHello, title } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { themeColor, themeMode } = useThemeColor();
  const isThemeDarkMode = themeMode === "dark";

  const textStyle = { fontSize: 14 };

  return (
    <ThemedView>
      <Pressable
        style={[
          styles.heading,
          { backgroundColor: `${isThemeDarkMode ? WHITE : BLACK}55` },
        ]}
        onPress={() => setIsOpen((value) => !value)}
      >
        <ThemedView style={{ backgroundColor: "transparent" }}>
          <ThemedText style={{ minWidth: 120, color: WHITE, ...textStyle }}>{`${
            isOpen ? "Hide" : "Show"
          } ${!additionalContent ? "" : additionalContent}`}</ThemedText>
          {isHello && <HelloWave />}
        </ThemedView>
        <ThemedText
          style={{ color: themeColor, ...textStyle }}
          type="defaultSemiBold"
        >
          {title}
        </ThemedText>
      </Pressable>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 80,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
