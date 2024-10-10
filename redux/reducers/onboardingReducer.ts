import { type SpotlightProps } from "@/components/onboarding/Spotlight";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  onBoardingStatus: SpotlightProps["title"][];
  spotlights: SpotlightProps[];
};

const initialState: InitialState = {
  onBoardingStatus: [],
  spotlights: [
    {
      height: 0,
      left: 0,
      messages: [
        "Sync your data by logging in...",
        "Customize your theme...",
        "Lastly contact the developer in the settings.",
      ],
      title: "settings_button",
      top: 0,
      width: 0,
      messageIndex: 0,
      isVisible: false,
    },
    {
      height: 0,
      left: 0,
      messages: [
        "This is where your profile picture resides...",
        "As well as your display name.",
      ],
      title: "user_info",
      top: 0,
      width: 0,
      messageIndex: 0,
      isVisible: false,
    },
  ],
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    updateOnboardingStatus: (
      state,
      action: {
        payload: {
          value: InitialState["onBoardingStatus"][number];
          method: "delete" | "push";
        };
      }
    ) => {
      switch (action.payload.method) {
        case "delete":
          state.onBoardingStatus.splice(
            state.onBoardingStatus.indexOf(action.payload.value),
            1
          );
          break;
        case "push":
          // Maybe add `Set` method for producing unique array values.
          if (!state.onBoardingStatus.includes(action.payload.value)) {
            state.onBoardingStatus.push(action.payload.value);
          }
          break;
      }
    },
    setMeasurement: (
      state,
      action: {
        payload: Omit<
          SpotlightProps,
          "messages" | "messageIndex" | "isVisible"
        >;
      }
    ) => {
      const { top, left, width, height, ...rest } = action.payload;
      const spotlight = [...state.spotlights].filter(
        ({ title }) => title === rest.title
      );
      if (spotlight.length === 1) {
        spotlight[0].top = top;
        spotlight[0].left = left;
        spotlight[0].width = width;
        spotlight[0].height = height;
      }
      const restOfSpotlight = [...state.spotlights].filter(
        ({ title }) => title !== rest.title
      );
      state.spotlights = [...restOfSpotlight, ...spotlight];
    },
    setMessageIndex: (
      state,
      action: { payload: Pick<SpotlightProps, "title"> }
    ) => {
      const spotlight = [...state.spotlights].filter(
        ({ title }) => title === action.payload.title
      );
      if (spotlight.length === 1) {
        spotlight[0].messageIndex = spotlight[0].messageIndex + 1;
      }
      const restOfSpotlight = [...state.spotlights].filter(
        ({ title }) => title !== action.payload.title
      );
      console.log(action.payload.title);
      state.spotlights = [...restOfSpotlight, ...spotlight];
    },
    setSpotlightVisibility: (
      state,
      action: { payload: Pick<SpotlightProps, "isVisible" | "title"> }
    ) => {
      const { isVisible, ...rest } = action.payload;
      const spotlight = [...state.spotlights].filter(
        ({ title }) => title === rest.title
      );
      if (spotlight.length === 1) {
        spotlight[0].isVisible = isVisible;
      }
      const restOfSpotlight = [...state.spotlights].filter(
        ({ title }) => title !== rest.title
      );
      state.spotlights = [...restOfSpotlight, ...spotlight];
    },
  },
});

export const {
  updateOnboardingStatus,
  setMeasurement,
  setMessageIndex,
  setSpotlightVisibility,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
