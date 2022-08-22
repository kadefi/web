import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useCallback, useState } from "react";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import FetchLoadingIndicator from "../../src/commons/FetchLoadingIndicator";
import NetWorth from "../../src/components/dashboard-page/NetWorth";
import ProjectCard from "../../src/components/dashboard-page/ProjectCard/ProjectCard";
import WalletCard from "../../src/components/dashboard-page/WalletCard/WalletCard";
import { getPageLayout } from "../../src/components/layouts/PageLayout/PageLayout";
import { ROUTE } from "../../src/constants/Routes.constant";
import { usePageLayoutContext } from "../../src/contexts/PageLayoutContext";
import useIsPageFetching from "../../src/hooks/useIsPageFetching";
import { ProjectsNetWorth } from "../../src/types/DashboardData.type";
import { CustomNextPage } from "../../src/types/Page.type";

const Dashboard: CustomNextPage = () => {
  useTrackPageVisit(ROUTE.DASHBOARD);
  const [netWorthMap, setNetWorthMap] = useState<ProjectsNetWorth>({});
  const { selectedProjectModules } = usePageLayoutContext();
  const isPageFetching = useIsPageFetching();

  const handleNetWorthUpdate = useCallback((module: string, netWorth: number) => {
    setNetWorthMap((prev) => ({ ...prev, [module]: netWorth }));
  }, []);

  return (
    <div>
      <Content maxWidth="md">
        <NetWorth netWorthMap={netWorthMap} />
        <WalletCard handleNetWorthUpdate={handleNetWorthUpdate} />
        {selectedProjectModules.map((projectModule, i) => (
          <ProjectCard
            key={`project-card-${i}`}
            projectModule={projectModule}
            handleNetWorthUpdate={handleNetWorthUpdate}
          />
        ))}
        {isPageFetching && <FetchLoadingIndicator text="Retrieving latest projects data" />}
      </Content>
    </div>
  );
};

const Content = styled(Container)({
  marginTop: "32px",
  marginBottom: "80px",
});

Dashboard.getLayout = getPageLayout;

export default Dashboard;
