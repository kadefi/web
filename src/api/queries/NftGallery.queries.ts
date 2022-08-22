import { QueryFunction, useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { NftCollectionData, NftCollectionsList as NftCollectionsList } from "../../types/DashboardData.type";
import { getNftCollectionsList, getNftCollectionData } from "../Nft.api";

export const useGetNftCollectionData = (
  nftModule: string,
  walletAddresses: string[] | undefined,
  isEnabled: boolean,
) => {
  const queries: {
    queryKey: string[];
    queryFn: QueryFunction<NftCollectionData>;
    enabled: boolean;
  }[] = walletAddresses
    ? walletAddresses.map((walletAddress) => ({
        queryKey: [nftModule, walletAddress],
        queryFn: ({ signal }) => getNftCollectionData(nftModule, walletAddress, signal),
        enabled: isEnabled,
      }))
    : [];

  return useQueries({ queries });
};

export const useGetNftCollectionsList = (): UseQueryResult<NftCollectionsList> => {
  return useQuery(["NFT_COLLECTIONS_LIST"], () => getNftCollectionsList());
};
