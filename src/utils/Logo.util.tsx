import BabenaLogo from "../logos/BabenaLogo";
import PngLogoContainer from "../logos/PngLogoContainer";
import { PROJECT_KEY, TOKEN_TICKER } from "../types/Project.type";
import kaddexLogo from "../images/projects/kaddex.png";
import kdLaunchLogo from "../images/projects/kdlaunch.png";
import kdSwapLogo from "../images/projects/kdswap.png";

import BABE_TOKEN from "../images/crypto/BABE.png";
import ADK_TOKEN from "../images/crypto/ADK.png";
import FLUX_TOKEN from "../images/crypto/FLUX.png";
import HYPE_TOKEN from "../images/crypto/HYPE.png";
import KDA_TOKEN from "../images/crypto/KDA.png";
import KDL_TOKEN from "../images/crypto/KDL.png";
import KDS_TOKEN from "../images/crypto/KDS.png";

const PROJECT_LOGO_MAP = {
  [PROJECT_KEY.BABENA]: <BabenaLogo />,
  [PROJECT_KEY.KADDEX]: <PngLogoContainer src={kaddexLogo} />,
  [PROJECT_KEY.KD_LAUNCH]: <PngLogoContainer src={kdLaunchLogo} />,
  [PROJECT_KEY.KD_SWAP]: <PngLogoContainer src={kdSwapLogo} />,
};

export const getProjectLogo = (module: PROJECT_KEY) => {
  return PROJECT_LOGO_MAP[module];
};

const TOKEN_LOGO_MAP = {
  [TOKEN_TICKER.BABE]: <PngLogoContainer src={BABE_TOKEN} isCircular padding={0.5} />,
  [TOKEN_TICKER.ADK]: <PngLogoContainer src={ADK_TOKEN} isCircular />,
  [TOKEN_TICKER.FLUX]: <PngLogoContainer src={FLUX_TOKEN} isCircular />,
  [TOKEN_TICKER.HYPE]: <PngLogoContainer src={HYPE_TOKEN} isCircular />,
  [TOKEN_TICKER.KDA]: <PngLogoContainer src={KDA_TOKEN} isCircular padding={0.5} />,
  [TOKEN_TICKER.KDL]: <PngLogoContainer src={KDL_TOKEN} isCircular />,
  [TOKEN_TICKER.KDS]: <PngLogoContainer src={KDS_TOKEN} isCircular />,
};

export const getTokenLogo = (token: TOKEN_TICKER) => {
  return TOKEN_LOGO_MAP[token];
};
