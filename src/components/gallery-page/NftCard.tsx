import styled from "@emotion/styled";
import MuiBrokenImageIcon from "@mui/icons-material/BrokenImage";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import { useState } from "react";
import { trackNftImageLoadError } from "../../analytics/Analytics.util";
import { NftData } from "../../types/DashboardData.type";

type Props = {
  nftData: NftData;
  collectionName: string | null;
};

const NftCard = (props: Props) => {
  const { nftData: nft, collectionName } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const image = (
    <Image
      src={nft.url}
      alt=""
      layout="fill"
      objectFit="contain"
      style={{ imageRendering: nft.type === "base64" ? "pixelated" : "auto" }}
      onLoadingComplete={() => setIsLoading(false)}
      onErrorCapture={() => {
        trackNftImageLoadError({ collection: collectionName, nftId: nft.id });
        setIsLoading(false);
        setIsError(true);
      }}
      unoptimized
    />
  );

  return (
    <NftCardContainer>
      <ImageContainer>
        {isLoading && !isError && <ImageSkeleton variant="rectangular" animation="wave" />}
        {isError && (
          <BrokenImageContainer>
            <BrokenImageIcon />
            Failed to load
          </BrokenImageContainer>
        )}
        {image}
      </ImageContainer>
      <ImageCaption>
        <CollectionName>{collectionName}</CollectionName>
        <NftId>{nft.id}</NftId>
      </ImageCaption>
    </NftCardContainer>
  );
};

const BrokenImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  color: #a3a3a3;
`;

const BrokenImageIcon = styled(MuiBrokenImageIcon)`
  width: 50px;
  height: 50px;
  color: #a3a3a3;
`;

const NftId = styled.div`
  color: #a3a3a3;
`;

const CollectionName = styled.div`
  font-weight: 500;
`;

const ImageSkeleton = styled(Skeleton)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const NftCardContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.4);
`;

const ImageCaption = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`;

const ImageContainer = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 8px;
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
