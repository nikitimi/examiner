import { StyleSheet, Pressable } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Welcome from "@/components/onboarding/Welcome";
import Hero from "@/components/Hero";
import { updateOnboardingStatus } from "@/redux/reducers/onboardingReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { spotLightTitles } from "@/components/onboarding/Spotlight";
import { ThemedText } from "@/components/ThemedText";
import React, { useEffect, useState } from "react";
import { deleteGetStorageData } from "@/lib/utils/asyncStorage";
import { BLACK, PURPLE, RED, YELLOW } from "@/constants/Colors";
import {
  ONBOARDING_STAUS,
  THEME_COLOR,
  THEME_MODE,
} from "@/constants/AsyncStorageKeys";
import { setThemeColor, setThemeMode } from "@/redux/reducers/themeReducer";
import DeviceInfo from "@/components/DeviceInfo";

export default function HomeScreen() {
  const onBoardingStatus = useAppSelector((s) => s.onboarding.onBoardingStatus);
  const dispatch = useAppDispatch();
  const [dimension, setDimension] = useState(0);
  const halfWidth = dimension / 2;
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    async function getAllKeys() {
      const keys = await deleteGetStorageData({ key: "_", method: "keys" });
      setKeys(keys as string[]);
    }
    return void getAllKeys();
  }, []);

  return (
    <ThemedView
      style={styles.parentContainer}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setDimension(width);
      }}
    >
      <Welcome />
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
                <Pressable
                  key={value}
                  onPress={() =>
                    dispatch(updateOnboardingStatus({ value, method: "push" }))
                  }
                >
                  <ThemedText>{value}</ThemedText>
                </Pressable>
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
              <Pressable
                key={value}
                onPress={() =>
                  dispatch(updateOnboardingStatus({ value, method: "delete" }))
                }
              >
                <ThemedText key={value} style={{ textTransform: "capitalize" }}>
                  {value.replace(/_/g, " ")}
                </ThemedText>
              </Pressable>
            );
          })}
        </ThemedView>
      </ThemedView>
      <Pressable
        style={styles.dangerButton}
        onPress={async () => {
          [...keys!].forEach((key) =>
            deleteGetStorageData({ key: key as string, method: "delete" })
          );
          dispatch(setThemeColor(PURPLE));
          dispatch(setThemeMode("dark"));
          spotLightTitles.forEach((value) => {
            return dispatch(
              updateOnboardingStatus({ value, method: "delete" })
            );
          });
        }}
      >
        <ThemedText style={styles.dangerButtonText}>Remove all Keys</ThemedText>
      </Pressable>
      <ThemedView style={{ backgroundColor: YELLOW, padding: 12 }}>
        <ThemedText
          style={{ color: BLACK, textAlign: "center", fontWeight: 800 }}
        >
          Existing keys:
        </ThemedText>
        {keys.map((key) => {
          return (
            <Pressable
              style={styles.dangerButton}
              key={key}
              onPress={async () => {
                await deleteGetStorageData({ key, method: "delete" });
                switch (key) {
                  case THEME_COLOR:
                    return dispatch(setThemeColor(PURPLE));
                  case THEME_MODE:
                    return dispatch(setThemeMode("dark"));
                  case ONBOARDING_STAUS:
                    spotLightTitles.forEach((value) => {
                      return dispatch(
                        updateOnboardingStatus({ value, method: "delete" })
                      );
                    });
                }
              }}
            >
              <ThemedText style={styles.dangerButtonText}>{key}</ThemedText>
            </Pressable>
          );
        })}
      </ThemedView>
      <DeviceInfo />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  dangerButtonText: {
    textAlign: "center",
  },
  dangerButton: {
    marginHorizontal: "auto",
    marginVertical: 10,
    borderRadius: 10,
    padding: 2,
    width: 180,
    backgroundColor: RED,
  },
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
