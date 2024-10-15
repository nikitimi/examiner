import type { AppInitialSettings } from "@/lib/utils/schema/appInitialSettings";
import { EMPTY_STRING } from "@/constants/String";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = AppInitialSettings;

const initialState: InitialState = {
  name: EMPTY_STRING,
  version: EMPTY_STRING,
  currentEmoji: EMPTY_STRING,
  whenAppLatestMessage: "You're currently on the latest version.",
  uri: EMPTY_STRING,
};

const appSettingsSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAppSettingsState: (
      state,
      action: {
        payload: {
          key: keyof InitialState;
          value: string;
        };
      }
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setAppSettingsState } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
