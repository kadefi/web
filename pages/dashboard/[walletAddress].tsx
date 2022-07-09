import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import CountUp from "react-countup";
import { trackWalletSearchEvent } from "../../src/analytics/Analytics.util";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import { useGetDashboardData } from "../../src/api/queries/Dashboard.queries";
import TypographyNeon from "../../src/components/commons/TypographyNeon";
import DashboardErrorFab from "../../src/components/DashboardErrorFab";
import ProjectCard from "../../src/components/ProjectCard";
import WalletCard from "../../src/components/WalletCard";
import { ROUTE } from "../../src/constants/Routes.constant";
import { useDashboardLayoutContext } from "../../src/contexts/DashboardLayoutContext";
import { useWalletAddress } from "../../src/hooks/useWalletAddress";
import { getDashboardLayout } from "../../src/layouts/DashboardLayout";
import theme from "../../src/theme";
import { ProjectResponse } from "../../src/types/DashboardData.type";
import { Page } from "../../src/types/Page.type";
import { PROJECT_KEY } from "../../src/types/Project.type";
import { addNewRecentWalletLS } from "../../src/utils/LocalStorage.util";
import { getNetWorth } from "../../src/utils/NetWorth.util";
import { isValidWalletAddress } from "../../src/utils/String.util";

const Dashboard: NextPage & Page = () => {
  useTrackPageVisit(ROUTE.DASHBOARD);

  const { walletAddress } = useWalletAddress();

  const { isDashboardLoading, setIsDashboardLoading } = useDashboardLayoutContext();

  useEffect(() => {
    if (walletAddress && isValidWalletAddress(walletAddress)) {
      addNewRecentWalletLS(walletAddress);
      trackWalletSearchEvent(walletAddress);
    }
  }, [walletAddress]);

  const { walletQuery, projectsQuery } = useGetDashboardData(walletAddress);

  useEffect(() => {
    if (walletQuery && projectsQuery) {
      const isLoading = walletQuery.isLoading || projectsQuery.some((projectQuery) => projectQuery.isLoading);

      setIsDashboardLoading(isLoading);
    }
  }, [walletQuery, projectsQuery, setIsDashboardLoading]);

  let dashboardErrorFab = null;
  if (walletQuery && projectsQuery) {
    dashboardErrorFab = (
      <DashboardErrorFab loading={isDashboardLoading} walletQuery={walletQuery} projectsQuery={projectsQuery} />
    );
  }

  let walletCard = null;
  if (walletQuery) {
    walletCard = <WalletCard walletQuery={walletQuery} />;
  }

  let projectCards = null;
  if (projectsQuery) {
    const fiatValues: (number | undefined)[] = [];

    projectCards = projectsQuery.map((projectQuery, i) => {
      fiatValues[i] = (projectQuery.data as ProjectResponse)?.fiatValue || undefined;
      return <ProjectCard key={Object.values(PROJECT_KEY)[i]} projectQuery={projectQuery} />;
    });

    sortProjectCards(projectCards, fiatValues);
  }

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

const sortProjectCards = (projectCards: ReactElement[], fiatValues: (number | undefined)[]) => {
  projectCards.sort((a, b) => {
    const first = fiatValues[projectCards.indexOf(a)];
    const second = fiatValues[projectCards.indexOf(b)];
    return (second || 0) - (first || 0);
  });
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
