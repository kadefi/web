import amplitude from "amplitude-js";
import { ROUTE } from "../constants/Routes.constant";
import { AMPLITUDE_EVENT } from "./AmplitudeEvents";

export const initializeAmplitude = () => {
  amplitude.getInstance().init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY!);
};

export const trackEvent = (eventName: AMPLITUDE_EVENT, data: Object) => {
  amplitude.getInstance().logEvent(eventName, data);
};

export const trackPageVisit = (route: ROUTE) => {
  trackEvent(AMPLITUDE_EVENT.PAGE_VIST, { route });
};

export const trackWalletSearchEvent = (walletAddress: string) => {
  trackEvent(AMPLITUDE_EVENT.WALLET_SEARCH, { walletAddress });
};
