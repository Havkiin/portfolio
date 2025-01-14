import React, { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { useNavigationContext } from "../hooks/NavigationContext";

const NavigationTracker: React.FC = () => {
  const location = useLocation();
  const browserNavigationType = useNavigationType();
  const { setNavigationType } = useNavigationContext();

  useEffect(() => {
    if (browserNavigationType === "POP") {
      setNavigationType("direct");
    } else {
      setNavigationType("in-app");
    }
  }, [location, browserNavigationType, setNavigationType]);

  return null;
};

export default NavigationTracker;