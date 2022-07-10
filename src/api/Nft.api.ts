// import MOCK_NFT_DATA from "../mocks/nft.json";
import { NftGalleryData } from "../types/DashboardData.type";
import ApiClient from "./ApiClient";

export const getNftGalleryData = async (walletAddress?: string): Promise<NftGalleryData | null> => {
  if (!walletAddress) {
    return null;
  }

  // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // await sleep(500);
  const response = await ApiClient.get(`/gallery/${walletAddress}`);
  return response.data as NftGalleryData;

  // return MOCK_NFT_DATA as NftGalleryData;
};
