import { ProjectInfoType } from "./Project.type";

export enum CELL_TYPE {
  TOKEN = "token",
  POOL = "pool",
  STRING = "string",
  NUMBER = "number",
  FIAT = "fiat",
  DATE = "date",
}

export type PoolCellType = {
  id?: string;
  type: CELL_TYPE.POOL;
  balance: number;
  fiatValue: number;
  token0: TokenCellType;
  token1: TokenCellType;
};

export type TokenCellType = {
  id?: string;
  chains?: { [k: string]: number | undefined }[];
  type: CELL_TYPE.TOKEN;
  fiatValue: number;
  name: string;
  ticker: string;
  balance: number;
  address: string;
  source: {
    type: string;
    address: string;
  };
  price: number;
};

export type StringCellType = {
  id?: string;
  type: CELL_TYPE.STRING;
  value: string;
};

export type NumberCellType = {
  id?: string;
  type: CELL_TYPE.NUMBER;
  value: number;
};

export type FiatCellType = {
  id?: string;
  type: CELL_TYPE.FIAT;
  value: number;
};

export type DateCellType = {
  id?: string;
  type: CELL_TYPE.DATE;
  value: string;
};

export type TableRowData = (
  | PoolCellType
  | TokenCellType
  | NumberCellType
  | StringCellType
  | FiatCellType
  | DateCellType
)[];

export type Section = {
  sectionName: string;
  fiatValue: number;
  headers: string[];
  rows: TableRowData[];
};

export type ProjectResponse = {
  projectName: string;
  fiatValue: number;
  sections: Section[];
  error?: string;
};

export type ProjectData = ProjectResponse | ProjectInfoType;

export type WalletData = {
  data: TokenCellType[];
  errors: TokenCellType[];
};
