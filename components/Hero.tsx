import { TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { galaxyNames } from "@/constants/Galaxy";
import { setMeasurement } from "@/redux/reducers/onboardingReducer";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import useGalaxyIndex from "@/hooks/useGalaxyIndex";

const Hero = () => {
  const router = useAppRouter();
  const galaxyIndex = useGalaxyIndex();
  const themeColor = useAppSelector((s) => s.theme.themeColor);
  const settingRef = useRef<TouchableOpacity>(null!);
  const dispatch = useAppDispatch();

  return (
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
        }}
        onPress={() => router.push("/profile")}
      >
        <TabBarIcon name="settings" color={themeColor} />
      </TouchableOpacity>
    </ThemedView>
  );
};

const common = StyleSheet.create({
  roundContainer: {
    borderWidth: 2,
  },
});
const styles = StyleSheet.create({
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

export default Hero;
