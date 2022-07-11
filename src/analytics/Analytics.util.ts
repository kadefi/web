import amplitude from "amplitude-js";
import { ROUTE } from "../constants/Routes.constant";
import { AMPLITUDE_EVENT } from "./AmplitudeEvent";

export const initializeAmplitude = () => {
  if (!process.env.NEXT_PUBLIC_AMPLITUDE_KEY) {
    console.log("WARN: Amplitude key has not been set");
    return;
  }

  amplitude.getInstance().init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY);
};

export const trackEvent = (eventName: AMPLITUDE_EVENT, data: Object) => {
  if (!process.env.NEXT_PUBLIC_AMPLITUDE_KEY) {
    return;
  }

  amplitude.getInstance().logEvent(eventName, data);
};

export const trackPageVisit = (route: ROUTE) => {
  trackEvent(AMPLITUDE_EVENT.PAGE_VIST, { route });
};

export const trackWalletSearchEvent = (walletAddress: string) => {
  // console.log("Track amplitude wallet search event")
  trackEvent(AMPLITUDE_EVENT.WALLET_SEARCH, { walletAddress });
};

export const trackRequestError = (config: {
  method: string;
  baseUrl: string;
  url: string;
  errorMessage: string;
  statusText: string;
}) => {
  trackEvent(AMPLITUDE_EVENT.REQUEST_ERROR, config);
};
