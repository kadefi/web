import { useEffect } from "react";
import { ROUTE } from "../constants/Routes.constant";
import { trackPageVisit } from "./Analytics.util";

export const useTrackPageVisit = (route: ROUTE) => {
  useEffect(() => {
    trackPageVisit(route);
  }, [route]);
};
