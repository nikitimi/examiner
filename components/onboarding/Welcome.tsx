import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsOnboardingComplete } from "@/redux/reducers/onboardingReducer";

const Welcome = () => {
  const { isOnboardingComplete } = useAppSelector((state) => state.onboarding);
  const dispatch = useAppDispatch();

  return (
    <Modal
      visible={!isOnboardingComplete}
      animationType="slide"
      transparent={false}
      onRequestClose={() => {
        dispatch(setIsOnboardingComplete(true));
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Welcome</Text>
        <TouchableOpacity
          onPress={() => dispatch(setIsOnboardingComplete(true))}
        >
          continue
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e2e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Welcome;
