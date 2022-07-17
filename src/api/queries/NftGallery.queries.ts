import { QueryFunction, useQueries, useQuery, UseQueryResult } from "react-query";
import { NftCollectionData, NftCollectionsList as NftCollectionsList } from "../../types/DashboardData.type";
import { isValidWalletAddress } from "../../utils/String.util";
import { getNftCollectionsList, getNftCollectionData } from "../Nft.api";

export const useGetNftCollectionsData = (nftCollectionsList: NftCollectionsList = [], walletAddress: string = "") => {
  const queries: {
    queryKey: string[];
    queryFn: QueryFunction<NftCollectionData>;
    enabled: boolean;
  }[] = [];

  const isEnabled = nftCollectionsList?.length > 0 && isValidWalletAddress(walletAddress);

  nftCollectionsList.forEach((collection) => {
    queries.push({
      queryKey: [collection.module, walletAddress],
      queryFn: ({ signal }) => getNftCollectionData(collection.module, walletAddress, signal),
      enabled: isEnabled,
    });
  });

  const [...collectionsQueries] = useQueries(queries);

  return { collectionsQueries } as {
    collectionsQueries: UseQueryResult<NftCollectionData>[];
  };
};

export const useGetNftCollectionsList = (): UseQueryResult<NftCollectionsList> => {
  return useQuery(["NFT_COLLECTIONS_LIST"], () => getNftCollectionsList(), { cacheTime: 1000 * 60 * 10 });
};
