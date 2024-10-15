import React from "react";
import Constants from "expo-constants";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { StyleSheet } from "react-native";

const DeviceInfo = () => {
  const { deviceName, sessionId } = Constants;

  return (
    <ThemedView>
      <ThemedText
        style={styles.text}
      >{`Device Name: ${deviceName}`}</ThemedText>
      <ThemedText style={styles.text}>{`Session Id: ${sessionId}`}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
  },
});

export default DeviceInfo;
