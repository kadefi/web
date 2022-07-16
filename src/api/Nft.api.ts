import { NftCollectionData } from "../types/DashboardData.type";
import { NFT_COLLECTION_KEY } from "../types/Project.type";
import ApiClient from "./ApiClient";

export const getNftCollectionData = async (
  collectionKey: NFT_COLLECTION_KEY,
  walletAddress: string,
  signal: AbortSignal | undefined,
): Promise<NftCollectionData> => {
  const response = await ApiClient.get(`gallery/${collectionKey}/${walletAddress}`, { signal });
  return response.data as NftCollectionData;
};
