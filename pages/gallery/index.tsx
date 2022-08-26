import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import MuiContainer from "@mui/material/Container";
import Image from "next/image";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import CustomLink from "../../src/commons/CustomLink";
import FetchLoadingIndicator from "../../src/commons/FetchLoadingIndicator";
import NftCollection from "../../src/components/gallery-page/NftCollection";
import { getPageLayout } from "../../src/components/layouts/PageLayout/PageLayout";
import { usePageLayoutContext } from "../../src/contexts/PageLayoutContext";
import { Route } from "../../src/enums/Route.enum";
import useIsPageFetching from "../../src/hooks/useIsPageFetching";
import theme from "../../src/theme";
import { CustomNextPage } from "../../src/types/Page.type";

const NftGallery: CustomNextPage = () => {
  // Contexts
  const { selectedNftModules } = usePageLayoutContext();

  // Custom Hooks
  useTrackPageVisit(Route.NftGallery);
  const isPageFetching = useIsPageFetching();

  const nftCollections = selectedNftModules.map((nftModule, i) => {
    return <NftCollection key={`collection-${i}`} nftModule={nftModule} />;
  });

  // No NFT Collection
  if (!isPageFetching) {
    return (
      <CentralContainer maxWidth="md">
        <EmptyBoxImageContainer>
          <Image src="/assets/empty-box.png" alt="" layout="fill" objectFit="contain" priority />
        </EmptyBoxImageContainer>
        <P>No NFTs found</P>
        <P>
          View list of integrated NFT collections <IntegrationLink href={`${Route.Integrations}`}>here</IntegrationLink>
        </P>
      </CentralContainer>
    );
  }

  return (
    <Container maxWidth="md">
      <Header>NFT Gallery</Header>
      {nftCollections}
      {isPageFetching && <FetchLoadingIndicator text="Retrieving NFT collections" />}
    </Container>
  );
};

const Header = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 2rem;

  ${theme.breakpoints.down("sm")} {
    font-size: 20px;
  }
`;

const IntegrationLink = styled(CustomLink)`
  text-decoration: none;
  color: #ff007f;
  font-weight: bold;
  cursor: pointer;
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
