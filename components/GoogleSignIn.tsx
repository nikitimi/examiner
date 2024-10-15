import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Image, Pressable } from "react-native";
import auth from "@react-native-firebase/auth";
import { ThemedText } from "./ThemedText";
import { BLACK, WHITE } from "@/constants/Colors";
import useThemeColor from "@/hooks/useThemeColor";

GoogleSignin.configure({
  webClientId:
    "116355000305-e1djld752f726bul0je728h49dufper4.apps.googleusercontent.com",
});

export default function GoogleSigninButton() {
  const { themeMode } = useThemeColor();
  const isThemeDarkMode = themeMode === "dark";

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { data } = await GoogleSignin.signIn();

    if (data?.idToken !== undefined) {
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        data?.idToken
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    }
  }
  return (
    <Pressable
      style={{
        flexDirection: "row",
        backgroundColor: `${isThemeDarkMode ? BLACK : WHITE}99`,
        width: 240,
        padding: 8,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "auto",
        gap: 8,
      }}
      onPress={() =>
        onGoogleButtonPress()
          .then(() => console.log("Login success!"))
          .catch(() => console.log("Login failed!"))
      }
    >
      <Image
        source={{
          uri: "https://www.google.com//images/branding/googleg/1x/googleg_standard_color_128dp.png",
        }}
        style={{ width: 24, height: 24 }}
      />
      <ThemedText>Login with Google</ThemedText>
    </Pressable>
  );
}
