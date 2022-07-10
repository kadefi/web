import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import MuiContainer from "@mui/material/Container";
import { useEffect } from "react";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import { useGetNftGalleryData } from "../../src/api/queries/NftGallery.queries";
import TypographyNeon from "../../src/components/commons/TypographyNeon";
import NftCard from "../../src/components/NftCard";
import { ROUTE } from "../../src/constants/Routes.constant";
import { useDashboardLayoutContext } from "../../src/contexts/DashboardLayoutContext";
import { useWalletAddress } from "../../src/hooks/useWalletAddress";
import { getDashboardLayout } from "../../src/layouts/DashboardLayout";
import theme from "../../src/theme";
import { NftGalleryData } from "../../src/types/DashboardData.type";
import { CustomNextPage } from "../../src/types/Page.type";

const NftGallery: CustomNextPage = () => {
  // Contexts
  const { isDashboardLoading, setIsDashboardLoading } = useDashboardLayoutContext();

  // Custom Hooks
  useTrackPageVisit(ROUTE.DASHBOARD);
  const { walletAddress } = useWalletAddress();

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

  const getNftDisplay = (data: NftGalleryData) => {
    if (!data || !data.gallery) {
      return null;
    }

    return data.gallery.map((collection) => {
      return (
        <CollectionContainer key={collection.collection}>
          <CollectionName variant="h4">{collection.collection}</CollectionName>
          <CollectionDescription variant="body1">{collection.description}</CollectionDescription>
          <NftsContainer>
            {collection.nfts.map((nft) => (
              <NftCard key={`${collection.description}-${nft.id}`} nft={nft} />
            ))}
          </NftsContainer>
        </CollectionContainer>
      );
    });
  };

  return (
    <Container maxWidth="md">
      {isDashboardLoading ? "Loading..." : getNftDisplay(nftQuery.data as NftGalleryData)}
    </Container>
  );
};

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
