import { WalletData } from "../types/DashboardData.type";
import ApiClient from "./ApiClient";

export const getWalletTokens = async (
  walletAddress: string
): Promise<WalletData> => {
  const response = await ApiClient.get(`/wallet/${walletAddress}`);
  return response.data as WalletData;
};
