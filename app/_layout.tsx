import { Stack } from "expo-router";
import "react-native-reanimated";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import firebase from "@react-native-firebase/app";
import { STARTING_INDEX } from "@/constants/Numbers";
import { EMPTY_STRING } from "@/constants/String";

export default function RootLayout() {
  if (firebase.apps.length === STARTING_INDEX) {
    firebase.initializeApp({
      apiKey: process.env.API_KEY ?? EMPTY_STRING,
      databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
      projectId: process.env.PROJECT_ID ?? EMPTY_STRING,
      storageBucket: process.env.STORAGE_BUCKET ?? EMPTY_STRING,
      messagingSenderId: process.env.MESSAGING_SENDER_ID ?? EMPTY_STRING,
      appId: process.env.APP_ID ?? EMPTY_STRING,
      gaTrackingId: process.env.MEASUREMENT_ID ?? EMPTY_STRING,
    });
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}
