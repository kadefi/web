import { UseQueryResult } from "@tanstack/react-query";
import { isEmpty } from "lodash";

export const isQueriesFetching = <T>(queries: UseQueryResult<T>[]) => {
  if (queries.length === 0) {
    return true;
  }

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];

    if (!query || query.isLoading || query.isFetching) {
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

    if (data && !isEmpty(data) && !isLoading && !isError) {
      queryResults.push(data);
    }
  }

  return queryResults;
};

export const getProjectQueryKey = (projectModule: string) => {
  return `PROJECT-KEY-${projectModule}`;
};

export const getNftQueryKey = (nftModule: string) => {
  return `NFT-KEY-${nftModule}`;
};
