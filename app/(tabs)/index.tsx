import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Welcome from "@/components/onboarding/Welcome";
import { useAppRouter } from "@/hooks/useAppRouter";
import { randomMinMax } from "@/lib/utils/random";
import { galaxyNames } from "@/constants/Galaxy";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useRef } from "react";
import {
  setMeasurement,
  setSpotlightVisibility,
} from "@/redux/reducers/onboardingReducer";

export default function HomeScreen() {
  const router = useAppRouter();
  const galaxyIndex = randomMinMax(0, galaxyNames.length - 1);
  const themeColor = useAppSelector((s) => s.theme.themeColor);
  const settingRef = useRef<TouchableOpacity>(null!);
  const dispatch = useAppDispatch();
  const dimension = useWindowDimensions();

  useEffect(() => {
    const title = "settings_button";
    settingRef.current.measure((x, y, width, height, pageX, pageY) => {
      console.log(pageX, pageY);
      dispatch(
        setMeasurement({
          title,
          left: pageX,
          top: pageY,
          width,
          height,
        })
      );
      dispatch(setSpotlightVisibility({ isVisible: true, title }));
    });
  }, [dispatch, dimension.height, dimension.width]);

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
