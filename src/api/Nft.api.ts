import { NftGalleryData } from "../types/DashboardData.type";
import ApiClient from "./ApiClient";

export const getNftGalleryData = async (walletAddress?: string): Promise<NftGalleryData | null> => {
  if (!walletAddress) {
    return null;
  }
  const response = await ApiClient.get(`/gallery/${walletAddress}`);
  return response.data as NftGalleryData;
};
