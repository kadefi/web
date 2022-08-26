import styled from "@emotion/styled";
import MuiContainer from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import { useTrackPageVisit } from "../src/analytics/useTrackPageVisit";
import RecentSearches from "../src/components/home-page/RecentSearches";
import SupportedProjects from "../src/components/home-page/SupportedProjects";
import TwitterButton from "../src/components/misc/TwitterButton";
import { KadefiLogo } from "../src/components/nav-bar/KadefiLogo";
import SearchWalletInput from "../src/components/nav-bar/SearchWalletInput";
import { Route } from "../src/enums/Route.enum";
import theme from "../src/theme";

const Home: NextPage = () => {
  useTrackPageVisit(Route.Home);

  const titleProps = {
    display: "inline",
    fontWeight: 900,
  };

  return (
    <Wrapper>
      <Container maxWidth="md">
        <Header>
          <KadefiLogo />
          <TwitterButton isMobileResponsive />
        </Header>
        <Content>
          <Title>
            <Typography variant="h3" {...titleProps}>
              Unlocking{" "}
            </Typography>
            <Typography variant="h3" color="#FF007F" {...titleProps}>
              DeFi{" "}
            </Typography>
            <Typography variant="h3" {...titleProps}>
              Insights
            </Typography>
          </Title>
          <Subtitle>Track all your Kadena&apos;s investments and NFTs in a single dashboard</Subtitle>
          <SupportedProjects />
          <SearchWalletInput />
          <RecentSearches />
        </Content>
      </Container>
    </Wrapper>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Container = styled(MuiContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 3rem;
  padding: 0 1rem;

  @media (max-height: 600px) {
    position: relative;
    top: 0;
    margin-bottom: 3rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  justify-content: flex-start;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled(Typography)`
  text-align: center;
  margin-bottom: 2rem;

  ${theme.breakpoints.down("sm")} {
    font-size: 0.9rem;
    max-width: 70vw;
  }
`;

export default Home;
