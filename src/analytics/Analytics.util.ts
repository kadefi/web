import amplitude from "amplitude-js";
import { Route } from "../enums/Route.enum";
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

export const trackPageVisit = (route: Route) => {
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
  statusCode: number;
}) => {
  trackEvent(AMPLITUDE_EVENT.REQUEST_ERROR, config);
};

export const trackNftImageLoadError = (config: { collection: string | null; nftId: string }) => {
  trackEvent(AMPLITUDE_EVENT.IMAGE_LOAD_ERROR, config);
};

export const trackDisabledIntegration = (config: { key: string; action: "add" | "remove"; module: string }) => {
  trackEvent(AMPLITUDE_EVENT.DISABLED_INTEGRATION_CHANGE, config);
};

export const trackLocalStorageUpdate = (config: { key: string; value: string }) => {
  trackEvent(AMPLITUDE_EVENT.LOCAL_STORAGE_UPDATE, config);
};

export const trackApiResponseTime = (config: {
  baseUrl: string;
  shortenedUrl: string;
  url: string;
  duration: number;
}) => {
  trackEvent(AMPLITUDE_EVENT.API_RESPONSE_TIME, config);
};
