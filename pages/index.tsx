import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import SearchWalletInput from "../src/components/SearchWalletInput";
import Header from "../src/components/Header";

const Home: NextPage = () => {
  return (
    <Background>
      <Content maxWidth="md">
        <Header />
        <SearchWalletInput />
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

export default Home;
