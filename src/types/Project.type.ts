/*
 * NOTE:
 * When adding new PROJECT_KEY or TOKEN_TICKER
 * please make sure there is a corresponding image under
 *
 * "/public/assets/projects" or "/public/assets/tokens"
 *
 * based on what you are adding.
 */

export enum PROJECT_KEY {
  KD_SWAP = "kdswap",
  BABENA = "babena",
  KD_LAUNCH = "kdlaunch",
  KADDEX = "kaddex",
  ANEDAK = "anedak",
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

export enum NFT_COLLECTION_KEY {
  BABENA = "babena",
  INU_CREW = "inucrew",
  KADENA_BULLS = "kadenabulls",
  KITTY_KAD = "kittykad",
}

export type ProjectErrorResponse = {
  name: string;
  module: PROJECT_KEY;
};
