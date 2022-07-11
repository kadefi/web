import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { trackWalletSearchEvent } from "../analytics/Analytics.util";
import { addNewRecentWalletLS } from "../utils/LocalStorage.util";
import { isValidWalletAddress } from "../utils/String.util";

export const useWalletAddress = () => {
  const router = useRouter();

  const [walletAddress, setWalletAddress] = useState<string | undefined>();

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
    setWalletAddress(cleanedAddress);
  }, [router]);

  useEffect(() => {
    if (walletAddress) {
      // Save recent wallet to local storage
      addNewRecentWalletLS(walletAddress);

      // Track new wallet search event on Amplitude
      trackWalletSearchEvent(walletAddress);
    }
  }, [walletAddress]);

  return { walletAddress };
};
