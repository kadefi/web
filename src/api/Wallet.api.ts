import { WalletData } from "../types/DashboardData.type";
import ApiClient from "./ApiClient";

export const getWalletTokens = async (walletAddress: string, signal: AbortSignal | undefined): Promise<WalletData> => {
  const response = await ApiClient.get(`/wallet/${walletAddress}`, { signal });
  return response.data as WalletData;
};
