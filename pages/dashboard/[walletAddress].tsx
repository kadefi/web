import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ReactElement, useEffect } from "react";
import CountUp from "react-countup";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import { useGetDashboardData } from "../../src/api/queries/Dashboard.queries";
import TypographyNeon from "../../src/components/commons/TypographyNeon";
import DashboardErrorFab from "../../src/components/DashboardErrorFab";
import ProjectCard from "../../src/components/ProjectCard";
import WalletCard from "../../src/components/WalletCard";
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
  const { isDashboardLoading, setIsDashboardLoading, projectsList, selectedProjectModules } = usePageLayoutContext();

  // Custom Hooks
  useTrackPageVisit(ROUTE.DASHBOARD);
  const { walletAddress } = usePageLayoutContext();

  // Data Queries
  const { walletQuery, projectsQuery } = useGetDashboardData(selectedProjectModules, walletAddress);

  // Effects
  useEffect(() => {
    if (
      walletQuery?.isLoading === false &&
      projectsQuery?.length > 0 &&
      projectsQuery?.every((collectionQuery) => collectionQuery.isLoading === false)
    ) {
      setIsDashboardLoading(false);
    }
  }, [walletQuery, projectsQuery, setIsDashboardLoading]);

  // Prevent rendering without queries
  if (!walletQuery || !projectsQuery || !projectsList) {
    return null;
  }

  // Display components
  const dashboardErrorFab = (
    <DashboardErrorFab loading={isDashboardLoading} walletQuery={walletQuery} projectsQuery={projectsQuery} />
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
        {isDashboardLoading ? (
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
