import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useState } from "react";
import { UseQueryResult } from "react-query";
import theme from "../theme";
import { NftCollectionData } from "../types/DashboardData.type";
import { isEmpty } from "../utils/Object.util";
import FetchLoadingIndicator from "./commons/FetchLoadingIndicator";
import TypographyNeon from "./commons/TypographyNeon";
import NftCard from "./NftCard";

type Props = {
  collectionQuery: UseQueryResult<NftCollectionData>;
};

const MIN_COUNT = 8;

const NftCollection = (props: Props) => {
  const { collectionQuery } = props;

  const { data: collection, isLoading, isFetching, isIdle } = collectionQuery;

  const [isCollapsed, setIsCollapsed] = useState(true);

  if (isLoading || isIdle || !collection || isEmpty(collection)) {
    return null;
  }

  let shownNfts = collection.nfts;

  if (isCollapsed) {
    shownNfts = shownNfts.slice(0, MIN_COUNT);
  }

  const remainingNftsCount = collection.nfts.length - shownNfts.length;

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <CollectionContainer key={collection.name}>
      <CollectionName variant="h4">
        {collection.name}
        {isFetching && <FetchLoadingIndicator />}
      </CollectionName>
      <CollectionDescription variant="body1">
        {`${collection.description} - ${collection.nfts.length} NFT(s)`}
      </CollectionDescription>
      <NftsContainer>
        {shownNfts.map((nft, i) => (
          <NftCard key={`${collection.description}-${nft.id}-${i}`} nftData={nft} collectionName={collection.name} />
        ))}
      </NftsContainer>
      {isCollapsed && remainingNftsCount > 0 && (
        <ShowAllToggleButton onClick={handleCollapseToggle}>Show All</ShowAllToggleButton>
      )}
      {!isCollapsed && collection.nfts.length > MIN_COUNT && (
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
