/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export type ThemeColors = (typeof themeColors)[number];

export const GREEN = "#00EE33";
export const WHITE = "#F2F2F2";
export const BLACK = "#050505";

const tintColorLight = "#0a7ea4";
const tintColorDark = GREEN;

export const themeColors = [
  "#BEAEE2",
  "#3F72AF",
  "#FCE38A",
  "#61C0BF",
  "#E84545",
  "#FFD4D4",
  GREEN,
] as const;

export const Colors = {
  light: {
    text: BLACK,
    background: WHITE,
    tint: tintColorLight,
    icon: `${BLACK}44`,
    tabIconDefault: `${BLACK}44`,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: WHITE,
    background: BLACK,
    tint: tintColorDark,
    icon: `${BLACK}66`,
    tabIconDefault: `${BLACK}66`,
    tabIconSelected: tintColorDark,
  },
};
