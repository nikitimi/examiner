import { View, type ViewProps } from "react-native";

import useThemeColor from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const { themeMode } = useThemeColor();
  const backgroundColor = Colors[themeMode].background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
