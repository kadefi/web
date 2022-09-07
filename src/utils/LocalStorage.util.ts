import _ from "underscore";
import { trackLocalStorageUpdate } from "../analytics/Analytics.util";
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

const getLocalStorageJsonObj = (key: string) => {
  if (typeof window === "undefined") {
    return {};
  }

  const lsItem = localStorage.getItem(key);

  let obj = {};

  if (lsItem) {
    obj = JSON.parse(lsItem);
  }

  return obj;
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
      const newList = _.uniq([newItem, ...currentList].sort(), true).join(SEPARATOR);
      trackLocalStorageUpdate({ key, value: newList });
      localStorage.setItem(key, newList);
    },
    removeItem: (item: string) => {
      const currentList = getLocalStorageArray(key);
      const newList = _.without(currentList, item).join(SEPARATOR);
      trackLocalStorageUpdate({ key, value: newList });
      localStorage.setItem(key, newList);
    },
    destroy: () => {
      localStorage.removeItem(key);
    },
  };
};

const LS_BOOKMARK_KEY = "LS_BOOKMARK_KEY";

export const bookmarkLS = () => {
  return {
    get: () => {
      return getLocalStorageJsonObj(LS_BOOKMARK_KEY);
    },
    addBookmark: (bookmarkName: string, walletAddresses: string[]) => {
      const bookmarks: { [k: string]: string[] } = getLocalStorageJsonObj(LS_BOOKMARK_KEY);

      bookmarks[bookmarkName] = walletAddresses;

      localStorage.setItem(LS_BOOKMARK_KEY, JSON.stringify(bookmarks));
    },
    removeBookmark: (bookmarkName: string) => {
      const bookmarks: { [k: string]: string[] } = getLocalStorageJsonObj(LS_BOOKMARK_KEY);

      if (bookmarkName in bookmarks) {
        delete bookmarks[bookmarkName];
      }

      localStorage.setItem(LS_BOOKMARK_KEY, JSON.stringify(bookmarks));
    },
    destroy: () => {
      localStorage.removeItem(LS_BOOKMARK_KEY);
    },
  };
};
