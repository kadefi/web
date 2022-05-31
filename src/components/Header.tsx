import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import TypographyNeon from "./commons/TypographyNeon";

const Header = () => {
  return (
    <Container>
      <ImageContainer>
        <Image src={"/assets/logo.png"} layout={"fill"} objectFit={"contain"} />
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
});
