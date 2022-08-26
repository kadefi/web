import { uniq } from "lodash";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import { trackWalletSearchEvent } from "../analytics/Analytics.util";
// import { addNewRecentWalletLS } from "../utils/LocalStorage.util";
import { isValidWalletAddress } from "../utils/String.util";
import { useCurrentMenu } from "./useCurrentMenu";

export type WalletAddresses = string[] | undefined;

export const useWalletAddresses = () => {
  const router = useRouter();
  const { currentMenu } = useCurrentMenu();
  const [walletAddresses, setWalletAddresses] = useState<WalletAddresses>();
  const { isWalletSearch } = currentMenu;

  // Whenever route query changes
  useEffect(() => {
    if (router.isReady && isWalletSearch) {
      let queryWalletAddresses = router.query.wallet as string | string[] | undefined;

      if (!queryWalletAddresses) {
        router.push("/");
        return;
      }

      if (typeof queryWalletAddresses === "string") {
        queryWalletAddresses = [queryWalletAddresses];
      }

      queryWalletAddresses = uniq(queryWalletAddresses.slice(0, 5));

      const cleanedAddresses = queryWalletAddresses.map((address) => address.toLowerCase().trim());

      // Back to homepage if invalide route wallet address is invalid
      for (let i = 0; i < cleanedAddresses.length; i++) {
        if (!isValidWalletAddress(cleanedAddresses[i])) {
          router.push("/");
          return;
        }
      }

      if (cleanedAddresses.length > 5) {
        router.push("/");
      }

      setWalletAddresses(cleanedAddresses);
    }
  }, [router, isWalletSearch]);

  // useEffect(() => {
  //   if (walletAddresses && walletAddresses[0]) {
  //     // Save recent wallet to local storage
  //     addNewRecentWalletLS(walletAddresses[0]);

  //     // Track new wallet search event on Amplitude
  //     trackWalletSearchEvent(walletAddresses[0]);
  //   }
  // }, [walletAddresses]);

  return { walletAddresses };
};
