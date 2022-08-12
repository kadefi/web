import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import theme from "../../theme";

export const KadefiLogo = () => {
  // Routing
  const router = useRouter();

  // Handlers
  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <ProjectLogo onClick={handleLogoClick}>
      <LogoContainer>
        <Image src="/assets/logo.png" layout="fill" objectFit="contain" alt="logo" priority />
      </LogoContainer>
      <div>
        <ProjectName>KADEFI</ProjectName>
        <ProjectName color="#FF007F">.MONEY</ProjectName>
      </div>
      <BetaTag>BETA</BetaTag>
    </ProjectLogo>
  );
};

const ProjectLogo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  ${theme.breakpoints.down("md")} {
    height: 1.5rem;
    padding: 0;
    gap: 8px;
  }
`;

const BetaTag = styled.div`
  background-color: #ff007f;
  padding: 2px 8px;
  font-size: 0.6rem;
  font-weight: 700;
  border-radius: 8rem;
`;

const ProjectName = styled(Typography)`
  display: inline;
  font-weight: 700;
  font-size: 18px;
`;

const LogoContainer = styled(Box)({
  position: "relative",
  height: "2.25rem",
  width: "2rem",
});
