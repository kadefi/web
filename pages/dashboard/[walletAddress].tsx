import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import WalletCard from "../../src/components/WalletCard";
import ProjectCard from "../../src/components/ProjectCard";
import SearchWalletInput from "../../src/components/SearchWalletInput";
import { useRouter } from "next/router";
import Header from "../../src/components/Header";
import { useGetDashboardData } from "../../src/api/queries/Dashboard.queries";
import { Skeleton, Typography } from "@mui/material";
import CountUp from "react-countup";
import TypographyNeon from "../../src/components/commons/TypographyNeon";
import { getNetWorth } from "../../src/utils/NetWorth.util";
import { PROJECT_KEY } from "../../src/types/Project.type";
import DashboardErrorFab from "../../src/components/DashboardErrorFab";

const Dashboard: NextPage = () => {
  const router = useRouter();

  const walletAddress = router.query.walletAddress as string;

  const { walletQuery, projectsQuery } = useGetDashboardData(walletAddress);

  const isDashboardLoading = walletQuery.isLoading || projectsQuery.some((projectQuery) => projectQuery.isLoading);

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
    <Background>
      <Content maxWidth="md">
        <Header />
        <SearchWalletInput initialWalletAddress={walletAddress} isLoading={isDashboardLoading} />
        {netWorth}
        {walletCard}
        {projectCards}
      </Content>
      <DashboardErrorFab loading={isDashboardLoading} walletQuery={walletQuery} projectsQuery={projectsQuery} />
    </Background>
  );
};

const NetWorthAmountSkeleton = styled(Skeleton)({
  width: "10rem",
});

const NetWorthAmount = styled(TypographyNeon)({
  fontSize: "48px",
  marginBottom: "1rem",
});

const NetWorthTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: "bold",
  marginTop: "1rem",
});

const Content = styled(Container)({
  marginTop: "32px",
  marginBottom: "80px",
});

const Background = styled(Box)({
  position: "absolute",
  backgroundImage: "url(/assets/background.png)",
  backgroundPosition: "center",
  backgroundSize: "cover",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  overflowY: "auto",
});

export default Dashboard;
