import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { NftCollectionsList, ProjectsList } from "../types/DashboardData.type";
import { isEmpty } from "../utils/Object.util";

type PageLayoutContextType = {
  walletAddress: string | undefined;
  isDashboardLoading: boolean;
  setIsDashboardLoading: Dispatch<SetStateAction<boolean>>;
  projectsList?: ProjectsList;
  setProjectsList: Dispatch<SetStateAction<ProjectsList | undefined>>;
  nftCollectionsList?: NftCollectionsList;
  setNftCollectionsList: Dispatch<SetStateAction<NftCollectionsList | undefined>>;
};

export const PageLayoutContext = createContext<PageLayoutContextType>({} as PageLayoutContextType);

export const usePageLayoutContext = () => {
  const context = useContext(PageLayoutContext);

  if (!context || isEmpty(context)) {
    throw new Error(`usePageLayoutContext must be used within a PageLayoutContext.Provider`);
  }

  return context;
};
