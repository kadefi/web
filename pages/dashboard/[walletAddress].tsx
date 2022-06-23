import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import WalletCard from "../../src/components/WalletCard";
import ProjectCard from "../../src/components/ProjectCard";
import { ProjectData, WalletData } from "../../src/types/DashboardData.type";
import SearchWalletInput from "../../src/components/SearchWalletInput";
import { useRouter } from "next/router";
import Header from "../../src/components/Header";
import { useGetDashboardData } from "../../src/api/queries/Dashboard.queries";
import { UseQueryResult } from "react-query";
import { Typography } from "@mui/material";
import CountUp from "react-countup";
import TypographyNeon from "../../src/components/commons/TypographyNeon";
import { getNetWorth } from "../../src/utils/NetWorth.util";
import { PROJECT_KEY } from "../../src/types/Project.type";

const Dashboard: NextPage = () => {
  const router = useRouter();

  const walletAddress = router.query.walletAddress as string;

  const [walletQuery, ...projectsQuery] = useGetDashboardData(walletAddress);

  const isDashboardLoading = walletQuery.isLoading && projectsQuery.every((projectQuery) => projectQuery.isLoading);

  const netWorth = !isDashboardLoading
    ? getNetWorth(walletQuery as UseQueryResult<WalletData>, projectsQuery as UseQueryResult<ProjectData>[])
    : null;

  return (
    <Background>
      <Content maxWidth="md">
        <Header />
        <SearchWalletInput initialWalletAddress={walletAddress} />
        <Typography fontSize="24px" fontWeight="bold" sx={{ pl: "1rem", mt: "1rem" }}>
          Net Worth
        </Typography>
        <TypographyNeon fontSize="48px" sx={{ pl: "1rem", mb: "1rem" }}>
          ${netWorth !== null && <CountUp end={netWorth} decimals={2} duration={0.3} />}
        </TypographyNeon>
        {walletQuery && <WalletCard walletQuery={walletQuery as UseQueryResult<WalletData>} />}
        {projectsQuery &&
          projectsQuery.map((projectQuery, i) => {
            return (
              <ProjectCard
                key={Object.values(PROJECT_KEY)[i]}
                projectQuery={projectQuery as UseQueryResult<ProjectData>}
              />
            );
          })}
      </Content>
    </Background>
  );
};

const Content = styled(Container)({
  marginTop: "32px",
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
