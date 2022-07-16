import styled from "@emotion/styled";
import { Skeleton, Typography } from "@mui/material";
import { UseQueryResult } from "react-query";
import theme from "../theme";
import { NftCollectionData } from "../types/DashboardData.type";
import { isEmpty } from "../utils/Object.util";
import TypographyNeon from "./commons/TypographyNeon";
import NftCard from "./NftCard";

type Props = {
  collectionQuery: UseQueryResult<NftCollectionData>;
};

const NftCollection = (props: Props) => {
  const { collectionQuery } = props;

  const { data: collection, isLoading, isFetching } = collectionQuery;

  if (isLoading || isFetching) {
    return <LoadingSkeleton variant="rectangular" />;
  }

  if (!collection || isEmpty(collection)) {
    return null;
  }

  return (
    <CollectionContainer key={collection.name}>
      <CollectionName variant="h4">{collection.name}</CollectionName>
      <CollectionDescription variant="body1">
        {`${collection.description} - ${collection.nfts.length} NFT(s)`}
      </CollectionDescription>
      <NftsContainer>
        {collection.nfts.map((nft, i) => (
          <NftCard key={`${collection.description}-${nft.id}-${i}`} nftData={nft} collectionName={collection.name} />
        ))}
      </NftsContainer>
    </CollectionContainer>
  );
};

const LoadingSkeleton = styled(Skeleton)`
  height: 15rem;
  margin-bottom: 2rem;
`;

const NftsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;

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
`;

export default NftCollection;
