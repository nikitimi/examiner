import { DEVICE_TELEMETRY } from "@/constants/AsyncStorageKeys";
import { STARTING_INDEX } from "@/constants/Numbers";
import {
  deleteGetStorageData,
  storeStorageData,
} from "@/lib/utils/asyncStorage";
import Constants from "expo-constants";
import firestore from "@react-native-firebase/firestore";
import useAuthentication from "@/hooks/useAuthentication";
import * as Notifications from "expo-notifications";
import { useState } from "react";
import { Platform } from "react-native";
import { z } from "zod";
import { EMPTY_STRING } from "@/constants/String";

type State = "initializing" | "completed";
type DeviceInfo = z.infer<typeof deviceInfoSchema>;

const deviceInfoSchema = z.object({
  deviceToken: z.string(),
  sessionId: z.string(),
  deviceName: z.string(),
  systemVersion: z.number(),
  executionEnvironment: z.string(),
  runtimeVersion: z.string(),
  dateCreated: z.number(),
  dateUpdated: z.number(),
});

/** Get device info, and save it to Firestore including user ID when logged in. */
export default function useTelemetry() {
  const user = useAuthentication();
  const [state, setState] = useState<State>("initializing");

  async function telemetryReport(deviceToken: string) {
    if (user === null) return;

    const {
      sessionId,
      deviceName,
      systemVersion,
      executionEnvironment,
      manifest2,
    } = Constants;
    const usersCollection = firestore().collection("Devices");
    const devicesUserUID = usersCollection.doc(user.uid);

    const deviceInfo: Omit<DeviceInfo, "dateCreated"> = {
      deviceToken,
      sessionId,
      deviceName: !deviceName ? EMPTY_STRING : deviceName,
      systemVersion: !systemVersion ? STARTING_INDEX : systemVersion,
      executionEnvironment,
      runtimeVersion: manifest2?.runtimeVersion ?? "",
      dateUpdated: STARTING_INDEX,
    };
    if (!(await devicesUserUID.get()).exists) {
      await devicesUserUID.set({
        ...deviceInfo,
        dateCreated: new Date().getTime(),
      } as DeviceInfo);
    } else {
      await devicesUserUID.update({
        ...deviceInfo,
        dateUpdated: new Date().getTime(),
      });
    }
  }
  async function getDeviceToken() {
    const deviceToken = (await Notifications.getDevicePushTokenAsync()).data;
    const deviceTokenInAsyncStorage = await deleteGetStorageData({
      key: DEVICE_TELEMETRY,
      method: "get",
    });
    if (deviceTokenInAsyncStorage === null) {
      return (await storeStorageData({
        key: DEVICE_TELEMETRY,
        value: JSON.stringify(deviceToken),
        method: "set",
      })) as string;
    }
    console.log("Device Token", deviceTokenInAsyncStorage);
    return deviceTokenInAsyncStorage as string;
  }

  switch (Platform.OS) {
    case "android":
      if (state === "initializing") {
        getDeviceToken()
          .then((deviceToken) => {
            void telemetryReport(deviceToken);
            setState("completed");
          })
          .catch((err) => {
            console.log("Error in getting deivce token...", err);
          });
      }
      break;
  }
}
