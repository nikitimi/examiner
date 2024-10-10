export type ThemeColor = (typeof themeColors)[number];
export type ThemeMode = keyof typeof Colors;

export const GREEN = "#00EE33";
export const PURPLE = "#BEAEE2";
export const WHITE = "#F2F2F2";
export const BLACK = "#050505";
export const BLUE = "#3F72AF";
export const YELLOW = "#FCE38A";
export const SKY = "#61C0BF";
export const RED = "#E84545";
export const PINK = "#FFD4D4";

export const themeColors = [
  GREEN,
  PURPLE,
  BLUE,
  YELLOW,
  SKY,
  RED,
  PINK,
] as const;

export const Colors = {
  light: {
    text: BLACK,
    background: WHITE,
    icon: `${BLACK}44`,
    tabIconDefault: `${BLACK}44`,
  },
  dark: {
    text: WHITE,
    background: BLACK,
    icon: `${BLACK}66`,
    tabIconDefault: `${BLACK}66`,
  },
};
