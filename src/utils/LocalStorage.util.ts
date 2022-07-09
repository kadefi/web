import { LS_RECENT_SEARCHES_KEY } from "../constants/LocalStorage.constant";

const SEPARATOR = ";";

export const getRecentWalletsLS = () => {
  return localStorage.getItem(LS_RECENT_SEARCHES_KEY)?.split(SEPARATOR) || [];
};

export const addNewRecentWalletLS = (walletAddress: string) => {
  // console.log("Add wallet to local storage");
  const existingRecentWallets = getRecentWalletsLS();
  const newRecentWallets = Array.from(new Set([walletAddress, ...existingRecentWallets])).slice(0, 3);
  localStorage.setItem(LS_RECENT_SEARCHES_KEY, newRecentWallets.join(SEPARATOR));
};
