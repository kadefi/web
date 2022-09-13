import { isEqual } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { bookmarkLS } from "../utils/LocalStorage.util";
import { useWalletAddresses } from "./useWalletAddress";

const useBookmarks = () => {
  const { walletAddresses } = useWalletAddresses();
  const [bookmarks, setBookmarks] = useState<{ [k: string]: string[] }>({});
  const [isSSR, setIsSSR] = useState(true);
  const currentBookmark = walletAddresses
    ? Object.keys(bookmarks).filter((bookmarkKey) => isEqual(walletAddresses.sort(), bookmarks[bookmarkKey].sort()))
    : [];
  const isBookmarked = currentBookmark.length > 0;
  const currentBookmarkName = isBookmarked ? currentBookmark[0] : undefined;

  const refreshBookmarks = useCallback(() => {
    setBookmarks(bookmarkLS().get());
  }, []);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  useEffect(() => {
    if (!isSSR) {
      refreshBookmarks();
    }
  }, [isSSR, refreshBookmarks]);

  return { bookmarks, refreshBookmarks, currentBookmarkName };
};

export default useBookmarks;
