import _ from "underscore";
import { LS_RECENT_SEARCHES_KEY } from "../constants/LocalStorage.constant";

const SEPARATOR = ";";

const getLocalStorageArray = (key: string) => {
  const lsItem = localStorage.getItem(key);

  let arr: string[] = [];

  if (lsItem) {
    arr = lsItem.split(SEPARATOR);
  }

  return arr;
};

export const getRecentWalletsLS = () => {
  return getLocalStorageArray(LS_RECENT_SEARCHES_KEY);
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
      return getLocalStorageArray(key);
    },
    init: (items: string[]) => {
      localStorage.removeItem(key);
      localStorage.setItem(key, items.sort().join(SEPARATOR));
    },
    addItem: (newItem: string) => {
      const currentList = getLocalStorageArray(key);
      const newList = _.uniq([newItem, ...currentList].sort(), true);
      localStorage.setItem(key, newList.join(SEPARATOR));
    },
    removeItem: (item: string) => {
      const currentList = getLocalStorageArray(key);
      const newList = _.without(currentList, item);
      localStorage.setItem(key, newList.join(SEPARATOR));
    },
  };
};
