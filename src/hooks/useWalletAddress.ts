import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { isValidWalletAddress } from "../utils/String.util";

export const useWalletAddress = () => {
  const router = useRouter();

  const [walletAddress, setWalletAddress] = useState<string | undefined>();

  useEffect(() => {
    const queryWalletAddress = router.query.walletAddress as string | undefined;

    if (!queryWalletAddress) {
      return;
    }

    if (!isValidWalletAddress(queryWalletAddress)) {
      router.push("/");
      return;
    }

    setWalletAddress(queryWalletAddress);
  }, [router, router.query.walletAddress]);

  return { walletAddress };
};
