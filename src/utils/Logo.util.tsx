import PngLogo from "../components/commons/PngLogo";
import { PROJECT_KEY, TOKEN_TICKER } from "../types/Project.type";

// Project Logos
import KADDEX_LOGO from "../images/projects/kaddex.png";
import KDLAUNCH_LOGO from "../images/projects/kdlaunch.png";
import KDSWAP_LOGO from "../images/projects/kdswap.png";
import BABENA_LOGO from "../images/projects/babena.png";

// Token icons
import BABE_TOKEN from "../images/tokens/BABE.png";
import ADK_TOKEN from "../images/tokens/ADK.png";
import FLUX_TOKEN from "../images/tokens/FLUX.png";
import HYPE_TOKEN from "../images/tokens/HYPE.png";
import KDA_TOKEN from "../images/tokens/KDA.png";
import KDL_TOKEN from "../images/tokens/KDL.png";
import KDS_TOKEN from "../images/tokens/KDS.png";

const PROJECT_LOGO_MAP = {
  [PROJECT_KEY.BABENA]: BABENA_LOGO,
  [PROJECT_KEY.KADDEX]: KADDEX_LOGO,
  [PROJECT_KEY.KD_LAUNCH]: KDLAUNCH_LOGO,
  [PROJECT_KEY.KD_SWAP]: KDSWAP_LOGO,
};

export const getProjectLogo = (module: PROJECT_KEY) => {
  return <PngLogo size={1.75} src={PROJECT_LOGO_MAP[module]} />;
};

const TOKEN_LOGO_MAP = {
  [TOKEN_TICKER.BABE]: BABE_TOKEN,
  [TOKEN_TICKER.ADK]: ADK_TOKEN,
  [TOKEN_TICKER.FLUX]: FLUX_TOKEN,
  [TOKEN_TICKER.HYPE]: HYPE_TOKEN,
  [TOKEN_TICKER.KDA]: KDA_TOKEN,
  [TOKEN_TICKER.KDL]: KDL_TOKEN,
  [TOKEN_TICKER.KDS]: KDS_TOKEN,
};

export const getTokenLogo = (token: TOKEN_TICKER) => {
  return <PngLogo src={TOKEN_LOGO_MAP[token]} isCircular size={1.5} />;
};
