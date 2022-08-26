import { useEffect } from "react";
import { Route } from "../enums/Route.enum";
import { trackPageVisit } from "./Analytics.util";

export const useTrackPageVisit = (route: Route) => {
  useEffect(() => {
    trackPageVisit(route);
  }, [route]);
};
