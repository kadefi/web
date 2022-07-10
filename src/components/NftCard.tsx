import styled from "@emotion/styled";
import Image from "next/image";
import { NftData } from "../types/DashboardData.type";

type Props = {
  nft: NftData;
};

const NftCard = (props: Props) => {
  const { nft } = props;

  let image = <Image src={nft.url} alt="" layout="fill" objectFit="contain" />;

  if (nft.imageLinkType === "base64") {
    image = <Base64Image src={nft.url} alt="" width={196} height={165} />;
  }

  return (
    <NftCardContainer>
      <ImageContainer>{image}</ImageContainer>
      <ImageCaption>{nft.id}</ImageCaption>
    </NftCardContainer>
  );
};

const NftCardContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.4);
`;

const ImageCaption = styled.div`
  padding: 0.5rem 1rem;
`;

const Base64Image = styled(Image)`
  image-rendering: pixelated;
  width: 100%;
  height: auto;
`;

const ImageContainer = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 16px;
  flex: 1 0 auto;
  overflow: hidden;
  width: 100%;

  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export default NftCard;
