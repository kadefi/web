import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useIsFetching } from "@tanstack/react-query";
import { ReactElement } from "react";
import CountUp from "react-countup";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import { useGetDashboardData } from "../../src/api/queries/Dashboard.queries";
import FetchLoadingIndicator from "../../src/commons/FetchLoadingIndicator";
import TypographyNeon from "../../src/commons/TypographyNeon";
import DashboardErrorFab from "../../src/components/dashboard-page/DashboardErrorFab";
import ProjectCard from "../../src/components/dashboard-page/ProjectCard";
import WalletCard from "../../src/components/dashboard-page/WalletCard";
import { ROUTE } from "../../src/constants/Routes.constant";
import { usePageLayoutContext } from "../../src/contexts/PageLayoutContext";
import { getPageLayout } from "../../src/layouts/PageLayout";
import theme from "../../src/theme";
import { ProjectResponse } from "../../src/types/DashboardData.type";
import { CustomNextPage } from "../../src/types/Page.type";
import { getNetWorth } from "../../src/utils/NetWorth.util";

const sortProjectCards = (projectCards: ReactElement[], fiatValues: (number | undefined)[]) => {
  projectCards.sort((a, b) => {
    const first = fiatValues[projectCards.indexOf(a)];
    const second = fiatValues[projectCards.indexOf(b)];
    return (second || 0) - (first || 0);
  });
};

const Dashboard: CustomNextPage = () => {
  // Contexts
  const { projectsList, selectedProjectModules } = usePageLayoutContext();

  // Custom Hooks
  useTrackPageVisit(ROUTE.DASHBOARD);
  const { walletAddress } = usePageLayoutContext();

  // Data Queries
  const { walletQuery, projectsQuery } = useGetDashboardData(selectedProjectModules, walletAddress);

  const isPageFetching = useIsFetching() !== 0;

  // Prevent rendering without queries
  if (!walletAddress || !walletQuery || !projectsQuery || !projectsList) {
    return null;
  }

  // Display components
  const dashboardErrorFab = (
    <DashboardErrorFab loading={isPageFetching} walletQuery={walletQuery} projectsQuery={projectsQuery} />
  );

  const walletCard = <WalletCard walletQuery={walletQuery} />;

  const fiatValues: (number | undefined)[] = [];

  const projectCards = projectsQuery.map((projectQuery, i) => {
    fiatValues[i] = (projectQuery.data as ProjectResponse)?.fiatValue || undefined;
    return <ProjectCard key={`project-card-${i}`} projectQuery={projectQuery} projectsList={projectsList} />;
  });

  sortProjectCards(projectCards, fiatValues);

  const netWorth = (
    <>
      <NetWorthTitle>Net Worth</NetWorthTitle>
      <NetWorthAmount>
        {isPageFetching ? (
          <NetWorthAmountSkeleton />
        ) : (
          <span>
            <CountUp
              end={getNetWorth(walletQuery, projectsQuery)}
              prefix="$ "
              separator=","
              decimals={2}
              duration={0.3}
            />
          </span>
        )}
      </NetWorthAmount>
    </>
  );

  return (
    <div>
      <Content maxWidth="md">
        {netWorth}
        {walletCard}
        {projectCards}
        {isPageFetching && <FetchLoadingIndicator text="Retrieving latest projects data" />}
      </Content>
      {dashboardErrorFab}
    </div>
  );
};

const NetWorthAmountSkeleton = styled(Skeleton)({
  width: "10rem",
});

const NetWorthAmount = styled(TypographyNeon)`
  font-size: 48px;
  margin-bottom: 1rem;

  ${theme.breakpoints.down("sm")} {
    font-size: 40px;
  }
`;

const NetWorthTitle = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin-top: 1rem;

  ${theme.breakpoints.down("sm")} {
    font-size: 20px;
  }
`;

const Content = styled(Container)({
  marginTop: "32px",
  marginBottom: "80px",
});

Dashboard.getLayout = getPageLayout;

export default Dashboard;
