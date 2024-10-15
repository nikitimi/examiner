import auth from "@react-native-firebase/auth";
import { Pressable } from "react-native";
import React from "react";
import { RED, WHITE } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

const SignoutButton = () => {
  return (
    <Pressable
      style={{
        backgroundColor: RED,
        width: 240,
        padding: 8,
        borderRadius: 12,
        marginHorizontal: "auto",
        gap: 8,
      }}
      onPress={() => {
        void auth().signOut();
      }}
    >
      <ThemedText style={{ color: WHITE, textAlign: "center" }}>
        Sign out
      </ThemedText>
    </Pressable>
  );
};

export default SignoutButton;
