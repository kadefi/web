import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { isEmpty } from "../utils/Object.util";

type DashboardLayoutContextType = {
  isDashboardLoading: boolean;
  setIsDashboardLoading: Dispatch<SetStateAction<boolean>>;
};

export const DashboardLayoutContext = createContext<DashboardLayoutContextType>({} as DashboardLayoutContextType);

export const useDashboardLayoutContext = () => {
  const context = useContext(DashboardLayoutContext);

  if (!context || isEmpty(context)) {
    throw new Error(`useDashboardLayoutContext must be used within a DashboardLayoutContext.Provider`);
  }

  return context;
};
