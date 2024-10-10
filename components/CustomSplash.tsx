import { Modal, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "./ThemedView";
import { SPLASH_SCREEN_DURATION } from "@/constants/Numbers";

const initialState = {
  modalVisibility: true,
};

const CustomSplash = () => {
  const [state, setState] = useState(initialState);

  setTimeout(
    () => setState((prevState) => ({ ...prevState, modalVisibility: false })),
    SPLASH_SCREEN_DURATION
  );

  return (
    <Modal transparent style={styles.modal} visible={state.modalVisibility}>
      <ThemedView style={styles.parentContainer}>
        <Image source={require("@/assets/images/favicon.png")} />
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    zIndex: 10,
  },
  parentContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomSplash;
