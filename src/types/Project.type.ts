/*
 * NOTE:
 * When adding new PROJECT_KEY or TOKEN_TICKER
 * please make sure there is a corresponding image under
 *
 * "/public/assets/projects" or "/public/assets/tokens"
 *
 * based on what you are adding.
 */

export enum TOKEN_TICKER {
  BABE = "BABE",
  KDA = "KDA",
  KDL = "KDL",
  KDS = "KDS",
  FLUX = "FLUX",
  ADK = "ADK",
  HYPE = "HYPE",
  MOK = "MOK",
}

export type ProjectErrorResponse = {
  name: string;
  module: string;
};
