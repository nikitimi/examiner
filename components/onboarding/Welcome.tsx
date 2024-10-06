import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsOnboardingComplete } from "@/redux/reducers/onboardingReducer";
import Spotlight from "./Spotlight";

/**
 * Contains information about the application.
 */
const Welcome = () => {
  const spotlights = useAppSelector((s) => s.onboarding.spotlights);

  return (
    <>
      {spotlights.map((props) => (
        <Spotlight key={props.title} {...props} />
      ))}
    </>
  );
};

export default Welcome;
