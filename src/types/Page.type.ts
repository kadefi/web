import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type CustomNextPage<P> = NextPage<P> & Page<P>;

export type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
