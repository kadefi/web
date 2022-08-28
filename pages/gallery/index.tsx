import styled from "@emotion/styled";
import MuiContainer from "@mui/material/Container";
import { useIsFetching } from "@tanstack/react-query";
import { sum } from "lodash";
import { useState } from "react";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import FetchLoadingIndicator from "../../src/commons/FetchLoadingIndicator";
import NftCollection from "../../src/components/gallery-page/NftCollection";
import NoNftFound from "../../src/components/gallery-page/NoNftFound";
import { getPageLayout } from "../../src/components/layouts/PageLayout/PageLayout";
import { usePageLayoutContext } from "../../src/contexts/PageLayoutContext";
import { Route } from "../../src/enums/Route.enum";
import { CustomNextPage } from "../../src/types/Page.type";

const NftGallery: CustomNextPage = () => {
  const [collections, setCollections] = useState<{ [k: string]: number }>({});
  const { selectedNftModules } = usePageLayoutContext();
  useTrackPageVisit(Route.NftGallery);
  const isPageFetching = Boolean(useIsFetching());
  const hasNft = sum(Object.values(collections)) > 0;

  return (
    <Container maxWidth="md">
      {selectedNftModules.map((nftModule, i) => (
        <NftCollection key={`collection-${nftModule}-${i}`} nftModule={nftModule} setCollections={setCollections} />
      ))}
      {isPageFetching && <FetchLoadingIndicator text="Retrieving NFT collections" />}
      {!isPageFetching && !hasNft && <NoNftFound />}
    </Container>
  );
};

const Container = styled(MuiContainer)`
  padding: 2rem;
`;

NftGallery.getLayout = getPageLayout;

export default NftGallery;
