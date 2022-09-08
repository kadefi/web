import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useIsFetching } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import FetchLoadingIndicator from "../../src/commons/FetchLoadingIndicator";
import NetWorth from "../../src/components/dashboard-page/NetWorth";
import ProjectCard from "../../src/components/dashboard-page/ProjectCard/ProjectCard";
import WalletCard from "../../src/components/dashboard-page/WalletCard/WalletCard";
import { getPageLayout } from "../../src/components/layouts/PageLayout/PageLayout";
import { usePageLayoutContext } from "../../src/contexts/PageLayoutContext";
import { Route } from "../../src/enums/Route.enum";
import { ProjectsNetWorth } from "../../src/types/DashboardData.type";
import { CustomNextPage } from "../../src/types/Page.type";
import { sortComponentsByValueMap } from "../../src/utils/Sort.util";

const Dashboard: CustomNextPage = () => {
  useTrackPageVisit(Route.Dashboard);
  const [netWorthMap, setNetWorthMap] = useState<ProjectsNetWorth>({});
  const { selectedProjectModules } = usePageLayoutContext();
  const isPageFetching = Boolean(useIsFetching());

  const handleNetWorthUpdate = useCallback((module: string, netWorth: number) => {
    setNetWorthMap((prev) => ({ ...prev, [module]: netWorth }));
  }, []);

  const projectCards = useMemo(() => {
    const cards = selectedProjectModules.map((projectModule, i) => (
      <ProjectCard
        key={`project-card-${projectModule}-${i}`}
        projectModule={projectModule}
        handleNetWorthUpdate={handleNetWorthUpdate}
      />
    ));

    sortComponentsByValueMap(cards, selectedProjectModules, netWorthMap);

    return cards;
  }, [handleNetWorthUpdate, netWorthMap, selectedProjectModules]);

  return (
    <div>
      <Content maxWidth="md">
        <NetWorth netWorthMap={netWorthMap} />
        <WalletCard handleNetWorthUpdate={handleNetWorthUpdate} />
        {projectCards}
        {isPageFetching && <FetchLoadingIndicator text="Retrieving latest projects data" />}
      </Content>
    </div>
  );
};

const Content = styled(Container)({
  marginTop: "0 1rem",
});

Dashboard.getLayout = getPageLayout;

export default Dashboard;
