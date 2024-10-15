import { Platform, ToastAndroid } from "react-native";

export default function debugMessage(message: string) {
  switch (Platform.OS) {
    case "android":
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return console.log(message);
    case "web":
      return console.log(message);
    case "ios":
    case "windows":
    case "macos":
      return;
  }
}
