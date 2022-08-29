import { CellType } from "../enums/CellType.enum";

export type PoolCellType = {
  id?: string;
  type: CellType.Pool;
  balance: number;
  fiatValue: number;
  token0: TokenCellType;
  token1: TokenCellType;
};

export type TokenCellType = {
  id?: string;
  chains?: ChainInfo;
  type: CellType.Token;
  fiatValue: number | null;
  image: string;
  name: string;
  ticker: string;
  balance: number;
  address: string;
  source: {
    type: string;
    address: string;
  };
  price: number | null;
};

export type ChainInfo = { [k: string]: number };

export type StringCellType = {
  id?: string;
  type: CellType.String;
  value: string;
};

export type NumberCellType = {
  id?: string;
  type: CellType.Number;
  value: number;
};

export type FiatCellType = {
  id?: string;
  type: CellType.Fiat;
  value: number;
};

export type DateCellType = {
  id?: string;
  type: CellType.Date;
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

export type ProjectData = {
  projectName: string;
  module: string;
  address?: string;
  fiatValue?: number;
  sections?: Section[];
};

export type WalletData = {
  address: string;
  data: TokenCellType[];
  errors: TokenCellType[];
  fiatValue: number;
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
  address: string;
};

export type NftData = {
  id: string;
  type: "base64" | "PNG" | "WEBP";
  url: string;
  owner: string;
};

export type ProjectsNetWorth = {
  [projectModule: string]: number;
};
