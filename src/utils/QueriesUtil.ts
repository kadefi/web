import { UseQueryResult } from "@tanstack/react-query";

export const isQueriesLoading = (...queries: UseQueryResult<any>[]) => {
  if (queries.length === 0) {
    return true;
  }

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];

    if (!query || query.isLoading) {
      return true;
    }
  }

  return false;
};

export const isQueriesFetching = (...queries: UseQueryResult<any>[]) => {
  if (queries.length === 0) {
    return true;
  }

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];

    if (!query || query.isFetching) {
      return true;
    }
  }

  return false;
};
