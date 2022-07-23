import { UseQueryResult } from "react-query";

export const isQueriesLoading = (...queries: UseQueryResult<any>[]) => {
  let isLoading = false;

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];

    if (!query || query.isIdle || query.isLoading) {
      isLoading = true;
      break;
    }
  }

  return isLoading;
};

export const isQueriesFetching = (...queries: UseQueryResult<any>[]) => {
  let isFetching = false;

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];

    if (!query || query.isIdle || query.isFetching) {
      isFetching = true;
      break;
    }
  }

  return isFetching;
};
