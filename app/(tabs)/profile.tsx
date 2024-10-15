import { StyleSheet, Pressable, Modal, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import {
  BLACK,
  GREEN,
  RED,
  ThemeColor,
  themeColors,
  WHITE,
} from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useAppRouter } from "@/hooks/useAppRouter";
import { ThemedView } from "@/components/ThemedView";
import { FlatList } from "react-native-gesture-handler";
import useThemeColor from "@/hooks/useThemeColor";
import GoogleSigninButton from "@/components/GoogleSignIn";
import useAuthentication from "@/hooks/useAuthentication";
import SignoutButton from "@/components/SignoutButton";
import { EMPTY_STRING } from "@/constants/String";
import { Ionicons } from "@expo/vector-icons";
import AppUpdateButton from "@/components/AppUpdateButton";
import AppVersion from "@/components/AppVersion";

type InitialState = {
  isThemeColorModalVisible: boolean;
  isContactSupportModalVisible: boolean;
  report?: (typeof reportTypeList)[number];
};
const initialState: InitialState = {
  isThemeColorModalVisible: false,
  isContactSupportModalVisible: false,
};
const reportTypeList = ["bug", "feature_request"] as const;

const Profile = () => {
  const router = useAppRouter();
  const [state, setState] = useState(initialState);
  const { themeColor, themeMode, syncTheme } = useThemeColor();
  const inputRef = useRef<TextInput>(null);
  const isThemeModeDark = themeMode === "dark";
  const user = useAuthentication();
  const dynamicButtonStyle = { borderColor: themeColor };
  const dynamicTextStyle = { color: themeColor };
  const finalButtonStyle = [styles.themeButton, dynamicButtonStyle];
  const finalTextStyle = [styles.text, dynamicTextStyle];

  /** These is for setting the Modal Views on or off. */
  function toggleModal(
    state: "close" | "open",
    modal: "themeColor" | "contactSupport"
  ) {
    const prefix = "is";
    const suffix = "ModalVisible";
    const firstLetter = modal.charAt(0).toLocaleUpperCase();
    const restOfWords = modal.slice(1, modal.length);
    const stateName =
      `${prefix}${firstLetter}${restOfWords}${suffix}` as keyof InitialState;

    setState((prevState) => ({
      ...prevState,
      [stateName]: state === "open" ? true : false,
    }));
  }
  function setThemeColor(color: ThemeColor) {
    syncTheme("color", color);
    toggleModal("close", "themeColor");
  }

  return (
    <>
      <ParallaxScrollView
        headerImage={
          <ThemedView style={styles.headerImageContainer}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.replace("/")}
            >
              <TabBarIcon name="arrow-back" size={24} color={BLACK} />
            </Pressable>
            <ThemedText style={[styles.loginInfo, { color: BLACK }]}>
              Login to sync your settings, and scoreboard history in the cloud.
            </ThemedText>
            {user === null ? <GoogleSigninButton /> : <SignoutButton />}
          </ThemedView>
        }
        headerBackgroundColor={{
          dark: themeColor,
          light: BLACK,
        }}
      >
        <ThemedText style={{ fontWeight: "700" }}>Customization:</ThemedText>
        <Pressable
          style={finalButtonStyle}
          onPress={() => toggleModal("open", "themeColor")}
        >
          <Ionicons
            name="color-fill"
            color={isThemeModeDark ? themeColor : BLACK}
          />
          <ThemedText style={finalTextStyle}>Choose theme color</ThemedText>
        </Pressable>
        <Pressable
          style={finalButtonStyle}
          onPress={() => syncTheme("mode", isThemeModeDark ? "light" : "dark")}
        >
          <Ionicons
            name="toggle"
            color={isThemeModeDark ? themeColor : BLACK}
          />
          <ThemedText style={finalTextStyle}>Toggle theme mode</ThemedText>
        </Pressable>
        <Modal
          visible={state.isThemeColorModalVisible}
          transparent
          onRequestClose={() => toggleModal("close", "themeColor")}
        >
          <Pressable
            style={styles.modalButtonContainer}
            onPress={() => toggleModal("close", "themeColor")}
          >
            <Pressable
              style={[
                styles.modalContainer,
                {
                  borderColor: isThemeModeDark ? themeColor : WHITE,
                  backgroundColor: isThemeModeDark ? BLACK : WHITE,
                },
              ]}
            >
              <ThemedText style={styles.text}>Accent Color:</ThemedText>
              <FlatList
                horizontal
                contentContainerStyle={styles.modalContentContainer}
                data={themeColors.filter(
                  (color) => color !== GREEN && color !== RED
                )}
                keyExtractor={(item) => item}
                renderItem={(color) => {
                  return (
                    <Pressable
                      onPress={() => setThemeColor(color.item)}
                      style={[
                        styles.themeColorButton,
                        {
                          backgroundColor: color.item,
                          borderColor: isThemeModeDark ? BLACK : color.item,
                        },
                      ]}
                    />
                  );
                }}
              />
            </Pressable>
          </Pressable>
        </Modal>

        <Pressable
          style={finalButtonStyle}
          onPress={() => toggleModal("open", "contactSupport")}
        >
          <Ionicons
            name="file-tray-full"
            color={isThemeModeDark ? themeColor : BLACK}
          />
          <ThemedText style={finalTextStyle}>Submit a report</ThemedText>
        </Pressable>
        <Modal
          transparent
          animationType="fade"
          visible={state.isContactSupportModalVisible}
          onRequestClose={() => toggleModal("close", "contactSupport")}
        >
          <Pressable
            style={styles.modalButtonContainer}
            onPress={() => toggleModal("close", "contactSupport")}
          >
            <Pressable
              style={{
                backgroundColor: `${isThemeModeDark ? BLACK : themeColor}99`,
                borderColor: isThemeModeDark ? "transparent" : themeColor,
                ...common.roundedComponent,
                padding: 8,
              }}
            >
              <ThemedText>Report type:</ThemedText>
              <ThemedView
                style={{
                  gap: 8,
                  padding: 2,
                  flexDirection: "row",
                  backgroundColor: `${isThemeModeDark ? BLACK : themeColor}99`,
                }}
              >
                {reportTypeList.map((value) => {
                  return (
                    <Pressable
                      style={{
                        borderColor:
                          state.report === value
                            ? isThemeModeDark
                              ? themeColor
                              : WHITE
                            : isThemeModeDark
                              ? WHITE
                              : GREEN,
                        ...common.roundedComponent,
                      }}
                      key={value}
                      onPress={() =>
                        setState((prevState) => ({
                          ...prevState,
                          report: value,
                        }))
                      }
                    >
                      <ThemedText
                        style={[
                          { textTransform: "capitalize" },
                          {
                            color:
                              state.report === value
                                ? isThemeModeDark
                                  ? themeColor
                                  : WHITE
                                : isThemeModeDark
                                  ? WHITE
                                  : GREEN,
                          },
                        ]}
                      >
                        {value.replace(/_/g, " ")}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </ThemedView>
              <TextInput
                ref={inputRef}
                multiline
                style={{
                  borderColor: isThemeModeDark ? "transparent" : themeColor,
                  backgroundColor: WHITE,
                  height: 120,
                  width: 240,
                  ...common.roundedComponent,
                }}
                defaultValue={EMPTY_STRING}
              />
              <Pressable
                disabled={
                  inputRef.current === null || state.report === undefined
                }
                onPress={() => {
                  const { value } = inputRef.current as unknown as {
                    value: string;
                  };
                  // TODO: Put in database.
                  console.log({ value, report: state.report });
                  toggleModal("close", "contactSupport");
                  setState((prevState) => ({
                    ...prevState,
                    report: undefined,
                  }));
                }}
              >
                <ThemedText
                  style={{
                    backgroundColor: GREEN,
                    ...common.roundedComponent,
                    width: "100%",
                    textAlign: "center",
                    marginHorizontal: "auto",
                    color: BLACK,
                    borderColor: isThemeModeDark ? "transparent" : themeColor,
                  }}
                >
                  Send
                </ThemedText>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      </ParallaxScrollView>
      <ThemedView
        style={{
          position: "absolute",
          bottom: 12,
          gap: 4,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppUpdateButton
          buttonStyle={[finalButtonStyle, { width: 240 }]}
          color={isThemeModeDark ? themeColor : BLACK}
          name="cloud-download"
          textStyle={finalTextStyle}
        />
        <AppVersion />
      </ThemedView>
    </>
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
    marginTop: 36,
  },
  loginButton: {
    ...common.roundedComponent,
    width: "90%",
    marginHorizontal: "auto",
  },
  themeButton: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    flexDirection: "row",
    gap: 6,
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
  },
  text: {
    textAlign: "left",
    width: "100%",
  },
});

export default Profile;
