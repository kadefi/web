import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { trackWalletSearchEvent } from "../analytics/Analytics.util";
import { addNewRecentWalletLS } from "../utils/LocalStorage.util";
import { isValidWalletAddress } from "../utils/String.util";

export type WalletAddresses = string[] | undefined;

export const useWalletAddresses = () => {
  const router = useRouter();

  const [walletAddresses, setWalletAddresses] = useState<WalletAddresses>();

  // Whenever route query changes
  useEffect(() => {
    const queryWalletAddress = router.query.walletAddress as string | undefined;

    if (!queryWalletAddress) {
      return;
    }

    const cleanedAddress = queryWalletAddress.toLowerCase().trim();

    // Back to homepage if invalide route wallet address is invalid
    if (!isValidWalletAddress(cleanedAddress)) {
      router.push("/");
      return;
    }

    // Set walletAddress based on route
    setWalletAddresses([cleanedAddress]);
  }, [router]);

  useEffect(() => {
    if (walletAddresses && walletAddresses[0]) {
      // Save recent wallet to local storage
      addNewRecentWalletLS(walletAddresses[0]);

      // Track new wallet search event on Amplitude
      trackWalletSearchEvent(walletAddresses[0]);
    }
  }, [walletAddresses]);

  return { walletAddresses };
};
