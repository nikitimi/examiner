import { useRef } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Welcome from "@/components/onboarding/Welcome";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { galaxyNames } from "@/constants/Galaxy";
import { useAppRouter } from "@/hooks/useAppRouter";
import { randomMinMax } from "@/lib/utils/random";
import {
  setMeasurement,
  setSpotlightVisibility,
} from "@/redux/reducers/onboardingReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export default function HomeScreen() {
  const router = useAppRouter();
  const galaxyIndex = randomMinMax(0, galaxyNames.length - 1);
  const themeColor = useAppSelector((s) => s.theme.themeColor);
  const settingRef = useRef<TouchableOpacity>(null!);
  const dispatch = useAppDispatch();

  return (
    <ThemedView style={styles.parentContainer}>
      <Welcome />
      <ThemedView style={[styles.heroContainer, { borderColor: themeColor }]}>
        <ThemedView style={styles.heroInnerContainer}>
          <Image
            source={require("@/assets/images/favicon.png")}
            style={[styles.userImage, { borderColor: themeColor }]}
          />
          <ThemedText
            style={styles.userName}
          >{`Anonymous ${galaxyNames[galaxyIndex]}`}</ThemedText>
        </ThemedView>
        <TouchableOpacity
          ref={settingRef}
          style={styles.settings}
          onLayout={async (event) => {
            const title = "settings_button";
            const { width, height, x, y } = event.nativeEvent.layout;

            dispatch(
              setMeasurement({
                title,
                width: width,
                height: height,
                left: x,
                top: y,
              })
            );
            dispatch(setSpotlightVisibility({ isVisible: true, title }));
          }}
          onPress={() => router.push("/profile")}
        >
          <TabBarIcon name="settings" color={themeColor} />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const common = StyleSheet.create({
  roundContainer: {
    borderWidth: 2,
  },
});

const styles = StyleSheet.create({
  parentContainer: {
    height: "100%",
  },
  heroInnerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  heroContainer: {
    ...common.roundContainer,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 12,
    padding: 12,
    margin: 12,
  },
  userImage: {
    ...common.roundContainer,
    borderRadius: 100,
  },
  userName: {
    textTransform: "capitalize",
  },
  settings: {
    alignSelf: "center",
    padding: 8,
  },
});
