import React from "react";
import Constants from "expo-constants";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Platform, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GREEN } from "@/constants/Colors";
import { useAppDispatch } from "@/redux/store";
import { setAppSettingsState } from "@/redux/reducers/appSettingsReducer";
import { readDirectoryAsync } from "expo-file-system";
import { documentDirectory } from "expo-file-system";
import { EMPTY_STRING } from "@/constants/String";

const AppVersion = () => {
  const dispatch = useAppDispatch();
  switch (Platform.OS) {
    case "ios":
    case "android":
      const expoClient = Constants.manifest2?.extra?.expoClient;

      return (
        <ThemedView style={styles.parentContainer}>
          <Pressable
            onPress={async () => {
              const directoryFiles = await readDirectoryAsync(
                documentDirectory ?? EMPTY_STRING
              );
              console.log(directoryFiles);
              dispatch(setAppSettingsState({ key: "version", value: "1.0.9" }));
            }}
          >
            <Ionicons name="cloud" size={24} color={GREEN} />
          </Pressable>
          <ThemedText>{expoClient?.slug}</ThemedText>
          <ThemedText>{`v${expoClient?.version}`}</ThemedText>
        </ThemedView>
      );
    case "windows":
    case "macos":
    case "web":
      const { slug, version } = Constants.easConfig as unknown as {
        slug: string;
        version: string;
      };

      return (
        <ThemedView style={styles.parentContainer}>
          <ThemedText>{slug}</ThemedText>
          <ThemedText>{`v${version}`}</ThemedText>
        </ThemedView>
      );
  }
};

export function appVersion() {
  switch (Platform.OS) {
    case "ios":
    case "android":
      return Constants.manifest2?.extra?.expoClient?.version;
    case "windows":
    case "macos":
    case "web":
      return (Constants.easConfig as unknown as { version: string }).version;
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

export default AppVersion;
