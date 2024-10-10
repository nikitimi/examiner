import { Platform } from "react-native";

export default function debugMessage(message: string) {
  if (Platform.OS === "windows") {
    console.log(message);
  }
}
