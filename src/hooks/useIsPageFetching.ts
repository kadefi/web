import { useIsFetching } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const useIsPageFetching = () => {
  const [isPageFetching, setIsPageFetching] = useState(false);
  const isQueriesFetching = Boolean(useIsFetching());

  useEffect(() => {
    setIsPageFetching(isQueriesFetching);
  }, [isQueriesFetching]);

  return isPageFetching;
};

export default useIsPageFetching;
