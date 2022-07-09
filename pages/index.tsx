import styled from "@emotion/styled";
import MuiContainer from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import { useTrackPageVisit } from "../src/analytics/useTrackPageVisit";
import { KadefiLogo } from "../src/components/commons/KadefiLogo";
import TwitterButton from "../src/components/commons/SocialButtons/TwitterButton";
import SupportedProjects from "../src/components/commons/SupportedProjects/SupportedProjects";
import RecentSearches from "../src/components/RecentSearches";
import SearchWalletInput from "../src/components/SearchWalletInput";
import { ROUTE } from "../src/constants/Routes.constant";
import theme from "../src/theme";

const Home: NextPage = () => {
  useTrackPageVisit(ROUTE.HOME);

  const titleProps = {
    display: "inline",
    fontWeight: 900,
  };

  return (
    <Wrapper>
      <Container maxWidth="md">
        <Header>
          <KadefiLogo />
          <TwitterButton />
        </Header>
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
        <Subtitle>Track all your Kadena&apos;s DeFi investments in a single dashboard</Subtitle>
        <SupportedProjects />
        <SearchWalletInput />
        <RecentSearches />
      </Container>
    </Wrapper>
  );
};

const Container = styled(MuiContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6rem;
  margin-top: 4rem;
  width: 100%;
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
