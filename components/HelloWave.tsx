import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useAppSelector } from "@/redux/store";
import { EMPTY_STRING } from "@/constants/String";

type HelloWaveProps = {
  fontSize?: number | "100%";
};

export function HelloWave({ fontSize }: HelloWaveProps) {
  const rotationAnimation = useSharedValue(0);
  const currentEmoji = useAppSelector((s) => s.appSettingsState.currentEmoji);

  rotationAnimation.value = withRepeat(
    withSequence(
      withTiming(8, { duration: 150 }),
      withTiming(0, { duration: 150 })
    ),
    4 // Run the animation 4 times
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText
        style={[styles.text, { fontSize: !fontSize ? fontSize : 14 }]}
      >
        {currentEmoji === EMPTY_STRING ? "👋" : currentEmoji}
      </ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 32,
    marginTop: -6,
  },
});
