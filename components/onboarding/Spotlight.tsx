import React from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { BLACK, WHITE } from "@/constants/Colors";
import {
  setMessageIndex,
  setSpotlightVisibility,
  updateOnboardingStatus,
} from "@/redux/reducers/onboardingReducer";
import {
  deleteGetStorageData,
  storeStorageData,
} from "@/lib/utils/asyncStorage";
import { ONBOARDING_STAUS } from "@/constants/AsyncStorageKeys";

export type SpotLightTitles = (typeof spotLightTitles)[number];

export const spotLightTitles = ["user_info", "settings_button"] as const;
export type SpotlightProps = {
  height: number;
  left: number;
  messageIndex: number;
  messages: string[];
  title: SpotLightTitles;
  top: number;
  width: number;
  isVisible: boolean;
};

const Spotlight = (props: SpotlightProps) => {
  const { top, left, width, height, messages, messageIndex, isVisible, title } =
    props;
  const isIndexOverlapMessages = messageIndex + 1 > messages.length - 1;
  const themeColor = useAppSelector((s) => s.theme.themeColor);
  const onBoardingStatus = useAppSelector((s) => s.onboarding.onBoardingStatus);
  const dispatch = useAppDispatch();

  async function handleNextPress() {
    if (isIndexOverlapMessages) {
      dispatch(updateOnboardingStatus({ value: title, method: "push" }));
      const onboardingInAsyncStorage = await deleteGetStorageData({
        key: ONBOARDING_STAUS,
        method: "get",
      });

      void storeStorageData({
        key: ONBOARDING_STAUS,
        value: JSON.stringify(onBoardingStatus),
        method: onboardingInAsyncStorage === null ? "set" : "update",
      });

      return dispatch(setSpotlightVisibility({ isVisible: false, title }));
    }
    dispatch(setMessageIndex({ title }));
  }
  // console.log({ title, left });

  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.indicatorContainer,
            {
              borderColor: themeColor,
              width,
              height,
              top,
              left,
            },
          ]}
        />
        <View
          style={[
            styles.infoContainer,
            {
              top: top + 42,
              left: left < 30 ? left : left - 100,
            },
          ]}
        >
          <Text style={styles.infoText}>{messages[messageIndex]}</Text>
          <Pressable
            style={styles.progressionButton}
            onPress={() => handleNextPress()}
          >
            <Text style={[styles.progressionText, { color: themeColor }]}>
              {isIndexOverlapMessages ? "done" : "next"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { height: "100%", backgroundColor: `${BLACK}55` },
  indicatorContainer: {
    backgroundColor: `${WHITE}55`,
    borderWidth: 2,
    padding: 2,
    position: "absolute",
  },
  infoContainer: {
    backgroundColor: WHITE,
    position: "absolute",
    padding: 8,
    borderRadius: 12,
  },
  infoText: { color: BLACK, fontSize: 10, lineHeight: 18 },
  progressionButton: {
    backgroundColor: BLACK,
    borderRadius: 12,
    width: 80,
    marginHorizontal: "auto",
  },
  progressionText: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 12,
  },
});

export default Spotlight;
