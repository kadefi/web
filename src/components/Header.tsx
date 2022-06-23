import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

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
    </Container>
  );
};

export default Header;

const Container = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "flex-start",
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
