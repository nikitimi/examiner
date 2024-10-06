import React from "react";
import { useAppSelector } from "@/redux/store";
import Spotlight from "./Spotlight";

/**
 * Contains information about the application.
 */
const Welcome = () => {
  const spotlights = useAppSelector((s) => s.onboarding.spotlights);

  return (
    <>
      {spotlights.map((props) => (
        <Spotlight key={props.title} {...props} />
      ))}
    </>
  );
};

export default Welcome;
