import PngLogo from "../components/commons/PngLogo";
import { PROJECT_KEY, TOKEN_TICKER } from "../types/Project.type";

const PROJECT_LOGO_MAP = {
  [PROJECT_KEY.BABENA]: "babena.png",
  [PROJECT_KEY.KADDEX]: "kaddex.png",
  [PROJECT_KEY.KD_LAUNCH]: "kdlaunch.png",
  [PROJECT_KEY.KD_SWAP]: "kdswap.png",
  [PROJECT_KEY.ANEDAK]: "anedak.png",
};

export const getProjectLogo = (module: PROJECT_KEY) => {
  return <PngLogo src={`/assets/projects/${PROJECT_LOGO_MAP[module]}`} size={1.75} />;
};

const TOKEN_LOGO_MAP = {
  [TOKEN_TICKER.BABE]: "BABE.png",
  [TOKEN_TICKER.ADK]: "ADK.png",
  [TOKEN_TICKER.FLUX]: "FLUX.png",
  [TOKEN_TICKER.HYPE]: "HYPE.png",
  [TOKEN_TICKER.KDA]: "KDA.png",
  [TOKEN_TICKER.KDL]: "KDL.png",
  [TOKEN_TICKER.KDS]: "KDS.png",
};

export const getTokenLogo = (token: TOKEN_TICKER) => {
  return <PngLogo src={`/assets/tokens/${TOKEN_LOGO_MAP[token]}`} isCircular size={1.5} />;
};
