import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import MuiContainer from "@mui/material/Container";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import { useGetNftCollectionsData } from "../../src/api/queries/NftGallery.queries";
import CustomLink from "../../src/components/commons/CustomLink";
import FetchLoadingIndicator from "../../src/components/commons/FetchLoadingIndicator";
import NftCollection from "../../src/components/NftCollection";
import { ROUTE } from "../../src/constants/Routes.constant";
import { usePageLayoutContext } from "../../src/contexts/PageLayoutContext";
import { getPageLayout } from "../../src/layouts/PageLayout";
import theme from "../../src/theme";
import { NftCollectionData } from "../../src/types/DashboardData.type";
import { CustomNextPage } from "../../src/types/Page.type";
import { isQueriesFetching, isQueriesLoading } from "../../src/utils/QueriesUtil";

const sortNftCollections = (collections: ReactElement[], numberOfNfts: (number | undefined)[]) => {
  collections.sort((a, b) => {
    const first = numberOfNfts[collections.indexOf(a)];
    const second = numberOfNfts[collections.indexOf(b)];
    return (second || 0) - (first || 0);
  });
};

const NftGallery: CustomNextPage = () => {
  // Contexts
  const { isDashboardLoading, setIsDashboardLoading, selectedNftModules } = usePageLayoutContext();

  // States
  const [isNftGalleryFetching, setIsNftGalleryFetching] = useState(true);

  // Custom Hooks
  useTrackPageVisit(ROUTE.NFT_GALLERY);
  const { walletAddress } = usePageLayoutContext();

  // Data Queries
  const { collectionsQueries } = useGetNftCollectionsData(selectedNftModules, walletAddress);

  // Effects
  useEffect(() => {
    setIsDashboardLoading(isQueriesLoading(...collectionsQueries));
    setIsNftGalleryFetching(isQueriesFetching(...collectionsQueries));
  }, [collectionsQueries, setIsDashboardLoading]);

  const isUpdating = isDashboardLoading || isNftGalleryFetching;

  // Prevent rendering without queries
  if (!walletAddress || !collectionsQueries) {
    return null;
  }

  const numberOfNfts: (number | undefined)[] = [];

  const nftCollections = collectionsQueries.map((collectionQuery, i) => {
    numberOfNfts[i] = (collectionQuery.data as NftCollectionData)?.nfts?.length || undefined;
    return <NftCollection key={`collection-${i}`} collectionQuery={collectionQuery} />;
  });

  sortNftCollections(nftCollections, numberOfNfts);

  // No NFT Collection
  if (!isUpdating && numberOfNfts.every((value) => value === undefined)) {
    return (
      <CentralContainer maxWidth="md">
        <EmptyBoxImageContainer>
          <Image src="/assets/empty-box.png" alt="" layout="fill" objectFit="contain" priority />
        </EmptyBoxImageContainer>
        <P>No NFTs found</P>
        <P>
          View list of integrated NFT collections <IntegrationLink href={`${ROUTE.INTEGRATIONS}`}>here</IntegrationLink>
        </P>
      </CentralContainer>
    );
  }

  return (
    <Container maxWidth="md">
      <Header>NFT Gallery</Header>
      {nftCollections}
      {isUpdating && <FetchLoadingIndicator text="Retrieving NFT collections" />}
    </Container>
  );
};

const Header = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;

  ${theme.breakpoints.down("sm")} {
    font-size: 20px;
  }
`;

const IntegrationLink = styled(CustomLink)`
  text-decoration: underline;
  color: inherit;
`;

const EmptyBoxImageContainer = styled.div`
  margin-bottom: 1rem;
  position: relative;
  height: 15rem;
  width: 15rem;

  ${theme.breakpoints.down("md")} {
    height: 10rem;
    width: 10rem;
  }
`;

const P = styled.p`
  margin-top: 0px;
  margin-bottom: 20px;
  text-align: center;
`;

const CentralContainer = styled(MuiContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Container = styled(MuiContainer)`
  padding: 2rem;
`;

NftGallery.getLayout = getPageLayout;

export default NftGallery;
