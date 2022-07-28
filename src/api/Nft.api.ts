import { NftCollectionData } from "../types/DashboardData.type";
import ApiClient from "./ApiClient";

export const getNftCollectionData = async (
  collectionKey: string,
  walletAddress: string,
  signal: AbortSignal | undefined,
): Promise<NftCollectionData> => {
  const response = await ApiClient.get(`gallery/${collectionKey}/${walletAddress}?cache=false`, { signal });
  return response.data as NftCollectionData;
};

export const getNftCollectionsList = async () => {
  const response = await ApiClient.get(`gallery`);
  return response.data as string[];
};
