import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Logo from "../../src/assets/logo.png";
import NetWorth from "../../src/components/NetWorth";
import WalletCard from "../../src/components/WalletCard";
import ProjectCard from "../../src/components/ProjectCard";
import { WalletData } from "../../src/types/DashboardData.type";
import { useGetWalletTokens } from "../../src/api/Wallet.api";
import { PROJECT_KEY } from "../../src/types/Project.type";
import SearchWalletInput from "../../src/components/SearchWalletInput";
import { useRouter } from "next/router";
import LoadingIndicator from "../../src/components/LoadingIndicator";
import Header from "../../src/components/Header";

const PROJECTS = [PROJECT_KEY.KD_SWAP, PROJECT_KEY.BABENA];

const Dashboard: NextPage = () => {
  const router = useRouter();

  const walletAddress = router.query.walletAddress as string;

  const { data: walletData, isLoading } = useGetWalletTokens(walletAddress);

  return (
    <Background>
      <Content maxWidth="md">
        <Header />
        <SearchWalletInput initialWalletAddress={walletAddress} />
        {isLoading ? (
          <LoadingIndicatorContainer>
            <LoadingIndicator width={"120px"} />
          </LoadingIndicatorContainer>
        ) : (
          <>
            <NetWorth />
            {walletData && walletData.length > 0 && (
              <WalletCard walletData={walletData as WalletData} />
            )}
            {walletAddress &&
              PROJECTS.map((projectKey) => {
                return (
                  <ProjectCard
                    key={projectKey}
                    walletAddress={walletAddress}
                    projectKey={projectKey}
                  />
                );
              })}
          </>
        )}
      </Content>
    </Background>
  );
};

const LoadingIndicatorContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "5rem",
});

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
