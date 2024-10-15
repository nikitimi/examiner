import {
  Platform,
  Pressable,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { ThemedText } from "./ThemedText";
import {
  deleteGetStorageData,
  storeStorageData,
} from "@/lib/utils/asyncStorage";
import { PAUSED_UPDATE } from "@/constants/AsyncStorageKeys";
import { Ionicons } from "@expo/vector-icons";
import { IconNames } from "@/lib/utils/route";
import debugMessage from "@/lib/utils/debugMessage";
import { EMPTY_STRING } from "@/constants/String";
import { appVersion } from "./AppVersion";
import { useAppSelector } from "@/redux/store";
import { BASE_HEXADECIMAL } from "@/constants/Numbers";

// FileSystem.getInfoAsync(FileSystem.documentDirectory ?? "").then((info) => console.log(info));

type AppUpdateButtonProps = {
  color: string;
  name: IconNames;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};
type InitialState = {
  pausedUpdate: FileSystem.DownloadPauseState | null;
  status: "check" | "paused" | "downloading";
};
const initialState: InitialState = {
  pausedUpdate: null,
  status: "check",
};

const AppUpdateButton = (props: AppUpdateButtonProps) => {
  const [state, setState] = useState(initialState);
  const appSettingsState = useAppSelector((s) => s.appSettingsState);
  const fileUri =
    Platform.OS === "android"
      ? FileSystem.documentDirectory
      : process.env.DOCUMENT_DIRECTORY;
  const fileName = "latestVersion.mp3";
  const downloadResumable = FileSystem.createDownloadResumable(
    appSettingsState.uri,
    fileUri + fileName,
    {},
    taskProgressCallback
  );

  function resolveWithStatus() {
    const isUpdateStorageEmpty = state.pausedUpdate === null;
    switch (state.status) {
      case "check":
        return isUpdateStorageEmpty
          ? "Check for update"
          : "Resume paused update";
      case "paused":
        return "Resume update";
      case "downloading":
        return "Pause update";
    }
  }
  function taskProgressCallback(
    downloadProgress: FileSystem.DownloadProgressData
  ) {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    console.log(progress * 100);
  }

  async function resumeOrDownload() {
    setState((prevState) => ({ ...prevState, status: "downloading" }));
    try {
      if (state.pausedUpdate === null) {
        const result = await downloadResumable.downloadAsync();
        const data = await FileSystem.getContentUriAsync(
          `${fileUri}${fileName}`
        );
        debugMessage(JSON.stringify(data));
        return debugMessage(`${result?.uri}`);
      }
      const resumeAsync = await new FileSystem.DownloadResumable(
        state.pausedUpdate.url,
        state.pausedUpdate.fileUri,
        state.pausedUpdate.options,
        taskProgressCallback,
        state.pausedUpdate.resumeData
      ).resumeAsync();
      deleteGetStorageData({ key: PAUSED_UPDATE, method: "delete" });
      debugMessage(`${resumeAsync?.uri}`);
    } catch (err) {
      setState((prevState) => ({ ...prevState, status: "check" }));
      debugMessage(`${err}`);
    }
  }
  async function pauseDownload() {
    setState((prevState) => ({ ...prevState, status: "paused" }));
    try {
      await downloadResumable.pauseAsync();
      const pausedUpdate = await deleteGetStorageData({
        key: PAUSED_UPDATE,
        method: "get",
      });

      await storeStorageData({
        key: PAUSED_UPDATE,
        method: pausedUpdate === null ? "set" : "update",
        value: JSON.stringify(downloadResumable.savable()),
      });
    } catch (err) {
      setState((prevState) => ({ ...prevState, status: "check" }));
      debugMessage(`${err}`);
    }
  }
  async function handleOnPress() {
    const otaVersion = removeDotsThenIntegerize(appSettingsState.version);
    const internalVersion = removeDotsThenIntegerize(
      appVersion() ?? EMPTY_STRING
    );

    /** Example input: `string` "1.0.8", output: `int` 108. */
    function removeDotsThenIntegerize(value: string) {
      const integerized = parseInt(value.replace(/[.]/g, ""), BASE_HEXADECIMAL);
      return isNaN(integerized) ? 0 : integerized;
    }

    switch (state.status) {
      case "check":
        // Check On The Air version is equals to the current version the app is running.
        if (otaVersion === internalVersion) {
          return debugMessage(appSettingsState.whenAppLatestMessage);
        }
        return void resumeOrDownload();
      case "paused":
        return void resumeOrDownload();
      case "downloading":
        return void pauseDownload();
    }
  }

  useEffect(() => {
    async function initializeStatus() {
      const result = await deleteGetStorageData({
        key: PAUSED_UPDATE,
        method: "get",
      });

      if (result === null) return;
      const pausedUpdate = JSON.parse(
        result as string
      ) as FileSystem.DownloadPauseState;
      setState((prevState) => ({
        ...prevState,
        pausedUpdate,
        status: "paused",
      }));
    }
    return () => {
      void initializeStatus();
    };
  }, []);

  return (
    <Pressable onPress={handleOnPress} style={props.buttonStyle}>
      <Ionicons name={props.name} color={props.color} />
      <ThemedText style={props.textStyle}>{resolveWithStatus()}</ThemedText>
    </Pressable>
  );
};

export default AppUpdateButton;
