import { QueryFunction, useQueries, useQuery, UseQueryResult } from "react-query";
import { NftCollectionData, NftCollectionsList as NftCollectionsList } from "../../types/DashboardData.type";
import { isValidWalletAddress } from "../../utils/String.util";
import { getNftCollectionsList, getNftCollectionData } from "../Nft.api";

export const useGetNftCollectionsData = (selectedNftModules: string[] = [], walletAddress: string = "") => {
  const queries: {
    queryKey: string[];
    queryFn: QueryFunction<NftCollectionData>;
    enabled: boolean;
  }[] = [];

  const isEnabled = selectedNftModules?.length > 0 && isValidWalletAddress(walletAddress);

  selectedNftModules.forEach((nftModule) => {
    queries.push({
      queryKey: [nftModule, walletAddress],
      queryFn: ({ signal }) => getNftCollectionData(nftModule, walletAddress, signal),
      enabled: isEnabled,
    });
  });

  const [...collectionsQueries] = useQueries(queries);

  return { collectionsQueries } as {
    collectionsQueries: UseQueryResult<NftCollectionData>[];
  };
};

export const useGetNftCollectionsList = (): UseQueryResult<NftCollectionsList> => {
  return useQuery(["NFT_COLLECTIONS_LIST"], () => getNftCollectionsList());
};
