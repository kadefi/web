import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import TwitterIcon from "@mui/icons-material/Twitter";

const Header = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <Container>
      <ImageContainer>
        <Image src="/assets/logo.png" layout="fill" objectFit="contain" alt="logo" onClick={handleLogoClick} />
      </ImageContainer>
      <CustomLink target="__blank" href="https://twitter.com/kadefi_money/">
        <TwitterIcon fontSize="large" />
      </CustomLink>
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
});

const ImageContainer = styled(Box)({
  position: "relative",
  width: "5rem",
  height: "100%",
  left: "-11px",
  cursor: "pointer",
});

const CustomLink = styled.a`
  z-index: 1;
  color: inherit;
  transform: scale(1.3);
  margin-right: 10px;
  @media (max-width: 768px) {
    transform: scale(1.2);
  }
`;
