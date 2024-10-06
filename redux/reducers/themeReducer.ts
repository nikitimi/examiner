import type { ThemeColors } from "@/constants/Colors";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  themeColor: ThemeColors;
};

const initialState: InitialState = {
  themeColor: "#00EE33",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeColor: (state, action: { payload: InitialState["themeColor"] }) => {
      state.themeColor = action.payload;
    },
  },
});

export const { setThemeColor } = themeSlice.actions;
export default themeSlice.reducer;
