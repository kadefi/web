import { PROJECT_KEY } from "./Project.type";

export enum CELL_TYPE {
  TOKEN = "token",
  POOL = "pool",
  STRING = "string",
  NUMBER = "number",
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

export type TableRowData = (
  | PoolCellType
  | TokenCellType
  | NumberCellType
  | StringCellType
)[];

export type Section = {
  sectionName: string;
  fiatValue: number;
  headers: string[];
  rows: TableRowData[];
};

export type ProjectData = {
  projectName: string;
  fiatValue: number;
  sections: Section[];
  error?: string;
};

export type WalletData = TokenCellType[];

export type NetWorthMap = {
  wallet: number | null,
  [PROJECT_KEY.KD_SWAP]: number | null,
  [PROJECT_KEY.BABENA]: number | null,
}
