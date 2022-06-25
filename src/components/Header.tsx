import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import TwitterButton from "./commons/SocialButtons/TwitterButton";

const Header = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <Container>
      <ProjectNameContainer onClick={handleLogoClick}>
        <ImageContainer>
          <Image src="/assets/logo.png" layout="fill" objectFit="contain" alt="logo" />
        </ImageContainer>
        <div>
          <ProjectName>KADEFI</ProjectName>
          <ProjectName color="#FF007F">.MONEY</ProjectName>
        </div>
      </ProjectNameContainer>
      <TwitterButton />
    </Container>
  );
};

export default Header;

const Container = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "4rem",
  marginBottom: "1rem",
  gap: "1rem",
  zIndex: 1,
});

const ProjectNameContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const ProjectName = styled(Typography)`
  display: inline;
  font-weight: 700;
  font-size: 20px;
`;

const ImageContainer = styled(Box)({
  position: "relative",
  width: "2.5rem",
  height: "100%",
});
