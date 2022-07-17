import PngLogo from "../components/commons/PngLogo";
import { TOKEN_TICKER } from "../types/Project.type";

export const getProjectLogo = (module: string) => {
  return <PngLogo src={`/assets/projects/${module}.png`} size={1.75} />;
};

export const getTokenLogo = (token: TOKEN_TICKER, key?: string) => {
  return <PngLogo key={key} src={`/assets/tokens/${token}.png`} isCircular size={1.5} quality={50} />;
};
