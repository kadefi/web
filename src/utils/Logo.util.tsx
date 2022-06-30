import PngLogo from "../components/commons/PngLogo";
import { PROJECT_KEY, TOKEN_TICKER } from "../types/Project.type";

export const getProjectLogo = (module: PROJECT_KEY) => {
  return <PngLogo src={`/assets/projects/${module}.png`} size={1.75} />;
};

export const getTokenLogo = (token: TOKEN_TICKER) => {
  return <PngLogo src={`/assets/tokens/${token}.png`} isCircular size={1.5} quality={50} />;
};
