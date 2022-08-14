import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { NftCollectionsList, ProjectsList } from "../types/DashboardData.type";
import { isEmpty } from "../utils/Object.util";

type PageLayoutContextType = {
  walletAddress: string | undefined;

  // Projects
  projectsList?: ProjectsList;
  setProjectsList: Dispatch<SetStateAction<ProjectsList | undefined>>;
  selectedProjectModules: string[];
  handleProjectModuleToggle: (module: string) => void;

  // NFT
  nftCollectionsList?: NftCollectionsList;
  setNftCollectionsList: Dispatch<SetStateAction<NftCollectionsList | undefined>>;
  selectedNftModules: string[];
  handleNftModuleToggle: (module: string) => void;
};

export const PageLayoutContext = createContext<PageLayoutContextType>({} as PageLayoutContextType);

export const usePageLayoutContext = () => {
  const context = useContext(PageLayoutContext);

  if (!context || isEmpty(context)) {
    throw new Error(`usePageLayoutContext must be used within a PageLayoutContext.Provider`);
  }

  return context;
};
