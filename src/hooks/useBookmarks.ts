import { useCallback, useEffect, useState } from "react";
import { bookmarkLS } from "../utils/LocalStorage.util";

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<{ [k: string]: string[] }>({});
  const [isSSR, setIsSSR] = useState(true);

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

  return { bookmarks, refreshBookmarks };
};

export default useBookmarks;
