import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { isEmpty } from "../utils/Object.util";

type PageLayoutContextType = {
  walletAddress: string | undefined;
  isDashboardLoading: boolean;
  setIsDashboardLoading: Dispatch<SetStateAction<boolean>>;
};

export const PageLayoutContext = createContext<PageLayoutContextType>({} as PageLayoutContextType);

export const usePageLayoutContext = () => {
  const context = useContext(PageLayoutContext);

  if (!context || isEmpty(context)) {
    throw new Error(`usePageLayoutContext must be used within a PageLayoutContext.Provider`);
  }

  return context;
};
