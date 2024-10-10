import type { ThemeColor, ThemeMode } from "@/constants/Colors";
import { createSlice } from "@reduxjs/toolkit";
import { GREEN } from "@/constants/Colors";

type InitialState = {
  themeColor: ThemeColor;
  themeMode: ThemeMode;
};

const initialState: InitialState = {
  themeColor: GREEN,
  themeMode: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeColor: (state, action: { payload: InitialState["themeColor"] }) => {
      state.themeColor = action.payload;
    },
    setThemeMode: (state, action: { payload: InitialState["themeMode"] }) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeColor, setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
