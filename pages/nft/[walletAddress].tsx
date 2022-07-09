import styled from "@emotion/styled";
import MuiContainer from "@mui/material/Container";
import { useEffect } from "react";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import { useGetNftGalleryData } from "../../src/api/queries/NftGallery.queries";
import { ROUTE } from "../../src/constants/Routes.constant";
import { useDashboardLayoutContext } from "../../src/contexts/DashboardLayoutContext";
import { useWalletAddress } from "../../src/hooks/useWalletAddress";
import { getDashboardLayout } from "../../src/layouts/DashboardLayout";
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

  return <Container maxWidth="md">{isDashboardLoading ? "Loading..." : JSON.stringify(nftQuery.data)}</Container>;
};

const Container = styled(MuiContainer)`
  padding: 2rem;
`;

NftGallery.getLayout = getDashboardLayout;

export default NftGallery;
