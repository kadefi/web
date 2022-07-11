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
import { useDashboardLayoutContext } from "../../src/contexts/DashboardLayoutContext";
import { getDashboardLayout } from "../../src/layouts/DashboardLayout";
import theme from "../../src/theme";
import { ProjectResponse } from "../../src/types/DashboardData.type";
import { CustomNextPage } from "../../src/types/Page.type";
import { PROJECT_KEY } from "../../src/types/Project.type";
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
  const { isDashboardLoading, setIsDashboardLoading } = useDashboardLayoutContext();

  // Custom Hooks
  useTrackPageVisit(ROUTE.DASHBOARD);
  const { walletAddress } = useDashboardLayoutContext();

  // Data Queries
  const { walletQuery, projectsQuery } = useGetDashboardData(walletAddress);

  // Effects
  useEffect(() => {
    // Update isDashboardLoading based on status of wallet and project queries
    if (walletQuery && projectsQuery) {
      const isWalletLoading = walletQuery.isLoading;
      const isProjectsLoading = projectsQuery.some((projectQuery) => projectQuery.isLoading);
      setIsDashboardLoading(isWalletLoading || isProjectsLoading);
    } else {
      setIsDashboardLoading(true);
    }
  }, [walletQuery, projectsQuery, setIsDashboardLoading]);

  // Prevent rendering without queries
  if (!walletQuery || !projectsQuery) {
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
    return <ProjectCard key={Object.values(PROJECT_KEY)[i]} projectQuery={projectQuery} />;
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

Dashboard.getLayout = getDashboardLayout;

export default Dashboard;
