import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isOnboardingComplete: boolean;
};

const initialState: InitialState = {
  isOnboardingComplete: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setIsOnboardingComplete: (
      state,
      action: { payload: InitialState["isOnboardingComplete"] }
    ) => {
      state.isOnboardingComplete = action.payload;
    },
  },
});

export const { setIsOnboardingComplete } = onboardingSlice.actions;
export default onboardingSlice.reducer;
