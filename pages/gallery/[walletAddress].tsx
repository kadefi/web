import styled from "@emotion/styled";
import MuiContainer from "@mui/material/Container";
import Image from "next/image";
import { ReactElement, useEffect } from "react";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import { useGetNftCollectionsData } from "../../src/api/queries/NftGallery.queries";
import TwitterButton from "../../src/components/commons/SocialButtons/TwitterButton";
import NftCollection from "../../src/components/NftCollection";
import { ROUTE } from "../../src/constants/Routes.constant";
import { usePageLayoutContext } from "../../src/contexts/PageLayoutContext";
import { getPageLayout } from "../../src/layouts/PageLayout";
import theme from "../../src/theme";
import { NftCollectionData } from "../../src/types/DashboardData.type";
import { CustomNextPage } from "../../src/types/Page.type";
import { isQueriesLoading } from "../../src/utils/QueriesUtil";

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

  // Custom Hooks
  useTrackPageVisit(ROUTE.NFT_GALLERY);
  const { walletAddress } = usePageLayoutContext();

  // Data Queries
  const { collectionsQueries } = useGetNftCollectionsData(selectedNftModules, walletAddress);

  // Effects
  useEffect(() => {
    setIsDashboardLoading(isQueriesLoading(...collectionsQueries));
  }, [collectionsQueries, setIsDashboardLoading]);

  // Prevent rendering without queries
  if (!collectionsQueries) {
    return null;
  }

  const numberOfNfts: (number | undefined)[] = [];

  const nftCollections = collectionsQueries.map((collectionQuery, i) => {
    numberOfNfts[i] = (collectionQuery.data as NftCollectionData)?.nfts?.length || undefined;
    return <NftCollection key={`collection-${i}`} collectionQuery={collectionQuery} />;
  });

  sortNftCollections(nftCollections, numberOfNfts);

  // No NFT Collection
  if (!isDashboardLoading && numberOfNfts.every((value) => value === undefined)) {
    return (
      <CentralContainer maxWidth="md">
        <EmptyBoxImageContainer>
          <Image src="/assets/empty-box.png" alt="" layout="fill" objectFit="contain" priority />
        </EmptyBoxImageContainer>
        <P>We didn&apos;t find any NFT here..</P>
        <P>Maybe we should have?</P>
        <P>If we missed your NFT, DM us!</P>
        <TwitterButton subtext="Send Message" />
      </CentralContainer>
    );
  }

  return <Container maxWidth="md">{nftCollections}</Container>;
};

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
`;

const CentralContainer = styled(MuiContainer)`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${theme.breakpoints.down("md")} {
    margin-top: 1rem;
  }
`;

const Container = styled(MuiContainer)`
  padding: 2rem;
`;

NftGallery.getLayout = getPageLayout;

export default NftGallery;
