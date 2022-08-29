import { QueryFunction, useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { NftCollectionData, NftCollectionsList as NftCollectionsList } from "../../types/DashboardData.type";
import { getQueriesResults, isQueriesLoading, isQueriesFetching } from "../../utils/QueriesUtil";
import { getNftCollectionsList, getNftCollectionData } from "../Nft.api";

export const useGetNftCollectionData = (
  nftModule: string,
  walletAddresses: string[] | undefined,
  isEnabled: boolean,
) => {
  const queriesConfig: {
    queryKey: string[];
    queryFn: QueryFunction<NftCollectionData>;
    enabled: boolean;
  }[] = walletAddresses
    ? walletAddresses.map((walletAddress) => ({
        queryKey: [`NFT-QUERY-${nftModule}`, walletAddress],
        queryFn: ({ signal }) => getNftCollectionData(nftModule, walletAddress, signal),
        enabled: isEnabled,
      }))
    : [];

  const queries = useQueries({ queries: queriesConfig });

  return {
    nftCollectionsData: getQueriesResults(queries),
    isLoading: isQueriesLoading(queries),
    isFetching: isQueriesFetching(queries),
  };
};

export const useGetNftCollectionsList = (): UseQueryResult<NftCollectionsList> => {
  return useQuery(["NFT_COLLECTIONS_LIST"], () => getNftCollectionsList());
};
