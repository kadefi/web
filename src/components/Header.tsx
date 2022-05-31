import styled from "@emotion/styled";
import { Box } from "@mui/material";
// import Image from "next/image";
import TypographyNeon from "./commons/TypographyNeon";

const Header = () => {
  return (
    <Container>
      {/* <ImageContainer>
        <Image src={"/assets/logo.png"} layout={"fill"} objectFit={"contain"} />
      </ImageContainer> */}
      <TypographyNeon fontSize={"32px"} fontWeight={"bold"}>
        KADEFI
      </TypographyNeon>
    </Container>
  );
};

export default Header;

const Container = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "3rem",
  marginBottom: "1rem",
  gap: "1rem",
});

const ImageContainer = styled(Box)({
  position: "relative",
  width: "40px",
  height: "100%",
});
