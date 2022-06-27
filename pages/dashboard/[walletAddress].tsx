import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { trackWalletSearchEvent } from "../../src/analytics/Analytics.util";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import { useGetDashboardData } from "../../src/api/queries/Dashboard.queries";
import TypographyNeon from "../../src/components/commons/TypographyNeon";
import DashboardErrorFab from "../../src/components/DashboardErrorFab";
import Header from "../../src/components/Header";
import ProjectCard from "../../src/components/ProjectCard";
import SearchWalletInput from "../../src/components/SearchWalletInput";
import WalletCard from "../../src/components/WalletCard";
import { ROUTE } from "../../src/constants/Routes.constant";
import theme from "../../src/theme";
import { PROJECT_KEY } from "../../src/types/Project.type";
import { addNewRecentWalletLS } from "../../src/utils/LocalStorage.util";
import { getNetWorth } from "../../src/utils/NetWorth.util";
import { isValidWalletAddress } from "../../src/utils/String.util";

const Dashboard: NextPage = () => {
  useTrackPageVisit(ROUTE.DASHBOARD);

  const router = useRouter();

  const [walletAddress, setWalletAddress] = useState<string | undefined>();

  useEffect(() => {
    setWalletAddress(router.query.walletAddress as string | undefined);
  }, [router.query.walletAddress]);

  useEffect(() => {
    if (walletAddress && isValidWalletAddress(walletAddress)) {
      addNewRecentWalletLS(walletAddress);
      trackWalletSearchEvent(walletAddress);
    }
  }, [walletAddress]);

  const { walletQuery, projectsQuery } = useGetDashboardData(walletAddress);

  let isDashboardLoading = true;
  let dashboardErrorFab = null;

  if (walletQuery && projectsQuery) {
    isDashboardLoading = walletQuery.isLoading || projectsQuery.some((projectQuery) => projectQuery.isLoading);

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
    projectCards = projectsQuery.map((projectQuery, i) => {
      return <ProjectCard key={Object.values(PROJECT_KEY)[i]} projectQuery={projectQuery} />;
    });
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
        <Header />
        <SearchWalletInput initialWalletAddress={walletAddress} isLoading={isDashboardLoading} />
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

export default Dashboard;
