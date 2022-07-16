import { QueryFunction, useQueries, UseQueryResult } from "react-query";
import { NftCollectionData } from "../../types/DashboardData.type";
import { NFT_COLLECTION_KEY } from "../../types/Project.type";
import { getNftCollectionData } from "../Nft.api";

export const useGetNftCollections = (walletAddress?: string) => {
  const queries: {
    queryKey: string[];
    queryFn: QueryFunction<NftCollectionData>;
  }[] = [];

  if (walletAddress) {
    Object.values(NFT_COLLECTION_KEY).forEach((collectionKey) => {
      queries.push({
        queryKey: [collectionKey, walletAddress],
        queryFn: ({ signal }) => getNftCollectionData(collectionKey, walletAddress, signal),
      });
    });
  }

  const [...collectionsQueries] = useQueries(queries);

  return { collectionsQueries } as {
    collectionsQueries: UseQueryResult<NftCollectionData>[];
  };
};
