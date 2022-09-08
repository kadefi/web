import styled from "@emotion/styled";
import MuiContainer from "@mui/material/Container";
import { useIsFetching } from "@tanstack/react-query";
import { sum } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import FetchLoadingIndicator from "../../src/commons/FetchLoadingIndicator";
import NftCollection from "../../src/components/gallery-page/NftCollection";
import NoNftFound from "../../src/components/gallery-page/NoNftFound";
import { getPageLayout } from "../../src/components/layouts/PageLayout/PageLayout";
import { usePageLayoutContext } from "../../src/contexts/PageLayoutContext";
import { Route } from "../../src/enums/Route.enum";
import { CustomNextPage } from "../../src/types/Page.type";
import { sortComponentsByValueMap } from "../../src/utils/Sort.util";

const NftGallery: CustomNextPage = () => {
  const [countPerCollectionMap, setCountPerCollectionMap] = useState<{ [k: string]: number }>({});
  const { selectedNftModules } = usePageLayoutContext();
  useTrackPageVisit(Route.NftGallery);
  const isPageFetching = Boolean(useIsFetching());
  const hasNft = sum(Object.values(countPerCollectionMap)) > 0;

  const handleAddCountPerCollection = useCallback((module: string, nftCount: number) => {
    setCountPerCollectionMap((prev) => ({ ...prev, [module]: nftCount }));
  }, []);

  const nftCollections = useMemo(() => {
    const collections = selectedNftModules.map((nftModule, i) => (
      <NftCollection
        key={`collection-${nftModule}-${i}`}
        nftModule={nftModule}
        handleAddCountPerCollection={handleAddCountPerCollection}
      />
    ));

    sortComponentsByValueMap(collections, selectedNftModules, countPerCollectionMap);

    return collections;
  }, [countPerCollectionMap, handleAddCountPerCollection, selectedNftModules]);

  return (
    <Container maxWidth="md">
      {nftCollections}
      {isPageFetching && <FetchLoadingIndicator text="Retrieving NFT collections" />}
      {!isPageFetching && !hasNft && <NoNftFound />}
    </Container>
  );
};

const Container = styled(MuiContainer)`
  padding: 1rem 1rem 0 1rem;
`;

NftGallery.getLayout = getPageLayout;

export default NftGallery;
