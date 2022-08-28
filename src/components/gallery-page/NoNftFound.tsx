import styled from "@emotion/styled";
import { Container as MuiContainer } from "@mui/material";
import Image from "next/image";
import CustomLink from "../../commons/CustomLink";
import { Route } from "../../enums/Route.enum";
import theme from "../../theme";

const NoNftFound = () => {
  return (
    <CentralContainer maxWidth="md">
      <EmptyBoxImageContainer>
        <Image src="/assets/empty-box.png" alt="" layout="fill" objectFit="contain" priority />
      </EmptyBoxImageContainer>
      <P>No NFTs found</P>
      <P>
        View list of integrated NFT collections <IntegrationLink href={`${Route.Integrations}`}>here</IntegrationLink>
      </P>
    </CentralContainer>
  );
};

const IntegrationLink = styled(CustomLink)`
  text-decoration: none;
  color: #ff007f;
  font-weight: bold;
  cursor: pointer;
`;

const EmptyBoxImageContainer = styled.div`
  margin-bottom: 1rem;
  position: relative;
  height: 15rem;
  width: 15rem;

  ${theme.breakpoints.down("md")} {
    height: 10rem;
    width: 10rem;
  }
`;

const P = styled.p`
  margin-top: 0px;
  margin-bottom: 20px;
  text-align: center;
`;

const CentralContainer = styled(MuiContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default NoNftFound;
