import MOCK_NFT_DATA from "../mocks/nft.json";
import { NftData } from "../types/DashboardData.type";
// import ApiClient from "./ApiClient";

export const getNftGalleryData = async (walletAddress?: string): Promise<NftData | null> => {
  if (!walletAddress) {
    return null;
  }

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  await sleep(10000);
  // const response = await ApiClient.get(`/nft/${walletAddress}`);
  // return response.data as NftData;

  return MOCK_NFT_DATA as NftData;
};
