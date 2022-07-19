import { ProjectErrorResponse, TOKEN_TICKER } from "./Project.type";

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
  ticker: TOKEN_TICKER;
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
  module: string;
  fiatValue: number;
  sections: Section[];
};

export type ProjectData = ProjectResponse | ProjectErrorResponse;

export type WalletData = {
  data: TokenCellType[];
  errors: TokenCellType[];
};

export type ProjectsList = ProjectsListItem[];

export type ProjectsListItem = {
  name: string;
  module: string;
  social: string;
  image: string;
  description?: string;
};

export type NftCollectionsList = NftCollectionsListItem[];

export type NftCollectionsListItem = {
  name: string;
  module: string;
  social: string;
  description: string;
  image?: string;
};

export type NftGalleryData = {
  gallery: NftCollectionData[];
};

export type NftCollectionData = {
  name: string;
  description: string;
  nfts: NftData[];
};

export type NftData = {
  id: string;
  type: "base64" | "PNG";
  url: string;
};
