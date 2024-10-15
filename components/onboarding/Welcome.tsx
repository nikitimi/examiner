import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Spotlight, { spotLightTitles } from "./Spotlight";
import { setSpotlightVisibility } from "@/redux/reducers/onboardingReducer";

/**
 * Contains information about the application.
 */
const Welcome = () => {
  const spotlights = useAppSelector((s) => s.onboarding.spotlights);
  const onBoardingStatus = useAppSelector((s) => s.onboarding.onBoardingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO: Set the onboarding Status into the AsyncStorage.
    if (onBoardingStatus.length === spotLightTitles.length) {
      // Ensure that the spotlight will occur only once.
      onBoardingStatus.forEach((title) =>
        dispatch(setSpotlightVisibility({ title, isVisible: true }))
      );
    }
  }, [dispatch, onBoardingStatus]);

  return (
    <>
      {spotlights.map((props) => (
        <Spotlight key={props.title} {...props} />
      ))}
    </>
  );
};

export default Welcome;
