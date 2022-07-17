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

export const arrayLocalStorage = (key: string) => {
  return {
    get: () => {
      return localStorage.getItem(key)?.split(SEPARATOR);
    },
    init: (items: string[]) => {
      localStorage.setItem(key, items.join(SEPARATOR));
    },
    addItem: (newItem: string) => {
      const currentList = localStorage.getItem(key)?.split(SEPARATOR) || [];
      const newList = Array.from(new Set([newItem, ...currentList])).sort();
      localStorage.setItem(key, newList.join(SEPARATOR));
    },
    removeItem: (item: string) => {
      const currentList = new Set(localStorage.getItem(key)?.split(SEPARATOR) || []);
      currentList.delete(item);
      const newList = Array.from(currentList).sort();
      localStorage.setItem(key, newList.join(SEPARATOR));
    },
  };
};
