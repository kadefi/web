import PngLogo from "../components/commons/PngLogo";

export const getTokenLogo = (imageSrc: string, key?: string) => {
  return <PngLogo key={key} src={imageSrc} isCircular size={1.5} priority />;
};
