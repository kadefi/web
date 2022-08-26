import { ReactNode } from "react";
import { Route } from "../enums/Route.enum";

export type MenuConfigItem = {
  title: string;
  icon: ReactNode;
  route: Route | null;
  isWalletSearch: boolean;
  isDisabled: boolean;
};
