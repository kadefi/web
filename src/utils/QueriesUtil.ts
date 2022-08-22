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

export const getQueriesResults = <T>(queries: UseQueryResult<T>[]) => {
  if (queries.length === 0) {
    return [];
  }

  const queryResults: T[] = [];

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];

    const { data, isError, isLoading } = query;

    if (data && !isLoading && !isError) {
      queryResults.push(data);
    }
  }

  return queryResults;
};
