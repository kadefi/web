import { LS_RECENT_SEARCHES_KEY } from "../constants/LocalStorage.constant";
import { isValidWalletAddress } from "./String.util";

const SEPARATOR = ";";

export const getRecentWalletsLS = () => {
  return localStorage.getItem(LS_RECENT_SEARCHES_KEY)?.split(SEPARATOR) || [];
};

export const addNewRecentWalletLS = (walletAddress: string | undefined) => {
  if (walletAddress && isValidWalletAddress(walletAddress)) {
    const existingRecentWallets = getRecentWalletsLS();
    const newRecentWallets = Array.from(new Set([walletAddress, ...existingRecentWallets])).slice(0, 3);
    localStorage.setItem(LS_RECENT_SEARCHES_KEY, newRecentWallets.join(SEPARATOR));
  }
};
