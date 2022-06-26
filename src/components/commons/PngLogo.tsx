import styled from "@emotion/styled";
import Image from "next/image";

type Props = {
  src: string;
  isCircular?: boolean;
  size?: number;
  backgroundColor?: string;
  padding?: number;
};

const PngLogo = (props: Props) => {
  const { src, isCircular = false, size = 1, backgroundColor = "#000000", padding = 0.5 } = props;

  const backgroundSize = `${size}rem`;
  const imageSize = `${isCircular ? size - padding : size}rem`;

  let logo = (
    <LogoContainer isToken={isCircular} size={imageSize}>
      <Image layout="fill" objectFit="contain" src={src} alt="" />
    </LogoContainer>
  );

  if (isCircular) {
    logo = (
      <Background isToken={isCircular} size={backgroundSize} color={backgroundColor}>
        {logo}
      </Background>
    );
  }

  return logo;
};

type TokenProps = {
  isToken: boolean;
  size: string;
};

type BackgroundProps = {
  color: string;
};

const Background = styled.div<TokenProps & BackgroundProps>`
  border: 1px solid #aeabb1;
  background-color: ${(props) => props.color};
  border-radius: 5rem;
  min-height: ${(props) => props.size};
  min-width: ${(props) => props.size};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div<TokenProps>`
  position: relative;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
`;

export default PngLogo;
