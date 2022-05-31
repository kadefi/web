import { useQuery } from "react-query";
import { WalletData } from "../types/DashboardData.type";
import ApiClient from "./ApiClient";

const WALLET_QUERY_KEY = "WALLET_QUERY_KEY";

export const useGetWalletTokens = (walletAddress?: string) => {
  return useQuery(
    [WALLET_QUERY_KEY, walletAddress],
    async () => {
      if (!walletAddress || walletAddress.length === 0) {
        return;
      }

      return ApiClient.get(`/wallet/${walletAddress}`);
    },
    {
      select: (response) => (response as any).data as WalletData,
    }
  );
};
