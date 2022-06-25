export enum PROJECT_KEY {
  KD_SWAP = "kdswap",
  BABENA = "babena",
  KD_LAUNCH = "kdlaunch",
  KADDEX = "kaddex",
}

export enum TOKEN_TICKER {
  BABE = "BABE",
  KDA = "KDA",
  KDL = "KDL",
  KDS = "KDS",
  FLUX = "FLUX",
  ADK = "ADK",
  HYPE = "HYPE",
}

export type ProjectErrorResponse = {
  name: string;
  module: PROJECT_KEY;
};
