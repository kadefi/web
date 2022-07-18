import { useState, useEffect } from "react";
import _ from "underscore";
import { useGetNftCollectionsList } from "../api/queries/NftGallery.queries";
import { LS_SELECTED_NFT_MODULES } from "../constants/LocalStorage.constant";
import { NftCollectionsList } from "../types/DashboardData.type";
import { arrayLocalStorage } from "../utils/LocalStorage.util";

export const useNftCollectionsList = () => {
  const [nftCollectionsList, setNftCollectionsList] = useState<NftCollectionsList>();
  const [selectedNftModules, setSelectedNftModules] = useState<string[]>([]);

  const { data: nftCollectionsListRes } = useGetNftCollectionsList();

  useEffect(() => {
    const lsNftModules = arrayLocalStorage(LS_SELECTED_NFT_MODULES).get();

    if (nftCollectionsListRes) {
      setNftCollectionsList(nftCollectionsListRes);

      if (lsNftModules) {
        setSelectedNftModules(lsNftModules);
      } else {
        const nftModules = nftCollectionsListRes.map((collection) => collection.module);
        setSelectedNftModules(nftModules);
        arrayLocalStorage(LS_SELECTED_NFT_MODULES).init(nftModules);
      }
    }
  }, [nftCollectionsListRes]);

  const handleNftModuleToggle = (module: string) => {
    if (selectedNftModules.includes(module)) {
      if (selectedNftModules.length === 1 && selectedNftModules[0] === module) {
        return;
      }
      setSelectedNftModules((selectedNftModules) => _.without(selectedNftModules, module));
      arrayLocalStorage(LS_SELECTED_NFT_MODULES).removeItem(module);
    } else {
      setSelectedNftModules((selectedNftModules) => [...selectedNftModules, module].sort());
      arrayLocalStorage(LS_SELECTED_NFT_MODULES).addItem(module);
    }
  };

  return { nftCollectionsList, setNftCollectionsList, selectedNftModules, handleNftModuleToggle };
};
