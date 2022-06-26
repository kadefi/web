import type { NextPage } from "next";
import Container from "@mui/material/Container";
import SearchWalletInput from "../src/components/SearchWalletInput";
import Header from "../src/components/Header";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import RecentSearches from "../src/components/RecentSearches/RecentSearches";
import { ROUTE } from "../src/constants/Routes.constant";
import { useTrackPageVisit } from "../src/analytics/useTrackPageVisit";

const Home: NextPage = () => {
  useTrackPageVisit(ROUTE.HOME);

  const titleProps = {
    display: "inline",
    fontWeight: 900,
  };

  return (
    <Container maxWidth="md">
      <Wrapper>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <LandingPageContent>
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
          <Subtitle>
            <Typography textAlign="center" fontWeight={500}>
              View all your Kadena&apos;s DeFi investments in a single dashboard
            </Typography>
          </Subtitle>
          <SearchWalletInput />
          <RecentSearches />
        </LandingPageContent>
      </Wrapper>
    </Container>
  );
};

const HeaderContainer = styled.div`
  margin-top: 32px;
  flex-grow: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled.div`
  margin-bottom: 3rem;
`;

const LandingPageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
  position: relative;
  top: -80px;
`;

export default Home;
