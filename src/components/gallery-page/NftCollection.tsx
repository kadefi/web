import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { flatten } from "lodash";
import { useEffect, useState, useMemo } from "react";
import { useGetNftCollectionData } from "../../api/queries/NftGallery.queries";
import FetchLoadingIndicator from "../../commons/FetchLoadingIndicator";
import TypographyNeon from "../../commons/TypographyNeon";
import { usePageLayoutContext } from "../../contexts/PageLayoutContext";
import theme from "../../theme";
import NftCard from "./NftCard";

type Props = {
  nftModule: string;
  handleAddCountPerCollection: (module: string, nftCount: number) => void;
};

const MIN_COUNT = 8;

const NftCollection = (props: Props) => {
  const { nftModule, handleAddCountPerCollection } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { walletAddresses, selectedNftModules } = usePageLayoutContext();

  const { nftCollectionsData, isLoading, isFetching } = useGetNftCollectionData(
    nftModule,
    walletAddresses,
    selectedNftModules.includes(nftModule),
  );

  const [collectionName, collectionDescription] = useMemo(
    () => [nftCollectionsData[0]?.name, nftCollectionsData[0]?.description] || [null, null],
    [nftCollectionsData],
  );

  const nftDatas = useMemo(
    () => flatten(nftCollectionsData.map((collection) => collection.nfts)),
    [nftCollectionsData],
  );

  const nftCount = useMemo(() => nftDatas.length, [nftDatas]);

  const isDataAvailable = useMemo(
    () => walletAddresses && !isLoading && nftCount > 0,
    [isLoading, nftCount, walletAddresses],
  );

  useEffect(() => {
    !isLoading && handleAddCountPerCollection(nftModule, nftCount);
  }, [handleAddCountPerCollection, isLoading, nftCount, nftModule]);

  if (!isDataAvailable) {
    return null;
  }

  let displayNfts = [...nftDatas];
  if (isCollapsed) {
    displayNfts = displayNfts.slice(0, MIN_COUNT);
  }

  const remainingNftsCount = nftDatas.length - displayNfts.length;

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <CollectionContainer key={collectionName}>
      <CollectionName variant="h4">
        {collectionName}
        {isFetching && <FetchLoadingIndicator />}
      </CollectionName>
      <CollectionDescription variant="body1">
        {`${collectionDescription} - ${nftDatas.length} NFT(s)`}
      </CollectionDescription>
      <NftsContainer>
        {displayNfts.map((nft, i) => (
          <NftCard key={`${collectionDescription}-${nft.id}-${i}`} nftData={nft} collectionName={collectionName} />
        ))}
      </NftsContainer>
      {isCollapsed && remainingNftsCount > 0 && (
        <ShowAllToggleButton onClick={handleCollapseToggle}>Show All</ShowAllToggleButton>
      )}
      {!isCollapsed && displayNfts.length > MIN_COUNT && (
        <ShowAllToggleButton onClick={handleCollapseToggle}>Show Less</ShowAllToggleButton>
      )}
    </CollectionContainer>
  );
};

const ShowAllToggleButton = styled.div`
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ff007f;
  transition: 300ms;
  color: #c3c3c3;

  &:hover {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
  }
`;

const NftsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;

  ${theme.breakpoints.down("sm")} {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const CollectionDescription = styled(Typography)`
  margin-bottom: 16px;
  color: #c5c5c5;
`;

const CollectionContainer = styled.div`
  margin-bottom: 3rem;
`;

const CollectionName = styled(TypographyNeon)`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default NftCollection;
