import { THEME_COLOR, THEME_MODE } from "@/constants/AsyncStorageKeys";
import { type ThemeColor, ThemeMode } from "@/constants/Colors";
import {
  deleteGetStorageData,
  storeStorageData,
} from "@/lib/utils/asyncStorage";
import { setThemeColor, setThemeMode } from "@/redux/reducers/themeReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCallback, useEffect } from "react";

type ThemeType = "mode" | "color";
type ThemeProperties = ThemeColor | ThemeMode;

/**
 * `themeColor` is the accent color for the whole app.
 * `syncThemeColor` method will sync the theme color selected in the AsyncStorage.
 * @returns [themeColor, syncThemeColor]
 */
export default function useThemeColor() {
  const themeColor = useAppSelector((s) => s.theme.themeColor);
  const themeMode = useAppSelector((s) => s.theme.themeMode);
  const dispatch = useAppDispatch();

  const localSetThemeColor = useCallback(
    (color: ThemeColor) => {
      dispatch(setThemeColor(color));
    },
    [dispatch]
  );
  const localSetThemeMode = useCallback(
    (mode: ThemeMode) => {
      dispatch(setThemeMode(mode));
    },
    [dispatch]
  );
  const setTheme = useCallback(
    (theme: ThemeProperties, isThemeColor: boolean) => {
      if (isThemeColor) {
        return localSetThemeColor(theme as ThemeColor);
      }
      localSetThemeMode(theme as ThemeMode);
    },
    [localSetThemeColor, localSetThemeMode]
  );
  async function syncTheme(type: ThemeType, theme: ThemeColor | ThemeMode) {
    const isThemeColor = type === "color";
    await storeStorageData({
      key: isThemeColor ? THEME_COLOR : THEME_MODE,
      value: theme,
      method: "set",
    });
    setTheme(theme, isThemeColor);
  }

  useEffect(() => {
    async function getTheme(type: ThemeType) {
      const isThemeColor = type === "color";
      const key = isThemeColor ? THEME_COLOR : THEME_MODE;
      const theme = await deleteGetStorageData({
        key,
        method: "get",
      });

      if (theme === undefined || theme === null) {
        const result = await storeStorageData({
          key,
          value: isThemeColor ? themeColor : themeMode,
          method: "set",
        });
        return setTheme(result as ThemeProperties, isThemeColor);
      }

      // Verifies if the `themeColor` is really inside the `themeColors`.
      setTheme(theme as ThemeProperties, isThemeColor);
    }
    void getTheme("color");
    void getTheme("mode");
  }, [localSetThemeColor, localSetThemeMode, setTheme, themeColor, themeMode]);

  return { themeColor, themeMode, syncTheme };
}
