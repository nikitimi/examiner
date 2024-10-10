import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Welcome from "@/components/onboarding/Welcome";
import Hero from "@/components/Hero";
import CustomSplash from "@/components/CustomSplash";
import { updateOnboardingStatus } from "@/redux/reducers/onboardingReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { spotLightTitles } from "@/components/onboarding/Spotlight";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedText } from "@/components/ThemedText";
import React, { useState } from "react";

export default function HomeScreen() {
  const onBoardingStatus = useAppSelector((s) => s.onboarding.onBoardingStatus);
  const dispatch = useAppDispatch();
  const [dimension, setDimension] = useState(0);
  const halfWidth = dimension / 2;

  return (
    <ThemedView
      style={styles.parentContainer}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setDimension(width);
      }}
    >
      <Welcome />
      <CustomSplash />
      <Hero />
      <ThemedView style={{ display: "flex", flexDirection: "row" }}>
        <ThemedView
          style={[
            styles.individualContainer,
            { backgroundColor: "green", width: halfWidth },
          ]}
        >
          <ThemedText style={styles.heading}>Inactive Spotlights</ThemedText>
          {spotLightTitles
            .filter((title) => !onBoardingStatus.includes(title))
            .map((value) => {
              return (
                <TouchableOpacity
                  key={value}
                  onPress={() =>
                    dispatch(updateOnboardingStatus({ value, method: "push" }))
                  }
                >
                  <ThemedText>{value}</ThemedText>
                </TouchableOpacity>
              );
            })}
        </ThemedView>
        <ThemedView
          style={[
            styles.individualContainer,
            { backgroundColor: "blue", width: halfWidth },
          ]}
        >
          <ThemedText style={styles.heading}>On Boarding Status:</ThemedText>
          {onBoardingStatus.map((value) => {
            return (
              <TouchableOpacity
                key={value}
                onPress={() =>
                  dispatch(updateOnboardingStatus({ value, method: "delete" }))
                }
              >
                <ThemedText key={value} style={{ textTransform: "capitalize" }}>
                  {value.replace(/_/g, " ")}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: 800,
  },
  parentContainer: {
    height: "100%",
  },
  individualContainer: {
    height: 120,
  },
});
