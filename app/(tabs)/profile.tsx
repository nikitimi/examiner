import { StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { BLACK, themeColors, type ThemeColors } from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useAppRouter } from "@/hooks/useAppRouter";
import { ThemedView } from "@/components/ThemedView";
import { FlatList } from "react-native-gesture-handler";
import { setThemeColor } from "@/redux/reducers/themeReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";

type InitialState = {
  isThemeColorModalVisible: boolean;
};
const initialState: InitialState = {
  isThemeColorModalVisible: false,
};

const Profile = () => {
  const router = useAppRouter();
  const [state, setState] = useState(initialState);
  const dispatch = useAppDispatch();
  const themeColor = useAppSelector((s) => s.theme.themeColor);

  function login() {}

  function toggleThemeColors(state: "close" | "open") {
    setState((prevState) => ({
      ...prevState,
      isThemeColorModalVisible: state === "open" ? true : false,
    }));
  }

  function selectThemeColor(themeColor: ThemeColors) {
    setState((prevState) => ({
      ...prevState,
      isThemeColorModalVisible: false,
    }));
    dispatch(setThemeColor(themeColor));
  }

  return (
    <ParallaxScrollView
      headerImage={
        <ThemedView style={styles.headerImageContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace("/")}
          >
            <TabBarIcon name="arrow-back" size={24} color={BLACK} />
          </TouchableOpacity>
          <ThemedText style={[styles.loginInfo, { color: BLACK }]}>
            Login to sync your settings, and scoreboard history in the cloud.
          </ThemedText>
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <ThemedText style={[styles.text, { color: themeColor }]}>
              Login
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      }
      headerBackgroundColor={{
        dark: themeColor,
        light: BLACK,
      }}
    >
      <ThemedText style={{ fontWeight: "700" }}>Customization:</ThemedText>
      <TouchableOpacity
        style={[styles.themeButton, { borderColor: themeColor }]}
        onPress={() => toggleThemeColors("open")}
      >
        <ThemedText style={[styles.text, { color: themeColor }]}>
          Choose Theme Color
        </ThemedText>
      </TouchableOpacity>

      {/* Theme Color Modal */}
      <Modal
        visible={state.isThemeColorModalVisible}
        transparent
        onRequestClose={() => toggleThemeColors("close")}
      >
        <TouchableOpacity
          style={styles.modalButtonContainer}
          activeOpacity={1}
          onPress={() => toggleThemeColors("close")}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.modalContainer, { borderColor: themeColor }]}
          >
            <ThemedText style={styles.text}>Accent Color:</ThemedText>
            <FlatList
              horizontal
              contentContainerStyle={styles.modalContentContainer}
              data={themeColors}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => selectThemeColor(item)}
                    style={[styles.themeColorButton, { backgroundColor: item }]}
                  />
                );
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ParallaxScrollView>
  );
};

const common = StyleSheet.create({
  roundedComponent: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 4,
  },
});

const styles = StyleSheet.create({
  loginInfo: {
    textAlign: "center",
    fontSize: 14,
  },
  backButton: {
    padding: 12,
  },
  headerImageContainer: {
    backgroundColor: "transparent",
    gap: 24,
  },
  loginButton: {
    ...common.roundedComponent,
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: BLACK,
  },
  themeButton: {
    ...common.roundedComponent,
  },
  modalButtonContainer: {
    height: "100%",
    backgroundColor: `${BLACK}99`,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  themeColorButton: {
    ...common.roundedComponent,
    width: 60,
    height: 60,
  },
  modalContentContainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  modalContainer: {
    flexGrow: 0,
    width: "90%",
    ...common.roundedComponent,
    backgroundColor: BLACK,
  },
  text: {
    textAlign: "center",
  },
});

export default Profile;
