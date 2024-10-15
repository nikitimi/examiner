import { EMPTY_STRING } from "@/constants/String";
import { setUserCredentials } from "@/redux/reducers/authenticationReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import auth, { type FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect } from "react";
import { Platform } from "react-native";
/** If there is no user in the Redux's Selector,
 * or the platform that the application is running is on the web,
 * @returns null. */
export default function useAuthentication() {
  const user = useAppSelector((s) => s.authentication.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Platform.OS === "android") {
      const subscriber = auth().onAuthStateChanged((user) => {
        dispatch(setUserCredentials(user === null ? "" : JSON.stringify(user)));
      });
      return subscriber;
    }
  }, [dispatch]);

  return user === EMPTY_STRING || Platform.OS === "web"
    ? null
    : (JSON.parse(user) as FirebaseAuthTypes.User | null);
}
