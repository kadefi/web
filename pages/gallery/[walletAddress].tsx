import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import MuiContainer from "@mui/material/Container";
import Image from "next/image";
import { useEffect } from "react";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import { useGetNftGalleryData } from "../../src/api/queries/NftGallery.queries";
import CustomCircularProgress from "../../src/components/commons/CustomCircularProgress";
import TwitterButton from "../../src/components/commons/SocialButtons/TwitterButton";
import TypographyNeon from "../../src/components/commons/TypographyNeon";
import NftCard from "../../src/components/NftCard";
import { ROUTE } from "../../src/constants/Routes.constant";
import { useDashboardLayoutContext } from "../../src/contexts/DashboardLayoutContext";
import { getDashboardLayout } from "../../src/layouts/DashboardLayout";
import theme from "../../src/theme";
import { NftGalleryData } from "../../src/types/DashboardData.type";
import { CustomNextPage } from "../../src/types/Page.type";

const NftGallery: CustomNextPage = () => {
  // Contexts
  const { isDashboardLoading, setIsDashboardLoading } = useDashboardLayoutContext();

  // Custom Hooks
  useTrackPageVisit(ROUTE.NFT_GALLERY);
  const { walletAddress } = useDashboardLayoutContext();

  // Data Queries
  const nftQuery = useGetNftGalleryData(walletAddress);

  // Effects
  useEffect(() => {
    if (nftQuery) {
      const nftQueryIsLoading = nftQuery.isLoading;
      setIsDashboardLoading(nftQueryIsLoading);
    } else {
      setIsDashboardLoading(true);
    }
  }, [nftQuery, setIsDashboardLoading]);

  // Prevent rendering without queries
  if (!nftQuery) {
    return null;
  }

  const loadingIndicator = (
    <CentralContainer maxWidth="md">
      <CustomCircularProgress size={100} color="secondary" />
      <p>Loading Your NFTs....</p>
    </CentralContainer>
  );

  const noDataDisplay = (
    <CentralContainer maxWidth="md">
      <EmptyBoxImageContainer>
        <Image src="/assets/empty-box.png" alt="" layout="fill" objectFit="contain" />
      </EmptyBoxImageContainer>
      <P>We didn&apos;t find any NFT here..</P>
      <P>Maybe we should have?</P>
      <P>If we missed your NFT, DM us!</P>
      <TwitterButton subtext="Send Message" />
    </CentralContainer>
  );

  const getNftDisplay = (data: NftGalleryData) => {
    if (!data || !data.gallery) {
      return null;
    }

    if (data.gallery.length === 0) {
      return noDataDisplay;
    }

    return data.gallery.map((collection) => {
      return (
        <CollectionContainer key={collection.name}>
          <CollectionName variant="h4">{collection.name}</CollectionName>
          <CollectionDescription variant="body1">
            {`${collection.description} - ${collection.nfts.length} NFT(s)`}
          </CollectionDescription>
          <NftsContainer>
            {collection.nfts.map((nft) => (
              <NftCard key={`${collection.description}-${nft.id}`} nftData={nft} collectionName={collection.name} />
            ))}
          </NftsContainer>
        </CollectionContainer>
      );
    });
  };

  return (
    <Container maxWidth="md">
      {isDashboardLoading ? loadingIndicator : getNftDisplay(nftQuery.data as NftGalleryData)}
    </Container>
  );
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

const NftsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;

  ${theme.breakpoints.down("sm")} {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const CollectionContainer = styled.div`
  margin-bottom: 3rem;
`;

const Container = styled(MuiContainer)`
  padding: 2rem;
`;

NftGallery.getLayout = getDashboardLayout;

export default NftGallery;

const CollectionName = styled(TypographyNeon)`
  margin-bottom: 8px;
`;

const CollectionDescription = styled(Typography)`
  margin-bottom: 16px;
  color: #c5c5c5;
`;
