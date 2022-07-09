import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

    // Back to homepage if invalide route wallet address is invalid
    if (!isValidWalletAddress(queryWalletAddress)) {
      router.push("/");
      return;
    }

    // Set walletAddress based on route
    setWalletAddress(queryWalletAddress);
  }, [router, router.query.walletAddress]);

  return { walletAddress };
};
